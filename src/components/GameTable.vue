<template>
  <section class="table-container">
    <div
      class="add-cards-container"
      v-if="$store.state.showAddCardsAlert == true"
    >
      <div class="add-cards-alert">
        <h2 v-if="$store.state.setsInTable == 1">
          There actually is a Set here! Can you find it?
        </h2>
        <h2 v-if="$store.state.setsInTable &gt; 1">
          There actually are {{ $store.state.setsInTable }} Sets here! Can you
          find one?
        </h2>
      </div>
    </div>
    <div class="no-set-container" v-if="$store.state.showNoSetsAlert == true">
      <div class="no-set-alert">
        <h2>There are no Sets in here!</h2>
      </div>
    </div>
    <div class="table-buttons">
      <button @click="shuffleCards">Shuffle</button>
      <button
        :class="{ 'add-cards-hint': $store.state.highlightAdd3Cards }"
        @click="addThreeCardsToTable"
      >
        Add 3 cards
      </button>
      <button @click="revealSet">Reveal a SET</button>
    </div>
    <div class="table-cards">
      <div
        class="card flip-card"
        v-for="card in $store.state.table"
        :key="card.url"
        :class="{
          selected: card.selected,
          revealed: card.revealed,
          flipped: $store.state.gamePaused,
        }"
        @click="selectCard(card)"
      >
        <div class="flip-card-inner">
          <div class="card-front">
            <img :src="require(`../assets/set-cards/${card.url}`)" />
          </div>
          <div class="card-back">
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
        } else if (
          this.$store.state.gamePaused == true &&
          this.$store.state.tutorialVisible == false &&
          this.$store.state.aboutVisible == false
        ) {
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
.add-cards-hint {
  animation: wiggle 5s infinite;
}

.add-cards-hint:hover {
  animation: none;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  78% {
    transform: rotate(0deg);
  }
  80% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  82% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  84% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  86% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  88% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  92% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  94% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  96% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  98% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.table-container {
  display: grid;
  grid-template-areas:
    "buttons"
    "cards";
  align-items: center;
}
.table-buttons {
  grid-area: buttons;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
.table-cards {
  grid-area: cards;
  width: auto;
  height: 37em;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-content: space-around;
}
.selected {
  border: solid rgba(254, 178, 0) 5px;
}
.revealed {
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
  /* text-align: center; */
  transition: transform 0.6s;
  transform-style: preserve-3d;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
}
.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  background-color: rgba(254, 178, 0);
  color: white;
  transform: rotateY(180deg);
}
.card {
  width: 8em;
}
</style>
