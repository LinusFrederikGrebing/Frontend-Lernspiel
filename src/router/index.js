import Vue from 'vue'
import VueRouter from 'vue-router'
import GameView from '../views/GameView'
import Onepager from '../views/Onepager'
import LevelSelect from '../views/LevelSelect'
import HelpOG from '../components/HelpTemplateOG'
import HelpNew from '../components/HelpTemplateNew'

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
  },
  {
    path: '/HelpNav',
    name: 'HelpOG',
    component: HelpOG
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router