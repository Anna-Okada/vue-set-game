<template>
  <div class="container">
    <div id="tutorial">
      <div id="mainContent">
        <div id="objective" class="tabcontent">
          <h2>Tutorial 1/5: Objective</h2>
          <p>
            SET is a card-matching game. There are 81 unique cards in a deck. An
            initial 12 cards are drawn from the deck and dealt to the table at
            the start of the game. Your goal is to look at the cards on the
            table and identify SETs of three cards based on four attributes:
            number, color, shape, and shading. A SET consists of 3 cards where
            for each attribute all cards have the same value or all cards have
            different values.
          </p>
        </div>
        <div id="examplesOfSets" class="tabcontent">
          <h2 id="heading">Tutorial 2/5: Examples of SETs</h2>
          <p id="description1">
            For example, this is a SET because number is different, color is
            same, shape is same, and shading is same.
          </p>
          <div id="cards1" class="cards">
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
          <table id="criteria1" class="criteria">
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
          <p id="description2">
            And this is a SET because number is different, color is different,
            shape is different, and shading is different.
          </p>
          <div id="cards2" class="cards">
            <img
              class="card"
              src="../assets/set-cards/1-blue-diamond-clear.jpeg"
            />
            <img
              class="card"
              src="../assets/set-cards/2-green-oval-shaded.jpeg"
            />
            <img
              class="card"
              src="../assets/set-cards/3-red-squiggle-solid.jpeg"
            />
          </div>
          <table id="criteria2" class="criteria">
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
          <p id="description3">
            This is not a SET because two of the cards have the same color, but
            the other is different.
          </p>
          <div id="cards3" class="cards">
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
              src="../assets/set-cards/3-red-diamond-clear.jpeg"
            />
          </div>
          <table id="criteria3" class="criteria">
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
              <td>&#9989;</td>
              <td></td>
            </tr>
          </table>
        </div>
        <div id="singlePlayerRules" class="tabcontent">
          <h2>Tutorial 3/5: Single Player</h2>
          <p>
            In Single Player Mode, you may find SETs at your leisure. Click HINT
            to find how many SETs exist in the table, if any. If you are truly
            stumped, use REVEAL A SET to show the SET or SETs in the table.
            Click the cards to select them. If they make a SET they will be
            added to your Found SETs display. Occasionally, there may be no SET
            in the table, in which case you may ADD 3 CARDS. The game is over
            when there are no remaining cards in the deck and no remaining SETs
            in the table.
          </p>
        </div>
        <div id="twoPlayerRules" class="tabcontent">
          <h2>Tutorial 4/5: Two Player</h2>
          <p>
            In Two Player Mode, you will compete against your opponent to
            identify SETs. The HINT and REVEAL A SET functions are not
            accessible here. Player 1 initiates their turn by pressing the 'a'
            key. Player 2 initiates their turn by pressing the 'l' key. Once a
            turn has begun, the player has 10 seconds to identify a SET. The
            player with the highest SET count wins!
          </p>
        </div>
        <div id="botRules" class="tabcontent">
          <h2>Tutorial 5/5: Playing Against the Computer</h2>
          <p>
            stuff
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
        document.getElementById("skip").innerHTML = "Start Game";
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
  width: 50px;
}
.card:hover {
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  transform: none;
}
.cards {
  display: grid;
  grid-template-columns: repeat(3, 60px);
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
  padding-top: 150px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
#heading {
  grid-area: heading;
}
#description1 {
  grid-area: description1;
}
#description2 {
  grid-area: description2;
}
#description3 {
  grid-area: description3;
}
#cards1 {
  grid-area: cards1;
}
#cards2 {
  grid-area: cards2;
}
#cards3 {
  grid-area: cards3;
}
#criteria1 {
  grid-area: criteria1;
}
#criteria2 {
  grid-area: criteria2;
}
#criteria3 {
  grid-area: criteria3;
}
#mainContent {
  grid-area: content;
  display: grid;
  grid-template-areas:
    "heading heading"
    "description1 criteria1"
    "cards1 criteria1"
    "description2 criteria2"
    "cards2 criteria2"
    "description3 criteria3"
    "cards3 criteria3";
}
#tutorial {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 5px;
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