import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AxiosService<T> {
  private dataSubject = new BehaviorSubject<T | undefined>(undefined);
  data$ = this.dataSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | undefined>(undefined);
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetch(url: string, params?: Record<string, any>, defaultValue?: T) {
    this.loadingSubject.next(true);
    this.errorSubject.next(undefined);

    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        httpParams = httpParams.set(key, val);
      });
    }

    this.http
      .get<ApiResponse<T>>(url)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);

          this.errorSubject.next(err.error?.message || 'Error desconocido');

          if (defaultValue !== undefined) {
            this.dataSubject.next(defaultValue);
          }

          return of(null);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe({
        next:(res)=>{
          if (res?.success) {
          this.dataSubject.next(res.data);
        }
        },
        error: (err) => {
          if (err.error.message) {
            this.errorSubject.next(err.error.message);
          }else{
            this.errorSubject.next("Error desconocido");
          }
        },
      }
    );
  }
}
