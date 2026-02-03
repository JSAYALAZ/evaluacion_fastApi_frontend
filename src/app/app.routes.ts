import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page.component';
import { Home } from './modules/home/home';
import { CategoryMainPage } from './modules/usuarios/category-main-page/category-main-page';
import { CategoryNewPage } from './modules/usuarios/category-new-page/category-new-page';
export const environment = {
  production: false,
  api: 'http://localhost:8180/minimarket/api/',
};

export interface RouteConfig {
  path: string;
}

export interface ModuleRoute {
  name: string; 
  api_path: string; 
  routes: Record<string, RouteConfig>;
}
export const APP_ROUTES = {
  main: {
    path: 'idx',
    component: MainPage,
    childrens: {
      main: { path: '', absolutePath: 'idx/', component: Home },
      category: {
        path: 'categorias',
        absolutePath: 'idx/categorias',
        component: CategoryMainPage,
        apiPath: `${environment.api}category`,
      },
      category_new: {
        path: 'categorias/new',
        absolutePath: 'idx/categorias/new',
        component: CategoryNewPage,
        apiPath: `${environment.api}category`,
      },
    
    },
  },
};

export const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.main.childrens.category.absolutePath, pathMatch: 'full' },
{
    path: APP_ROUTES.main.path,
    component: APP_ROUTES.main.component,
    children: [
      {
        path: APP_ROUTES.main.childrens.category.path,
        component: APP_ROUTES.main.childrens.category.component,
      },
      {
        path: APP_ROUTES.main.childrens.category_new.path,
        component: APP_ROUTES.main.childrens.category_new.component,
      },
      
      
    ],
  },
];
