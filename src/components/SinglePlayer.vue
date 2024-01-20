<template>
  <div id="singlePlayer">
    <section class="singlePlayerGame">
      <game-stats></game-stats>
      <game-table></game-table>
      <game-hand></game-hand>
      <found-sets></found-sets>
    </section>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import GameHand from "./GameHand.vue";
import GameStats from "./GameStats.vue";
import FoundSets from "./FoundSets.vue";

export default {
  components: {
    "game-table": GameTable,
    "game-hand": GameHand,
    "game-stats": GameStats,
    "found-sets": FoundSets,
  },
};
</script>

<style scoped>
.singlePlayerGame {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr, 1fr;
  grid-template-rows: 10vh 83vh;
  grid-template-areas:
    "stats stats stats stats"
    "hand table table found-sets";
  gap: 10px;
  padding: 10px;
}
#stats {
  grid-area: stats;
}

#hand {
  grid-area: hand;
}

#table {
  grid-area: table;
}

#found-sets {
  grid-area: found-sets;
}
</style>