<template>
  <section id="table">
    <div id="addCards" v-if="$store.state.showAddCardsAlert == true">
      <div class="alert">
        <h2 v-if="$store.state.setsInTable == 1">
          There actually is a Set here! Can you find it?
        </h2>
        <h2 v-if="$store.state.setsInTable > 1">
          There actually are {{ $store.state.setsInTable }} Sets here! Can you
          find one?
        </h2>
      </div>
    </div>
    <div class="table-buttons">
      <button @click="shuffleCards">Shuffle</button>
      <button @click="addThreeCardsToTable">Add 3 cards</button>
      <button @click="revealSet">Reveal a SET</button>
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
  data() {
    return {
      remainingTurnTime: 0,
    };
  },
  methods: {
    selectCard(card) {
      this.remainingTurnTime =
        this.$store.state.turnLength -
        (Date.now() - this.$store.state.turnStart);
      if (
        (this.$store.state.player1Turn != null &&
          this.$store.state.playerMode != "bot" &&
          this.$store.state.hand.length < 3) ||
        (this.$store.state.playerMode == "bot" &&
          this.$store.state.player1Turn == true &&
          this.remainingTurnTime > 1000 &&
          this.$store.state.hand.length < 3)
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
#addCards {
  position: fixed;
  z-index: 1;
  padding-top: 250px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.alert {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 5px;
  width: 50%;
  text-align: center;
}
#table {
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
  display: grid;
  grid-template-areas:
    "buttons"
    "cards";
  /* grid-template-rows: 40px 350px; */
  align-items: center;
}
h1 {
  color: white;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
}
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}
.table-buttons {
  grid-area: buttons;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
button {
  font-size: 1.5em;
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
  grid-area: cards;
  width: auto;
  height: 37em;
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
  width: 8em;
  height: 10.5em;
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
  width: 8em;
  border-radius: 4px;
  overflow: hidden;
}
img {
  width: 100%;
}
</style>
