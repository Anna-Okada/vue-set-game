<template>
  <div class="tutorial-container">
    <div
      class="tutorial"
      id="tutorial-window"
      @focusout="skipTutorial"
      tabindex="-1"
      ref="modal"
    >
      <div class="mainContent">
        <div class="objective tab-content">
          <h2 class="heading">Objective</h2>
          <div class="sub-content">
            <p>
              Set is a card-matching game. There are 81 unique cards in a deck.
              An initial 12 cards are drawn from the deck and dealt to the table
              at the start of the game. Your goal is to look at the cards on the
              table and identify Sets of three cards based on four attributes:
              number, color, shape, and shading.
            </p>
            <div class="attributes">
              <div class="attribute-example">
                <p>Number can be 1, 2, or 3.</p>
                <div class="cards">
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-clear.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/2-blue-diamond-clear.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/3-blue-diamond-clear.jpeg"
                  />
                </div>
              </div>
              <div class="attribute-example">
                <p>Color can be blue, green, or pink.</p>
                <div class="cards">
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-solid.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-green-diamond-solid.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-red-diamond-solid.jpeg"
                  />
                </div>
              </div>
              <div class="attribute-example">
                <p>Shape can be diamond, oval, or squiggle.</p>
                <div class="cards">
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-clear.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-oval-clear.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-squiggle-clear.jpeg"
                  />
                </div>
              </div>
              <div class="attribute-example">
                <p>Shading can be clear, shaded, or solid.</p>
                <div class="cards">
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-clear.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-shaded.jpeg"
                  />
                  <img
                    class="card"
                    src="../assets/set-cards/1-blue-diamond-solid.jpeg"
                  />
                </div>
              </div>
            </div>
            <p>
              A Set consists of 3 cards where for each attribute all cards have
              the same value or all cards have different values.
            </p>
          </div>
        </div>
        <div class="examples-of-sets tab-content">
          <h2 class="heading">Examples of SETs</h2>
          <div class="example">
            <p class="description">
              This is a Set because number is different, color is the same,
              shape is the same, and shading is the same.
            </p>
            <div class="cards">
              <img
                class="card"
                src="../assets/set-cards/3-blue-diamond-clear.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/2-blue-diamond-clear.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/1-blue-diamond-clear.jpeg"
              />
            </div>
            <table class="criteria">
              <tr>
                <th></th>
                <th>All Same</th>
                <th>All Different</th>
              </tr>
              <tr>
                <td>Number</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Shape</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Shading</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="example">
            <p class="description">
              And this is a Set because every card has a different number,
              color, shape, and shading.
            </p>
            <div class="cards">
              <img
                class="card"
                src="../assets/set-cards/3-red-squiggle-solid.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/2-green-oval-shaded.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/1-blue-diamond-clear.jpeg"
              />
            </div>
            <table class="criteria">
              <tr>
                <th></th>
                <th>All Same</th>
                <th>All Different</th>
              </tr>
              <tr>
                <td>Number</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
              <tr>
                <td>Color</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
              <tr>
                <td>Shape</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
              <tr>
                <td>Shading</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="examples-of-not-sets tab-content">
          <h2 class="heading">All or nothing</h2>
          <div class="example">
            <p class="description">
              This is not a Set because two of the cards are blue and only one
              is pink.
            </p>
            <div class="cards">
              <img
                class="card"
                src="../assets/set-cards/3-red-diamond-solid.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/2-blue-diamond-shaded.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/1-blue-diamond-clear.jpeg"
              />
            </div>
            <table class="criteria">
              <tr>
                <th></th>
                <th>All Same</th>
                <th>All Different</th>
              </tr>
              <tr>
                <td>Number</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Color</td>
                <td>&#10060;</td>
                <td>&#10060;</td>
              </tr>
              <tr>
                <td>Shape</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Shading</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
            </table>
          </div>
          <div class="example">
            <p class="description">
              This is not a Set either because two of the cards are solid and
              only one is shaded.
            </p>
            <div class="cards">
              <img
                class="card"
                src="../assets/set-cards/1-red-squiggle-solid.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/1-blue-squiggle-solid.jpeg"
              />
              <img
                class="card"
                src="../assets/set-cards/1-green-squiggle-shaded.jpeg"
              />
            </div>
            <table class="criteria">
              <tr>
                <th></th>
                <th>All Same</th>
                <th>All Different</th>
              </tr>
              <tr>
                <td>Number</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Color</td>
                <td></td>
                <td>&#9989;</td>
              </tr>
              <tr>
                <td>Shape</td>
                <td>&#9989;</td>
                <td></td>
              </tr>
              <tr>
                <td>Shading</td>
                <td>&#10060;</td>
                <td>&#10060;</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="player-modes tab-content">
          <h2 class="heading">Player Modes</h2>
          <div class="sub-content">
            <h3>Solo</h3>
            <p>
              In Single Player Mode, you may find Sets at your leisure. If you
              are stumped, click REVEAL A SET to show the Set or Sets in the
              table. Click on the cards to select them. If they make a Set they
              will be added to your Found Sets display. Occasionally, there will
              be no Set in the table, in which case you may ADD 3 CARDS. Hit the
              space bar or click PAUSE to pause the game. The game is complete
              when the deck is empty and there are no remaining Sets in the
              table.
            </p>
            <h3>Two Player</h3>
            <p>
              In Two Player Mode, you will compete against your opponent to
              identify Sets. Player 1 initiates their turn by pressing the 'a'
              key. Player 2 initiates their turn by pressing the 'l' key. You
              have 10 seconds to identify a Set in EASY mode, 8 seconds in
              MODERATE mode, 6 seconds in HARD mode, and only 4 seconds in
              INSANE mode. The player with the highest Set count wins!
            </p>
            <h3>VS. Bot</h3>
            <p>
              In Vs. Bot mode, you must try and find Sets before the computer
              does. You will initiate your turn by pressing the 'a' key. In EASY
              mode, you will have 30 seconds to find a Set before the computer
              finds one (if one exists in the table). You will have 20 seconds
              in MODERATE mode, 10 seconds in HARD mode, and only 5 seconds in
              INSANE mode! The player with the highest Set count wins!
            </p>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div id="back-button" class="change-page" @click="nextPrev(-1)">
          &#8249;
        </div>
        <button id="skip" @click="skipTutorial">Skip Tutorial</button>
        <div id="next-button" class="change-page" @click="nextPrev(1)">
          &#8250;
        </div>
      </div>
      <div class="steps">
        <span class="step active"></span>
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
    };
  },
  mounted() {
    this.$refs.modal.focus();
    let tabs = document.getElementsByClassName("tab-content");
    tabs[0].style.display = "block";
    document.getElementById("back-button").style.display = "none";
  },
  methods: {
    showTab(n) {
      let tabs = document.getElementsByClassName("tab-content");
      tabs[n].style.display = "block";
      if (n == 0) {
        document.getElementById("back-button").style.display = "none";
      } else {
        document.getElementById("back-button").style.display = "inline";
      }
      if (n == tabs.length - 1) {
        document.getElementById("next-button").style.display = "none";
        if (this.$store.state.gameStarted) {
          document.getElementById("skip").innerHTML = "Resume Game";
        } else {
          document.getElementById("skip").innerHTML = "Start Game";
        }
      } else {
        document.getElementById("next-button").style.display = "inline";
        document.getElementById("skip").innerHTML = "Skip Tutorial";
      }
      let steps = document.getElementsByClassName("step");
      for (let i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", "");
      }
      steps[n].className += " active";
    },
    nextPrev(n) {
      let tabs = document.getElementsByClassName("tab-content");
      tabs[this.currentTab].style.display = "none";
      this.currentTab += n;
      this.showTab(this.currentTab);
    },
    skipTutorial() {
      this.$store.commit("SKIP_TUTORIAL");
    },
  },
};
</script>

