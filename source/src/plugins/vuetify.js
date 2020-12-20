import '@fortawesome/fontawesome-free/css/all.css'
import ko from 'vuetify/es5/locale/ko'
import en from 'vuetify/es5/locale/en'
import Vue from "vue";

import Vuetify, {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VToolbar,
  VToolbarTitle,
  VCard,
  VCardActions,
  VCardTitle,
  VCardText,
  VCardSubtitle,
  VContainer,
  VSheet,
  VDialog,
  VMenu,
  VBtn,
  VIcon,
  VProgressCircular,
  VRow,
  VCol,
  VList,
  VAvatar,
  VListGroup,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VListItemContent,
  VDataTable,
  VDataTableHeader,
  VListItemAction,
  VSpacer,
  VDivider,
  VSkeletonLoader,
  VFooter,
  VSubheader,
} from 'vuetify/lib';
import {
  Ripple
} from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VToolbar,
    VToolbarTitle,
    VCard,
    VCardActions,
    VCardTitle,
    VCardText,
    VCardSubtitle,
    VContainer,
    VSheet,
    VDialog,
    VMenu,
    VBtn,
    VIcon,
    VProgressCircular,
    VRow,
    VCol,
    VList,
    VAvatar,
    VListGroup,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemContent,
    VDataTable,
    VDataTableHeader,
    VListItemAction,
    VSpacer,
    VDivider,
    VSkeletonLoader,
    VFooter,
    VSubheader,
  },
  directives: {
    Ripple,
  },
})

const theme = {
  themes: {
    dark: {
      base: '#121212',
      base1: '#0D0D0D',
      primary: '#ebdaca', // beige
      secondary: '#655d5d', // dark brown
      info: '#655d5d', // dark brown
      accent: '#ad9789', // brown
      success: '#69754d' // green

    },
    light: {
      base: '#fff',
      base1: '#FEFCF5', // white beige
      primary: '#0D0D0D', // black
      secondary: '#ebdaca', // beige
      accent: '#ad9789', // brown
      info: '#655d5d', // dark brown
      success: '#69754d' // green
    },
  }
}


export default new Vuetify({
  lang: {
    locales: {
      ko,
      en
    },
    current: 'ko',
  },
  theme,
  breakpoint: {
    xsOnly: true,
    smOnly: true,
    smAndDown: true,
    smAndUp: true,
    mdOnly: true,
    mdAndDown: true,
    mdAndUp: true,
    lgOnly: true,
    lgAndDown: true,
    lgAndUp: true,
    xlOnly: true,
    // true if screen width < mobileBreakpoint
    mobile: true,
    mobileBreakpoint: 600,

    thresholds: {
      xs: 340,
      sm: 600,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 8,
  },
  icons: {
    iconfont: 'fa',
  },
});