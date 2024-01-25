<template>
  <div id="deck"></div>
</template>

<script>
export default {
  name: "GameDeck",
  created() {
    this.$store.commit("CREATE_DECK");
    this.$store.commit("SHUFFLE_DECK");
  },
};
</script>

<style>
</style>
