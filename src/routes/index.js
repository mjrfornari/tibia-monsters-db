import Home from '../pages/Home'
import Creature from '../pages/Creature'

export const routes = [
    {
        path: '',
        component: Home,
        exact: true,
    },
    {
        path: 'creature',
        component: Creature,
        exact: true,
    },
]

export const fallbackRoute = Home
