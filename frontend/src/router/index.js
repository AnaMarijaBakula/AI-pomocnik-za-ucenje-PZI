import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadProjectView from '../views/UploadProjectView.vue'
import AdviceAreaView from "@/views/AdviceAreaView.vue";
import SignIn from "@/views/SignInView.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/uploadproject',
      name: 'uploadproject',
      component: UploadProjectView,
    },
    {
      path: '/advice',
      name: 'advice',
      component: AdviceAreaView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
  ],
})

export default router
