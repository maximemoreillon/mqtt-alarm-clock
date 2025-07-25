import cron from "node-cron";
import { db } from "./db";
import { alarmsTable } from "./db/schema";
import { publish } from "./mqtt";

export async function stopAllJobs() {
  const tasks = cron.getTasks();
  for (const taskId of tasks.keys()) {
    const task = tasks.get(taskId);
    await task?.destroy();
  }
}

export async function recreateCronJobs() {
  await stopAllJobs();

  const alarms = await db.select().from(alarmsTable);

  alarms.forEach((alarm) => {
    console.log(
      `[CRON] Registering cron job for alarm "${alarm.name}" (ID: ${alarm.id})`
    );
    if (!alarm.cron) {
      console.log(`[CRON] Alarm ${alarm.id} has no cron`);
      return;
    }

    if (!alarm.enabled) {
      console.log(`[CRON] Alarm ${alarm.id} is disabled, skipping...`);
      return;
    }

    cron.schedule(alarm.cron, () => {
      // TODO: MQTT publish
      console.log(
        `[CRON] Running task for alarm "${alarm.name}" (ID: ${alarm.id})`
      );
      publish();
    });
  });

  console.log(
    `[CRON] Currently ${[...cron.getTasks().keys()].length} tasks registered`
  );
}
