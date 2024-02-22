<template>
  <div class="about-container">
    <div class="about" @focusout="resume" tabindex="-1" ref="modal">
      <div class="heading">
        <h2>Set Facts!</h2>
      </div>
      <div class="content">
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
        <button @click="resume">Return to Game</button>
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
h2 {
  background: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  padding: 10px;
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
}
p {
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
.about-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.about {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  display: grid;
  background-color: #fefefe;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 10px;
  width: 600px;
  text-align: center;
}
.about:focus {
  outline: none;
}
.content {
  margin: 20px;
}
</style>