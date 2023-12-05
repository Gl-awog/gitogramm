import { FeedsPage } from '@/pages/feedsPage'
import { Page404 } from '@/pages/page404'
import { StoriesPage } from '@/pages/storiesPage'

export default [
  {
    path: '/',
    name: 'home',
    component: FeedsPage
  },
  {
    path: '/stories',
    name: 'stories',
    component: StoriesPage,
    props: true
  },
  {
    path: '/stories/:initialSlide(\\d+)',
    name: 'storiesSlide',
    component: StoriesPage,
    props: true
  },
  {
    path: '/:pathMatch(.*)',
    component: Page404
  }
]
