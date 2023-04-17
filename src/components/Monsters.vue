<script setup lang="ts">
import { SRD } from './data/SRD';
import { Experience } from './data/Experience';
import Monster from './Monster.vue';
import { ref, computed } from 'vue';
import { useEnemiesStore } from '@/stores/enemies';
import { useEncounterStore } from '@/stores/encounter';
import SearchSolid from './icons/SearchSolid.vue';

const search = ref('');

const monsters = SRD.monsters
  .sort((a, b) => Experience[a.challenge_rating] - Experience[b.challenge_rating])

const store = useEnemiesStore()
const encounterStore = useEncounterStore();

const filters = ref<any[]>([]);

const filter = () => {
  // Empty the array in case the filters have been removed
  filters.value.splice(0, filters.value.length);

  // Split the parts by a space between and trim any white spaces.
  const parts = search.value
    .trim()
    .split(' ')
    .filter((e) => e.length)
    .map((e) => e.toLowerCase());

  parts.forEach((part) => {
    // Regex:
    // 1. Term
    // 2. Symbol such as -, >, :
    // 3. Value to search for
    const m = part.match(/([a-z].*)(:)(\S*.)/);
    if (!m) {
      return;
    }

    const [ _full, term, _term, value ] = m || [];

    let key = term;

    // Accept cr for challenge rating.
    if (term === 'cr') {
      key = 'challenge_rating';
    }

    // Accept ac for armor class
    if (term === 'ac') {
      key = 'armor_class';
    }

    if (term === 'difficulty') {
      const fun = (entry) => {
        const difficulty = encounterStore.monsterProjectedDifficulty(entry);
        return difficulty.toLowerCase() === value.toLowerCase();
      }
      filters.value.push(fun);
      return;
    }

    const fun = (entry) => entry[key] === value;
    filters.value.push(fun);
  });

}

const filterMonters = computed(() => {
  if (!filters.value.length) {
    return monsters;
  }

  const a =  monsters
    .filter((entry) => {
      return !filters.value.find((f) => !f(entry));
    });
  return a;
})
</script>

<template>
  <h2>Monsters</h2>
  <div class=search >
    <input class="field bar" type="text" v-model="search" placeholder="e.g. difficulty:easy CR:1 type:beast" @keyup.enter="filter"/>
    <div class="button button-icon" @click="filter"><SearchSolid /></div>
  </div>
  <ul class="table" v-for="monster in filterMonters">
    <li class="cell"><Monster :monster="monster" @click="() => store.add(monster)" :difficulty="encounterStore.monsterProjectedDifficulty(monster)" /></li>
  </ul>
</template>

<style scoped>
.bar {
  width: 100%;
  margin-right: 0.3rem;
}
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

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
