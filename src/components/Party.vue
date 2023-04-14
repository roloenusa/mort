<script setup lang="ts">
import { usePartyStore } from '@/stores/party';
import { ref } from 'vue';

const store = usePartyStore()

const name = ref('');
const level = ref(1);
const error = ref('');

const randomNames = [ 'Tes', 'Joel', 'Melania', 'Godfrey', 'Bolvar', 'John'];

const addMember = () => {
  if (!name.value.length) {
    name.value = randomNames[Math.floor(Math.random() * 100) % randomNames.length];
  }

  if (level.value <= 0) {
    error.value = "Must be at least level 1"
    return;
  }
  store.add({ name: name.value, level: level.value });
  name.value = '';
  level.value = 1;
  error.value = '';
}
</script>

<template>
  <h2>Party</h2>

  <div class="form">
    <div class="form-item">
      <input type="text" v-model="name" placeholder="Member Name" />
    </div>
    <div class="form-item">
      <input type="number" min="1" max="20" v-model="level" />
    </div>
    <div class="form-item right">
      <input type="button" class="button" @click="addMember" value="Add" />
    </div>
  </div>
  <div class="error" >{{ error }}</div>

  <div v-for="member, index in store.party" class="party">
    <div class="member"><span>{{ member.name }}</span> {{ member.level }} <input type="button" value="Remove" @click="store.remove(index)"/></div>
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
