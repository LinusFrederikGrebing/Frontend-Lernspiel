import Vue from 'vue'
import HelpTemplateDesktop from "@/components/HelpComponents/HelpTemplateDesktop";
import VueRouter from 'vue-router'
import GameView from '../views/GameView'
import GameViewFreeMode from '../views/GameViewFreeMode'
import Onepager from '../views/Onepager'
import LevelSelect from '@/components/OnePagerComponents/LevelSelect';

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Onepager',
    component: Onepager
  },
  {
    path: '*',
    redirect: '/'
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
    path: '/GameViewFreeMode',
    name: 'GameViewFreeMode',
    component: GameViewFreeMode
  },
  {
    path: '/Help',
    name: 'HelpTemplateDesktop',
    component: HelpTemplateDesktop
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router