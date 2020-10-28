import Vue from "vue";
import Vuetify from "vuetify/lib";

// #Internationalization (i18n)
import ko from 'vuetify/es5/locale/ko'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ko,en },
        current: 'ko',
      },
});
