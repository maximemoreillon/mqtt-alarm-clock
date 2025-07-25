import { deleteAlarm, updateAlarm } from "$lib/server/alarms.js";
import { json } from "@sveltejs/kit";
import z from "zod";

export async function DELETE({ params, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  const id = Number(params.id);

  await deleteAlarm(id);

  return json({ id });
}

const alarmUpdateSchema = z.object({
  name: z.string().optional(),
  cron: z.string().optional(),
  enabled: z.boolean().optional(),
});

export async function PATCH({ params, request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  const id = Number(params.id);
  const body = await request.json();
  const alarmProperties = alarmUpdateSchema.parse(body);

  await updateAlarm(id, alarmProperties);

  return json({ id });
}
