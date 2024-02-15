<template>
  <div id="twoPlayerGame" class="twoPlayer">
    <nav-bar></nav-bar>
    <game-stats></game-stats>
    <game-table></game-table>
    <found-sets></found-sets>
    <p2-found-sets></p2-found-sets>
    <game-over v-if="$store.state.gameOver"></game-over>
    <game-tutorial v-if="$store.state.tutorialVisible"></game-tutorial>
    <game-paused
      v-if="
        $store.state.gamePaused &&
        !$store.state.tutorialVisible &&
        !$store.state.aboutVisible
      "
    ></game-paused>
    <about-set v-if="$store.state.aboutVisible"></about-set>
  </div>
</template>

<script>
import GameTable from "./GameTable.vue";
import GameStats from "./GameStats.vue";
import FoundSets from "./FoundSets.vue";
import P2FoundSets from "./P2FoundSets.vue";
import GameOver from "./GameOver.vue";
import NavBar from "./NavBar.vue";
import GameTutorial from "./GameTutorial.vue";
import GamePaused from "./GamePaused.vue";
import AboutSet from "./AboutSet.vue";

export default {
  components: {
    "game-table": GameTable,
    "game-stats": GameStats,
    "found-sets": FoundSets,
    "p2-found-sets": P2FoundSets,
    "game-over": GameOver,
    "nav-bar": NavBar,
    "game-tutorial": GameTutorial,
    "game-paused": GamePaused,
    "about-set": AboutSet,
  },
  data() {
    return {};
  },
  methods: {
    // only allow player to activate turn via keystroke if not currently someone's turn
    keyUpToStartTurn(event) {
      if (this.$store.state.player1Turn == null) {
        this.$store.commit("START_TURN", event);
      }
    },
  },
  mounted() {
    // *** WHY DOES THIS WORK? ***
    let self = this;
    window.addEventListener("keyup", function (event) {
      self.keyUpToStartTurn(event);
    });
  },
};
</script>

<style scoped>
.twoPlayer {
  display: grid;
  grid-template-rows: min-content min-content 75vh;
  grid-template-areas:
    "nav nav nav nav"
    "stats stats stats stats"
    "p1-found-sets table table p2-found-sets";
  gap: 10px;
  padding: 10px;
}
#nav {
  grid-area: nav;
}
#stats {
  grid-area: stats;
}
#table {
  grid-area: table;
}
#found-sets {
  grid-area: p1-found-sets;
  grid-column: 1 / 2;
}
#p2FoundSets {
  grid-area: p2-found-sets;
  grid-column: 4 / 5;
}
</style>