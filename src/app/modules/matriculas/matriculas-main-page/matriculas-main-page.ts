import { Component } from '@angular/core';
import { AxiosService } from '../../../services/axios.service';
import { APP_ROUTES } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingPage } from '../../../pages/loading-page/loading-page';
import { EmptyPage } from '../../../pages/empty-page/empty-page';
import { MatriculaCard, MatriculaOutputDTO } from '../matriculas-card/matriculas-card';

@Component({
  selector: 'app-matricula-main-page',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, MatriculaCard,LoadingPage, EmptyPage],
  templateUrl: './matriculas-main-page.html',
})
export class MatriculaMainPage {
  get data$() {
    return this.axios.data$;
  }
  get loading$() {
    return this.axios.loading$;
  }
  get error$() {
    return this.axios.error$;
  }

  constructor(private axios: AxiosService<MatriculaOutputDTO[]>, private router: Router) {}
  ngOnInit() {
    this.axios.fetch(APP_ROUTES.main.childrens.matricula.apiPath, { page: 1 }, []);
  }
crearMatricula() {
    this.router.navigate([APP_ROUTES.main.childrens.matricula_new.absolutePath]);
  }

}
