import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
export type CategoryOutputDTO = {
  id: string;
  name: string;
};
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.html',
})
export class CategoryCard {
  @Input({ required: true }) category!: CategoryOutputDTO;

  constructor(private router: Router) {}

  getInitial() {
    return this.category?.name?.[0]?.toUpperCase() ?? '?';
  }
}
