import { Component, Renderer2 } from '@angular/core';
import { NavbarWpComponent } from './components/navbar-wp/navbar-wp.component';
import { MainviewWpComponent } from './components/mainview-wp/mainview-wp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarWpComponent, MainviewWpComponent] // ✅ Aseguramos la importación
})
export class AppComponent {
  title = 'P-TBND';

  constructor(private renderer: Renderer2) {
    this.detectTheme();
  }

  detectTheme() {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.applyTheme(themeQuery.matches);

    themeQuery.addEventListener('change', (event) => {
      this.applyTheme(event.matches);
    });
  }

  applyTheme(isDarkMode: boolean) {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background-color', '#000000'); // Negro sólido
      root.style.setProperty('--text-color', '#FFFFFF'); // Blanco puro
      root.style.setProperty('--accent-color', '#FF0000'); // Rojo (tema Windows)
    } else {
      root.style.setProperty('--background-color', '#FFFFFF'); // Blanco sólido
      root.style.setProperty('--text-color', '#000000'); // Negro puro
      root.style.setProperty('--accent-color', '#0078D7'); // Azul clásico de Windows
    }
  }

}
