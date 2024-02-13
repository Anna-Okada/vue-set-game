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
    <game-modal></game-modal>
  </div>
</template>

<script>
import GameModal from "./GameModal.vue";

export default {
  components: {
    "game-modal": GameModal,
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