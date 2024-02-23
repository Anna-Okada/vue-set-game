<template>
  <section class="p2-found-sets-container">
    <h3 class="heading">{{ $store.state.player2Name }}'s SETs:</h3>
    <div class="found-sets-sub-container">
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
    </div>
  </section>
</template>

<script>
export default {
  name: "P2FoundSets",
};
</script>

<style scoped>
.card {
  width: 5rem;
}
</style>