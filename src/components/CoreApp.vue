<template>
  <div class="core-app">
    <h1>Workout Planner</h1>

    <div class="controls">
      <label>Day:</label>
      <select v-model="selectedDay">
        <option v-for="day in days" :key="day" :value="day">
          {{ day }}
        </option>
      </select>

      <label>Period:</label>
      <select v-model="selectedPeriod">
        <option v-for="period in periods" :key="period" :value="period">
          {{ period }}
        </option>
      </select>

      <button @click="setToday">Use Today</button>
    </div>

    <div class="workout">
      <h2>{{ selectedDay }} - {{ selectedPeriod }}</h2>

      <ul v-if="currentWorkout.length">
        <li v-for="(exercise, index) in currentWorkout" :key="index">
          {{ exercise }}
        </li>
      </ul>

      <p v-else>No workout planned.</p>
    </div>
  </div>
</template>

<script>
const schedule = {
  Monday: {
    Morning: ["Pull-ups 4x60%"],
    WorkMorning: ["Curls 2x12", "Lateral raises 2x15"],
    Noon: ["Push-ups 2x15"],
    WorkAfternoon: ["Rowing 2x10"],
    Evening: ["Dumbbell press 4x8-12", "Push-ups max"]
  },

  Tuesday: {
    Morning: ["Pull-ups 4x60%"],
    WorkMorning: ["Rowing 2x10"],
    Noon: ["Rear delt fly 2x15"],
    WorkAfternoon: ["Curls 2x12"],
    Evening: ["Rowing heavy 4x8-12", "Pull-ups max"]
  },

  Wednesday: {
    Morning: ["Light pull-ups 3x50%"],
    WorkMorning: ["Mobility"],
    Noon: ["Plank"],
    WorkAfternoon: ["Mobility"],
    Evening: ["Recovery"]
  },

  Thursday: {
    Morning: ["Pull-ups 4x60%"],
    WorkMorning: ["Curls 2x12", "Lateral raises 2x15"],
    Noon: ["Push-ups 2x15"],
    WorkAfternoon: ["Rowing 2x10"],
    Evening: ["Dumbbell press 4x8-12", "Push-ups max"]
  },

  Friday: {
    Morning: ["Pull-ups 4x60%"],
    WorkMorning: ["Rowing 2x10"],
    Noon: ["Rear delt fly 2x15"],
    WorkAfternoon: ["Curls 2x12"],
    Evening: ["Rowing heavy 4x8-12", "Pull-ups max"]
  },

  Saturday: {
    Morning: ["Light pull-ups"],
    WorkMorning: ["Light"],
    Noon: ["Light"],
    WorkAfternoon: ["Light"],
    Evening: ["Optional"]
  },

  Sunday: {
    Morning: ["Rest"],
    WorkMorning: ["Rest"],
    Noon: ["Rest"],
    WorkAfternoon: ["Rest"],
    Evening: ["Rest"]
  }
}

export default {
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      periods: ["Morning", "WorkMorning", "Noon", "WorkAfternoon", "Evening"],
      selectedDay: "",
      selectedPeriod: "",

      workouts: schedule
    }
  },

  computed: {
    currentWorkout() {
      return this.workouts[this.selectedDay]?.[this.selectedPeriod] ?? []
    }
  },

  methods: {
    setToday() {
      const now = new Date();

      const dayIndex = now.getDay();
      const dayMap = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      this.selectedDay = dayMap[dayIndex];

      const h = now.getHours()
      let period = 'Evening'

      if(h<9) period = "Morning"
      else if(h<12) period = "WorkMorning"
      else if(h<14) period = "Noon"
      else if(h<18) period = "WorkAfternoon"
      
      this.selectedPeriod = period
    }
  },

  mounted() {
    this.setToday();
  }
};
</script>

<style>
.core-app {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 8px;
}

.workout ul {
  padding-left: 20px;
}
</style>