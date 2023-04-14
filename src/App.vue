<script setup lang="ts">
import Encounter from './components/Encounter.vue';
import Enemies from './components/Enemies.vue';
import Monsters from './components/Monsters.vue';
import Party from './components/Party.vue';
</script>

<template>
  <div class="content">
    <div class="sticky">
        <div class="encounter">
        <Encounter />
      </div>
    </div>

    <div class="party">
      <div>
        <Party />
      </div>
    </div>
    <div class="table">
      <Monsters />
    </div>
    <div class="enemies">
      <Enemies />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr auto;

  grid-template-areas:
    "sticky sticky sticky"
    "party table enemies";
}

.sticky {
  grid-area: sticky;
  position: sticky;
  top: 0;
  background-color: #FFF;


  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  -webkit-box-shadow: 0px 5px 25px -5px rgba(0,0,0,1);
  -moz-box-shadow: 0px 5px 25px -5px rgba(0,0,0,1);
  box-shadow: 0px 5px 25px -5px rgba(0,0,0,1);
}

.encounter {
  grid-column: 2 / span 1;
}

.party {
  grid-area: party;
  padding: 2rem;
}

.table {
  grid-area: table;
  padding: 2rem;

  background-color: #f3f1f1;
}

.enemies {
  grid-area: enemies;
  padding-left: 2rem;
  padding: 2rem;
}
</style>
