import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems = [
    { label: 'Eventos', icon: '📋', route: '/table' },
    { label: 'Perfil', icon: '👤', route: '/profile' },
    { label: 'Actualizar', icon: '✏️', route: '/update' },
  ];

  onToggle() {
    this.toggleSidebar.emit();
  }
}
