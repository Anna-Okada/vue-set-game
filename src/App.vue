<template>
  <div id="app">
    <head>
      <title>SET Game</title>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      />
    </head>
    <body>
      <header></header>
      <game-deck></game-deck>
      <main-menu v-if="$store.state.gameStarted == false"></main-menu>
      <div class="game" v-if="$store.state.gameStarted">
        <single-player
          class="single"
          v-if="$store.state.playerMode == 'singlePlayer'"
        ></single-player>
        <two-player
          class="two"
          v-if="$store.state.playerMode == 'twoPlayer'"
        ></two-player>
        <human-versus-bot
          class="bot"
          v-if="$store.state.playerMode == 'bot'"
        ></human-versus-bot>
      </div>
      <footer></footer>
    </body>
  </div>
</template>

<script>
import GameDeck from "./components/GameDeck.vue";
import HumanVersusBot from "./components/HumanVersusBot.vue";
import MainMenu from "./components/MainMenu.vue";
import SinglePlayer from "./components/SinglePlayer.vue";
import TwoPlayer from "./components/TwoPlayer.vue";

export default {
  name: "App",
  components: {
    "game-deck": GameDeck,
    "single-player": SinglePlayer,
    "two-player": TwoPlayer,
    "main-menu": MainMenu,
    "human-versus-bot": HumanVersusBot,
  },
};
</script>

<style>
#app,
.game,
.single,
.two,
.bot {
  font-family: "Barlow", sans-serif;
  height: 100%;
}
html {
  height: 100vh;
  /* overflow: hidden; */
}
body {
  width: 100%;
  height: 100vh;
  margin: 0;
}
</style>
