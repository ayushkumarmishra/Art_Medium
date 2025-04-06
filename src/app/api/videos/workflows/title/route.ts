import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";
import OpenAI from "openai";

interface InputType {
  userId: string;
  videoId: string;
}

const TITLE_SYSTEM_PROMPT = `Your task is to generate an SEO-focused title for a YouTube video based on its transcript. Please follow these guidelines:
- Be concise but descriptive, using relevant keywords to improve discoverability.
- Highlight the most compelling or unique aspect of the video content.
- Avoid jargon or overly complex language unless it directly supports searchability.
- Use action-oriented phrasing or clear value propositions where applicable.
- Ensure the title is 3-8 words long and no more than 100 characters.
- ONLY return the title as plain text. Do not add quotes or any additional formatting.`;

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
  const response = await context.run("generate-title", async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: TITLE_SYSTEM_PROMPT },
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

  const title = response.choices[0]?.message?.content;

  if (!title) {
    throw new Error("Title not found");
  }

  await context.run("update-video", async () => {
    await db
      .update(videos)
      .set({ title: title ?? video.title })
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));
  });
});
