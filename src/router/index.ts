import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultsView from '@/views/ResultsView.vue'
import AboutView from '@/views/AboutView.vue'
import DetailsView from '@/views/DetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/results', name: 'ResultsView', component: ResultsView },
    { path: '/about', name: 'AboutView', component: AboutView },
    { path: '/details/:masterId', name: 'DetailsView', component: DetailsView, props: true },
  ],

  
})

export default router
