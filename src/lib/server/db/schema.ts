import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const alarmsTable = pgTable("alarm", {
  id: serial("id").primaryKey(),
  name: text(),
  cron: text(),
  enabled: boolean().default(true).notNull(),
});
