import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './options-sidebar.component.html',
})
export class OptionsSidebarComponent {
  @Input() text = '';
  @Input() url = '';
  @Input() userId = '';
  @Input() icon = '';

  @Output() clicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  handleClick() {
    if (this.text == 'Citas') {
      this.router.navigate([this.url], {
        queryParams: {
          userId: this.userId,
        },
      }); // navega
      return;
    }
    this.router.navigate([this.url]); // navega
    this.clicked.emit(); // notifica al padre
  }
}
