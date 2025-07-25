<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import Cron from "$lib/components/cron.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const alarm = $state(data); // for reactivity

  async function handleDelete() {
    if (!confirm("Delete alarm?")) return;

    const res = await fetch(`/api/alarms/${alarm.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(await res.text());

    goto("/alarms");
  }

  async function handleUpdate() {
    const res = await fetch(`/api/alarms/${alarm.id}`, {
      method: "PATCH",
      body: JSON.stringify(alarm),
    });

    if (!res.ok) throw new Error(await res.text());
    alert("OK");
  }
</script>

<div>
  <a href="/alarms">Return to alarm list</a>
</div>
<div class="flex justify-between items-center">
  <h2 class="text-2xl my-2">{alarm.name}</h2>
  <div class="flex gap-2">
    <Button onclick={handleUpdate}>Save</Button>
    <Button onclick={handleDelete} variant="destructive">Delete</Button>
  </div>
</div>

<div class="flex gap-4 my-4">
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <!-- <Label for="name">Name</Label> -->
    <Input
      type="text"
      id="name"
      placeholder="Weekdays"
      bind:value={alarm.name}
    />
  </div>

  <Cron bind:value={alarm.cron as string} />

  <div class="flex items-center gap-2">
    <Switch id="enabled" bind:checked={alarm.enabled} />
    <Label for="enabled">Enabled</Label>
  </div>
</div>
