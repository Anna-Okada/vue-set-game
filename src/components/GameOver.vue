<template>
  <div id="gameOver">
    <div id="menu">
      <h2>Game Over!</h2>
      <h2>{{ winner }} wins!</h2>
      <button @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    winner() {
      return this.$store.state.p1UnassistedSets >
        this.$store.state.p2UnassistedSets
        ? this.$store.state.player1Name
        : this.$store.state.player2Name;
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
#gameOver {
  position: fixed;
  z-index: 1;
  padding-top: 250px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
#menu {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 5px;
  width: 50%;
  text-align: center;
}
</style>