<script setup lang="ts">
import { shallowRef } from "vue";
import { advance, createGame, stringify } from "./gameOfLife/Game";

const game = shallowRef(createGame(393, 293));

setInterval(() => {
  game.value = advance(game.value);
}, 135);
</script>

<template>
  <pre>{{ stringify(game) }}</pre>
</template>

<style>
pre {
  font-size: 3px;
  font-weight: bold;
}
</style>
