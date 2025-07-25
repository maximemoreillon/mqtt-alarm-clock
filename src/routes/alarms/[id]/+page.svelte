<script lang="ts">
  import { toast } from "svelte-sonner";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import DeleteIcon from "@lucide/svelte/icons/delete";
  import SaveIcon from "@lucide/svelte/icons/save";
  import { goto } from "$app/navigation";
  import Cron from "$lib/components/cron.svelte";
  import type { PageProps } from "./$types";
  import ReturnLink from "$lib/components/returnLink.svelte";

  let { data }: PageProps = $props();
  let alarm = $state(data); // for reactivity
  let saving = $state(false);
  let deleting = $state(false);

  async function handleDelete() {
    deleting = true;
    if (!confirm("Delete alarm?")) return;

    const res = await fetch(`/api/alarms/${alarm.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(await res.text());

    goto("/alarms");
    deleting = false;
  }

  async function handleUpdate() {
    saving = true;
    const res = await fetch(`/api/alarms/${alarm.id}`, {
      method: "PATCH",
      body: JSON.stringify(alarm),
    });

    if (!res.ok) throw new Error(await res.text());
    toast("Alarm saved");
    saving = false;
  }
</script>

<div>
  <ReturnLink />
</div>
<div class="flex justify-between items-center">
  <h2 class="text-2xl my-2">{alarm.name}</h2>
  <div class="flex gap-2">
    <Button onclick={handleUpdate} disabled={saving}>
      <SaveIcon />
      Save
    </Button>
    <Button onclick={handleDelete} variant="destructive" disabled={deleting}>
      <DeleteIcon />
      Delete
    </Button>
  </div>
</div>

<div class="flex gap-4 my-4">
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="name">Name</Label>
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
