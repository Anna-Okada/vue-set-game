<template>
  <section class="hand-container">
    <h3 class="heading">Your hand:</h3>
    <ul class="hand-cards">
      <li
        v-for="card in $store.state.hand"
        v-bind:key="card.url"
        v-show="card.selected"
        class="card"
      >
        <img :src="require(`../assets/set-cards/${card.url}`)" />
      </li>
    </ul>
  </section>
</template>

<script scoped>
export default {
  name: "GameHand",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.hand-cards {
  display: grid;
  grid-template-columns: repeat(1, 130px);
  justify-content: center;
  width: auto;
  gap: 20px;
  padding: 0px;
  margin: 20px;
}
</style>