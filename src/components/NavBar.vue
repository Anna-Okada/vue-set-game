<template>
  <div id="nav">
    <ul>
      <li><div @click="viewAbout">About</div></li>
      <li><div @click="viewTutorial">Tutorial</div></li>
      <li><div @click="quit">Quit</div></li>
      <li><div @click="pause">Pause</div></li>
      <li><div @click="muteUnmute">Sound on/off</div></li>
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
    mute() {
      this.$store.commit("MUTE_UNMUTE");
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

li div:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
</style>