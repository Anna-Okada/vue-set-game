<template>
  <div id="app">
    <head>
      <title>SET Game</title>
    </head>
    <body>
      <div class="content">
        <header></header>
        <game-deck></game-deck>
        <main-menu v-if="$store.state.gameStarted == false"></main-menu>
        <div class="game" v-if="$store.state.gameStarted">
          <single-player v-if="$store.state.singlePlayerMode != false"></single-player>
          <two-player v-if="$store.state.singlePlayerMode == false"></two-player>
        </div>
        <footer></footer>
      </div>
    </body>
  </div>
</template>

<script>
import GameDeck from "./components/GameDeck.vue";
import MainMenu from './components/MainMenu.vue';
import SinglePlayer from './components/SinglePlayer.vue';
import TwoPlayer from './components/TwoPlayer.vue'


export default {
  name: "App",
  components: {
    "game-deck": GameDeck,
    "single-player": SinglePlayer,
    "two-player": TwoPlayer,
    "main-menu": MainMenu
  },
};
</script>

<style>
#app {
    font-family: 'Barlow', sans-serif;
}
</style>
