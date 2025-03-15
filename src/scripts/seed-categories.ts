import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Entertainment",
  "Education",
  "Comedy",
  "Sprituality",
  "Music",
  "Sports",
  "Gaming",
  "Travel and events",
  "News and Politics",
];

async function main() {
  console.log("Seeding categories......");

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.log("Error Seeding categories ", error);
    process.exit(1);
  }
}

main();
