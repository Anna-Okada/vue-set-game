<template>
  <div id="deck"></div>
</template>

<script>
export default {
  name: "GameDeck",
  data() {
    return {
      deck: [],
    };
  },
  created() {
    // creates a deck of 81 unique cards
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        for (let k = 1; k < 4; k++) {
          for (let l = 1; l < 4; l++) {
            this.deck.number = i;
            this.deck.color = j;
            this.deck.shape = k;
            this.deck.shading = l;
            if (this.deck.color == 1) {
              this.deck.color = "blue";
            }
            if (this.deck.color == 2) {
              this.deck.color = "green";
            }
            if (this.deck.color == 3) {
              this.deck.color = "red";
            }
            if (this.deck.shape == 1) {
              this.deck.shape = "diamond";
            }
            if (this.deck.shape == 2) {
              this.deck.shape = "oval";
            }
            if (this.deck.shape == 3) {
              this.deck.shape = "squiggle";
            }
            if (this.deck.shading == 1) {
              this.deck.shading = "clear";
            }
            if (this.deck.shading == 2) {
              this.deck.shading = "shaded";
            }
            if (this.deck.shading == 3) {
              this.deck.shading = "solid";
            }
            this.deck.push({
              url:
                this.deck.number +
                "-" +
                this.deck.color +
                "-" +
                this.deck.shape +
                "-" +
                this.deck.shading +
                ".jpeg",
              number: this.deck.number,
              color: this.deck.color,
              shape: this.deck.shape,
              shading: this.deck.shading,
              position: -1,
              selected: false,
              matched: false, 
              revealed: false,
            });
          }
        }
      }
    }
    // fills the empty cards array in state with a full deck of cards
    for (let i = 0; i < 81; i++) {
      this.$store.commit("INITIALIZE_DECK", this.deck[i]);
    }
    // shuffles deck
    for (let i = 0; i < 81; i++) {
      this.$store.commit("SHUFFLE_DECK", this.deck);
    }
  },
};
</script>

<style>
</style>
