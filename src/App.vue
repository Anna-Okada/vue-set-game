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
      <div class="content">
        <header></header>
        <game-deck></game-deck>
        <main-menu v-if="$store.state.gameStarted == false"></main-menu>
        <div class="game" v-if="$store.state.gameStarted">
          <single-player
            v-if="$store.state.playerMode == 'singlePlayer'"
          ></single-player>
          <two-player
            v-if="$store.state.playerMode == 'twoPlayer'"
          ></two-player>
          <human-versus-bot
            v-if="$store.state.playerMode == 'bot'"
          ></human-versus-bot>
        </div>
        <footer></footer>
      </div>
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
#app {
  font-family: "Barlow", sans-serif;
}
</style>
