<template>
  <section id="found-sets">
    <h2 v-if="$store.state.playerMode == 'singlePlayer'">Found SETs:</h2>
    <h2
      v-if="
        $store.state.playerMode == 'twoPlayer' ||
        $store.state.playerMode == 'bot'
      "
    >
      {{ $store.state.player1Name }}'s SETs:
    </h2>
    <div class="found-sets">
      <span
        class="found-set"
        v-for="set in $store.state.p1FoundSets"
        :key="set.index"
      >
        <span
          class="card"
          :class="{ cardFoundWithHint: card.foundWithHint }"
          v-for="card in set"
          :key="card.url"
        >
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
.card:hover {
  transition: none;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  transform: none;
}
.cardFoundWithHint {
  opacity: 0.5;
}
</style>