<template>
  <div class="single-player">
    <nav-bar></nav-bar>
    <game-stats></game-stats>
    <game-table></game-table>
    <game-hand></game-hand>
    <found-sets></found-sets>
    <game-over v-if="$store.state.gameOver"></game-over>
    <game-tutorial v-if="$store.state.tutorialVisible"></game-tutorial>
    <about-set v-if="$store.state.aboutVisible"></about-set>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import GameHand from "./GameHand.vue";
import GameStats from "./GameStats.vue";
import FoundSets from "./FoundSets.vue";
import GameOVer from "./GameOver.vue";
import NavBar from "./NavBar.vue";
import GameTutorial from "./GameTutorial.vue";
import AboutSet from "./AboutSet.vue";

export default {
  components: {
    "game-table": GameTable,
    "game-hand": GameHand,
    "game-stats": GameStats,
    "found-sets": FoundSets,
    "game-over": GameOVer,
    "nav-bar": NavBar,
    "game-tutorial": GameTutorial,
    "about-set": AboutSet,
  },
};
</script>

<style scoped>
.single-player {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  grid-template-rows: min-content min-content auto;
  grid-template-areas:
    "nav nav nav"
    "stats stats stats"
    "hand table found-sets";
  gap: 2px;
  height: 100%;
}
.nav-container {
  grid-area: nav;
}
.stats-container {
  grid-area: stats;
}
.hand-container {
  grid-area: hand;
}
.table-container {
  grid-area: table;
}
.found-sets-container {
  grid-area: found-sets;
}
@media screen and (max-width: 800px) {
  .single-player {
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content auto 15vh;
    grid-template-areas:
      "nav"
      "stats"
      "table"
      ".";
    gap: 2px;
    width: 100%;
    height: 100vh;
  }
  .hand-container {
    display: none;
  }
  .found-sets-container {
    display: none;
  }
}
</style>