<style scoped>
.sub-content {
  margin: 20px;
}
.step {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
}
.step.active {
  background-color: rgb(0, 97, 254);
}
.steps {
  margin: 20px;
}
.criteria {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: min-content;
}
.criteria td,
.criteria th {
  border: 1px solid #ddd;
  padding: 8px;
}
.criteria tr:nth-child(even) {
  background-color: #f2f2f2;
}
.criteria th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04aa6d;
  color: white;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "prev skip next";
  justify-content: center;
  align-items: center;
  grid-area: buttons;
  margin-left: 20px;
  margin-right: 20px;
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
.change-page {
  background-color: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  width: 25px;
  border-radius: 50%;
}
.change-page:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
#back-button {
  grid-area: prev;
}
#next-button {
  grid-area: next;
  justify-self: end;
}
#skip {
  grid-area: skip;
}
.tab-content {
  display: none;
  grid-area: content;
}
.description {
  grid-area: description;
}
.card {
  width: 70px;
}
.card:hover {
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  transform: none;
}
.cards {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  justify-content: center;
  grid-area: cards;
  justify-self: center;
}
.criteria {
  grid-area: criteria;
}
.example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "description criteria"
    "cards criteria";
  justify-items: end;
  margin: 20px;
}
.attributes {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tutorial {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "content"
    "buttons";
}
h2.heading {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

@media screen and (max-width: 770px) {
  .attributes {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
  .sub-content {
    margin: 10px;
    height: 40vh;
    overflow: scroll;
  }
  .cards {
    justify-items: center;
    grid-template-columns: repeat(3, 40px);
  }
  .card {
    width: 35px;
  }
  .steps {
    margin: 10px;
  }
  .step {
    height: 8px;
    width: 8px;
  }
  button {
    font-size: 0.8em;
  }
  .example {
    margin: 10px;
    height: auto;
  }
  .criteria td,
  .criteria th {
    border: 1px solid #ddd;
    padding: 1px;
    font-size: 0.7em;
  }
}
</style>