import { Component, Renderer2 } from '@angular/core';
import { NavbarWpComponent } from './components/navbar-wp/navbar-wp.component';
import { MainviewWpComponent } from './components/mainview-wp/mainview-wp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarWpComponent, MainviewWpComponent]
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

    // 🔥 Detectamos el color de énfasis del sistema
    this.detectAccentColor();
  }

  applyTheme(isDarkMode: boolean) {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background-color', '#000000');
      root.style.setProperty('--text-color', '#FFFFFF');
    } else {
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--text-color', '#000000');
    }

    // 🔥 Aplicamos también el color de énfasis
    this.detectAccentColor();
  }

  detectAccentColor() {
    const testElement = document.createElement('div');
    testElement.style.cssText = 'color: -webkit-accent-color'; // Intentamos detectar el color de énfasis
    document.body.appendChild(testElement);

    const accentColor = getComputedStyle(testElement).color;
    document.body.removeChild(testElement);

    console.log(`Color de énfasis detectado: ${accentColor}`); // 🔥 Verifica en la consola si se está detectando

    if (accentColor !== 'rgba(0, 0, 0, 0)' && accentColor !== 'transparent') { 
      document.documentElement.style.setProperty('--accent-color', accentColor);
    } else {
      console.log('No se pudo detectar el color de énfasis. Probando método alternativo...');
      this.detectBackgroundColor();
    }
  }


  detectBackgroundColor() {
    const root = document.documentElement;
    const bgColor = getComputedStyle(root).backgroundColor; // 🔥 Detectamos el color de fondo del sistema

    if (bgColor && bgColor !== 'transparent') {
      document.documentElement.style.setProperty('--accent-color', bgColor); // 🔥 Aplicamos el color al navbar
    } else {
      console.log('No se pudo detectar el color de fondo del sistema.');
    }
  }


}
