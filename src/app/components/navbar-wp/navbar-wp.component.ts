import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-wp',
  standalone: true,
  templateUrl: './navbar-wp.component.html',
  styleUrls: ['./navbar-wp.component.css'],
  imports: [CommonModule]
})
export class NavbarWpComponent {
  @Input() activeSection!: string;
  @Output() sectionChanged = new EventEmitter<string>(); // 🔥 Agregamos `@Output` para notificar el cambio de sección
  
  sections = ['quien-soy', 'experiencia', 'proyectos', 'links'];

  changeSection(section: string) {
    this.sectionChanged.emit(section); // 🔥 Ahora notifica al padre el cambio de sección
  }
}
