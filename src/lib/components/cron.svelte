<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import { parseTimeFromCron, parseWeekdaysFromCron } from "$lib/cronParsing";
  import weekdayLetters from "$lib/weekdays";

  let {
    value = $bindable(""),
    readonly = false,
    hideLabels = false,
  } = $props();

  let time = $state(parseTimeFromCron(value));
  let weekdays = $state(parseWeekdaysFromCron(value));

  $effect(() => {
    const [h, m] = time.split(":");
    const wd = weekdays.toSorted().join(",");
    value = `${Number(m)} ${Number(h)} * * ${wd}`;
  });
</script>

<div class="flex items-center gap-4 justify-between">
  <div class="flex flex-col gap-1.5">
    {#if !hideLabels}
      <Label for="time">Time</Label>
    {/if}
    <Input type="time" id="time" bind:value={time} {readonly} />
  </div>

  <div class="flex flex-col gap-1.5">
    {#if !hideLabels}
      <Label for="weekdays">Weekdays</Label>
    {/if}

    <ToggleGroup.Root
      bind:value={weekdays}
      id="weekdays"
      variant="outline"
      type="multiple"
      disabled={readonly}
    >
      {#each Array.from({ length: 7 }, (e, i) => i) as weekdayIndex}
        <ToggleGroup.Item value={String(weekdayIndex)}>
          {weekdayLetters[weekdayIndex]}
        </ToggleGroup.Item>
      {/each}
    </ToggleGroup.Root>
  </div>
</div>
