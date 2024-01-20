<template>
  <section id="found-sets">
    <h2 v-if="$store.state.singlePlayerMode != false">Found SETs:</h2>
    <h2 v-if="$store.state.singlePlayerMode == false">
      {{ $store.state.player1Name }}'s SETs:
    </h2>
    <div class="found-sets">
      <span
        class="found-set"
        v-for="set in $store.state.p1FoundSets"
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
  name: "FoundSets",
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#found-sets {
  overflow-x: scroll;
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