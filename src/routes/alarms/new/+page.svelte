<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";

  let newAlarm = $state({ cron: "* * * * *", name: "Test alarm" });

  async function handleSumbit() {
    const res = await fetch("/api/alarms", {
      method: "POST",
      body: JSON.stringify(newAlarm),
    });

    if (!res.ok) throw new Error(await res.text());
    goto("/alarms");
  }
</script>

<h2 class="text-2xl my-2">Create new alarm</h2>

<div>
  <a href="/alarms">Return to alarms</a>
</div>

<div class="flex w-full max-w-sm flex-col gap-1.5">
  <Label for="cron">cron</Label>
  <Input
    type="text"
    id="cron"
    placeholder="* * * * *"
    bind:value={newAlarm.cron}
  />
</div>

<div class="flex w-full max-w-sm flex-col gap-1.5">
  <Label for="name">Name</Label>
  <Input
    type="text"
    id="name"
    placeholder="Weekdays"
    bind:value={newAlarm.name}
  />
</div>

<div>
  <Button onclick={handleSumbit}>Submit</Button>
</div>
