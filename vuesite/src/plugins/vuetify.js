import Vue from "vue";
import Vuetify from "vuetify/lib";

// #Internationalization (i18n)
import ko from 'vuetify/es5/locale/ko'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

const theme={
  themes :{
    light:{
      primary:'#0D0D0D', // black
      secondary:'#404040', // grey
      accent:'#EBB9B8', // light grey
      info:'#293724', // green
      success:'#e44d2a' // orange
    },
    // dark: {
    //   primary: colors.blue.lighten3,
    // }
  }
}


export default new Vuetify({
    lang: {
        locales: { ko,en },
        current: 'ko',
      },
    theme,
    breakpoint: {
      thresholds: {
        xs: 340,
        sm: 540,
        md: 800,
        lg: 1280,
      },
      scrollBarWidth: 24,
    },
});
