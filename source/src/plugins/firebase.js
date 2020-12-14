import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";
import firebaseConfig from "../../firebaseConfig";
import store from "../store/";

firebase.initializeApp(firebaseConfig);
let unsubscribe = null;

const subscribe = (fu) => {
  const ref = firebase
    .firestore()
    .collection("users")
    .doc(fu.uid); // subscribe 할때 유저 감시
  unsubscribe = ref.onSnapshot(doc => { // document 감시
    if (doc.exists) store.commit("setUser", doc.data());
  }, console.error);
};

firebase.auth().onAuthStateChanged(fu => {
  store.commit("setFireUser", fu);
  if (!fu) {
    store.commit("setUser", null);
    if (unsubscribe) unsubscribe(); // 해지
    return;
  }
  subscribe(fu);
});

Vue.prototype.$firebase = firebase;
