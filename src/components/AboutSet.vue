<template>
  <div id="about">
    <div class="modal">
      <h2>Set Facts!</h2>
      <p>
        Set was invented in 1974 by Marsha Jean Falco, who was studying genetic patterns of epilepsy in German Shepherds.
      </p>
      <p>
        108 unique Sets can be formed from the 81 cards in a deck.
      </p>
      <p>
        Given two cards, one -- and only one -- other card can complete the Set.
      </p>
      <p>
        This website was designed by Anna Okada and is open source on
        <a href="https://github.com/Anna-Okada/vue-set-game" target="_blank"
          >Github</a
        >.
      </p>
      <button @click="resume">Return to Game</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    resume() {
      this.$store.commit("RESUME_GAME");
    },
  },
};
</script>

<style scoped>
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}
p {
  color: grey;
  font-size: 18px;
  text-align: center;
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
#about {
  position: fixed;
  z-index: 1;
  padding-top: 150px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal {
  background-color: #fefefe;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 10px;
  width: 60%;
  text-align: center;
  gap: 10px;
}
button {
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: rgb(254, 178, 0);
  background: rgba(254, 178, 0, 0.215);
  border: none;
  border-radius: 5px;
}
button:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
</style>