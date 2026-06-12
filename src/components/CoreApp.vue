<template>
  <div class="core-app" v-touch:swipe.right="previousExercise" v-touch:swipe.left="nextExercise">
    <div class="controls">
      <selector v-model="selectedDay" :options="days"></selector>
      <selector v-model="selectedPeriod" :options="periods"></selector>
    </div>

    <div class="workout">
      <div v-for="(exercise, index) in currentWorkout" :key="index" class="exercise">{{ exercise }}</div>
    </div>

    <div class="bottom-controls">
      <div class="refresh"><span class="material-icons" @click="setToday">gps_fixed</span></div>
      <div class="timer" @click="resetTimer"><span class="timer-item">{{ timerVal.min }}</span>:<span class="timer-item">{{ timerVal.sec }}</span>.<span class="frac timer-item">{{ timerVal.frac }}</span></div>
      <div class="sound" @click="toggleSound"><span class="material-icons">{{this.soundPaused ? 'volume_off' : 'volume_up'}}</span></div>
    </div>
  </div>
</template>

<script>
import Selector from './Selector.vue';

const schedule = {
  LUN: {
    Reveil: ["Pull-ups 4x4"],
    Matin: ["Curls 2x12","Lateral raises 2x15","External rotations 2x15"],
    Midi: ["Push-ups 2x15"],
    Aprem: ["Dumbbell press 4x12","Rowing 2x10"],
    Soir: ["Push-ups max"]
  },
  MAR: {
    Reveil: ["Pull-ups 4x4"],
    Matin: ["Rear delt fly 2x15","Hammer curls 2x12","Farmer hold 2x45sec"],
    Midi: ["Pull-ups max"],
    Aprem: ["Rowing 4x12","Curls 2x12","Rowing 2x10"],
    Soir: ["Dead hang 30sec"]
  },
  MER: {
    Reveil: ["Pull-ups 3x3"],
    Matin: ["Suitcase hold 2x30sec"],
    Midi: ["Active hang 3x30sec"],
    Aprem: ["Farmer hold 2x45sec"],
    Soir: ["Active hang 3x30sec"]
  },
  JEU: {
    Reveil: ["Pull-ups 4x4"],
    Matin: ["Curls 2x12","Lateral raises 2x15","External rotations 2x15"],
    Midi: ["Push-ups 2x15"],
    Aprem: ["Dumbbell press 4x12","Rowing 2x10"],
    Soir: ["Push-ups max"]
  },
  VEN: {
    Reveil: ["Pull-ups 4x4"],
    Matin: ["Rear delt fly 2x15","Hammer curls 2x12","Farmer hold 2x45sec"],
    Midi: ["Pull-ups max"],
    Aprem: ["Heavy rowing 4x12","Curls 2x12","Rowing 2x10"],
    Soir: ["Dead hang 30sec"]
  },
  SAM: {
    Reveil: ["Repos"],
    Matin: ["Repos"],
    Midi: ["Repos"],
    Aprem: ["Repos"],
    Soir: ["Repos"]
  },
  DIM: {
    Reveil: ["Pull-ups 3x3"],
    Matin: ["Dead hang 30sec"],
    Midi: ["Scapular pull-ups 10"],
    Aprem: ["Dead hang 30sec"],
    Soir: ["Dead hang 60sec"]
  }
}

