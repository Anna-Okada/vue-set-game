<template>
  <section id="table">
    <div class="table-buttons">
      <button @click="shuffleCards">Shuffle</button>
      <button @click="addThreeCardsToTable">Add 3 cards</button>
      <button @click="checkIfSet">Check if SET</button>
      <button @click="findSets">Hint</button>
      <button @click="revealSet">Reveal a SET</button>
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
      this.$store.commit("SELECT_CARD", card);
    },
    shuffleCards() {
      this.$store.commit("SHUFFLE_TABLE");
    },
    addThreeCardsToTable() {
      this.$store.commit("ADD_THREE_CARDS_TO_TABLE");
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
  margin: 20px;
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
  display: grid;
  grid-template-columns: repeat(4, 130px);
  grid-template-rows: repeat(3, auto);
  grid-gap: 20px;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 20px;
}
.cardSelected {
  border: solid rgba(254, 178, 0) 5px;
}

.cardRevealed {
  border: dashed rgb(0, 97, 254) 5px;
}
</style>
