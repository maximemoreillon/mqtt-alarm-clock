import { recreateCronJobs } from "$lib/server/cron";
import { init as mqttInit } from "$lib/server/mqtt";

export { handle } from "./auth";

export const init = async () => {
  mqttInit();
  recreateCronJobs();
};
