<script setup lang="ts">
import { useEncounterStore } from '@/stores/encounter';
import { computed } from 'vue';

const store = useEncounterStore();

const percent = computed(() => {
  const result =  store.xpThreshold['Deadly'] ? (100 * store.adjustedXp / store.xpThreshold['Deadly']) : 0;
  return `${result}%`;
});

const compPercent = (threshold) => {
  const result =  (100 * threshold / store.xpThreshold['Deadly']);
  return `${result}%`;
};


</script>

<template>
  <div class="encounter">
    <div class="card flex-basis">
      <div class="title">{{ store.currentXp }}</div>
      <div class="caption">XP</div>
    </div>

    <div class="card flex-basis">
        <div class="title">{{ store.adjustedXp }} (X{{ store.multiplier }})</div>
      <div class="caption">Adjusted XP</div>
    </div>

    <div class="card flex-basis">
      <div class="title" :class="`text-${store.difficulty}`">{{ store.difficulty }}</div>
      <div class="caption">Difficulty</div>
    </div>

    <div class="thresholds flex-basis">
      <ul>
        <li><div class="threshold-difficulty">Easy</div><div>{{ store.xpThreshold['Easy']}}</div></li>
        <li><div class="threshold-difficulty">Medium</div><div>{{ store.xpThreshold['Medium']}}</div></li>
        <li><div class="threshold-difficulty">Hard</div><div>{{ store.xpThreshold['Hard']}}</div></li>
        <li><div class="threshold-difficulty">Deadly</div><div>{{ store.xpThreshold['Deadly']}}</div></li>
      </ul>
    </div>
  </div>

  <div class="bar">
    <div class="fill" :class="store.difficulty" :style="{width: percent}"></div>
    <div class="spark" :style="{ left: compPercent(store.xpThreshold['Easy'])}">{{ store.xpThreshold['Easy'] }}</div>
    <div class="spark" :style="{ left: compPercent(store.xpThreshold['Medium'])}">{{ store.xpThreshold['Medium'] }}</div>
    <div class="spark" :style="{ left: compPercent(store.xpThreshold['Hard'])}">{{ store.xpThreshold['Hard'] }}</div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: 700;
  font-size: 1.5rem;
  top: -10px;
  margin-bottom: 0;
}

.challenge-rating {
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.7);
}

.category {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between
}

.stats-label {
  text-transform: uppercase;
  font-weight: 700;
}

.encounter {
  display: flex;
  flex-direction: row;
  flex-basis: 0;
  justify-content: space-between;
  flex: 1 1 0px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin:  2rem 0rem;
}

.title {
  font-size: 2rem;
}

.caption {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
}

.icon svg {
  width: 4rem;
  height: 5rem;
}

.bar {
  width: 100%;
  border: solid rgba(0, 0, 0, 0.2) 1px;
  height: .5rem;
  position: relative;
}

.fill {
  height: 90%;
}

.spark {
  position: absolute;
  bottom: 4px;
  width: 1px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
}

.spark:after {
  content: '';
  position: absolute;
  bottom: -4px;
  right: 0;
  width: 1px;
  height: 10px;
  background-color: black;
}

.thresholds {
  margin:  2rem 0rem;
  display: flex;
  flex-direction: column;
}

.thresholds ul {
  padding: 0;
}

.thresholds ul li {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.threshold-difficulty {
  text-transform: uppercase;
  font-weight: 800;
}

.flex-basis {
  flex-basis: 0;
  flex: 1 1 0px;
  width: 0;
}
</style>
