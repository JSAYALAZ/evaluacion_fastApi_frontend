import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new Subject<Toast | { action: 'remove', id: string }>();
  toasts$ = this.toastSubject.asObservable();

  private idCounter = 0;
  private makeId() { return `${Date.now()}-${this.idCounter++}`; }

  show(message: string, opts?: { title?: string, type?: ToastType, duration?: number }) {
    const toast: Toast = {
      id: this.makeId(),
      title: opts?.title,
      message,
      type: opts?.type ?? 'info',
      duration: opts?.duration ?? 3500
    };
    this.toastSubject.next(toast);
    return toast.id;
  }

  success(message: string, title?: string, duration?: number) {
    return this.show(message, { title, type: 'success', duration });
  }

  error(message: string, title?: string, duration?: number) {
    return this.show(message, { title, type: 'error', duration });
  }

  remove(id: string) {
    this.toastSubject.next({ action: 'remove', id });
  }
}
