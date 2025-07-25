import { recreateCronJobs } from "$lib/server/cron";
import { init as mqttInit } from "$lib/server/mqtt";
export const init = async () => {
  mqttInit();
  await recreateCronJobs();
};
