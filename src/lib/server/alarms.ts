import { eq } from "drizzle-orm";
import { recreateCronJobs } from "./cron";
import { db } from "./db";
import { alarmsTable } from "./db/schema";

export async function createAlarm(newAlarm: typeof alarmsTable.$inferInsert) {
  const [createdAlarm] = await db.insert(alarmsTable).values(newAlarm);
  await recreateCronJobs();
  return createdAlarm;
}

export async function readAlarms() {
  const items = await db.select().from(alarmsTable);
  return { items };
}

export async function readAlarm(id: number) {
  const [foundAlarm] = await db
    .select()
    .from(alarmsTable)
    .where(eq(alarmsTable.id, id));
  return foundAlarm;
}

export async function updateAlarm(
  id: number,
  properties: typeof alarmsTable.$inferInsert
) {
  const [updatedAlarm] = await db
    .update(alarmsTable)
    .set(properties)
    .where(eq(alarmsTable.id, id))
    .returning();
  await recreateCronJobs();
  return updatedAlarm;
}

export async function deleteAlarm(id: number) {
  await db.delete(alarmsTable).where(eq(alarmsTable.id, id));
  await recreateCronJobs();
}