export default {
  data() {
    const sound = new Audio('src/assets/music.mp3')
    sound.loop = true
    return {
      days: ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(e => ({label: e})),
      periods: [{label: 'Reveil', icon: 'alarm'}, {label: 'Matin', icon: 'light_mode'}, {label: 'Midi', icon: 'restaurant_menu'}, {label: 'Aprem', icon: 'light_mode'}, {label: 'Soir', icon: 'bedtime'}],
      selectedDay: undefined,
      selectedPeriod: undefined,

      workouts: schedule,

      startTimer: new Date().getTime(),
      timer: new Date().getTime(),

      sound,
      soundPaused: true
    }
  },
  computed: {
    timerVal() {
      const diff = this.timer - this.startTimer
      const allSecs = Math.floor((diff / 1000))

      const min = (''+(Math.floor(allSecs / 60)%60)).padStart(2, '0')
      const sec = (''+allSecs % 60).padStart(2, '0')
      const frac = (''+Math.round((diff - allSecs * 1000) / 10)).padStart(2, '0')
      return { min, sec, frac }
    },
    periodIndex() {
      return this.periods.indexOf(this.selectedPeriod)
    },
    dayIndex() {
      return this.days.indexOf(this.selectedDay)
    },
    currentWorkout() {
      return this.workouts[this.selectedDay?.label]?.[this.selectedPeriod?.label] ?? []
    }
  },

  methods: {
    previousExercise() {
      this.selectedPeriod = this.periods[this.periodIndex - 1] ?? this.periods.at(-1)
      if (this.selectedPeriod === this.periods.at(-1)) {
        this.selectedDay = this.days[this.dayIndex - 1] ?? this.days.at(-1)
      }
    },
    nextExercise() {
      this.selectedPeriod = this.periods[this.periodIndex + 1] ?? this.periods[0]
      if (this.selectedPeriod === this.periods[0]) {
        this.selectedDay = this.days[this.dayIndex + 1] ?? this.days[0]
      }
    },
    setToday() {
      const now = new Date()

      const dayIndex = now.getDay()

      this.selectedDay = this.days[(dayIndex + 6)%7]

      const h = now.getHours()

      if(h<9) this.selectedPeriod = this.periods[0]
      else if(h<12) this.selectedPeriod = this.periods[1]
      else if(h<14) this.selectedPeriod = this.periods[2]
      else if(h<18) this.selectedPeriod = this.periods[3]
      else this.selectedPeriod = this.periods[4]
    },
    resetTimer() {
      this.startTimer = new Date().getTime()
    },
    toggleSound() {
      if (this.sound.paused) {
        this.sound.play()
        this.soundPaused = false
      } else {
        this.sound.pause()
        this.soundPaused = true
      }
    }
  },

  mounted() {
    this.setToday()
    this.timeoutId = setInterval(() => {
      this.timer = new Date().getTime()
    }, 10)
  },

  components: {
    Selector
  }
}
</script>

<style>
.core-app {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  box-sizing: border-box;
  justify-content: stretch;

  .controls {
    --margin: 2dvh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4dvh;
    justify-content: stretch;
    width: calc(100dvw - 2 * var(--margin));
    box-sizing: border-box;
    padding: 4dvh 0 4dvh;
    margin: 0 var(--margin);
    border-bottom: 1px solid #6552d6;
  }

  .workout {
    --gap: 5dvh;
    padding-top: 10dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 4dvh;
    text-align: center;
    gap: var(--gap);
    .exercise {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:not(:last-child):after {
        content: '';
        padding-top: var(--gap);
        border-bottom: 1px solid #6552d6;
        width: 20dvw;
      }
    }
  }

  .bottom-controls {
    position: absolute;
    bottom: 5dvh;
    left: 50dvw;
    translate: -50% 0;
    display: flex;
    gap: 5dvw;
    align-items: center;
    
    .refresh, .sound {
      --size: 70px;
      width: var(--size);
      aspect-ratio: 1;
      background: #6552d6;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        font-size: calc(var(--size) * 0.6);
        color: white;
      }
    }

    .timer {
      font-size: 5dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #6552d6;
      border-radius: 500px;
      padding: 0 3dvh;
      .timer-item {
        width: 7dvh;
        display: flex;
        justify-content: center;
      }
      .frac {
        width: 3dvh;
        font-size: 0.5em;
        align-self: flex-end;
        line-height: 2.3;
        margin-left: 0.2dvh;
      }
    }
  }
}
</style>