import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editable: false,
    fireUser: null,
    user: null,
    myImage:require("@/assets/about-origin.jpg"),
    illustrationImage: require("@/assets/about-black.jpg"),
    illustrationDescription: "Illustration of me",
    transition: false,
    changePerspective: false,
    perspectiveText: "3D Mode",
    isMobile: false,
    rangeSliderValue: null,
    maxRangeSliderValue: 2,
    isIntroVisible: false,
    projectImageSlider: 0,

    projects:[
      {
        id:'calorie-Diary',
        imgSrc: require('@/assets/calorie.jpg'),
        name: "Calorie Diary",
        labels:['Vue.js', 'Vuetify', 'javascript']
      },
      {
        id:'punch-game',
        imgSrc: require('@/assets/punch.jpg'),
        name: "Punch Game",
        labels:['Vue.js', 'Vuetify','sass', 'javascript']

      },
      {
        id:'Fastest-click-Game',
        imgSrc: require('@/assets/click.jpg'),
        name: "Fastest Click Game",
        labels:['Vue.js', 'Vuetify','sass', 'javascript']

      },
      {
        id:'todolist',
        imgSrc: require('@/assets/todolist.jpg'),
        name: "Todo List",
        labels:['Vue.js', 'Vuetify','firebase','sass','javascript']

      }
    ],
    skills:[
      {
        id:0,
        name:'HTML',
        percent:'88'
      },
      {
        id:1,
        name:'CSS',
        percent:'75'
      },
      {
        id:2,
        name:'SASS',
        percent:'60'
      },
      {
        id:3,
        name:'Vue.js',
        percent:'70'
      },
      {
        id:4,
        name:'Vuex',
        percent:'40'
      },
      {
        id:5,
        name:'Javascript',
        percent:'60'
      },
      {
        id:6,
        name:'Firebase',
        percent:'40'
      },
    ]
  },
  getters: {
    routeTransition:state => state.transition,
    changePerspective : state => state.changePerspective,
    getRangeSliderValue : state => state.rangeSliderValue,   
    isMobile : state => state.isMobile,
    isIntroVisible : state => state.isIntroVisible,
    getProject : state => id => state.projects.find(project => project.id === id)

    
  },
  mutations: {
    setEdit(state, edit) {
      state.editable = edit;
    },
    setFireUser(state, fu) {
      state.fireUser = fu;
    },
    setUser(state, user) {
      state.user = user;
    },
    updateChangePerspective(state, payload){
      state.changePerspective = payload
      if( state.changePerspective){
        state.perspectiveText = "Normal Mode"
      } else {
        state.perspectiveText = "3D Mode"
      }
    },
    updateTransition(state,payload){
      state.transition = payload
    },
    updateRangeSliderValue : (state, payload) => {
      state.rangeSliderValue = payload
    }, 
    isMobile: (state, payload) => {
      state.isMobile = payload;
    },
    isIntroVisible: (state, payload) => {
      state.isIntroVisible = payload;
    },
  },
  actions: {}
});
