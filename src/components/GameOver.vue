<template>
  <div class="game-over-container">
    <div class="game-over">
      <h2 class="heading">Game Over</h2>
      <div class="game-over-content">
        <div class="message">
          <h3
            v-if="
              $store.state.playerMode == 'singlePlayer' &&
              $store.state.p1UnassistedSetCount != 0
            "
          >
            {{ p1Message }}
          </h3>
          <h3 v-if="$store.state.playerMode != 'singlePlayer'">
            {{ winTieMessage }}
          </h3>
        </div>
        <h3>Game duration: {{ gameDuration }}</h3>
        <button @click="playAgain">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    p1Sets() {
      return this.$store.state.p1UnassistedSetCount;
    },
    p1Message() {
      return this.$store.state.p1UnassistedSetCount == 1
        ? "You found 1 Set!"
        : "You found " + this.$store.state.p1UnassistedSetCount + " Sets!";
    },
    winTieMessage() {
      return this.$store.state.p1UnassistedSetCount ==
        this.$store.state.p2UnassistedSetCount
        ? "It's a tie!"
        : this.$store.state.p1UnassistedSetCount >
          this.$store.state.p2UnassistedSetCount
        ? this.$store.state.player1Name + " wins!"
        : this.$store.state.player2Name + " wins!";
    },
    gameDuration() {
      let duration =
        this.$store.state.gameEndTime - this.$store.state.gameStartTime;
      let milliseconds = Math.floor((duration % 1000) / 100);
      let seconds = Math.floor((duration / 1000) % 60);
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      return (
        (hours > 0 ? hours + " hours, " : "") +
        (minutes == 1
          ? minutes + " minute and "
          : minutes > 1
          ? minutes + " minutes and "
          : "") +
        (seconds > 0 ? seconds + "." + milliseconds + " seconds" : "")
      );
    },
  },
  methods: {
    playAgain() {
      this.$store.commit("PLAY_AGAIN");
    },
  },
};
</script>

<style scoped>
h3 {
  margin-top: 0;
  margin-bottom: 20px;
}
h2.heading {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>