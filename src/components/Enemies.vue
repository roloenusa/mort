<script setup lang="ts">
import { Experience } from '@/components/data/Experience'
import { useEnemiesStore } from '@/stores/enemies';
import TrashAlt from './icons/TrashAlt.vue';

const store = useEnemiesStore()

</script>

<template>
  <h2>Enemies</h2>
  <div v-for="monster, index in store.enemies" class="party">
    <div class="enemy">
      <div>
        <div class="enemy-title">{{ monster.name }}</div>
        <div class="enemy-subtitle">{{ monster.size}}{{ monster.type }}</div>
      </div>
      <div>
        <div class="small-title"><span>CR:</span> {{ monster.challenge_rating }}</div>
        <div class="small-title"><span>XP:</span> {{ Experience[monster.challenge_rating] }}</div>
      </div>
      <div class="button button-icon" @click="store.remove(index)">
        <TrashAlt />
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 2rem;
}

.enemy {
  display: flex;
  flex-direction: row;
  padding: 5px 0px;
  justify-content: space-between;

  border: solid rgba(0, 0, 0, 0.5) 1px;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.enemy-title {
  font-weight: 700;
}

.enemy-subtitle {
  font-size: 0.3;
  color: rgba(0, 0, 0, 0.5);
}

.right {
  margin-left: auto;
}

.enemy span {
  font-weight: 700;
}

.small-title {
  font-size: 0.3;
  color: rgba(0, 0, 0, 0.5);
}

.small-title span {
  font-weight: 700;
}

.button-icon {
  border: none;
  border-left: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 0px;
  height: 80px;
  margin: -1rem;
}
</style>
