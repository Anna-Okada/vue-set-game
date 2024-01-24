<template>
  <div id="mainMenu">
    <div class="backgroundCards">
      <img
        class="backgroundCard"
        v-for="card in $store.state.deck.slice(0, 60)"
        :key="card.url"
        :src="require(`../assets/set-cards/${card.url}`)"
      />
    </div>
    <game-tutorial
      v-if="$store.state.tutorialComplete == false"
    ></game-tutorial>
    <game-modal v-else></game-modal>
  </div>
</template>

<script>
import GameModal from "./GameModal.vue";
import GameTutorial from "./GameTutorial.vue";

export default {
  components: {
    "game-modal": GameModal,
    "game-tutorial": GameTutorial,
  },
};
</script>

<style scoped>
.backgroundCards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.backgroundCard {
  width: 97%;
}
</style>