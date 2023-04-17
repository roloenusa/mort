<script setup lang="ts">

defineProps<{
  monster: {
    name: String,
    size: String,
    challenge_rating: String,
    type: string;
    subtype: string;
    alignment: string;
    armor_class: string;
  },
  difficulty?: string;
}>();

</script>

<template>
  <div class="banner">
    <div class="monster">
      <div class="monster-title">
        <span class="monster-name">{{ monster.name }} <span class="size">{{ monster.size }}</span></span>
        <span class="challenge-rating">{{ monster.challenge_rating }}</span>
        <span :class="`text-${difficulty}`" class="difficulty" v-if="difficulty">{{ difficulty }}</span>
      </div>
      <div class="category">
        <div>{{ monster.type }} <span v-if="monster.subtype">| {{ monster.subtype }}</span></div>
        <div style="margin-left: auto">{{ monster.alignment }}</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.banner {
  display: flex;
  flex-direction: row;
}

.monster {
  flex-grow: 1;
}

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

.armor-class {
  font-size: 1.3rem;
}
.armor-class span {
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  margin-left: auto;
}

.difficulty {
  font-weight: 700;
  text-transform: uppercase;
  margin-left: auto;
}
</style>
