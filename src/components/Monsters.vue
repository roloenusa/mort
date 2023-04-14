<script setup lang="ts">
import { SRD } from './data/SRD';
import { Experience } from './data/Experience';
import Monster from './Monster.vue';
import { ref } from 'vue';
import { useEnemiesStore } from '@/stores/enemies';
import { useEncounterStore } from '@/stores/encounter';

const monsters = SRD.monsters
  .sort((a, b) => Experience[a.challenge_rating] - Experience[b.challenge_rating])

const store = useEnemiesStore()
const encounterStore = useEncounterStore();


const selected = ref<any[]>([]);
</script>

<template>
  <ul class="monsters" v-for="monster in monsters">
    <li class="monster-table"><Monster :monster="monster" @click="() => store.add(monster)" :difficulty="encounterStore.monsterProjectedDifficulty(monster)" /></li>
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
