<template>
  <div class="nav-container">
    <ul>
      <li>
        <div id="pause-resume" @click="pauseResume">
          <span class="pause" v-if="!$store.state.gamePaused">Pause</span>
          <span class="resume" v-if="$store.state.gamePaused">Resume</span>
        </div>
      </li>
      <li><div @click="quit">Quit</div></li>
      <li><div @click="viewTutorial">Tutorial</div></li>
      <li><div @click="viewAbout">About</div></li>
      <li>
        <div class="sound" @click="muteUnmute">
          <i class="fas fa-volume-up" v-if="$store.state.volume == 1"></i>
          <i class="fas fa-volume-off" v-if="$store.state.volume == 0"></i>
        </div>
      </li>
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
    pauseResume() {
      if (this.$store.state.gamePaused == false) {
        this.$store.commit("PAUSE_GAME");
      } else {
        this.$store.commit("RESUME_GAME");
      }
    },
    muteUnmute() {
      this.$store.commit("MUTE_UNMUTE");
    },
  },
};
</script>

<style scoped>
.nav-container {
  height: min-content;
}
ul {
  display: grid;
  justify-content: end;
  align-items: center;
  grid-template-columns: repeat(5, auto);
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: solid rgb(255, 223, 150) 2px;
  border-radius: 10px;
  background-color: rgba(254, 178, 0, 0.215);
}
.sound {
  width: 18px;
}
li div {
  display: block;
  color: rgb(254, 178, 0);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li div:hover {
  color: rgb(0, 97, 254);
}
@media screen and (max-width: 770px) {
  ul {
    justify-content: center;
  }
}
</style>