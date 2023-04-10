<script setup lang="ts">
import { usePartyStore } from '@/stores/party';
import { ref } from 'vue';

const store = usePartyStore()

const name = ref('');
const level = ref(1);
const error = ref('');

const addMember = () => {
  if (!name.value.length) {
    error.value = "Must have a name"
    return;
  }

  if (level.value <= 0) {
    error.value = "Must be at least level 1"
    return;
  }
  store.add({ name: name.value, level: level.value });
  name.value = '';
  level.value = 1;
}
</script>

<template>
  <div class="error" >{{ error }}</div>
  <div class="form">
    <div class="form-item">
      <label>Name</label>
      <input type="text" v-model="name" placeholder="Member Name" />
    </div>
    <div class="form-item">
      <label>Level</label>
      <input type="number" v-model="level" />
    </div>
    <input type="button" @click="addMember" value="Add">
  </div>

  <div v-for="member, index in store.party">
    <div class="member"><span>{{ member.name }}</span> {{ member.level }} <input type="button" value="X" @click="store.remove(index)"/></div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.8rem;
}
.form {
  display: flex;
  flex-direction: row;
}

.form div {
  padding-right: 1rem;
}

.member span {
  font-weight: 700;
}
</style>
