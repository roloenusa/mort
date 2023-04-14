import { computed } from 'vue'
import { defineStore } from 'pinia'
import { Difficulties } from '@/components/data/Difficulties'
import { Experience } from '@/components/data/Experience'
import { usePartyStore } from '@/stores/party';
import { useEnemiesStore } from '@/stores/enemies';

export const useEncounterStore = defineStore('encounter', () => {

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
    difficultyLevels.forEach((level) => {
      xpThreshold[level] = 0;
      players.forEach((player) => {
        xpThreshold[level] += Difficulties[player.level][level];
      })
    });
    return xpThreshold;
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

  function calculateXp(enemies) {
    return enemies.reduce((acc, monster) => {
      return acc += Experience[monster.challenge_rating]
    }, 0)
  }

  const partyStore = usePartyStore();
  const enemyStore = useEnemiesStore();

  const xpThreshold = computed(() => {
    return calculateXPThresholds(partyStore.party);
  });

  const currentXp = computed(() => {
    return calculateXp(enemyStore.enemies);
  });

  const multiplier = computed(() => {
    return difficultyMultiplier(enemyStore.enemies.length);
  })

  const adjustedXp = computed(() => {
    return currentXp.value * multiplier.value
  });

  const difficulty = computed(() => {
    return getDifficultyRating(xpThreshold.value, adjustedXp.value);
  });

  const monsterProjectedDifficulty = (monster) => {
    const additionalXp = (currentXp.value + Experience[monster.challenge_rating])
    const additionalAdjustedXp = additionalXp * difficultyMultiplier(enemyStore.enemies.length + 1);
    return getDifficultyRating(xpThreshold.value, additionalAdjustedXp);
  };

  return { xpThreshold, currentXp, adjustedXp, difficulty, monsterProjectedDifficulty, multiplier }
})
