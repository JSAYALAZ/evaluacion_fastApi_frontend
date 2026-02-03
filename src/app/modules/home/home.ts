import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingPage } from '../../pages/loading-page/loading-page';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingPage],
  templateUrl: './home.html',
})
export class Home {
  private activateRoute = inject(ActivatedRoute);
}
