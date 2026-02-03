import { Component } from '@angular/core';
import { AxiosService } from '../../../services/axios.service';
import { APP_ROUTES } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingPage } from '../../../pages/loading-page/loading-page';
import { EmptyPage } from '../../../pages/empty-page/empty-page';
import { CategoryCard, CategoryOutputDTO } from '../category-card/category-card';

@Component({
  selector: 'app-category-main-page',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, CategoryCard,LoadingPage, EmptyPage],
  templateUrl: './category-main-page.html',
})
export class CategoryMainPage {
  get data$() {
    return this.axios.data$;
  }
  get loading$() {
    return this.axios.loading$;
  }
  get error$() {
    return this.axios.error$;
  }

  constructor(private axios: AxiosService<CategoryOutputDTO[]>, private router: Router) {}
  ngOnInit() {
    this.axios.fetch(APP_ROUTES.main.childrens.category.apiPath, { page: 1 }, []);
  }


}
