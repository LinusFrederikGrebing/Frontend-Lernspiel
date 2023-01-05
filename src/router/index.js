import Vue from 'vue'
import VueRouter from 'vue-router'
import GameView from '../views/GameView'
import Onepager from '../views/Onepager'
import LevelSelect from '../views/LevelSelect'
import Help from '../views/HelpTemplate'

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
    name: 'Help',
    component: Help
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router