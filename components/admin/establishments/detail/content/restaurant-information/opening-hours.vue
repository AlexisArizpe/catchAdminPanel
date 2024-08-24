<template>
  <div class="content-opening-hours">
    <!-- oItem.WeekDays -->
    <div
      class="content-item-opening-hours"
      v-for="(oItem, i) in oItem.WeekDays"
      :key="i"
    >
      <div class="content-checkbox">
        <v-checkbox v-model="oItem.bActive" hide-details></v-checkbox>

        <div class="content-txt-day">
          <p>{{ oItem.sName }}</p>
        </div>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="w-100p" v-bind="props">
            <v-text-field
              v-model="oItem.sHours"
              :disabled="!oItem.bActive"
              :readonly="!oItem.bActive"
              :rules="hourRangeRules"
              class="w-100p"
              readonly
              hide-details
              density="comfortable"
              variant="outlined"
              flat
              color="primary"
              bg-color="white"
              label="Rango de horario"
              placeholder="Seleccionar rango de horario"
              prepend-inner-icon="mdi mdi-clock-time-eight-outline"
              rounded="lg"
            ></v-text-field>
          </div>
        </template>
        <v-card v-if="oItem.bActive">
          <vue-date-picker
            class="date-picker-global"
            v-model="oItem.aHours"
            time-picker
            disable-time-range-validation
            inline
            auto-apply
            range
            locale="es"
            placeholder="horario"
          />
          <div class="content-btns-date-picker-global">
            <v-btn class="btn-second-global"> Cerrar </v-btn>
          </div>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    oItem: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    aWeekDays: [
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Domingo",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Lunes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Martes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Miércoles",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Jueves",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Viernes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Sábado",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
    ],
  }),
  watch: {
    "oItem.WeekDays": {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        newVal.forEach((day, index) => {
          if (day.bActive) {
            const start = day.aHours[0];
            const end = day.aHours[1];

            // Formatear las horas de inicio y fin
            const formattedStart = `${start.hours
              .toString()
              .padStart(2, "0")}:${start.minutes.toString().padStart(2, "0")}`;
            const formattedEnd = `${end.hours
              .toString()
              .padStart(2, "0")}:${end.minutes.toString().padStart(2, "0")}`;

            // Asignar el formato a sHours
            this.oItem.WeekDays[
              index
            ].sHours = `${formattedStart} - ${formattedEnd}`;
          } else {
            if (day.sHours !== `00:00 - 00:00`) {
              day.sHours = `00:00 - 00:00`;
              day.aHours = [
                { hours: 0, minutes: 0, seconds: 0 },
                { hours: 0, minutes: 0, seconds: 0 },
              ];
            }
          }
        });
      },
    },
  },
};
</script>
<style scoped>
.content-opening-hours {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.content-item-opening-hours {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 2 - 10px);
}
.content-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.content-txt-day {
  font-size: 0.9em;
  min-width: 70px;
}
</style>
