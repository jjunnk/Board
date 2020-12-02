import Vue from "vue";
import Vuetify from "vuetify/lib";
import '@fortawesome/fontawesome-free/css/all.css' 

// #Internationalization (i18n)
import ko from 'vuetify/es5/locale/ko'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

const theme={
  themes :{
    dark:{
      base : '#121212',
      base1 : '#0D0D0D',
      primary:'#ebdaca', // beige
      secondary:'#655d5d', // dark brown
      info:'#655d5d', // dark brown
      accent:'#ad9789', // brown
      success:'#69754d' // green

    },
    light:{
      base:'#fff',
      base1:'#FEFCF5', // white beige
      primary:'#0D0D0D', // black
      secondary:'#ebdaca', // beige
      accent:'#ad9789', // brown
      info:'#655d5d', // dark brown
      success:'#69754d' // green
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
    icons: {
      iconfont: 'fa',
    },
});
