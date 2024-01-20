<template>
  <section id="table">
    <div class="table-buttons">
      <button @click="shuffleCards">Shuffle</button>
      <button @click="addThreeCardsToTable">Add 3 cards</button>
      <button @click="checkIfSet">Check if SET</button>
      <button @click="findSets" v-if="$store.state.singlePlayerMode != false">
        Hint
      </button>
      <button @click="revealSet" v-if="$store.state.singlePlayerMode != false">
        Reveal a SET
      </button>
    </div>
    <div class="table-cards">
      <span
        class="card"
        v-for="card in $store.state.table"
        :key="card.url"
        :class="{ cardSelected: card.selected, cardRevealed: card.revealed }"
        @click="selectCard(card)"
      >
        <img :src="require(`../assets/set-cards/${card.url}`)" />
      </span>
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
      if (this.$store.state.player1Turn != null) {
        this.$store.commit("SELECT_CARD", card);
      }
    },
    shuffleCards() {
      this.$store.commit("SHUFFLE_TABLE");
    },
    addThreeCardsToTable() {
      this.$store.commit("ADD_THREE_CARDS_TO_TABLE");
    },
    // *** how can we merge the following two methods? ***
    spacebarToCheckIfSet(event) {
      if (event.key == " ") {
        if (this.$store.state.hand.length == 3) {
          this.$store.commit("CHECK_IF_SET");
          this.$store.commit("AFTER_CHECK_IF_SET");
          this.$store.commit("REFRESH_TABLE");
        } else {
          alert("You must first select 3 cards!");
        }
      }
    },
    checkIfSet() {
      if (this.$store.state.hand.length == 3) {
        this.$store.commit("CHECK_IF_SET");
        this.$store.commit("AFTER_CHECK_IF_SET");
        this.$store.commit("REFRESH_TABLE");
      } else {
        alert("You must first select 3 cards!");
      }
    },
    findSets() {
      this.$store.commit("FIND_SETS");
    },
    revealSet() {
      this.$store.commit("REVEAL_A_SET");
    },
  },
  mounted() {
    let self = this;
    window.addEventListener("keyup", function (event) {
      self.spacebarToCheckIfSet(event);
    });
  },
};
</script>

<style scoped>
#table {
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
.table-buttons {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
/*
button {
  color: rgb(254, 178, 0);
    margin: 20px;
    border-radius: 10px;
} */
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
.table-cards {
  /* display: grid;
  grid-template-columns: repeat(4, 130px);
  grid-template-rows: repeat(3, auto);
  grid-gap: 20px;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 20px; */
  width: auto;
  height: 600px;
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
</style>
