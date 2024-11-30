import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './componente/navbar/navbar.component';
import {LoginService} from './services/login.service';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, RouterLink, NavbarComponent, MatButton, MatIcon, MatIconButton, MatSidenav, MatSidenavContainer, MatSidenavContent, MatToolbar, MatToolbarRow],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'House-Jesus';
  nombre: string = 'Grupo 3';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
