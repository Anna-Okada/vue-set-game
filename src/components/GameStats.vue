<template>
  <div id="stats" class="stats">
    <div
      class="singlePlayerStats"
      v-show="$store.state.singlePlayerMode != false"
    >
      <h2>SETs found without hint: {{ unassistedSets }}</h2>
      <h2>Incorrect guesses: {{ incorrectGuesses }}</h2>
      <h2>Total SETs found: {{ totalSets }}</h2>
    </div>
    <div class="twoPlayerStats" v-show="$store.state.singlePlayerMode == false">
      <h2 :class="{ activeTurn: $store.state.player1Turn == true }">
        {{ $store.state.player1Name }}: {{ player1Score }}
      </h2>
      <h2 :class="{ activeTurn: $store.state.player1Turn == false }">
        {{ $store.state.player2Name }}: {{ player2Score }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    unassistedSets() {
      return this.$store.state.unassistedSetCount;
    },
    incorrectGuesses() {
      return this.$store.state.player1IncorrectGuesses;
    },
    totalSets() {
      return this.$store.state.p1FoundSets.length;
    },
    player1Score() {
      return (
        this.$store.state.player1UnassistedSetCount -
        this.$store.state.player1IncorrectGuesses
      );
    },
    player2Score() {
      return (
        this.$store.state.player2UnassistedSetCount -
        this.$store.state.player2IncorrectGuesses
      );
    },
  },
};
</script>

<style scoped>
.activeTurn {
  border: solid orange 2px;
}
.singlePlayerStats {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
.twoPlayerStats {
  display: grid;
  grid-template-columns: repeat(2, auto);
}
.singlePlayerStats > h2,
.twoPlayerStats > h2 {
  color: rgb(254, 178, 0);
  padding: 10px;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  border-radius: 10px;
}
#stats {
  background: rgba(254, 178, 0, 0.215);
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
</style>