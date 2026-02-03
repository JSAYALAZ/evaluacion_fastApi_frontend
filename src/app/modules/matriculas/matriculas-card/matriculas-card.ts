import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
export type MatriculaOutputDTO = {
  placa: string
    propietario: string
    marca: string
    fabricacion: number
    valor_comercial: number
    impuestos: number
    codigo_revision: string
};
@Component({
  selector: 'app-matricula-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriculas-card.html',
})
export class MatriculaCard {
  @Input({ required: true }) matricula!: MatriculaOutputDTO;

  constructor(private router: Router) {}

  getInitial() {
    return this.matricula?.placa?.[0]?.toUpperCase() ?? '?';
  }
}
