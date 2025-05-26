import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor (public auth: AuthService, private router:Router){}
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
logout() {
  this.auth.logout();
  this.router.navigate(['/login'])
}
}
