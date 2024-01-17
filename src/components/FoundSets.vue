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
/* .found-sets {
    display: grid;
    grid-gap: 20px;
    justify-content: center;
    margin: 20px;
}
.found-set {
    display: grid;
    grid-template-columns: repeat(3, 30px);
    justify-content: center;
    width: auto;
    gap: 20px;
} */
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
  min-width: max-content;
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
}
.found-sets {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 180px 20px;
  justify-content: center;
}
.found-set {
  justify-items: center;
}
.card {
  position: absolute;
  height: 160px;
  left: auto;
}
.card:nth-child(1) {
  z-index: 1;
}
.card:nth-child(2) {
  z-index: 2;
  rotate: 4deg;
}
.card:nth-child(3) {
  z-index: 3;
  rotate: 8deg;
}
</style>