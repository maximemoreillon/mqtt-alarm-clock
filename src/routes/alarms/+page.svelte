<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import BellIcon from "@lucide/svelte/icons/bell";
  import BellIOffcon from "@lucide/svelte/icons/bell-off";

  let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-between">
  <h2 class="text-2xl my-2">My alarms</h2>
  <Button href="/alarms/new">Create new alarm</Button>
</div>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Cron</Table.Head>
      <Table.Head>Enabled</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data.items as alarm (alarm.id)}
      <Table.Row>
        <Table.Cell>
          <a href={`/alarms/${alarm.id}`}>{alarm.name}</a>
        </Table.Cell>
        <Table.Cell>{alarm.cron}</Table.Cell>
        <Table.Cell>
          {#if alarm.enabled}
            <BellIcon />
          {:else}
            <BellIOffcon />
          {/if}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
