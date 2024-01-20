<template>
  <div id="stats" class="stats">
    <div
      class="singlePlayerStats"
      v-show="$store.state.singlePlayerMode != false"
    >
      <h2>SETs found without hint: {{ $store.state.p1UnassistedSetCount }}</h2>
      <h2>Incorrect guesses: {{ $store.state.p1IncorrectGuesses }}</h2>
      <h2>Total SETs found: {{ totalSets }}</h2>
    </div>
    <div class="twoPlayerStats" v-show="$store.state.singlePlayerMode == false">
      <h2
        :class="{ activeTurn: $store.state.player1Turn == true }"
        id="p1score"
      >
        {{ $store.state.player1Name }}: {{ $store.state.p1UnassistedSetCount }}
      </h2>
      <div class="timer">
        <div class="timerBar" v-if="$store.state.player1Turn != null">
          <div class="timeRemaining"></div>
        </div>
      </div>
      <h2
        :class="{ activeTurn: $store.state.player1Turn == false }"
        id="p2score"
      >
        {{ $store.state.player2Name }}: {{ $store.state.p2UnassistedSetCount }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalSets() {
      return this.$store.state.p1FoundSets.length;
    },
  },
  data() {
    return {};
  },
  methods: {
    keyUpToStartTurn(event) {
      this.$store.commit("START_TURN", event);
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
.timer {
  grid-area: timer;
}
.timerBar {
  width: 100%;
  height: 30px;
  position: relative;
  background-color: white;
}
.timeRemaining {
  background-color: rgb(254, 178, 0);
  width: 100%;
  height: 30px;
  position: absolute;
  animation-name: timer;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes timer {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
.activeTurn {
  border: solid rgb(254, 178, 0) 2px;
  border-radius: 5px;
}
.singlePlayerStats {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
.twoPlayerStats {
  display: grid;
  grid-template-areas: "p1 timer p2";
  align-items: center;
  gap: 20px;
}
#p1Score {
  grid-area: p1;
}
#p2Score {
  grid-area: p2;
}
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}
#stats {
  background: rgba(254, 178, 0, 0.215);
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
</style>