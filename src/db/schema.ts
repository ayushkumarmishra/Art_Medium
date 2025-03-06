import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(), //This i will use to map my user fromn clerk to my db.
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  // Created the index for clerk_id because of the searching and querying wrt users from clerk to db is going to bedone using this id only.
  (t) => [uniqueIndex("clerk_id_index").on(t.clerkId)]
);
