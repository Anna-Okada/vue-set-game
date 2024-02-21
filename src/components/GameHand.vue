<template>
  <section class="hand-container">
    <h2>Your hand:</h2>
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
h2 {
  background: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  padding: 10px;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 0px;
}
.hand-cards {
  display: grid;
  grid-template-columns: repeat(1, 130px);
  justify-content: center;
  width: auto;
  gap: 20px;
  padding: 0px;
  margin: 20px;
}
.hand-container {
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
</style>