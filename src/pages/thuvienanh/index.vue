<template>
  <v-row>
    <v-col
      sm="12"
      lg="3"
      class="mb-4 controls"
    >
      <v-btn
        fab
        outlined
        small
        absolute
        left
        color="primary"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        fab
        outlined
        small
        absolute
        right
        color="primary"
        @click="$refs.calendar.next()"
      >
        <v-icon dark>mdi-chevron-right</v-icon>
      </v-btn>
      <br><br><br>
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Kiểu lịch"
      ></v-select>
      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Ngày bắt đầu"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        v-if="hasEnd"
        ref="endMenu"
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end"
            label="End Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="end"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="endMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.endMenu.save(end)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      
    </v-col>
    <v-col
      sm="12"
      lg="9"
      class="pl-4"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"
          :end="end"
          :min-weeks="minWeeks"
          :max-days="maxDays"
          :now="now"
          :dark="dark"
          :weekdays="weekdays"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
          :short-intervals="shortIntervals"
          :short-months="shortMonths"
          :short-weekdays="shortWeekdays"
          :color="color"
        >
          <template v-slot:day="day">
            <v-sheet
              v-if="day.day % 3 === 0"
              :color="color"
              class="white--text pa-1"
            >
              Tưới {{ day.date }}
            </v-sheet>
          </template>
          <template v-slot:header="day">
            <div
              v-if="day.weekday % 2"
              class="day-header"
            >
              Đầu tuần {{ day.date }}
            </div>
          </template>
          <template v-slot:day-body="day">
            <div
              v-if="day.weekday % 3 === 2"
              class="day-body"
            >
              Giữa tuần {{ day.date }}
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
  const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]
  const intervalsDefault = {
    first: 0,
    minutes: 60,
    count: 24,
    height: 40,
  }
  export default {
    data: () => ({
      dark: false,
      startMenu: false,
      start: '2019-01-12',
      endMenu: false,
      end: '2019-01-27',
      nowMenu: false,
      minWeeks: 1,
      now: null,
      type: 'month',
      typeOptions: [
        { text: 'Ngày', value: 'day' },
        { text: 'Tuần', value: 'week' },
        { text: 'Tháng', value: 'month' },
      ],
      weekdays: weekdaysDefault,
      intervals: intervalsDefault,
      maxDays: 7,
      styleInterval: 'default',
      color: 'primary',
    }),
    methods: {
    },
  }
</script>
<style scoped>
.controls {
  position: relative;
}
</style>