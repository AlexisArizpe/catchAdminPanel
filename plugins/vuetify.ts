import { createVuetify, type ThemeDefinition } from "vuetify"
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import DateFnsAdapter from '@date-io/date-fns'

// option to create customized theme
const myLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        backgroundPanel: '#f8f8f8',
        primary: '#000000',
        grey: '#F5F5F5',
        white: '#FFFFFF',
        green:'#86C157',
        greenBtn: "#DBEDCD",
        yellowprimary: '#FCF538',
        purpleprimary: '#463a96',
        blue: '#265DEA',
        textLight: '#FFFFFF',
        textDark: '#283C4D',
        info: '#407DDA',
        error: '#FF0000',
        red: '#C62C2C',
        orange: '#FF8A00'
    }
}
const myDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#FFFFFF',
        backgroundPanel: '#f8f8f8',
        primary: '#000000',
        grey: '#F5F5F5',
        white: '#FFFFFF',
        green:'#86C157',
        greenBtn: "#DBEDCD",
        yellowprimary: '#FCF538',
        purpleprimary: '#463a96',
        blue: '#265DEA',
        textLight: '#FFFFFF',
        textDark: '#283C4D',
        info: '#407DDA',
        error: '#FF0000',
        red: '#C62C2C',
        orange: '#FF8A00'
    }
}


export default defineNuxtPlugin(nuxtApp => {
    // initialize vuetify config
    const Vuetify = createVuetify({
        date: {
            adapter: DateFnsAdapter
        },
        components: {
            ...components,
        },
        directives,
        // theme configuration
        theme: {
            defaultTheme: 'myLightTheme',
            themes: {
                myLightTheme,
                myDarkTheme
            }
        }
    })
    nuxtApp.vueApp.use(Vuetify)
})