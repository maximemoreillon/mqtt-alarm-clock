<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<ModeWatcher />
<header class="border-lightgrey border-b-1">
  <h1 class="text-3xl m-4">MQTT Alarm clock</h1>
</header>
<main class="p-2 max-w-3xl mx-auto">
  {@render children()}
</main>
