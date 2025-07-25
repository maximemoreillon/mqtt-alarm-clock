import { createAlarm } from "$lib/server/alarms.js";
import { stopAllJobs } from "$lib/server/cron.js";
import { json } from "@sveltejs/kit";
import cron, { type ScheduledTask } from "node-cron";
import { z } from "zod";
export async function GET({ request }) {
  const tasks = cron.getTasks();

  return json([...tasks.keys()]);
}

export async function DELETE({ request }) {
  await stopAllJobs();

  return new Response("OK", {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const newAlarmSchema = z.object({
  name: z.string(),
  cron: z.string(),
});

export async function POST({ request }) {
  const body = await request.json();
  const alarmProperties = newAlarmSchema.parse(body);

  console.log(alarmProperties);

  await createAlarm(alarmProperties);

  // TODO: zod validation

  return json({ alarmProperties });
}
