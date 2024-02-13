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
      <game-paused v-if="$store.state.gamePaused && !$store.state.tutorialVisible && !$store.state.aboutVisible"></game-paused>
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
import GamePaused from "./GamePaused.vue";
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
    "game-paused": GamePaused,
    "about-set": AboutSet,
  },
};
</script>

<style scoped>
.singlePlayerGame {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr, 200px;
  grid-template-rows: min-content min-content 75vh;
  grid-template-areas:
    "nav nav nav nav"
    "stats stats stats stats"
    "hand table table found-sets";
  gap: 10px;
}
#nav {
  grid-area: nav;
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