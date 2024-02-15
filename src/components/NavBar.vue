<template>
  <div id="nav">
    <ul>
      <li>
        <div id="sound" @click="muteUnmute">&#128266;</div>
      </li>
      <li><div @click="viewAbout">About</div></li>
      <li><div @click="viewTutorial">Tutorial</div></li>
      <li><div @click="quit">Quit</div></li>
      <li><div @click="pause">Pause</div></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    viewAbout() {
      this.$store.commit("VIEW_ABOUT");
    },
    viewTutorial() {
      this.$store.commit("VIEW_TUTORIAL");
    },
    quit() {
      this.$store.commit("QUIT_GAME");
    },
    pause() {
      this.$store.commit("PAUSE_GAME");
    },
    muteUnmute() {
      this.$store.commit("MUTE_UNMUTE");
      if (this.$store.state.volume == 1) {
        document.getElementById("sound").innerHTML = "&#128266;";
      } else if (this.$store.state.volume == 0) {
        document.getElementById("sound").innerHTML = "&#128263;";
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
  background-color: rgba(254, 178, 0, 0.215);
}
li {
  float: right;
}
li div {
  display: block;
  color: rgb(254, 178, 0);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li:first-child:hover {
  transform: scale(1.2);
}
li div:hover {
  color: rgb(0, 97, 254);
}
</style>