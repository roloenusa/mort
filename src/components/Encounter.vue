<script setup lang="ts">
import { usePartyStore } from '@/stores/party';
import { useEnemiesStore } from '@/stores/enemies';
import { computed } from 'vue';
import { Difficulties } from './data/Difficulties'
import { Experience } from './data/Experience'

function getDifficulty(level, rating) {
  return Difficulties[level][rating];
};

function difficultyMultiplier(monsterCount) {
  if (monsterCount == 1)
    return 1;
  if (monsterCount == 2)
    return 1.5;
  if (monsterCount <= 6)
    return 2;
  if (monsterCount <= 10)
    return 2.5;
  if (monsterCount <= 14)
    return 3;
  return 4
};

function calculateXPThresholds(players) {
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Deadly'];
  const xpThreshold = {};
  difficultyLevels.map((level) => {
    xpThreshold[level] = 0;
    players.map((player) => {
      xpThreshold[level] += getDifficulty(player.level, level);
    })
  });
  return xpThreshold;
}

function calculateAdjustedXp(monsters) {
  let adjustedXp = 0;
  monsters.map((monster) => {
    const cr = monster.challenge_rating;
    adjustedXp += Experience[cr];
  });

  adjustedXp *= difficultyMultiplier(monsters.length)
  return adjustedXp;
}

function getDifficultyRating(xpThreshold, adjustedXp) {
  if (adjustedXp < xpThreshold['Easy'])
    return 'Trivial';
  else if (adjustedXp < xpThreshold['Medium']) {
    return 'Easy';
  } else if (adjustedXp < xpThreshold['Hard']) {
    return 'Medium';
  } else if (adjustedXp < xpThreshold['Deadly']) {
    return 'Hard';
  }

  return 'Deadly';
}

const partyStore = usePartyStore();
const enemyStore = useEnemiesStore();

const xpThreshold = computed(() => {
  return calculateXPThresholds(partyStore.party);
});

const currentXp = computed(() => {
  return enemyStore.enemies.reduce((acc, monster) => {
    return acc += Experience[monster.challenge_rating]
  }, 0)
});

const adjustedXp = computed(() => {
  const xp = enemyStore.enemies.reduce((acc, monster) => {
    return acc += Experience[monster.challenge_rating];
  }, 0);
  return xp * difficultyMultiplier(enemyStore.enemies.length)
});

const difficulty = computed(() => {
  return getDifficultyRating(xpThreshold.value, adjustedXp.value);
});

</script>

<template>
  <div><span>Threshold:</span> {{ xpThreshold }}</div>
  <div><span>Difficulty:</span> {{ difficulty }}</div>
  <div><span>XP:</span> {{ currentXp }}</div>
  <div><span>Adjusted XP:</span> {{ adjustedXp }}</div>

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
  color: rbga(0, 0, 0, 0.5);
}

.category {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
</style>
