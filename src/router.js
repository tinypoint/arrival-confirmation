import Vue from 'vue'
import Router from 'vue-router'
import ArrivalConfirmation from './views/ArrivalConfirmation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'arrivalConfirmation',
      component: ArrivalConfirmation
    }
  ]
})
