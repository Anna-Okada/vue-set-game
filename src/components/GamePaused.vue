<template>
  <div id="paused">
    <div class="modal">
      <button @click="resume">Resume</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    resume() {
      this.$store.commit("RESUME_GAME");
    },
  },
};
</script>

<style scoped>
#paused {
  position: fixed;
  z-index: 1;
  padding-top: 250px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(254, 178, 0);
  border-radius: 5px;
  width: 30%;
  text-align: center;
  gap: 10px;
  display: grid;
  place-content: center;
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
button:hover {
  background: rgba(0, 97, 254, 0.215);
  color: rgb(0, 97, 254);
}
</style>