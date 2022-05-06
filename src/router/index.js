import  {createRouter, createWebHistory} from 'vue-router'
import  Home from '../views/Home'
import  Dashboard from '../views/Dashboard'
import  User from '../views/User'
import  Connexion from '../views/Connexion'
import billing from '../views/User/Billing'
import profile from '../views/User/Profile'
// const  routess =[
//     {
//         path:'/Home',
//         name: 'Home',
//         component: Home
//     }
//     , {
//         path:'/About',
//         name: 'About',
//         component: About
//     },
//     {
//         path:'/User/:username',
//         name: 'User',
//         component: User,
//         children:[
//             {
//                 path:'profile',
//                 component: profile,
//             },
//             {
//                 path:'billing',
//                 component: billing,
//             },
//         ]
//     }
//
// ]

const router =createRouter({
    history:createWebHistory(),
    // routes:routess,
    routes:
    [
        {
            path:'/',
            name: 'Home',
            component: Home
        },
        {
        path:'/Dashboard',
        name: 'Dashboard',
        component: Dashboard
        },
        {
            path:'/Connexion',
            name: 'Connexion',
            component: Connexion
        },
        {
            path:'/User/:username',
            name: 'User',
            component: User,
            children:
            [{
            path:'profile',
            component: profile,
            },
            {
            path:'billing',
            component: billing,
            },]
        }
    ]
})
export default router