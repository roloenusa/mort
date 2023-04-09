import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Member = {
  level: number;
  name: string;
}

export const usePartyStore = defineStore('party', () => {
  const party = ref<Member[]>([])

  function add(member: Member) {
    party.value.push(member);
  }

  function remove(index) {
    party.value.splice(index, 1);
  }

  return { party, add, remove }
})
