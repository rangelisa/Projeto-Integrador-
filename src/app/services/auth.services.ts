import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && !!window.localStorage;
  }

  getUsuario() {
    if (!this.isBrowser) {
      return null; 
    }
    const userJson = localStorage.getItem('usuarioLogado');
    if (!userJson) return null;
    return JSON.parse(userJson);
  }

  estaLogado(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!localStorage.getItem('usuarioLogado');
  }

  login(usuario: any) {
    if (this.isBrowser) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('usuarioLogado');
    }
  }

 
  isAdmin(): boolean {
    const usuario = this.getUsuario();
    return usuario?.tipo === 'admin';
  }
}
