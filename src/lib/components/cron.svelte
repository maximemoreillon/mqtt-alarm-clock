<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

  const weekdayLetters = ["S", "M", "T", "W", "T", "F", "S"];

  let { value = $bindable(""), readonly = false } = $props();

  function parseTimeFromCron() {
    const [m, h] = value.split(" ");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }

  function parseWeekdaysFromCron() {
    const wdCron = value.split(" ").at(4);
    if (!wdCron) throw new Error("Missing cron field for weekdays");
    return wdCron.split(",");
  }

  let time = $state(parseTimeFromCron());
  let weekdays = $state(parseWeekdaysFromCron());

  $effect(() => {
    const [h, m] = time.split(":");
    const wd = weekdays.toSorted().join(",");
    value = `${Number(m)} ${Number(h)} * * ${wd}`;
  });
</script>

<div class="flex items-center gap-4">
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="time">Time</Label>
    <Input type="time" id="time" bind:value={time} {readonly} />
  </div>

  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="weekdays">Weekdays</Label>
    <ToggleGroup.Root
      bind:value={weekdays}
      type="multiple"
      disabled={readonly}
      id="weekdays"
    >
      {#each Array.from({ length: 7 }, (e, i) => i) as weekdayIndex}
        <ToggleGroup.Item value={String(weekdayIndex)}>
          {weekdayLetters[weekdayIndex]}
        </ToggleGroup.Item>
      {/each}
    </ToggleGroup.Root>
  </div>
</div>
