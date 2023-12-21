import { FeedsPage } from '@/pages/feedsPage'
import { Page404 } from '@/pages/page404'
import { StoriesPage } from '@/pages/storiesPage'
import { AuthPage } from '@/pages/authPage'
import { UserPage } from '@/pages/userPage'
import { UserReposSubPage } from '@/pages/userReposSubPage'
import { UserFollowingSubPage } from '@/pages/userFollowingSubPage'

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
    path: '/user',
    name: 'user',
    redirect: '/user/repositories',
    component: UserPage,
    children: [
      {
        path: 'repositories',
        name: 'repositories',
        component: UserReposSubPage
      },
      {
        path: 'following',
        name: 'following',
        component: UserFollowingSubPage
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage
  },
  {
    path: '/:pathMatch(.*)',
    component: Page404
  }
]
