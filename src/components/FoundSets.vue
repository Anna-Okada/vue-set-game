<template>
  <section class="found-sets-container">
    <h3 class="heading" v-if="$store.state.playerMode == 'singlePlayer'">
      Found SETs:
    </h3>
    <h3
      class="heading"
      v-if="
        $store.state.playerMode == 'twoPlayer' ||
        $store.state.playerMode == 'bot'
      "
    >
      {{ $store.state.player1Name }}'s SETs:
    </h3>
    <div class="found-sets-sub-container">
      <div class="found-sets">
        <span
          class="found-set"
          v-for="set in $store.state.p1FoundSets"
          :key="set.index"
        >
          <span
            class="card"
            :class="{ hint: card.foundWithHint }"
            v-for="card in set"
            :key="card.url"
          >
            <img :src="require(`../assets/set-cards/${card.url}`)" />
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FoundSets",
};
</script>

<style scoped>
.card {
  width: 5rem;
}
.card:hover {
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  transform: none;
}
</style>