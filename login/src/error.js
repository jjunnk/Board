import Vue from 'vue'

Vue.config.errorHandler = e => {
    console.log(e.message)
    console.log('here')


}