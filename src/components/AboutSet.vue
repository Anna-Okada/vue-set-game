<template>
  <div class="about-container">
    <div class="about" @focusout="resume" tabindex="-1" ref="modal">
      <h2 class="heading">Set Facts!</h2>
      <div class="about-content">
        <p>
          Set was invented in 1974 by Marsha Jean Falco, who was studying
          genetic patterns of epilepsy in German Shepherds.
        </p>
        <p>108 unique Sets can be formed from the 81 cards in a deck.</p>
        <p>
          Given two cards, one -- and only one -- other card can complete the
          Set.
        </p>
        <p class="githubLink">
          This website was designed by Anna Okada and is open source on
          <a href="https://github.com/Anna-Okada/vue-set-game" target="_blank"
            >Github</a
          >.
        </p>
        <button @click="resume">Resume Game</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.modal.focus();
  },
  methods: {
    resume() {
      this.$store.commit("RESUME_GAME");
    },
  },
};
</script>

<style scoped>
p .heading {
  color: grey;
  font-size: 18px;
  text-align: center;
}
p:first-child {
  margin-top: 0;
}
.githubLink {
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 18px;
}
a:link {
  color: rgb(254, 178, 0);
  text-decoration: none;
}
a:visited {
  color: rgb(254, 178, 0);
}
a:hover {
  color: rgb(0, 97, 254);
}
a:active {
  color: rgb(0, 97, 254);
}
h2.heading {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>