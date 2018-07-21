import Vue from 'vue'
import Router from 'vue-router'
import ArrivalConfirmation from './views/ArrivalConfirmation'
import ArrivalUnload from './views/ArrivalUnload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'arrivalConfirmation',
      component: ArrivalConfirmation
    },
    {
      path: '/arrivalUnload/:id',
      name: 'arrivalUnload',
      component: ArrivalUnload
    }
  ]
})
