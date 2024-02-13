<template>
  <section id="table">
    <div class="table-buttons">
      <button @click="shuffleCards">Shuffle</button>
      <button @click="addThreeCardsToTable">Add 3 cards</button>
      <button @click="revealSet" v-if="$store.state.playerMode != 'twoPlayer'">
        Reveal a SET
      </button>
    </div>
    <div class="table">
      <div
        class="card flip-card"
        v-for="card in $store.state.table"
        :key="card.url"
        :class="{
          cardSelected: card.selected,
          cardRevealed: card.revealed,
          flipped: $store.state.gamePaused,
        }"
        @click="selectCard(card)"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img :src="require(`../assets/set-cards/${card.url}`)" />
          </div>
          <div class="flip-card-back">
            <h1>S E T</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.$store.commit("DEAL_TO_TABLE");
  },
  methods: {
    selectCard(card) {
      // for testing purposes:
      this.$store.state.remainingTurnTime =
        this.$store.state.turnLength -
        (Date.now() - this.$store.state.turnStart);
      if (
        (this.$store.state.player1Turn != null &&
          this.$store.state.playerMode != "bot") ||
        (this.$store.state.playerMode == "bot" &&
          this.$store.state.player1Turn == true &&
          this.$store.state.remainingTurnTime > 1000) // for testing purposes
      ) {
        this.$store.commit("SELECT_CARD", card);
      }
    },
    shuffleCards() {
      this.$store.commit("SHUFFLE_TABLE");
    },
    addThreeCardsToTable() {
      this.$store.commit("ADD_THREE_CARDS_TO_TABLE");
    },
    pauseResumeGame(event) {
      if (event.key == " ") {
        if (this.$store.state.gamePaused == false) {
          this.$store.commit("PAUSE_GAME");
        } else if (this.$store.state.gamePaused == true) {
          this.$store.commit("RESUME_GAME");
        }
      }
    },
    revealSet() {
      this.$store.commit("REVEAL_A_SET");
    },
  },
  mounted() {
    let self = this;
    window.addEventListener("keyup", function (event) {
      self.pauseResumeGame(event);
    });
  },
};
</script>

<style scoped>
#table {
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
h1 {
  color: white;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
}
.table-buttons {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
button {
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: rgb(254, 178, 0);
  background: rgba(254, 178, 0, 0.215);
  border: none;
  border-radius: 5px;
}
button:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
.table {
  width: auto;
  height: 525px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-content: space-around;
}
.cardSelected {
  border: solid rgba(254, 178, 0) 5px;
}
.cardRevealed {
  border: dashed rgb(0, 97, 254) 5px;
}

.flip-card {
  background-color: transparent;
  width: 100px;
  height: 120px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: rgba(254, 178, 0);
  color: white;
  transform: rotateY(180deg);
}
.card {
  display: flex;
  justify-content: center;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  width: 100px;
  border-radius: 4px;
  overflow: hidden;
}
img {
  width: 100%;
}
</style>
