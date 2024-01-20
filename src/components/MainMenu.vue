<template>
  <div id="mainMenu">
    <game-tutorial v-if="$store.state.tutorialComplete == false"></game-tutorial>
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
</style>