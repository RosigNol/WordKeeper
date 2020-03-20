import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/baseline'),
        children: [

            {
                path: '',
                name: 'Home',
                component: () => import('@/pages/Home.vue')
            }
        ]
  },
  {
    path: '/favorites',
    component: () => import('@/layouts/baseline'),
        children: [

            {
                path: '',
                name: 'Favorites',
                component: () => import('@/pages/Favorites.vue')
            }
        ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
