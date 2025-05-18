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
  touchStartX = 0;
  touchEndX = 0;
  touchStartTime = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.setActiveSection('quien-soy'); // 🔥 Marca "Quién soy" al inicio
      window.dispatchEvent(new Event('scroll')); // 🔥 Simula un scroll para actualizar el navbar
    }, 100);
  }

  setActiveSection(section: string) {
    console.log(`Sección activa: ${section}`); // 🔥 Verifica si realmente está marcando la sección correcta
    this.activeSection = section;
    this.setActiveNav(section);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sectionWidth = window.innerWidth;

    if (Math.abs(event.deltaY) > 50) {
      container.scrollBy({ left: event.deltaY > 0 ? sectionWidth : -sectionWidth, behavior: 'smooth' });
      setTimeout(() => this.updateNavAfterScroll(), 300); // 🔥 Sincroniza el navbar con el scroll del mouse
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartTime = event.timeStamp;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sectionWidth = window.innerWidth;
    const swipeDistance = Math.abs(this.touchEndX - this.touchStartX);
    const swipeTime = event.timeStamp - this.touchStartTime;
    const minSwipeThreshold = 80;
    const fastSwipeThreshold = 200;

    if (swipeDistance > minSwipeThreshold) {
      if (swipeTime < fastSwipeThreshold) {
        if (this.touchEndX < this.touchStartX && this.sections.indexOf(this.activeSection) < this.sections.length - 1) {
          this.setActiveSection(this.sections[this.sections.indexOf(this.activeSection) + 1]);
        } else if (this.touchEndX > this.touchStartX && this.sections.indexOf(this.activeSection) > 0) {
          this.setActiveSection(this.sections[this.sections.indexOf(this.activeSection) - 1]);
        }
      } else {
        if (this.touchEndX < this.touchStartX && this.sections.indexOf(this.activeSection) < this.sections.length - 1) {
          this.setActiveSection(this.sections[this.sections.indexOf(this.activeSection) + 1]);
        } else if (this.touchEndX > this.touchStartX && this.sections.indexOf(this.activeSection) > 0) {
          this.setActiveSection(this.sections[this.sections.indexOf(this.activeSection) - 1]);
        }
      }
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll() {
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sections = Array.from(container.children) as HTMLElement[];

    let closestSection = this.activeSection;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.left); // 🔥 Detectamos la sección más cercana

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = this.sections[index];
      }
    });

    this.setActiveSection(closestSection); // 🔥 Ajustamos la sección activa con mayor precisión
  }

  updateNavAfterScroll() {
    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sections = Array.from(container.children) as HTMLElement[];

    let closestSection = this.activeSection;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.left);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = this.sections[index];
      }
    });

    this.setActiveSection(closestSection); // 🔥 Sincroniza el navbar después del scroll
  }

  setActiveNav(section: string) {
    const navLinks = document.querySelectorAll('nav ul li');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === section);
    });
  }

  changeSection(section: string) {
    console.log(`Clic en sección: ${section}`); // 🔥 Verifica si el clic está ejecutando el evento
    this.setActiveSection(section);

    const container = this.el.nativeElement.querySelector('.content-wrapper');
    const sectionWidth = window.innerWidth;
    const index = this.sections.indexOf(section);

    container.scrollTo({ left: index * sectionWidth, behavior: 'smooth' });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
