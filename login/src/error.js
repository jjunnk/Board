import Vue from 'vue'

Vue.config.errorHandler = e => {
<<<<<<< HEAD
    console.log(e.message)
    console.log('here')


=======
  console.error(e.message)
  Vue.prototype.$toast.error(e.message)
  console.log('here')
>>>>>>> 076f3b43180ae228af9c809080ef79118d68b036
}