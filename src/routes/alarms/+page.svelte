<script lang="ts">
  import type { PageProps } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";

  import PlusIcon from "@lucide/svelte/icons/plus";

  import AlamCard from "$lib/components/alamCard.svelte";

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
    <AlamCard {alarm} />
  {/each}
</div>
