import {Component, ViewChild} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import {MatSidenavContainer} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    MatSidenavContainer,
    MatSidenav
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'House-Jesus';
  nombre: string = '!';

  // Asegúrate de declarar el sidenav con @ViewChild
  @ViewChild('sidenav') sidenav: MatSidenav;

  // Método para alternar el sidenav
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
