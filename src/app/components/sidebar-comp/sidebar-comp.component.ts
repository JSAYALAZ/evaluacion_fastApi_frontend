import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OptionsSidebarComponent } from '../buttons/options-sidebar/options-sidebar.component';
import { APP_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-sidebar-comp',
  standalone: true,
  imports: [CommonModule, OptionsSidebarComponent],
  templateUrl: './sidebar-comp.component.html',
})
export class SidebarCompComponent implements OnInit {
  pinUp = true;


  modules = [
    {
      name: 'Inicio',
      rol: 'ANY',
      icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
      routes: {
        main: { path: APP_ROUTES.main.childrens.main.absolutePath },
      },
    },

    {
      name: 'Matriculas',
      rol: 'ANY',
      icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z',
      routes: {
        main: { path: APP_ROUTES.main.childrens.matricula.absolutePath },
      },
    },
   

  ];

  ngOnInit(): void {}
}
