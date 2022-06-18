import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Groupomania' },
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/PostsView.vue')
  },
  {
    path: '/single-post/:id',
    name: 'single-post',
    component: () => import('../views/SinglePostView.vue')
  },
  {
    path: '/new-post',
    name: 'new-post',
    component: () => import('../views/NewPostView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((toRoute,fromRoute,next) => {
  window.document.title = toRoute.meta.title;
  next();
})

export default router
