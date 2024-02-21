<template>
  <section class="p2-found-sets-container">
    <h2>{{ $store.state.player2Name }}'s SETs:</h2>
    <div class="found-sets">
      <span
        class="found-set"
        v-for="set in $store.state.p2FoundSets"
        :key="set.index"
      >
        <span class="card" v-for="card in set" :key="card.url">
          <img :src="require(`../assets/set-cards/${card.url}`)" />
        </span>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: "P2FoundSets",
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
.p2-found-sets-container {
  overflow-y: scroll;
  scrollbar-width: none;
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
.found-sets {
  display: grid;
  justify-content: center;
}
.found-set {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10px;
  gap: 10px;
}
.card {
  width: 5rem;
}
</style>