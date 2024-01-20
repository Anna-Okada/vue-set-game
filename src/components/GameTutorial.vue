<template>
  <div class="container">
    <div id="tutorial">
      <div class="tab">
        <button class="tablinks" @click="viewPage(event, 'objective')">
          Objective
        </button>
        <button class="tablinks" @click="viewPage(event, 'examplesOfSets')">
          Examples
        </button>
        <button class="tablinks" @click="viewPage(event, 'singlePlayerRules')">
          Single Player
        </button>
        <button class="tablinks" @click="viewPage(event, 'twoPlayerRules')">
          Two Player
        </button>
      </div>
      <div id="objective" class="tabcontent">
        <h2>Objective</h2>
        <p>
          SET is a card-matching game. There are 81 unique cards in a deck, and
          either 12 or 15 cards on the table at any given point. Your goal is to
          look at the cards on the table and identify SETs of three cards based
          on four attributes: number, color, shape, and shading. A SET consists
          of 3 cards where for each attribute all cards have the same value or
          all cards have different values.
        </p>
      </div>

      <div id="examplesOfSets" class="tabcontent">
        <h2>Examples of SETs</h2>
        <p>
          For example, this is a SET because... *insert pictures here* This is
          not a SET because... *insert pictures here*
        </p>
      </div>

      <div id="singlePlayerRules" class="tabcontent">
        <h2>Single Player</h2>
        <p>
          In Single Player Mode, you may find SETs at your leisure. Click HINT
          to find how many SETs exist in the table, if any. If you are truly
          stumped, use REVEAL A SET to show the SET or SETs in the table. Click
          the cards to select and either hit the space bar or click CHECK IF SET
          to determine if your cards make a SET. If they do, those cards will be
          added to your Found SETs display. Occasionally, there may be no SET in
          the table, in which case you may ADD 3 CARDS. The game is over when
          there are no remaining cards in the deck and no remaining SETs in the
          table.
        </p>
      </div>
      <div id="twoPlayerRules" class="tabcontent">
        <h2>Two Player</h2>
        <p>
          In Two Player Mode, you will compete against your opponent to identify
          SETs. The HINT and REVEAL A SET functions are not accessible here.
          Player 1 initiates their turn by pressing the 'a' key. Player 2
          initiates their turn by pressing the 'l' key. Once a turn has begun,
          the player has 10 seconds to identify a SET. The player with the
          highest SET count wins!
        </p>
      </div>
      <div class="changePage" @click="nextPage">&#8249;</div>
      <div class="changePage" @click="previousPage">&#8250;</div>
      <button class="skip" @click="skipTutorial">Skip Tutorial</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    nextPage() {},
    previousPage() {},
    viewPage(event, pageName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(pageName).style.display = "block";
      event.currentTarget.className += " active";
    },
    skipTutorial() {
      this.$store.commit("SKIP_TUTORIAL");
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
/* Style the tab */
.tab {
  overflow: hidden;
  background: rgba(254, 178, 0, 0.215);
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  font-size: 17px;
  color: rgb(254, 178, 0);
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
}

/* Change background color of buttons on hover */
.tab button:hover,
.tab button:focus {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}

/* Style the tab content */
.tabcontent {
  display: none;
}

.container {
  display: flex;
  justify-content: center;
  padding: 50px;
}
#tutorial {
  background-color: #fefefe;
  border: 2px solid rgb(254, 178, 0);
  border-radius: 5px;
  width: 50%;
  text-align: center;
  /* position: relative; */
}
.changePage {
  background-color: rgba(254, 178, 0, 0.215);
  color: rgb(254, 178, 0);
  border-radius: 50%;
  display: inline-block;
  padding: 8px 16px;
}
.changePage:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
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
</style>