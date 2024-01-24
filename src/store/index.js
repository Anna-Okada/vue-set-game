import Vue from 'vue'
import Vuex from 'vuex'
import ProgressBar from 'vuejs-progress-bar'

Vue.use(ProgressBar)
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    nextCard: {}, // always set to state.deck[state.deck.length - 1] unless state.deck.length < 1?
    deck: [],
    table: [],
    hand: [],
    p1FoundSets: [], // to keep track of all SETs found
    p2FoundSets: [],
    isSet: false, // hand is a SET
    hasSet: false, // table has one or more SETs
    p1UnassistedSetCount: 0, // SETs found without hint
    p2UnassistedSetCount: 0,
    p1IncorrectGuesses: 0,
    p2IncorrectGuesses: 0,
    assistedSetCount: 0, // SETs found using hint
    usedHint: false,
    deckEmpty: false,
    positionsArray: [],
    setsInTable: 0,
    revealedSets: [],
    timesClickedRevealSets: 0,
    playerMode: '',
    player1Name: '',
    player2Name: '',
    player1Turn: null,
    gameOver: false,
    playAgain: false,
    gameStarted: false,
    lastHandWasSet: null,
    tutorialComplete: false,
  },
  getters: {
  },
  mutations: {
    INITIALIZE_DECK(state, deck) {
      state.deck = deck;
    },
    DEAL_CARD(state) {
      // if there is a matched card on the table, assign its position to the incoming card
      // replace that matched card
      for (let i = 0; i < state.table.length - 1; i++) {
        if (state.table[i].matched == true) {
          state.deck[state.deck.length - 1].position = state.table[i].position;
          state.table.splice((state.table[i].position), 1, state.deck[state.deck.length - 1]);
        }
      }
      // if there are no matched cards, assign the incoming card a position of table.length
      // then deal the card to the end of the table and remove from deck
      state.deck[state.deck.length - 1].position = state.table.length + 1;
      state.table.push(state.deck[state.deck.length - 1]);
      state.deck.pop();
    },
    DEAL_TO_TABLE(state) {
      for (let i = 0; i < 12; i++) {
        this.commit("DEAL_CARD", state);
      }
      this.commit("CHECK_FOR_SETS", state); // to update hasSet
    },
    SELECT_CARD(state, card) {
      // is the card being clicked currently revealed? 
      // if so, change revealed to false
      if (card.revealed == true) {
        card.revealed = false;
      }
      // is the card being clicked currently unselected?
      // if so, is the hand.length < 3?
      // if so, you can change selected to true and add it to the hand
      if (card.selected == false && state.hand.length < 3) {
        card.selected = true;
        state.hand.push(card);
      }
      // is the card being clicked currently selected?
      // if so, you can change the selected to false and remove it from the hand
      else if (card.selected == true) {
        card.selected = false;
        state.hand = state.hand.filter(card => card.selected == true);
      }
      // if the hand now has 3 cards, trigger following methods
      // this part isn't working because somehow everything in the following if-statement gets run before updating
      // the value of selected on the third card and before the card is pushed to the hand
      if (state.hand.length == 3) {
        // this.commit("CHECK_IF_SET", state);
        // this.commit("AFTER_CHECK_IF_SET", state)
        // this.commit("REFRESH_TABLE", state)
      }
    },
    SHUFFLE_DECK(state) {
      state.deck = state.deck.sort(() => (Math.random() > 0.5 ? 1 : -1));
    },
    SHUFFLE_TABLE(state) {
      for (let i = 0; i < 12; i++) {
        state.table.sort(() => (Math.random() > 0.5 ? 1 : -1));
      }
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].position = i + 1;
      }
    },
    CHECK_IF_SET(state) {
      let numberSET = false;
      let colorSET = false;
      let shapeSET = false;
      let shadingSET = false;
      // if all numbers are the same
      if (state.hand[0].number == state.hand[1].number && state.hand[1].number == state.hand[2].number) {
        numberSET = true;
      }
      // if all colors are the same
      if (state.hand[0].color == state.hand[1].color && state.hand[1].color == state.hand[2].color) {
        colorSET = true;
      }
      // if all shapes are the same
      if (state.hand[0].shape == state.hand[1].shape && state.hand[1].shape == state.hand[2].shape) {
        shapeSET = true;
      }
      // if all shadings are the same
      if (state.hand[0].shading == state.hand[1].shading && state.hand[1].shading == state.hand[2].shading) {
        shadingSET = true;
      }
      // if all numbers are the different
      if (state.hand[0].number != state.hand[1].number && state.hand[1].number != state.hand[2].number && state.hand[0].number != state.hand[2].number) {
        numberSET = true;
      }
      // if all colors are different
      if (state.hand[0].color != state.hand[1].color && state.hand[1].color != state.hand[2].color && state.hand[0].color != state.hand[2].color) {
        colorSET = true;
      }
      // if all shapes are the different
      if (state.hand[0].shape != state.hand[1].shape && state.hand[1].shape != state.hand[2].shape && state.hand[0].shape != state.hand[2].shape) {
        shapeSET = true;
      }
      // if all shadings are the different
      if (state.hand[0].shading != state.hand[1].shading && state.hand[1].shading != state.hand[2].shading && state.hand[0].shading != state.hand[2].shading) {
        shadingSET = true;
      }
      if (numberSET == true && colorSET == true && shapeSET == true && shadingSET == true) {
        state.isSet = true;
      }
    },
    AFTER_CHECK_IF_SET(state) {
      // if hand makes SET
      if (state.isSet == true) {
        // set lastHandWasSet to true so that GameStats can display message (div class="isSet")
        state.lastHandWasSet = true;
        // if player1's turn, push the cards from the hand to p1FoundSets array
        if (state.player1Turn == true) {
          state.p1FoundSets.unshift(state.hand)
        }
        // otherwise, push the cards from the hand to p2FoundSets array
        else if (state.player1Turn == false) {
          state.p2FoundSets.unshift(state.hand)
        }
        // if hint and reveal a set buttons weren't clicked
        if (state.usedHint == false) {
          // if player 1's turn, increment p1UnassistedSetCount
          if (state.player1Turn == true) {
            state.p1UnassistedSetCount++;
          }
          // if player 2's turn, increment p2UnassistedSetCount
          else if (state.player1Turn == false) {
            state.p2UnassistedSetCount++;
          }
        }
        // if hint or reveal a set button was clicked
        else if (state.usedHint == true) {
          // increment assistedSetCount
          state.assistedSetCount++;
        }
        // of the cards in the SET, change value of matched to true
        for (let i = 0; i < state.hand.length; i++) {
          state.hand[i].matched = true;
        }
        // if not single player, trigger END_TURN mutation so turn ends even if it hasn't been 10 seconds
        if (state.playerMode != "singlePlayer") {
          this.commit("END_TURN")
        }
      }
      // if hand doesn't make a SET
      else {
        // temporary alert:
        alert("Not a SET! Try again :)")
        // set lastHandWasSet to false so that GameStats can display message (div class="isNotSet")
        state.lastHandWasSet = false;
        // if player 1's turn, increment p1IncorrectGuesses
        if (state.player1Turn == true) {
          state.p1IncorrectGuesses++;
        }
        // if player 2's turn, increment p2IncorrectGuesses
        else {
          state.p2IncorrectGuesses++;
        }
        // if not single player, trigger END_TURN mutation so turn ends even if it hasn't been 10 seconds
        if (state.playerMode != "singlePlayer") {
          this.commit("END_TURN")
        }
      }
      // if not single player, reset player1Turn to null
      if (state.playerMode != "singlePlayer") {
        state.player1Turn = null;
      }
      // if in botMode, trigger START_BOT_TIMER
      if (state.playerMode == 'bot') {
        this.commit("START_BOT_TIMER");
      }

      // ***COULD EVERYTHING BELOW THIS POINT BE MOVED TO REFRESH_TABLE?***

      // reset the value of selected to false for all cards on table
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].selected = false;
      }
      // reset value of isSet to false
      state.isSet = false;
    },
    REFRESH_TABLE(state) {
      // all possible scenarios:
      // deck empty and table <= 12: remove without replacing
      // deck empty and table > 12: remove without replacing
      // deck not empty and table > 12: remove without replacing
      // deck not empty and table <= 12: replace

      // if there are still cards in the deck and if there are 12 or fewer cards on the table
      if (state.deckEmpty == false && state.table.length <= 12) {
        // if any card's value of matched is true, replace it with the next card from the deck
        for (let i = 0; i < state.table.length; i++) {
          if (state.table[i].matched == true) {
            state.table.splice(i, 1, state.deck[state.deck.length - 1]);
            state.deck.pop();
          }
        }
      }
      // otherwise if the deck is empty (regardless how many cards are on the table)
      // or if there are still cards in the deck but there are more than 12 cards on the table
      else if (state.deckEmpty == true || (state.deckEmpty == false && state.table.length > 12)) {
        // remove any matched cards from the table (without replacing them)
        state.table = state.table.filter(card => card.matched == false);
      }
      // reassign position values to each card
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].position = i + 1;
      }
      // set deckEmpty to true if no more cards in deck
      if (state.deck.length == 0) {
        state.deckEmpty = true;
      }
      // if deck is empty and there are no SETs in the table, the game is over ***THIS ISN'T WORKING YET***
      if (state.deckEmpty == true && state.hasSet == false) {
        alert("Game over!")
      }
      // clear the hand
      state.hand = [];
      // reset setsInTable to 0
      state.setsInTable = 0;
      // reset usedHint to false
      state.usedHint = false;
      // reset revealedSets to empty array
      state.revealedSets = [];
      // reset revealed to false for all cards
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].revealed = false;
      }
      // reset value of hasSet to false
      state.hasSet = false;
      // check the table for sets to update the value of hasSet
      this.commit("CHECK_FOR_SETS", state)
    },
    REVEAL_A_SET(state) {
      state.usedHint = true;
      state.setsInTable = 0;
      state.revealedSets = [];
      state.timesClickedRevealSets++
      // set revealed to initial value of false for all cards
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].revealed = false;
        state.table[i].selected = false;
        state.table[i].matched = false; // ***DO I EVEN NEED THIS?***
      }
      // generate all possible combos of positions and populate positionsArray with those combos
      this.commit("GENERATE_ALL_COMBOS_OF_POSITIONS", state)
      // iterate through positionsArray
      for (let i = 0; i < state.positionsArray.length; i++) {
        // fill hand with cards that match the positions in any given element of positionsArray
        for (let j = 0; j < 3; j++) {
          state.hand.push(state.table[state.positionsArray[i][j] - 1])
        }
        // check if that hand makes a SET
        this.commit("CHECK_IF_SET")
        // if it does, increment setsInTable and push that hand to revealedSets
        if (state.isSet == true) {
          state.setsInTable++;
          state.revealedSets.push([state.hand[0], state.hand[1], state.hand[2]])
        }
        // if the hand doesn't make a set, set isSet and hasSet to false and clear the hand
        state.isSet = false;
        state.hand = [];
      }
      // if there are any SETs in revealedSets, set revealed to true on those cards
      if (state.revealedSets.length > 0) {
        state.hasSet = true;
        // only reveal one SET at a time; cycle through revealed SETs depending on how many times the button was clicked
        let i = (state.timesClickedRevealSets - 1) % state.revealedSets.length;
        for (let j = 0; j < 3; j++) {
          state.table[state.revealedSets[i][j].position - 1].revealed = true;
        }
      }
      else if (state.revealedSets.length == 0) {
        state.hasSet = false;
        alert("There are no SETs in here!")
      }
      // clear positionsArray because its contents depend on the length of the table, which varies
      state.positionsArray = [];
    },
    ADD_THREE_CARDS_TO_TABLE(state) {
      state.setsInTable = 0;
      this.commit("CHECK_FOR_SETS", state);
      if (state.hasSet == true) {
        if (state.setsInTable == 1) {
          alert("There actually is a SET here! Can you find it?")
        }
        else if (state.setsInTable > 1) {
          alert("There actually are multiple SETs here! Can you find one?")
        }
      }
      // if there are no SETs in the table and the deck is not empty
      if (state.hasSet == false && state.deckEmpty == false) {
        for (let i = 0; i < 3; i++) {
          // assign the incoming 3 cards from the deck the next 3 positions on the table
          state.deck[state.deck.length - (i + 1)].position = state.table.length + i;
          // add those cards to the table
          state.table.push(state.deck[state.deck.length - (i + 1)])
          // remove them from the deck
          state.deck.pop();
        }
        // reassign all the table positions (really only need to update the last 3 but it's okay)
        for (let i = 0; i < state.table.length; i++) {
          state.table[i].position = i + 1;
        }
        // refresh table
        this.commit("REFRESH_TABLE", state)
      }
      // if in botMode, trigger START_BOT_TIMER
      if (state.playerMode == 'bot') {
        this.commit("START_BOT_TIMER");
      }
    },
    CHECK_FOR_SETS(state) {
      this.commit("GENERATE_ALL_COMBOS_OF_POSITIONS", state)
      for (let i = 0; i < state.positionsArray.length; i++) {
        for (let j = 0; j < 3; j++) {
          state.hand.push(state.table[state.positionsArray[i][j] - 1])
        }
        this.commit("CHECK_IF_SET")
        if (state.isSet == true) {
          state.setsInTable++;
        }
        state.isSet = false;
        state.hand = [];
      }
      if (state.setsInTable > 0) {
        state.hasSet = true;
      } else {
        state.hasSet = false;
      }
      state.positionsArray = [];
    },
    FIND_SETS(state) {
      state.usedHint = true;
      state.setsInTable = 0;
      state.revealedSets = [];

      this.commit("GENERATE_ALL_COMBOS_OF_POSITIONS", state)
      for (let i = 0; i < state.positionsArray.length; i++) {
        for (let j = 0; j < 3; j++) {
          state.hand.push(state.table[state.positionsArray[i][j] - 1])
        }
        this.commit("CHECK_IF_SET")
        if (state.isSet == true) {
          state.setsInTable++;
          state.revealedSets.push([state.hand[0], state.hand[1], state.hand[2]])
        }
        state.isSet = false;
        state.hand = [];
      }
      if (state.setsInTable > 0) {
        state.hasSet = true;
      }
      if (state.setsInTable == 0) {
        alert("There are no SETs in here!");
      } else if (state.setsInTable == 1) {
        alert("There is 1 SET! Can you find it?");
      } else {
        alert("There are " + state.setsInTable + " SETs! Can you find one?");
      }
      state.positionsArray = [];
    },
    GENERATE_ALL_COMBOS_OF_POSITIONS(state) {
      let positions = []
      // Javascript program to print all
      // combination of size r in an array of size n 

      /* arr[] ---> Input Array
      data[] ---> Temporary array to store current combination
      start & end ---> Starting and Ending indexes in arr[]
      index ---> Current index in data[]
      r ---> Size of a combination to be printed */
      function combinationUtil(arr, data, start, end, index, r) {
        // Current combination is ready to be printed, print it
        if (index == r) {
          for (let j = 0; j < r; j++) {
            // document.write(data[j] + " ");
            positions.push(data[j])
          }
          // document.write("<br>")
        }

        // replace index with all possible elements. The condition
        // "end-i+1 >= r-index" makes sure that including one element
        // at index will make a combination with remaining elements
        // at remaining positions
        for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
          data[index] = arr[i];
          combinationUtil(arr, data, i + 1, end, index + 1, r);
        }
      }

      // The main function that prints all combinations of size r
      // in arr[] of size n. This function mainly uses combinationUtil()
      function printCombination(arr, n, r) {
        // A temporary array to store all combination one by one
        let data = new Array(r);

        // Print all combination using temporary array 'data[]'
        combinationUtil(arr, data, 0, n - 1, 0, r);
      }

      /*Driver function to check for above function*/
      let arr = [];
      for (let i = 0; i < state.table.length; i++) {
        arr.push(i + 1);
      }
      let r = 3;
      let n = arr.length;
      printCombination(arr, n, r);
      for (let i = 0; i < positions.length; i += 3) {
        state.positionsArray.push([positions[i], positions[i + 1], positions[i + 2]])
      }
    },
    SELECT_SINGLE_PLAYER(state) {
      state.playerMode = "singlePlayer";
      state.player1Turn = true;
    },
    SELECT_TWO_PLAYER(state) {
      state.playerMode = "twoPlayer";
    },
    SELECT_BOT_MODE(state) {
      state.playerMode = "bot";
    },
    ENTER_NAMES(state, names) {
      state.player1Name = names.p1;
      if (state.playerMode == "twoPlayer") {
        state.player2Name = names.p2;
      }
      else if (state.playerMode == 'bot') {
        state.player2Name = "Computer";
      }
    },
    START_GAME(state) {
      state.gameStarted = true;
    },
    START_TURN(state, event) {
      // if user hit 'a' and it isn't currently someone's turn, start player 1's turn
      if (event.key == 'a' && state.player1Turn == null) {
        state.player1Turn = true;
      }
      // if user hit 'l', it isn't currently someone's turn, and it's not botMode, start player 2's turn
      else if (event.key == 'l' && state.player1Turn == null && state.playerMode != 'bot') {
        state.player1Turn = false;
      }
      // start 10 second countdown, after which END_TURN mutation is automatically triggered 
      setTimeout(() => {
        if (state.player1Turn != null)
          this.commit("END_TURN");
      }, 10000);
    },
    END_TURN(state) {
      state.player1Turn = null;
      if (state.playerMode == 'bot') {
        this.commit("START_BOT_TIMER");
      }
    },
    START_BOT_TIMER(state) {
      if (state.player1Turn == null) {
        setTimeout(() => {
          this.commit("BOT_FINDS_SET")
        }, 1000)
      }
    },
    BOT_FINDS_SET(state) {
      if (state.player1Turn == null) {
        state.player1Turn = false;
        state.setsInTable = 0;
        state.revealedSets = [];
        state.timesClickedRevealSets++
        // set revealed, selected, and matched to initial value of false for all cards
        for (let i = 0; i < state.table.length; i++) {
          state.table[i].revealed = false;
          state.table[i].selected = false;
          state.table[i].matched = false; // ***DO I EVEN NEED THIS?***
        }
        // generate all possible combos of positions and populate positionsArray with those combos
        this.commit("GENERATE_ALL_COMBOS_OF_POSITIONS", state)
        // iterate through positionsArray
        for (let i = 0; i < state.positionsArray.length; i++) {
          // fill hand with cards that match the positions in any given element of positionsArray
          for (let j = 0; j < 3; j++) {
            state.hand.push(state.table[state.positionsArray[i][j] - 1])
          }
          // check if that hand makes a SET
          this.commit("CHECK_IF_SET")
          // if it does, increment setsInTable and push that hand to revealedSets
          if (state.isSet == true) {
            state.setsInTable++;
            state.revealedSets.push([state.hand[0], state.hand[1], state.hand[2]])
          }
          // if the hand doesn't make a set, set isSet and hasSet to false and clear the hand
          state.isSet = false;
          state.hand = [];
        }
        // if there are any SETs in revealedSets, select one SET
        if (state.revealedSets.length > 0) {
          state.hasSet = true;
          for (let j = 0; j < 3; j++) {
            state.table[state.revealedSets[0][j].position - 1].selected = true;
          }
        }
        else if (state.revealedSets.length == 0) {
          state.hasSet = false;
        }
        // push selected cards to hand
        for (let i = 0; i < state.table.length; i++) {
          if (state.table[i].selected == true) {
            state.table[i].matched = true;
            state.hand.push(state.table[i]);
          }
        }
        // clear positionsArray because its contents depend on the length of the table, which varies
        state.positionsArray = [];
        // if there's a SET in the hand, start the timer to trigger BOT_TAKES_SET
        if (state.hand.length == 3) {
          setTimeout(() => {
            this.commit("BOT_TAKES_SET");
          }, 1000);
        }
        else {
          // reset player1Turn to null
          state.player1Turn = null;
        }
      }
    },
    BOT_TAKES_SET(state) {
      // push the selected cards to p2Found SETs (aka computer's found SETs)
      state.p2FoundSets.unshift(state.hand);
      // increment p2FoundSets
      state.p2UnassistedSetCount++;
      // reset player1Turn to null
      state.player1Turn = null;
      this.commit("REFRESH_TABLE");
      // start timer again
      this.commit("START_BOT_TIMER")
    },
    SKIP_TUTORIAL(state) {
      state.tutorialComplete = true;
    }
  },
  actions: {
  },
  modules: {
  }
})