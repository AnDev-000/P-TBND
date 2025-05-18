import { Component, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainview-wp',
  standalone: true,
  templateUrl: './mainview-wp.component.html',
  styleUrls: ['./mainview-wp.component.css'],
  imports: [CommonModule]
})
export class MainviewWpComponent implements OnInit {
  activeSection: string = 'quien-soy'; 
  sections = ['quien-soy', 'experiencia', 'proyectos', 'links'];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.setActiveSection('quien-soy'); // 🔥 Marca "Quién soy" al inicio
      window.dispatchEvent(new Event('scroll')); // 🔥 Simula un scroll para actualizar el navbar
    }, 100);
  }

  setActiveSection(section: string) {
    console.log(`Sección activa: ${section}`);
    this.activeSection = section;
    this.setActiveNav(section);
    this.updateThemeColor(section);
  }

  updateThemeColor(section: string) {
    const root = document.documentElement;
    const sectionColors: { [key: string]: string } = {
      'quien-soy': '#0078D7', // 🔵 Azul clásico para presentación
      'experiencia': '#008000', // 🟢 Verde para crecimiento profesional
      'proyectos': '#FFA500', // 🟠 Naranja para creatividad e innovación
      'links': '#6A0DAD' // 🟣 Púrpura para conexiones y redes
    };

    root.style.setProperty('--accent-color', sectionColors[section] || '#0078D7');
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sectionWidth = window.innerWidth;
    container.scrollBy({ left: event.deltaY > 0 ? sectionWidth : -sectionWidth, behavior: 'smooth' });
    setTimeout(() => this.updateNavAfterScroll(), 300);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd() {
    setTimeout(() => this.updateNavAfterScroll(), 100); // 🔥 Sincroniza el navbar después del gesto táctil
  }

  @HostListener('scroll', ['$event'])
  onScroll() {
    this.updateNavAfterScroll();
  }

  updateNavAfterScroll() {
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sections = Array.from(container.children) as HTMLElement[];

    let closestSection = this.activeSection;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().left);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = this.sections[index];
      }
    });

    this.setActiveSection(closestSection);
  }

  setActiveNav(section: string) {
    document.querySelectorAll('nav ul li').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === section);
    });
  }

  changeSection(section: string) {
    console.log(`Clic en sección: ${section}`);
    this.setActiveSection(section);

    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sectionWidth = window.innerWidth;
    container.scrollTo({ left: this.sections.indexOf(section) * sectionWidth, behavior: 'smooth' });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
