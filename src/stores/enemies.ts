import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEnemiesStore = defineStore('enemies', () => {
  const enemies = ref<any[]>([])

  function add(enemy: any) {
    enemies.value.push(enemy);
  }

  function remove(index) {
    enemies.value.splice(index, 1);
  }

  return { enemies, add, remove }
})
