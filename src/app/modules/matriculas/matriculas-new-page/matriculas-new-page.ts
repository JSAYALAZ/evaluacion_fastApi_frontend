import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from '../../../app.routes';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-matricula-new-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './matriculas-new-page.html',
})
export class MatriculaNewPage {
  private activateRoute = inject(ActivatedRoute);

  authForm!: FormGroup;
  loadingSubmit: boolean = false;

  constructor(private route: Router, private http: HttpClient, private toast: ToastService) {
    this.initForm();
  }
  initForm() {
    this.authForm = new FormGroup({
      placa: new FormControl('', Validators.required),
      propietario: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      fabricacion: new FormControl('', Validators.required),
      valor_comercial: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    this.loadingSubmit = true;
    if (!this.authForm.valid) {
      this.loadingSubmit = false;
      return;
    }

    try {
      const object = {
        placa: this.authForm.value.placa,
        propietario: this.authForm.value.propietario,
        marca: this.authForm.value.marca,
        fabricacion: Number(this.authForm.value.fabricacion),
        valor_comercial:Number( this.authForm.value.valor_comercial),
      };

      this.http.post(APP_ROUTES.main.childrens.matricula.apiPath, object).subscribe({
        next: (v: any) => {
          if (v.success) {
            this.toast.success('Guardado correctamente', 'Hecho');
            setTimeout(() => {
              this.route.navigate([APP_ROUTES.main.childrens.matricula.absolutePath]);
            }, 5000);
          }
        },
        error: (err) => {
          if (err.error.message) {
            this.toast.error(err.error.message, 'Control');
          }
        },
      });
    } catch (err: any) {
      if (err instanceof Error) {
      }
    } finally {
      this.loadingSubmit = false;
    }
  }
  ngOnInit() {}
}
