<template>
  <div class="core-app" v-touch:swipe.right="previousExercise" v-touch:swipe.left="nextExercise">
    <div class="controls">
      <selector v-model="selectedDay" :options="days"></selector>
      <selector v-model="selectedPeriod" :options="periods"></selector>
    </div>

    <div class="workout">
      <div v-for="(exercise, index) in currentWorkout" :key="index" class="exercise">{{ exercise }}</div>
    </div>

    <div class="refresh"><span class="material-icons" @click="setToday">gps_fixed</span></div>
  </div>
</template>

<script>
import Selector from './Selector.vue';

const schedule = {
  LUN: {
    Reveil: ['Pull-ups 4x3'],
    Matin: ['Curls 2x12', 'Lateral raises 2x15'],
    Midi: ['Push-ups 2x15'],
    Aprem: ['Rowing 2x10'],
    Soir: ['Dumbbell press 4x8-12', 'Push-ups max']
  },

  MAR: {
    Reveil: ['Pull-ups 4x3'],
    Matin: ['Rowing 2x10'],
    Midi: ['Rear delt fly 2x15'],
    Aprem: ['Curls 2x12'],
    Soir: ['Rowing 4x8-12', 'Pull-ups max']
  },

  MER: {
    Reveil: ['Pull-ups 3x2'],
    Matin: ['Arm swing 20'],
    Midi: ['Plank 3x30sec'],
    Aprem: ['Rotation du tronc 20'],
    Soir: ['Plank 3x30sec']
  },

  JEU: {
    Reveil: ['Pull-ups 4x3'],
    Matin: ['Curls 2x12', 'Lateral raises 2x15'],
    Midi: ['Push-ups 2x15'],
    Aprem: ['Rowing 2x10'],
    Soir: ['Dumbbell press 4x8-12', 'Push-ups max']
  },

  VEN: {
    Reveil: ['Pull-ups 4x3'],
    Matin: ['Rowing 2x10'],
    Midi: ['Rear delt fly 2x15'],
    Aprem: ['Curls 2x12'],
    Soir: ['Rowing heavy 4x8-12', 'Pull-ups max']
  },

  SAM: {
    Reveil: ['Repos'],
    Matin: ['Repos'],
    Midi: ['Repos'],
    Aprem: ['Repos'],
    Soir: ['Repos']
  },

  DIM: {
    Reveil: ['pull-ups 3x2'],
    Matin: ['deadhang 30sec'],
    Midi: ['scapular pull-ups 10'],
    Aprem: ['deadhang 30sec'],
    Soir: ['Optional']
  }
}

export default {
  data() {
    return {
      days: ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(e => ({label: e})),
      periods: [{label: 'Reveil', icon: 'alarm'}, {label: 'Matin', icon: 'light_mode'}, {label: 'Midi', icon: 'restaurant_menu'}, {label: 'Aprem', icon: 'light_mode'}, {label: 'Soir', icon: 'bedtime'}],
      selectedDay: undefined,
      selectedPeriod: undefined,

      workouts: schedule
    }
  },

  computed: {
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

      this.selectedDay = this.days[(dayIndex - 1)%7]

      const h = now.getHours()

      if(h<9) this.selectedPeriod = this.periods[0]
      else if(h<12) this.selectedPeriod = this.periods[1]
      else if(h<14) this.selectedPeriod = this.periods[2]
      else if(h<18) this.selectedPeriod = this.periods[3]
      else this.selectedPeriod = this.periods[4]
    }
  },

  mounted() {
    this.setToday()
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

  .refresh {
    --size: 100px;
    position: absolute;
    bottom: 5dvh;
    left: calc(50dvw - var(--size) / 2);
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
}
</style>