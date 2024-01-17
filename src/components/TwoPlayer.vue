<template>
  <div id="twoPlayerGame" class="twoPlayer">
      <game-stats></game-stats>
      <game-table></game-table>
      <found-sets></found-sets>
      <p2-found-sets></p2-found-sets>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import GameStats from "./GameStats.vue";
import FoundSets from "./FoundSets.vue";
import P2FoundSets from "./P2FoundSets.vue";

export default {
  components: {
    "game-table": GameTable,
    "game-stats": GameStats,
    "found-sets": FoundSets,
    "p2-found-sets": P2FoundSets,
  },
};
</script>

<style scoped>
.twoPlayer {
    display: grid;
    grid-template-columns: 1fr, 1fr, 1fr, 1fr;
    grid-template-rows: 12vh 88vh;
    grid-template-areas:
        'stats stats stats stats'
        'p1-found-sets table table p2-found-sets';
    gap: 10px;
    padding: 10px;
}
#stats {
    grid-area: stats;
}
#table {
    grid-area: table;
}
#found-sets {
    grid-area: p1-found-sets;
}
#p2FoundSets {
    grid-area: p2-found-sets;
}
</style>