<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import BellIcon from "@lucide/svelte/icons/bell";
  import BellOffIcon from "@lucide/svelte/icons/bell-off";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import PencilIcon from "@lucide/svelte/icons/pencil";

  import Cron from "$lib/components/cron.svelte";

  let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-between">
  <h2 class="text-2xl my-2">My alarms</h2>
  <Button href="/alarms/new">
    <PlusIcon />
    New
  </Button>
</div>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Schedule</Table.Head>
      <Table.Head>Enabled</Table.Head>
      <Table.Head>Edit</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data.items as alarm (alarm.id)}
      <Table.Row>
        <Table.Cell>
          <a href={`/alarms/${alarm.id}`}>{alarm.name}</a>
        </Table.Cell>
        <Table.Cell>
          <Cron value={alarm.cron as string} readonly />
        </Table.Cell>
        <Table.Cell>
          {#if alarm.enabled}
            <BellIcon />
          {:else}
            <BellOffIcon />
          {/if}
        </Table.Cell>
        <Table.Cell>
          <Button href={`/alarms/${alarm.id}`}>
            <PencilIcon />
            Edit
          </Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
