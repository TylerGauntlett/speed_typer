<template>
  <div class="row text-center">
    <div class="col-12">
      <span class="title-text">
        Speed Typer <span v-if="userTypingSpeed">({{ userTypingSpeed }} WPM)</span>
      </span>
    </div>
    <div class="text-content-container flex">
      <div class="d-flex justify-content-center">
        <input class="d-flex justify-content-center" v-model="userText"/>
        <div class="text-content">
          <span v-for="(char, index) in sourceTextArray" :key="index" :class="matchingCharactersMap[index]">{{ char }}</span>
        </div>
      </div>
    </div>
    <div class="col-12 text-center">
      <span class="time-remaining-text">
        {{ timerCount }} seconds remaining
      </span>
    </div>
    <div class="col-12">
      <div class="flex">
        <button type="button" class="btn btn-secondary" @click="reset()">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const MATCH = 'match';
const MISMATCH = 'mismatch';
const NONE = 'none';

export default {
  name: 'Main',
  data() {
    return {
      timerEnabled: false,
      timerCount: 60,
      userText: '',
      sourceText: this.getText(),
    }
  },
  computed: {
    sourceTextArray() {
      return this.sourceText.split('');
    },
    userTypingSpeed() {
      if (60 - this.timerCount !== 0) {
        let percentComplete = 60 / (60 - this.timerCount);

        return Math.round(this.userWordCount * percentComplete);
      }

      return 0;
    },
    userWordCount() {
      return this.userText.split(' ').length;
    },
    userTextArray() {
      return this.userText.split('');
    },
    matchingCharactersMap() {
      let matches = [];

      this.sourceTextArray.forEach((char, index) => {
        // User input has a value for this index
        if (this.userTextArray[index]) {
          // Characters match
          if (this.sourceTextArray[index] === this.userTextArray[index]) {
            matches[index] = MATCH;
          } else {
            matches[index] = MISMATCH;
          }
        } else {
          matches[index] = NONE;
        }
      })

      return matches;
    }
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },
    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    },
    userText() {
      if (this.userText !== '') {
        this.timerEnabled = true;
      }
    }
  },
  methods: {
    play() {
      this.timerEnabled = true;
    },
    pause() {
      this.timerEnabled = false;
    },
    reset() {
      this.timerCount = 60;
      this.timerEnabled = false;
      this.sourceText = this.getText();
      this.userText = '';
    },
    getText() {
      return 'This is a long thing of text. You have to type all of this text to see how fast you type.';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time-remaining-text {
    font-size: 24px;
  }
  .title-text {
    font-size: 30px;
  }
  .text-content-container .text-content {
    height: 400px;
    width: 600px;
    border:1px solid black;
  }
  .text-content {
    overflow-y: scroll;
    text-align: left;
  }
  .match {
    background-color: green;
  }
  .mismatch {
    background-color: red;
  }
  input {
    width: 600px;
    height: 400px;
    position: absolute;
    top: 45px;
    opacity: 0;
  }
</style>
