<template>
  <div class="two-player">
    <nav-bar></nav-bar>
    <game-stats></game-stats>
    <game-table></game-table>
    <found-sets></found-sets>
    <p2-found-sets></p2-found-sets>
    <game-over v-if="$store.state.gameOver"></game-over>
    <game-tutorial v-if="$store.state.tutorialVisible"></game-tutorial>
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
.two-player {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  grid-template-areas:
    "nav nav nav"
    "stats stats stats"
    "p1-found-sets table p2-found-sets";
  gap: 2px;
}
.nav-container {
  grid-area: nav;
}
.stats-container {
  grid-area: stats;
}
.table-container {
  grid-area: table;
}
.found-sets-container {
  grid-area: p1-found-sets;
  grid-column: 1 / 2;
}
.p2-found-sets-container {
  grid-area: p2-found-sets;
  grid-column: 3 / 4;
}

@media screen and (max-width: 770px) {
  .two-player {
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
  .found-sets-container {
    display: none;
  }
  .p2-found-sets-container {
    display: none;
  }
}
</style>