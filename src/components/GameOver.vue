<template>
  <div class="game-over-container">
    <div class="game-over">
      <h2 class="heading">Game Over</h2>
      <h3 v-if="$store.state.playerMode == 'singlePlayer'">
        {{ p1Message }}
      </h3>
      <h3 v-if="$store.state.playerMode != 'singlePlayer'">
        {{ winTieMessage }}
      </h3>
      <h3>Game duration: {{ gameDuration }}</h3>
      <button @click="playAgain">Play Again</button>
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
      return this.$store.state.p1UnassistedSetCount == 0
        ? ""
        : this.$store.state.p1UnassistedSetCount == 1
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
.game-over-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: #fefefe;
  margin: auto;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 10px;
  width: 600px;
  text-align: center;
}
h2.heading {
  background: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  padding: 10px;
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
}
h3 {
  color: rgb(254, 178, 0);
  font-size: 1.5em;
  text-transform: uppercase;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}
button {
  font-size: 1.5em;
  text-transform: uppercase;
  text-align: center;
  color: rgb(254, 178, 0);
  background: rgba(254, 178, 0, 0.215);
  border: none;
  border-radius: 5px;
  margin: 20px;
}
button:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
</style>