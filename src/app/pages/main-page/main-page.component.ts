import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarCompComponent } from '../../components/sidebar-comp/sidebar-comp.component';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SidebarCompComponent, RouterOutlet, CommonModule, NgStyle],
  templateUrl: './main-page.component.html',
})
export class MainPage {
  constructor() {}
}
