<template>
  <div id="mainMenu">
    <div class="backgroundCards">
      <img
        class="backgroundCard"
        v-for="card in $store.state.deck.slice(0, 60)"
        :key="card.url"
        :src="require(`../assets/set-cards/${card.url}`)"
      />
    </div>
    <div class="container">
      <div class="modal" v-show="modalVisible == true">
        <div class="gameOptions">
          <div class="player-mode tab-content">
            <div class="option">
              <button @click="selectSinglePlayer">Solo</button>
              <p>Enjoy a game at your leisure without timers or opponents</p>
            </div>
            <div class="option">
              <button @click="selectTwoPlayer">Two-Player</button>
              <p>Challenge a pal to a little friendly competition</p>
            </div>
            <div class="option">
              <button @click="selectBotMode">Vs. Bot</button>
              <p>Race against the clock to beat the AI</p>
            </div>
          </div>
          <div class="difficulty-and-names tab-content">
            <h2 class="current-selection">
              {{ $store.state.playerMode }}
            </h2>
            <div class="difficulty-options">
              <div>
                <input
                  type="radio"
                  name="buttonGroup"
                  value="easy"
                  id="easy"
                /><label for="easy" @click="selectEasy">Easy</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="buttonGroup"
                  value="moderate"
                  id="moderate"
                /><label for="moderate" @click="selectModerate">Moderate</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="buttonGroup"
                  value="hard"
                  id="hard"
                /><label for="hard" @click="selectHard">Hard</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="buttonGroup"
                  value="insane"
                  id="insane"
                /><label for="insane" @click="selectInsane">Insane</label>
              </div>
            </div>
            <div
              class="player-names"
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
            </div>
            <div class="player-name" v-if="$store.state.playerMode == 'bot'">
              <input
                type="text"
                required="true"
                placeholder="Player 1 name"
                v-model="p1"
              />
            </div>
            <div class="buttons">
              <div class="submit-button">
                <button
                  v-if="
                    ($store.state.playerMode == 'twoPlayer' &&
                      $store.state.difficulty != '' &&
                      p1 != '' &&
                      p2 != '') ||
                    ($store.state.playerMode == 'bot' &&
                      $store.state.difficulty != '' &&
                      p1 != '')
                  "
                  @click="nextPrev(1)"
                >
                  Submit
                </button>
              </div>
              <div class="back-button">
                <button id="prevBtn" @click="nextPrev(-1)">
                  Back
                </button>
              </div>
            </div>
          </div>
          <div class="start-game tab-content">
            <h2
              class="current-selection"
              v-if="$store.state.playerMode == 'singlePlayer'"
            >
              <div>
                {{ $store.state.playerMode }}
              </div>
            </h2>
            <h2
              class="current-selections"
              v-if="$store.state.playerMode == 'twoPlayer'"
            >
              <div>
                {{ $store.state.playerMode }}
              </div>
              <div>difficulty: {{ $store.state.difficulty }}</div>
            </h2>
            <h2
              class="current-selections"
              v-if="$store.state.playerMode == 'bot'"
            >
              <div>{{ p1 }} vs. {{ $store.state.playerMode }}</div>
              <div>difficulty: {{ $store.state.difficulty }}</div>
            </h2>
            <h2 v-if="$store.state.playerMode == 'twoPlayer'">
              {{ p1 }} and {{ p2 }}, let's play Set!
            </h2>
            <div class="buttons">
              <div class="start-game-button">
                <button class="start" @click="start">Start Game</button>
              </div>
              <div class="back-button">
                <button id="prevBtn" @click="nextPrev(-1)">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let tabs = document.getElementsByClassName("tab-content");
    tabs[0].style.display = "grid";
    document.getElementById("prevBtn").style.display = "none";
  },
  data() {
    return {
      currentTab: 0,
      modalVisible: true,
      p1: "",
      p2: "",
      difficulty: "",
    };
  },
  methods: {
    showTab(n) {
      let tabs = document.getElementsByClassName("tab-content");
      tabs[n].style.display = "grid";
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
    },
    nextPrev(n) {
      let tabs = document.getElementsByClassName("tab-content");
      tabs[this.currentTab].style.display = "none";
      if (this.$store.state.playerMode == "singlePlayer") {
        n *= 2;
      }
      this.currentTab += n;
      this.showTab(this.currentTab);
    },
    selectEasy() {
      this.difficulty = "easy";
      this.$store.commit("SELECT_DIFFICULTY", this.difficulty);
    },
    selectModerate() {
      this.difficulty = "moderate";
      this.$store.commit("SELECT_DIFFICULTY", this.difficulty);
    },
    selectHard() {
      this.difficulty = "hard";
      this.$store.commit("SELECT_DIFFICULTY", this.difficulty);
    },
    selectInsane() {
      this.difficulty = "insane";
      this.$store.commit("SELECT_DIFFICULTY", this.difficulty);
    },
    start() {
      this.modalVisible = !this.modalVisible;
      let names = {
        p1: this.p1,
        p2: this.p2,
      };
      this.$store.commit("ENTER_NAMES", names);
      this.$store.commit("START_GAME");
    },
    selectSinglePlayer() {
      this.$store.commit("SELECT_SINGLE_PLAYER");
      this.nextPrev(1);
    },
    selectTwoPlayer() {
      this.$store.commit("SELECT_TWO_PLAYER");
      this.nextPrev(1);
    },
    selectBotMode() {
      this.$store.commit("SELECT_BOT_MODE");
      this.nextPrev(1);
    },
  },
};
</script>

<style scoped>
.submit-button,
.start-game-button {
  flex: 0 1 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.buttons {
  display: flex;
  flex-direction: row-reverse;
  margin: 10px 0 20px 0;
}
.back-button {
  flex: 0 1 auto;
  margin-right: auto;
  margin-left: 20px;
}
.option {
  text-align: center;
}
input[type="radio"][name="buttonGroup"] {
  display: none;
}
label {
  display: inline-block;
  padding: 3px;
  border-radius: 5px;
  color: rgb(254, 178, 0);
  background-color: rgba(254, 178, 0, 0.215);
  text-transform: uppercase;
  font-size: 1.3em;
  border: none;
  width: 6em;
  text-align: center;
}
label:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
input[type="radio"][name="buttonGroup"]:checked + label {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
.difficulty-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0;
}
.player-names,
.player-name {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0;
}
.player-mode {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px;
}
.tab-content {
  display: none;
}
.backgroundCards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.backgroundCard {
  width: 97%;
}




/* button {
    font-size: 1.5em;
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
  } */
  .current-selections,
  .current-selection {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 97, 254, 0.215);
    color: rgb(0, 97, 254);
    padding: 10px;
    font-size: 1.8em;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 10px 0;
  }
  h2 {
    color: rgb(254, 178, 0);
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
  }
  p {
    color: rgb(254, 178, 0);
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 0;
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
    border: 1px solid rgb(254, 178, 0);
    border-radius: 5px;
    width: 650px;
  }
</style>