import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page.component';
import { Home } from './modules/home/home';
import { MatriculaMainPage } from './modules/matriculas/matriculas-main-page/matriculas-main-page';
import { MatriculaNewPage } from './modules/matriculas/matriculas-new-page/matriculas-new-page';
export const environment = {
  production: false,
  api: 'http://127.0.0.1:8000/api/',
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
      matricula: {
        path: 'matriculas',
        absolutePath: 'idx/matriculas',
        component: MatriculaMainPage,
        apiPath: `${environment.api}matricula`,
      },
      matricula_new: {
        path: 'matriculas/new',
        absolutePath: 'idx/matriculas/new',
        component: MatriculaNewPage,
        apiPath: `${environment.api}matricula`,
      },
    
    },
  },
};

export const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.main.childrens.matricula.absolutePath, pathMatch: 'full' },
{
    path: APP_ROUTES.main.path,
    component: APP_ROUTES.main.component,
    children: [
      {
        path: APP_ROUTES.main.childrens.matricula.path,
        component: APP_ROUTES.main.childrens.matricula.component,
      },
      {
        path: APP_ROUTES.main.childrens.matricula_new.path,
        component: APP_ROUTES.main.childrens.matricula_new.component,
      },
      
      
    ],
  },
];
