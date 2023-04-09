<script setup lang="ts">
import { SRD } from './data/SRD';
import { Experience } from './data/Experience';
import Monster from './Monster.vue';
import { ref } from 'vue';

const monsters = SRD.monsters
  .sort((a, b) => Experience[a.challenge_rating] - Experience[b.challenge_rating])

const selected = ref<any[]>([]);

const add = (monster: Object) => {
  selected.value.push(monster);
}

const remove = (index) => {
  selected.value.splice(index, 1);
}
</script>

<template>
  <div class="" v-for="monster, index in selected">
    <Monster :monster="monster" @click="() => remove(index)"/>
  </div>

  <hr />

  <ul class="monsters" v-for="monster in monsters">
    <li class="monster-table"><Monster :monster="monster" @click="() => add(monster)" /></li>
  </ul>
</template>

<style scoped>
.monsters {
  margin: 0;
  padding: 0;
}

.monster-table {
  list-style: none;
}
</style>
