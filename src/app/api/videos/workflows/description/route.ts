import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";
import OpenAI from "openai";

interface InputType {
  userId: string;
  videoId: string;
}

const DESCRIPTION_SYSTEM_PROMPT = `Your task is to summarize the transcript of a video. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points and main ideas without losing important details.
- Avoid jargon or overly complex language unless necessary for the context.
- Focus on the most critical information, ignoring filler, repetitive statements, or irrelevant tangents.
- ONLY return the summary, no other text, annotations, or comments.
- Aim for a summary that is 3-5 sentences long and no more than 200 characters.`;

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { videoId, userId } = input;

  const video = await context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

    if (!existingVideo) {
      throw new Error("Not found");
    }

    return existingVideo;
  });

  //taking out the trnscript from the mux video asset
  const transcript = await context.run("get-transcript", async () => {
    const trackURL = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;

    const resposne = await fetch(trackURL);
    const text = resposne.text();

    if (!text) {
      throw new Error("Transcript not found");
    }
    return text;
  });

  const openai = new OpenAI({
    apiKey: process.env.GITHUB_TOKEN!,
    baseURL: "https://models.inference.ai.azure.com",
  });
  const response = await context.run("generate-description", async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: DESCRIPTION_SYSTEM_PROMPT },
        {
          role: "user",
          content: transcript,
        },
      ],
      // temperature: 0.7,
      // max_tokens: 256,
    });

    return response;
  });

  const description = response.choices[0]?.message?.content;

  if (!description) {
    throw new Error("Title not found");
  }

  await context.run("update-video", async () => {
    await db
      .update(videos)
      .set({ description: description ?? video.description })
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));
  });

  await context.run("update-video", async () => {
    await db
      .update(videos)
      .set({
        description,
      })
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));
  });
});
