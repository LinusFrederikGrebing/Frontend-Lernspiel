import Vue from 'vue'
import VueRouter from 'vue-router'
import GameView from '../views/GameView'
import Onepager from '../views/Onepager'
import LevelSelect from '../views/LevelSelect'
import HelpNew from '../components/HelpComponents/HelpTemplateNew'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Onepager',
    component: Onepager
  },
  {
    path:'/LevelSelect',
    name:'LevelSelect',
    component: LevelSelect
  },
  {
    path: '/GameView',
    name: 'GameView',
    component: GameView
  },
  {
    path: '/Help',
    name: 'HelpNew',
    component: HelpNew
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router