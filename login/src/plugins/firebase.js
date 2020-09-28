import Vue from 'vue'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth"
import 'firebase/database'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase