import { stopAllJobs } from "$lib/server/cron.js";
import { json } from "@sveltejs/kit";
import cron from "node-cron";

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
