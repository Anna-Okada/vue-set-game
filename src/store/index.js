import Vue from 'vue'
import Vuex from 'vuex'
import ProgressBar from 'vuejs-progress-bar'

Vue.use(ProgressBar)
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    deck: [],
    table: [],
    hand: [],
    p1FoundSets: [], // to keep track of all Sets found
    p2FoundSets: [],
    isSet: false, // hand is a Set
    hasSet: false, // table has one or more Sets
    p1UnassistedSetCount: 0, // Sets found without hint
    p2UnassistedSetCount: 0,
    p1IncorrectGuesses: 0,
    p2IncorrectGuesses: 0,
    assistedSetCount: 0, // Sets found using hint
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
    player1TurnVisible: null,
    gameOver: false,
    gameStarted: false,
    gameStartTime: null,
    gameEndTime: null,
    lastHandWasSet: null,
    tutorialVisible: false,
    difficulty: '',
    botInterval: 0,
    remainingBotTime: 0,
    turnLength: 10000,
    remainingTurnTime: 0,
    turnTimer: null,
    turnStart: null,
    botTimer: null,
    botStart: null,
    gamePaused: false,
    aboutVisible: false,
    tickingSound: null,
    addCardsSound: null,
    cannotAddCardsSound: null,
    correctSound: null,
    startGameSound: null,
    gameOverSound: null,
    incorrectSound: null,
    revealSound: null,
    selectSound: null,
    shuffleSound: null,
    timeUpSound: null,
    volume: 1,
    showAddCardsAlert: false,
    correctMessages: [
      "You found a Set!",
      "Nice Set!",
      "Awesome!",
      "Great Set!",
      "Woohoo!",
    ],
    incorrectMessages: [
      "Not a Set. Try again!",
      "Not quite!",
      "Almost. Try again!",
      "So close!",
      "Keep trying!",
    ],
    correctMessage: '',
    incorrectMessage: '',
  },
  getters: {
  },
  mutations: {
    CREATE_DECK(state) {
      var card = {};
      for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          for (let k = 1; k < 4; k++) {
            for (let l = 1; l < 4; l++) {
              card.number = i;
              card.color = j;
              card.shape = k;
              card.shading = l;
              if (card.color == 1) {
                card.color = "blue";
              }
              if (card.color == 2) {
                card.color = "green";
              }
              if (card.color == 3) {
                card.color = "red";
              }
              if (card.shape == 1) {
                card.shape = "diamond";
              }
              if (card.shape == 2) {
                card.shape = "oval";
              }
              if (card.shape == 3) {
                card.shape = "squiggle";
              }
              if (card.shading == 1) {
                card.shading = "clear";
              }
              if (card.shading == 2) {
                card.shading = "shaded";
              }
              if (card.shading == 3) {
                card.shading = "solid";
              }
              state.deck.push({
                url:
                  card.number +
                  "-" +
                  card.color +
                  "-" +
                  card.shape +
                  "-" +
                  card.shading +
                  ".jpeg",
                number: card.number,
                color: card.color,
                shape: card.shape,
                shading: card.shading,
                position: -1,
                selected: false,
                matched: false,
                revealed: false,
                foundWithHint: false, // testing
              });
            }
          }
        }
      }
    },
    DEAL_TO_TABLE(state) {
      // remove a card from the deck, add it to the table, and assign its position
      for (let i = 0; i < 12; i++) {
        state.table.push(state.deck[state.deck.length - 1]);
        state.deck.pop();
        state.table[i].position = i + 1;
      }
      // update hasSet by running CHECK_FOR_SETS
      this.commit("CHECK_FOR_SETS", state);
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
      // are there fewer than 3 cards currently selected?
      // if so, you can change selected to false and remove it from the hand
      else if (card.selected == true && state.hand.length < 3) {
        card.selected = false;
        state.hand = state.hand.filter(card => card.selected == true);
      }
      // if able to select or deselect a card, play audio for that sound
      if ((card.selected == false && state.hand.length < 3) || (card.selected == true && state.hand.length <= 3)) {
        state.selectSound = new Audio(require("@/assets/audio/select.wav"));
        state.selectSound.volume = state.volume;
        state.selectSound.play();
      }
      // if the hand now has 3 cards, trigger following methods
      if (state.hand.length == 3) {
        // run following methods after 1 second
        this.commit("CHECK_IF_SET", state);
        setTimeout(() => {
          this.commit("AFTER_CHECK_IF_SET", state)
          this.commit("REFRESH_TABLE", state)
        }, 1000)
      }
    },
    SHUFFLE_DECK(state) {
      state.deck = state.deck.sort(() => (Math.random() > 0.5 ? 1 : -1));
    },
    SHUFFLE_TABLE(state) {
      // play audio for shuffling
      state.shuffleSound = new Audio(require("@/assets/audio/shuffle.wav"));
      state.shuffleSound.volume = state.volume;
      state.shuffleSound.play();
      // shuffle the cards
      for (let i = 0; i < 12; i++) {
        state.table.sort(() => (Math.random() > 0.5 ? 1 : -1));
      }
      // reassign position values
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
    HIDE_CORRECT_INCORRECT(state) {
      state.lastHandWasSet = null
    },
    AFTER_CHECK_IF_SET(state) {
      setTimeout(() => this.commit("HIDE_CORRECT_INCORRECT"), 3000);
      // if hand makes Set
      if (state.isSet == true) {
        // play audio for finding a Set
        state.correctSound = new Audio(require("@/assets/audio/airhorn.wav"));
        state.correctSound.volume = state.volume;
        state.correctSound.play();
        // set lastHandWasSet to true so that GameStats can display message
        state.lastHandWasSet = true;
        // if player1's turn, add the cards from the hand to p1FoundSets array
        if (state.player1Turn == true) {
          state.p1FoundSets.unshift(state.hand)
        }
        // otherwise, add the cards from the hand to p2FoundSets array
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
          // select a random message of success from correctMessages
          let i = Math.floor(Math.random() * state.correctMessages.length);
          state.correctMessage = state.correctMessages[i];
        }
        // if hint or reveal a set button was clicked
        else if (state.usedHint == true) {
          // increment assistedSetCount
          state.assistedSetCount++;
          // set foundWithHint to true
          for (let i = 0; i < state.hand.length; i++) {
            state.hand[i].foundWithHint = true;
          }
        }
        // of the cards in the SET, change value of matched to true
        for (let i = 0; i < state.hand.length; i++) {
          state.hand[i].matched = true;
        }
      }
      // if hand doesn't make a SET
      else {
        // play audio for misidentifying a Set
        state.incorrectSound = new Audio(require("@/assets/audio/incorrect.wav"));
        state.incorrectSound.volume = state.volume;
        state.incorrectSound.play();
        // set lastHandWasSet to false so that GameStats can display message (div class="isNotSet")
        state.lastHandWasSet = false;
        // select random message to indicate incorrect Set from incorrectMessages
        let i = Math.floor(Math.random() * state.incorrectMessages.length);
        state.incorrectMessage = state.incorrectMessages[i];
        // if player 1's turn, increment p1IncorrectGuesses
        if (state.player1Turn == true) {
          state.p1IncorrectGuesses++;
        }
        // if player 2's turn, increment p2IncorrectGuesses
        else {
          state.p2IncorrectGuesses++;
        }
      }
      // if not single player, trigger END_TURN so turn ends even if it hasn't been 10 seconds
      if (state.playerMode != "singlePlayer") {
        this.commit("END_TURN")
      }
      // if not single player, reset player1Turn to null
      if (state.playerMode != "singlePlayer") {
        state.player1Turn = null;
      }

      // *** COULD EVERYTHING BELOW THIS POINT BE MOVED TO REFRESH_TABLE? ***

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
        state.table[i].selected = false; // IS THIS RIGHT?
      }
      // reset value of hasSet to false
      state.hasSet = false;
      // check the table for sets to update the value of hasSet
      this.commit("CHECK_FOR_SETS", state)
      // if deck is empty and there are no SETs in the table, the game is over
      if (state.deckEmpty == true && state.hasSet == false) {
        state.gameOver = true;
      }
    },
    REVEAL_A_SET(state) {
      // play audio for revealing a Set
      state.revealSound = new Audio(require("@/assets/audio/reveal.wav"));
      state.revealSound.volume = state.volume;
      state.revealSound.play();
      state.usedHint = true;
      state.setsInTable = 0;
      state.revealedSets = [];
      state.timesClickedRevealSets++
      // set revealed to initial value of false for all cards
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].revealed = false;
        state.table[i].selected = false;
        state.table[i].matched = false; // *** DO I EVEN NEED THIS? ***
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
    HIDE_ADD_CARDS_ALERT(state) {
      setTimeout(() => { state.showAddCardsAlert = false }, 2500)
    },
    ADD_THREE_CARDS_TO_TABLE(state) {
      // *** NOT SURE IF I NEED THIS ***
      state.setsInTable = 0;
      state.revealedSets = [];
      for (let i = 0; i < state.table.length; i++) {
        state.table[i].matched = false;
      }
      // *******************************
      this.commit("CHECK_FOR_SETS", state);
      if (state.hasSet == true) {
        // play audio for when unable to add cards
        state.cannotAddCardsSound = new Audio(require("@/assets/audio/ding.wav"));
        state.cannotAddCardsSound.volume = state.volume;
        state.cannotAddCardsSound.play();
        state.showAddCardsAlert = true;
        this.commit("HIDE_ADD_CARDS_ALERT")
      }
      // if there are no Sets in the table and the deck is not empty
      if (state.hasSet == false && state.deckEmpty == false) {
        // play audio for adding cards
        state.addCardsSound = new Audio(require("@/assets/audio/ding.wav"));
        state.addCardsSound.volume = state.volume;
        state.addCardsSound.play();
        for (let i = 0; i < 3; i++) {
          // add three cards to the table
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
      // if in botMode clear bot timer and trigger START_BOT_TIMER
      if (state.playerMode == 'bot') {
        clearTimeout(state.botTimer)
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
      state.startGameSound = new Audio(require('@/assets/audio/startGame.wav'));
      state.startGameSound.volume = state.volume;
      state.startGameSound.play();
      state.gameStarted = true;
      state.gameStartTime = Date.now()
    },
    START_TURN(state, event) {
      // if user hit 'a' and it isn't currently someone's turn, start player 1's turn
      if (event.key == 'a' && state.player1Turn == null) {
        state.player1Turn = true;
        state.player1TurnVisible = true;
        state.tickingSound = new Audio(require("@/assets/audio/ticking.wav"));
        state.tickingSound.volume = state.volume;
        state.tickingSound.play();
      }
      // if user hit 'l', it isn't currently someone's turn, and it's not botMode, start player 2's turn
      else if (event.key == 'l' && state.player1Turn == null && state.playerMode != 'bot') {
        state.player1Turn = false;
        state.player1TurnVisible = false;
        state.tickingSound = new Audio(require("@/assets/audio/ticking.wav"));
        state.tickingSound.volume = state.volume;
        state.tickingSound.play();
      }
      // start countdown, after which END_TURN mutation is automatically triggered
      // unless CHECK_IF_SET is run, in which case the turnTimer will be cleared
      state.turnTimer = setTimeout(() => {
        this.commit("END_TURN");
      }, state.turnLength);
      if (state.player1Turn != null) {
        state.turnTimer;
        state.turnStart = Date.now();
      }
      // clear botTimer
      clearTimeout(state.botTimer);
    },
    END_TURN(state) {
      // if mid-turn, pause ticking sound
      if (state.player1Turn != null) {
        state.tickingSound.pause();
      }
      clearTimeout(state.turnTimer)
      state.player1Turn = null;
      state.player1TurnVisible = null;
      this.commit("REFRESH_TABLE")
      if (state.playerMode == 'bot') {
        this.commit("START_BOT_TIMER");
      }
    },
    START_BOT_TIMER(state) {
      if (!state.gamePaused) {
        state.botTimer = setTimeout(() => {
          if (!state.gamePaused) {
            this.commit("BOT_FINDS_SET")
          }
        }, state.botInterval)

        if (state.player1Turn == null) {
          state.botTimer;
          state.botStart = Date.now();
        }
      }
    },
    BOT_FINDS_SET(state) {
      // if it isn't currently player 1's turn
      if (state.player1Turn == null) {
        // set it to bot's turn
        state.player1Turn = false;
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
        // if there's a Set in the hand, start the timer to trigger BOT_TAKES_SET
        if (state.hand.length == 3) {
          // play audio for bot finding a Set
          state.botSound = new Audio(require('@/assets/audio/ding.wav'));
          state.botSound.volume = state.volume;
          state.botSound.play();
          setTimeout(() => {
            this.commit("BOT_TAKES_SET");
          }, 800);
        }
        else {
          // reset player1Turn to null
          state.player1Turn = null;
        }
      }
    },
    BOT_TAKES_SET(state) {
      // push the selected cards to p2Found Sets (aka computer's found Sets)
      state.p2FoundSets.unshift(state.hand);
      // increment p2FoundSets
      state.p2UnassistedSetCount++;
      // reset player1Turn to null
      state.player1Turn = null;
      this.commit("REFRESH_TABLE");
      // trigger START_BOT_TIMER to run again
      this.commit("START_BOT_TIMER")
    },
    SKIP_TUTORIAL(state) {
      state.tutorialVisible = false;
      this.commit("RESUME_GAME")
    },
    PLAY_AGAIN() {
      location.reload();
    },
    SELECT_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
      switch (state.difficulty) {
        case "easy": state.botInterval = 30000;
          state.turnLength = 10000;
          break;
        case "moderate": state.botInterval = 20000;
          state.turnLength = 8000;
          break;
        case "hard": state.botInterval = 10000;
          state.turnLength = 6000;
          break;
        case "insane": state.botInterval = 5000;
          state.turnLength = 4000;
          break;
      }
    },
    VIEW_ABOUT(state) {
      state.gamePaused = true;
      state.aboutVisible = true;
      state.remainingBotTime = state.botInterval - (Date.now() - state.botStart);
      state.remainingTurnTime = state.turnLength - (Date.now() - state.turnStart);
      console.log(state.remainingTurnTime / 1000);
      // if mid-turn, pause the ticking sound
      if (state.remainingTurnTime > 0) {
        state.tickingSound.pause();
      }
      clearTimeout(state.botTimer)
      clearTimeout(state.turnTimer)
    },
    VIEW_TUTORIAL(state) {
      state.gamePaused = true;
      state.tutorialVisible = true;
      state.remainingBotTime = state.botInterval - (Date.now() - state.botStart);
      state.remainingTurnTime = state.turnLength - (Date.now() - state.turnStart);
      // if mid-turn, pause the ticking sound
      if (state.remainingTurnTime > 0) {
        state.tickingSound.pause();
      }
      clearTimeout(state.botTimer)
      clearTimeout(state.turnTimer)
    },
    QUIT_GAME(state) {
      state.gameOver = true;
      if (state.playerMode != "singlePlayer" && state.player1Turn == true) {
        state.tickingSound.pause()
      }
      // if human won against bot
      // or if not a tie in two player mode
      // or if in single player mode and score is > 0
      // then play success audio
      if ((state.playerMode == 'bot' && state.p1UnassistedSetCount > state.p2UnassistedSetCount) ||
        (state.playerMode == 'twoPlayer' && state.p1UnassistedSetCount != state.p2UnassistedSetCount) ||
        (state.playerMode == 'singlePlayer' && state.p1UnassistedSetCount > 0)) {
        state.gameOverSound = new Audio(require('@/assets/audio/success.wav'));
        state.gameOverSound.volume = state.volume;
        state.gameOverSound.play();
      }
      // if it's a tie
      // or if single player mode and score is 0
      // then play ding
      if (state.p1UnassistedSetCount == state.p2UnassistedSetCount ||
        (state.playerMode == 'singlePlayer' && state.p1UnassistedSetCount == 0)) {
        state.gameOverSound = new Audio(require('@/assets/audio/ding.wav'));
        state.gameOverSound.volume = state.volume;
        state.gameOverSound.play();
      }
      // if computer won
      // play sad sound?
      if (state.playerMode == 'bot' && state.p1UnassistedSetCount < state.p2UnassistedSetCount) {
        state.gameOverSound = new Audio(require('@/assets/audio/cannotAddCards.wav'));
        state.gameOverSound.volume = state.volume;
        state.gameOverSound.play();
      }
      state.player1TurnVisible = null;
      state.player1Turn = null;
      clearTimeout(state.botTimer)
      clearTimeout(state.turnTimer)
      state.gameEndTime = Date.now()
    },
    PAUSE_GAME(state) {
      state.gamePaused = true;
      state.remainingBotTime = state.botInterval - (Date.now() - state.botStart);
      state.remainingTurnTime = state.turnLength - (Date.now() - state.turnStart);
      // if mid-turn, pause the ticking sound
      if (state.player1Turn != null) {
        state.tickingSound.pause();
      }
      clearTimeout(state.botTimer) // *** IS THIS DOING ANYTHING? ***
      clearTimeout(state.turnTimer)
    },
    RESUME_GAME(state) {
      state.gamePaused = false;
      // if mid-turn, resume the ticking sound
      if (state.remainingTurnTime > 0) {
        state.tickingSound.play();
      }
      state.aboutVisible = false;
      // if in bot mode, resume bot timer
      if (state.playerMode == 'bot') {
        // if the bot timer was running, reset for remaining time
        if (state.remainingBotTime > 0) {
          state.botTimer = setTimeout(() => {
            this.commit("BOT_FINDS_SET")
          }, state.remainingBotTime)
        }
        // otherwise, set the timer for the usual duration
        else {
          state.botTimer = setTimeout(() => {
            this.commit("BOT_FINDS_SET")
          }, state.botInterval)
        }
        state.botTimer;
      }
      // if mid-turn in 2 player mode, reset turn timer for remaining time
      if (state.remainingTurnTime > 0) {
        state.turnTimer = setTimeout(() => {
          this.commit("END_TURN");
        }, state.remainingTurnTime);
        // state.hideShowTurnTimer = setTimeout(() => {
        //   this.commit("HIDE_TURN");
        // }, state.remainingTurnTime - 1000);
        // state.turnTimer;
      }
      // reset remainingTurnTime to 0
      state.remainingTurnTime = 0;
    },
    MUTE_UNMUTE(state) {
      if (state.volume == 1) {
        state.volume = 0;
      }
      else if (state.volume == 0) {
        state.volume = 1;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})