<script setup lang="ts">
import { useEnemiesStore } from '@/stores/enemies';
import { ref } from 'vue';

const store = useEnemiesStore()

</script>

<template>
  <h2>Enemies</h2>
  <div v-for="monster, index in store.enemies" class="party">
    <div class="member"><span>{{ monster.name }}</span> {{ monster.challenge_rating }} <input type="button" value="Remove" @click="store.remove(index)"/></div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

input {
  height: 2rem;
  background-color: #FFF;
  border: solid #333 1px;
  border-radius: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

input[type=number] {
  width: 5rem;
}

input.button {
  font-weight: 500;
}

.member {
  display: flex;
  flex-direction: row;
  padding: 5px 0px;
}

.member input {
  margin-left: auto;
}

.right {
  margin-left: auto;
}

.member span {
  font-weight: 700;
}
</style>
