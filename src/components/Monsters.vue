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
  <h2>Monsters</h2>
  <ul class="table" v-for="monster in monsters">
    <li class="cell"><Monster :monster="monster" @click="() => store.add(monster)" :difficulty="encounterStore.monsterProjectedDifficulty(monster)" /></li>
  </ul>
</template>

<style scoped>
.table {
  margin: 0rem;
  padding: 0rem;

}

.cell {
  margin-bottom: 1rem;
  padding: 1rem;
  list-style: none;
  background-color: #FFF;
}
</style>
