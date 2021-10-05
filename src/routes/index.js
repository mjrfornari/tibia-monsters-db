import Home from '../pages/Home'
import User from '../pages/User'

export const routes = [
    {
        path: '',
        component: Home,
        exact: true,
    },
    {
        path: 'monster',
        component: User,
        exact: true,
    },
]

export const fallbackRoute = Home
