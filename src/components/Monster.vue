<script setup lang="ts">
defineProps<{
  monster: {
    name: String,
    size: String,
    challenge_rating: String,
    type: string;
    subtype: string;
    alignment: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
  },
  difficulty?: string;
}>();

</script>

<template>
  <div class="monster">
    <div class="monster-title">
      <span class="monster-name">{{ monster.name }} <span class="size">{{ monster.size }}</span></span>
      <span class="challenge-rating">{{ monster.challenge_rating }}</span>
      <span :class="`text-${difficulty}`" class="difficulty" v-if="difficulty">{{ difficulty }}</span>
    </div>
    <div class="category">
      <div>{{ monster.type }}</div>
      <div>{{ monster.subtype }}</div>
      <div>{{ monster.alignment }}</div>
    </div>
    <div class="stats">
      <div><span class="stats-label">str</span>{{ monster.strength }}</div>
      <div><span class="stats-label">dex</span>{{ monster.dexterity }}</div>
      <div><span class="stats-label">cons</span>{{ monster.constitution }}</div>
      <div><span class="stats-label">int</span>{{ monster.intelligence }}</div>
      <div><span class="stats-label">wis</span>{{ monster.wisdom }}</div>
      <div><span class="stats-label">cha</span>{{ monster.charisma }}</div>
    </div>
  </div>
</template>

<style scoped>

.monster-title {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
}

.size {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
}

.monster-name {
  font-weight: 800;
  font-size: 1.3rem;
  top: -10px;
  margin-bottom: 0;
}

.challenge-rating {
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.5);
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

.difficulty {
  font-weight: 700;
  text-transform: uppercase;
  margin-left: auto;
}
</style>
