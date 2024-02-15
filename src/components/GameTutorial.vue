<template>
  <div class="container">
    <div id="tutorial">
      <div id="mainContent">
        <div id="objective" class="tabcontent">
          <h2>Tutorial 1/6: Objective</h2>
          <p>
            Set is a card-matching game. There are 81 unique cards in a deck. An
            initial 12 cards are drawn from the deck and dealt to the table at
            the start of the game. Your goal is to look at the cards on the
            table and identify Sets of three cards based on four attributes:
            number, color, shape, and shading.
          </p>
          <div class="attributes">
            <div class="attributeExample">
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
            <div class="attributeExample">
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
            <div class="attributeExample">
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
            <div class="attributeExample">
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
        <div id="examplesOfSets" class="tabcontent">
          <h2 id="heading">Tutorial 2/6: Examples of SETs</h2>
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
        <div id="examplesOfNotSets" class="tabcontent">
          <h2 id="heading">Tutorial 3/6: All or nothing</h2>
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
        <div id="singlePlayerRules" class="tabcontent">
          <h2>Tutorial 4/6: Single Player</h2>
          <p>
            In Single Player Mode, you may find Sets at your leisure. If you are
            stumped, click REVEAL A SET to show the Set or Sets in the table.
            Click on the cards to select them. If they make a Set they will be
            added to your Found Sets display. Occasionally, there will be no Set
            in the table, in which case you may ADD 3 CARDS. Hit the space bar
            or click PAUSE to pause the game. The game is complete when there
            are no remaining cards in the deck and no remaining Sets in the
            table.
          </p>
        </div>
        <div id="twoPlayerRules" class="tabcontent">
          <h2>Tutorial 5/6: Two Player</h2>
          <p>
            In Two Player Mode, you will compete against your opponent to
            identify Sets. Player 1 initiates their turn by pressing the 'a'
            key. Player 2 initiates their turn by pressing the 'l' key. Once a
            turn has begun, the player has 10 seconds to identify a Set. The
            player with the highest Set count wins!
          </p>
        </div>
        <div id="botRules" class="tabcontent">
          <h2>Tutorial 6/6: Playing Against the Computer</h2>
          <p>
            When playing against the computer, you may choose your level of
            difficulty from EASY to INSANE! As in Two Player Mode, you will
            initiate your turn by pressing the 'a' key. In EASY mode, you will
            have 30 seconds to find a Set before the computer finds one (if one
            exists in the table). Once your turn has begun, you will have 10
            seconds to identify a Set. In INSANE mode, you will only have 5
            seconds to find a Set and 4 seconds to select the cards. The player
            with the highest Set count wins!
          </p>
        </div>
      </div>
      <div class="buttons">
        <div id="prevBtn" class="changePage" @click="nextPrev(-1)">&#8249;</div>
        <button id="skip" @click="skipTutorial">Skip Tutorial</button>
        <div id="nextBtn" class="changePage" @click="nextPrev(1)">&#8250;</div>
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
    let tabs = document.getElementsByClassName("tabcontent");
    tabs[0].style.display = "block";
    document.getElementById("prevBtn").style.display = "none";
  },
  methods: {
    showTab(n) {
      let tabs = document.getElementsByClassName("tabcontent");
      tabs[n].style.display = "block";
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == tabs.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        if (this.$store.state.gameStarted) {
          document.getElementById("skip").innerHTML = "Resume Game";
        } else {
          document.getElementById("skip").innerHTML = "Start Game";
        }
      } else {
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("skip").innerHTML = "Skip Tutorial";
      }
    },
    nextPrev(n) {
      let tabs = document.getElementsByClassName("tabcontent");
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
p {
  color: rgb(254, 178, 0);
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
}
.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "prev skip next";
  justify-content: center;
  grid-area: buttons;
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
.changePage {
  background-color: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  width: 25px;
  border-radius: 50%;
}
.changePage:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
#prevBtn {
  grid-area: prev;
}
#nextBtn {
  grid-area: next;
  justify-self: end;
}
#skip {
  grid-area: skip;
}
h2 {
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}
.tabcontent {
  display: none;
  grid-area: content;
}
.container {
  position: fixed;
  z-index: 1;
  padding-top: 5rem;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.description {
  grid-area: description;
}
.cards {
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
#tutorial {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 10px;
  width: 60%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "buttons"
    "content";
  gap: 10px;
}
</style>