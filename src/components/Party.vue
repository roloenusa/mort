<script setup lang="ts">
import { usePartyStore } from '@/stores/party';
import { ref } from 'vue';
import TrashAlt from './icons/TrashAlt.vue';

const store = usePartyStore()

const name = ref('');
const level = ref(1);
const error = ref('');

const randomNames = [ 'Tes', 'Joel', 'Melania', 'Godfrey', 'Bolvar', 'John'];

const addMember = () => {
  if (!name.value.length) {
    name.value = randomNames[Math.floor(Math.random() * 100) % randomNames.length];
  }

  if (level.value <= 0 || level.value > 20) {
    error.value = "Must be between 1 and 20"
    return;
  }
  store.add({ name: name.value, level: level.value });
  name.value = '';
  error.value = '';
}
</script>

<template>
  <h2>Party</h2>

  <div class="form">
    <div class="form-item">
      <input type="text" class="field" v-model="name" placeholder="Member Name" />
    </div>
    <div class="form-item">
      <input type="number" class="field" min="1" max="20" v-model="level" />
    </div>
    <div class="form-item">
      <div class="button" @click="addMember">Add</div>
    </div>
  </div>

  <div class="error" >{{ error }}</div>

  <div v-for="member, index in store.party" class="party">
    <div class="member">
      <div>{{ member.name }}</div>
      <div>{{ member.level }}</div>
      <div class="button button-icon" @click="store.remove(index)"><TrashAlt /></div>
    </div>
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

input[type=text] {
  max-width: 8rem;
}

input[type=number] {
  max-width: 5rem;
}

.member {
  display: flex;
  flex-direction: row;
  padding: 5px 0px;
  justify-content: space-between;
  align-items: center;
}

.member div {
  flex: 1 1 0;
}

.button-icon {
  margin-left: auto;
}

.right {
  margin-left: auto;
}

.member span {
  font-weight: 700;
}
</style>
