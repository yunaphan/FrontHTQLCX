<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar
          :now="today"
          :value="today"
          color="primary"

        >
          <template v-slot:day="{ present, past, date }" @click="showDate(date)">
            <v-row
              class="fill-height"
            >
              <template v-if="past && tracked[date]">
                <v-sheet
                  
                > t  Tiêu đề lịch thi công</v-sheet>
              </template>
            </v-row>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      today: new Date().getFullYear() + '-' + new Date().getMonth() + 1 +'-' + new Date().getDate(),
      tracked: {
        '2019-01-09': [23, 45, 20],
        '2019-01-08': [10],
        '2019-01-07': [0, 78, 5],
        '2019-01-06': [0, 0, 50],
        '2019-01-05': [0, 10, 23],
        '2019-01-04': [2, 90],
        '2019-01-03': [10, 32],
        '2019-01-02': [80, 10, 10],
        '2019-01-01': [20, 25, 10],
      },
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['Development', 'Meetings', 'Slacking'],
    }),
    methods:
    {
        showDate(date)
        {
            console.log(date)
        }
    }
  }
</script>