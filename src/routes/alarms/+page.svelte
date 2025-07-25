<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import BellIcon from "@lucide/svelte/icons/bell";
  import BellOffIcon from "@lucide/svelte/icons/bell-off";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import PencilIcon from "@lucide/svelte/icons/pencil";

  import Cron from "$lib/components/cron.svelte";
  import * as Card from "$lib/components/ui/card/index.js";

  let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-between my-4">
  <h2 class="text-2xl">My alarms</h2>
  <Button href="/alarms/new">
    <PlusIcon />
    New
  </Button>
</div>

<div class="flex flex-col gap-4">
  {#each data.items as alarm (alarm.id)}
    <Card.Root>
      <Card.Header class="flex justify-between">
        <Card.Title>
          {alarm.name}
        </Card.Title>

        <Button href={`/alarms/${alarm.id}`}>
          <PencilIcon />
        </Button>

        <!-- <Card.Description>Card Description</Card.Description> -->
      </Card.Header>
      <Card.Content class="flex justify-between">
        <Cron value={alarm.cron as string} readonly hideLabels />
        <div>
          {#if alarm.enabled}
            <BellIcon />
          {:else}
            <BellOffIcon />
          {/if}
        </div>
      </Card.Content>
      <!-- <Card.Footer></Card.Footer> -->
    </Card.Root>
  {/each}
</div>
