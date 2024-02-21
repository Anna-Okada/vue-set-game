<template>
  <div id="singlePlayer">
    <section class="singlePlayerGame">
      <nav-bar></nav-bar>
      <game-stats></game-stats>
      <game-table></game-table>
      <game-hand></game-hand>
      <found-sets></found-sets>
      <game-over v-if="$store.state.gameOver"></game-over>
      <game-tutorial v-if="$store.state.tutorialVisible"></game-tutorial>
      <about-set v-if="$store.state.aboutVisible"></about-set>
    </section>
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
.singlePlayerGame {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 0.8fr;
  grid-template-rows: auto auto 80vh;
  grid-template-areas:
    "nav nav nav nav"
    "stats stats stats stats"
    "hand table table found-sets";
  gap: 7px;
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
</style>