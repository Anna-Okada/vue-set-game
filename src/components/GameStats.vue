<template>
  <div class="stats-container">
    <div
      class="single-player-stats"
      v-show="$store.state.playerMode == 'singlePlayer'"
    >
      <h2>SETs found without hint: {{ $store.state.p1UnassistedSetCount }}</h2>
      <div class="correct-incorrect">
        <h2 v-if="$store.state.lastHandWasSet == true">
          {{ $store.state.correctMessage }}
        </h2>
        <h2 v-if="$store.state.lastHandWasSet == false">
          {{ $store.state.incorrectMessage }}
        </h2>
      </div>
      <h2>Incorrect Guesses: {{ $store.state.p1IncorrectGuesses }}</h2>
    </div>
    <div
      class="two-player-stats"
      v-show="
        $store.state.playerMode == 'twoPlayer' ||
        $store.state.playerMode == 'bot'
      "
    >
      <h2
        class="p1-score"
        :class="{ active: $store.state.player1TurnVisible == true }"
      >
        {{ $store.state.player1Name }}: {{ $store.state.p1UnassistedSetCount }}
      </h2>
      <div class="middle-display">
        <div
          class="timer"
          v-show="
            ($store.state.playerMode == 'twoPlayer' &&
              $store.state.player1TurnVisible != null) ||
            ($store.state.playerMode == 'bot' &&
              $store.state.player1TurnVisible == true)
          "
        >
          <div class="timer-bar">
            <div
              id="time-remaining"
              :class="{ paused: $store.state.gamePaused }"
            ></div>
          </div>
        </div>
        <div
          class="correct-incorrect"
          v-if="$store.state.lastHandWasSet != null"
        >
          <h2 v-if="$store.state.lastHandWasSet == true">
            {{ $store.state.correctMessage }}
          </h2>
          <h2 v-if="$store.state.lastHandWasSet == false">
            {{ $store.state.incorrectMessage }}
          </h2>
        </div>
      </div>
      <h2
        class="p2-score"
        :class="{ active: $store.state.player1TurnVisible == false }"
      >
        {{ $store.state.player2Name }}: {{ $store.state.p2UnassistedSetCount }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animationInSeconds: "",
    };
  },
  computed: {
    totalSets() {
      return this.$store.state.p1FoundSets.length;
    },
  },
  mounted() {
    this.animationInSeconds = this.$store.state.turnLength / 1000 + "s";
    document.getElementById("time-remaining").style.animationDuration =
      this.animationInSeconds;
  },
};
</script>

<style scoped>
.middle-display {
  grid-area: middle;
}
.timer-bar {
  width: 100%;
  height: 30px;
  position: relative;
  background-color: white;
}
.time-remaining {
  background-color: rgb(254, 178, 0);
  width: 100%;
  height: 30px;
  position: absolute;
  animation-name: timer;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-play-state: running;
}
.time-remaining.paused {
  animation-play-state: paused;
}
@keyframes timer {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
.active {
  border: solid rgb(254, 178, 0) 2px;
  border-radius: 5px;
}
.single-player-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.two-player-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "p1 middle p2";
  align-items: center;
  gap: 20px;
}
.p1-score {
  grid-area: p1;
}
.p2-score {
  grid-area: p2;
}
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}
.stats-container {
  background: rgba(254, 178, 0, 0.215);
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
</style>