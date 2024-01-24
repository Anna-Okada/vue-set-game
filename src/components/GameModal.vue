<template>
  <div class="container">
    <div class="modal" v-show="modalVisible == true">
      <div class="gameOptions">
        <form
          id="playerInfoForm"
          v-on:submit.prevent="allInfoEntered == true"
          v-show="hideMenu == false"
        >
          <span class="playerMode">
            <button @click="selectSinglePlayer">Single Player</button>
            <button @click="selectTwoPlayer">Two Player</button>
            <button @click="selectBotMode">Play Against the Computer</button>
          </span>
          <span
            class="playerNames"
            v-if="$store.state.playerMode == 'twoPlayer'"
          >
            <input
              type="text"
              required="true"
              placeholder="Player 1 name"
              v-model="p1"
            />
            <input
              type="text"
              required="true"
              placeholder="Player 2 name"
              v-model="p2"
            />
          </span>
          <span class="playerName" v-if="$store.state.playerMode == 'bot'">
            <input
              type="text"
              required="true"
              placeholder="Player 1 name"
              v-model="p1"
            />
          </span>
          <button
            @click="submit"
            v-if="
              ($store.state.playerMode == 'twoPlayer' &&
                p1 != '' &&
                p2 != '') ||
              ($store.state.playerMode == 'bot' && p1 != '')
            "
          >
            Submit
          </button>
        </form>

        <h2 class="displayNames" v-if="showNames == true">
          {{ $store.state.player1Name }} and {{ $store.state.player2Name }},
          let's play SET!
        </h2>
        <button
          v-if="allInfoEntered == true || $store.state.playerMode == 'singlePlayer'"
          class="start"
          @click="start"
        >
          Start Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: true,
      showNames: false,
      p1: "",
      p2: "",
      allInfoEntered: false,
      hideMenu: false,
      clicked: false,
      tutorialComplete: false,
    };
  },
  methods: {
    start() {
      this.modalVisible = !this.modalVisible;
      this.$store.commit("START_GAME");
    },
    selectSinglePlayer() {
      this.$store.commit("SELECT_SINGLE_PLAYER");
    },
    selectTwoPlayer() {
      this.$store.commit("SELECT_TWO_PLAYER");
    },
    selectBotMode() {
      this.$store.commit("SELECT_BOT_MODE");
    },
    submit() {
      this.showNames = true;
      this.allInfoEntered = true;
      this.hideMenu = true;
      let names = {
        p1: this.p1,
        p2: this.p2,
      };
      this.$store.commit("ENTER_NAMES", names);
    },
  },
};
</script>

<style scoped>
.playerMode,
.playerNames,
.displayNames {
  display: flex;
  justify-content: center;
  margin: 20px;
  gap: 20px;
}
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
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
button:hover,
button:focus {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 250px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.gameOptions {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 5px;
  width: 50%;
  text-align: center;
}
</style>