import { createAlarm, readAlarms } from "$lib/server/alarms.js";
import { stopAllJobs } from "$lib/server/cron.js";
import { json } from "@sveltejs/kit";
import { z } from "zod";

export async function GET({ request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  const result = await readAlarms();

  return json(result);
}

export async function DELETE({ request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });
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

export async function POST({ request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });
  const body = await request.json();
  const alarmProperties = newAlarmSchema.parse(body);
  await createAlarm(alarmProperties);
  return json({ alarmProperties });
}
