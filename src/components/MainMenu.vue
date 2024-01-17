<template>
  <div id="mainMenu">
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
</style>