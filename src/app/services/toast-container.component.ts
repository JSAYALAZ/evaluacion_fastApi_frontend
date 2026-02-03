import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed right-4 top-4 z-50 flex flex-col gap-3 w-xs">
      <ng-container *ngFor="let t of toasts">
        <div
          class="flex items-start gap-3 p-3 rounded-lg shadow-lg bg-white border-l-4"
          [ngClass]="{
            'border-green-500': t.type === 'success',
            'border-red-500': t.type === 'error',
            'border-sky-400': t.type === 'info'
          }"
          (mouseenter)="pause(t.id)"
          (mouseleave)="resume(t.id)"
        >
          <div class="flex-1 min-w-0 ">
            <div class="flex items-center justify-between gap-2">
              <div class="text-sm font-semibold truncate text-black">{{ t.title || (t.type | titlecase) }}</div>
              <button (click)="close(t.id)" aria-label="close" class="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div class="mt-1 text-sm text-slate-600 break-words">{{ t.message }}</div>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: (Toast & { timeoutId?: any, paused?: boolean, remaining?: number, endAt?: number })[] = [];
  sub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toasts$.subscribe(payload => {
      // add toast
      if ((payload as any).action !== 'remove') {
        const t = payload as Toast;
        const copy = {
          ...t,
          remaining: t.duration ?? 3500,
          paused: false,
          endAt: Date.now() + (t.duration ?? 3500)
        };
        // push at top
        this.toasts = [copy, ...this.toasts];
        this.startTimer(copy);
      } else {
        const id = (payload as any).id as string;
        this.toasts = this.toasts.filter(x => x.id !== id);
      }
    });
  }

  startTimer(t: any) {
    // clear previous if any
    if (t.timeoutId) clearTimeout(t.timeoutId);
    const run = () => {
      t.timeoutId = setTimeout(() => {
        this.toasts = this.toasts.filter((x: any) => x.id !== t.id);
      }, t.remaining);
      t.endAt = Date.now() + t.remaining;
    };
    run();
  }

  pause(id: string) {
    const t = this.toasts.find(x => x.id === id) as any;
    if (!t || t.paused) return;
    t.paused = true;
    if (t.timeoutId) {
      clearTimeout(t.timeoutId);
      t.timeoutId = null;
    }
    t.remaining = Math.max(0, t.endAt - Date.now());
  }

  resume(id: string) {
    const t = this.toasts.find(x => x.id === id) as any;
    if (!t || !t.paused) return;
    t.paused = false;
    this.startTimer(t);
  }

  close(id: string) {
    this.toasts = this.toasts.filter(x => x.id !== id);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.toasts.forEach(t => t.timeoutId && clearTimeout(t.timeoutId));
  }
}
