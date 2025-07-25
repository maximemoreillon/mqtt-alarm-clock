export function parseTimeFromCron(value: string) {
  const [m, h] = value.split(" ");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

export function parseWeekdaysFromCron(value: string) {
  const wdCron = value.split(" ").at(4);
  if (!wdCron) throw new Error("Missing cron field for weekdays");
  return wdCron.split(",");
}
