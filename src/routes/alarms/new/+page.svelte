<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";
  import Cron from "$lib/components/cron.svelte";

  let name = $state("New alarm");
  let cron = $state("30 7 * * 1,2");

  async function handleSumbit() {
    console.log(cron);
    // const res = await fetch("/api/alarms", {
    //   method: "POST",
    //   body: JSON.stringify({ name, cron }),
    // });

    // if (!res.ok) throw new Error(await res.text());
    // goto("/alarms");
  }
</script>

<div>
  <a href="/alarms">Return to alarms</a>
</div>

<h2 class="text-2xl my-2">Create new alarm</h2>

<div class="flex gap-4">
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="name">Name</Label>
    <Input type="text" id="name" placeholder="Weekdays" bind:value={name} />
  </div>

  <Cron bind:value={cron} />

  <Button onclick={handleSumbit}>Submit</Button>
</div>
