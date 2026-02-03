import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from '../../../app.routes';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-category-new-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-new-page.html',
})
export class CategoryNewPage {
  private activateRoute = inject(ActivatedRoute);

  authForm!: FormGroup;
  loadingSubmit: boolean = false;

  constructor(private route: Router, private http: HttpClient, private toast: ToastService) {
    this.initForm();
  }
  initForm() {
    this.authForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
        name: this.authForm.value.name,
      };

      this.http.post(APP_ROUTES.main.childrens.category.apiPath, object).subscribe({
        next: (v: any) => {
          if (v.success) {
            this.toast.success('Guardado correctamente', 'Hecho');
            setTimeout(() => {
              this.route.navigate([APP_ROUTES.main.childrens.category.absolutePath]);
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
