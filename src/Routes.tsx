import { Route } from 'react-router';

import RegisterPage from './components/register/RegisterPage';
import UsersListPage from './components/admin/UsersListPage';

export interface IRoute {
  name: string;
  path: string;
  menu?: boolean;
  Component: any;
}

export const publicRoutes: Array<IRoute> = [
  {
    menu: true,
    name: 'Register',
    path: '/register',
    Component: RegisterPage
  },
  {
    name: 'Register',
    path: '/',
    Component: RegisterPage
  },
]

export const adminRoutes: Array<IRoute> = [
  {
    menu: true,
    name: 'Users',
    path: '/users-list',
    Component: UsersListPage
  },
  {
    name: 'Users',
    path: '/',
    Component: UsersListPage
  },
]

export const getRoutes = (isAdmin?: boolean, menu?: boolean) => (isAdmin ? adminRoutes : publicRoutes).filter(route => menu ? route.menu : true);

export const getRouteComponents = (isAdmin?: boolean) => {
  const routes = getRoutes(isAdmin);

  return routes.map(route => (<Route key={route.path} path={route.path} component={route.Component} exact={true}/>))
}