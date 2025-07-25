<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import PencilIcon from "@lucide/svelte/icons/pencil";
  import Button from "$lib/components/ui/button/button.svelte";
  import BellIcon from "@lucide/svelte/icons/bell";
  import BellOffIcon from "@lucide/svelte/icons/bell-off";
  import { parseTimeFromCron, parseWeekdaysFromCron } from "$lib/cronParsing";
  import weekdayLetters from "$lib/weekdays";

  const { alarm } = $props();

  function getWeekdayClass(index: number) {
    const base = ["p-2", "border", "rounded-md", "text-sm"];
    const unSelected = ["opacity-75"];
    const selected = ["bg-accent"];
    const parsedCron = parseWeekdaysFromCron(alarm.cron);
    if (parsedCron.includes(String(index)))
      return [...base, ...selected].join(" ");
    else return [...base, ...unSelected].join(" ");
  }
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>
      {parseTimeFromCron(alarm.cron)}
    </Card.Title>

    <Card.Description>{alarm.name}</Card.Description>

    <Card.Action>
      <Button href={`/alarms/${alarm.id}`}>
        <PencilIcon />
        Edit
      </Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>
    <div class="flex justify-between">
      <div class="flex gap-1">
        {#each Array.from({ length: 7 }, (e, i) => i) as weekdayIndex}
          <div class={getWeekdayClass(weekdayIndex)}>
            {weekdayLetters[weekdayIndex]}
          </div>
        {/each}
      </div>

      {#if alarm.enabled}
        <BellIcon />
      {:else}
        <BellOffIcon />
      {/if}
    </div>
  </Card.Content>
  <!-- <Card.Footer></Card.Footer> -->
</Card.Root>
