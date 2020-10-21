import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'
import firebaseConfig from '../../firebaseConfig'
import store from '../store/'

firebase.initializeApp(firebaseConfig)

// 파이어베이스 구글로그인 사용자
firebase.auth().onAuthStateChanged((fu) => store.commit('setFireUser', fu))

Vue.prototype.$firebase = firebase
