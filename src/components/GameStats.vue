<template>
  <div id="stats" class="stats">
    <div
      class="singlePlayerStats"
      v-show="$store.state.playerMode == 'singlePlayer'"
    >
      <h2>SETs found without hint: {{ $store.state.p1UnassistedSetCount }}</h2>
      <div class="correctIncorrect">
        <h2 v-if="$store.state.lastHandWasSet == true">{{ correctMessage }}</h2>
        <h2 v-if="$store.state.lastHandWasSet == false">
          {{ incorrectMessage }}
        </h2>
      </div>
      <h2>Total SETs found: {{ totalSets }}</h2>
    </div>
    <div
      class="twoPlayerStats"
      v-show="
        $store.state.playerMode == 'twoPlayer' ||
        $store.state.playerMode == 'bot'
      "
    >
      <h2
        :class="{ activeTurn: $store.state.player1TurnVisible == true }"
        id="p1score"
      >
        {{ $store.state.player1Name }}: {{ $store.state.p1UnassistedSetCount }}
      </h2>
      <div class="middleDisplay">
        <div
          class="timer"
          v-show="
            ($store.state.playerMode == 'twoPlayer' &&
              $store.state.player1TurnVisible != null) ||
            ($store.state.playerMode == 'bot' &&
              $store.state.player1TurnVisible == true)
          "
        >
          <div class="timerBar">
            <div
              id="timeRemaining"
              :class="{ paused: $store.state.gamePaused }"
            ></div>
          </div>
        </div>
        <div
          class="correctIncorrect"
          v-if="$store.state.lastHandWasSet != null"
        >
          <h2 v-if="$store.state.lastHandWasSet == true">
            {{ correctMessage }}
          </h2>
          <h2 v-if="$store.state.lastHandWasSet == false">
            {{ incorrectMessage }}
          </h2>
        </div>
      </div>
      <h2
        :class="{ activeTurn: $store.state.player1TurnVisible == false }"
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
    correctMessage() {
      let i = Math.floor(Math.random() * this.correctMessages.length);
      return this.correctMessages[i];
    },
    incorrectMessage() {
      let i = Math.floor(Math.random() * this.incorrectMessages.length);
      return this.incorrectMessages[i];
    },
  },
  data() {
    return {
      animationInSeconds: "",
      correctMessages: [
        "You found a Set!",
        "Nice Set!",
        "Awesome!",
        "Great Set!",
        "Woohoo!",
      ],
      incorrectMessages: [
        "Not a Set. Try again!",
        "Not quite!",
        "Almost. Try again!",
        "So close!",
      ],
    };
  },
  mounted() {
    this.animationInSeconds = this.$store.state.turnLength / 1000 - 1 + "s";
    document.getElementById("timeRemaining").style.animationDuration =
      this.animationInSeconds;
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
#timeRemaining {
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
#timeRemaining.paused {
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
.activeTurn {
  border: solid rgb(254, 178, 0) 2px;
  border-radius: 5px;
}
.singlePlayerStats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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