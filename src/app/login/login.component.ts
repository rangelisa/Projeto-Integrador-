import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { AuthService } from '../services/auth.services';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  modoCadastro = false;
  usuarioLogado: Usuario | null = null;  
  isBrowser: boolean;

  constructor(
    private auth: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.usuarioLogado = this.auth.getUsuario();  
    this.criarAdminSeNaoExistir();
  }

  criarAdminSeNaoExistir() {
    if (!this.isBrowser) return; 

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const adminJaExiste = usuarios.some(u => u.email === 'admin@admin.com');
    if (!adminJaExiste) {
      usuarios.push({
        email: 'admin@admin.com',
        senha: 'admin123',
        tipo: 'admin',
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  alternarModo() {
    this.modoCadastro = !this.modoCadastro;
  }

  onSubmit() {
  if (!this.isBrowser) return;

  const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

  if (this.modoCadastro) {
    const jaExiste = usuarios.some(u => u.email === this.email);
    if (jaExiste) {
      alert('Esse email já está cadastrado!');
      return;
    }

    const novoUsuario: Usuario = {
      email: this.email,
      senha: this.senha,
      tipo: 'usuario',
    };
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    this.modoCadastro = false;
    this.email = '';
    this.senha = '';
  } else {
    const usuario = usuarios.find(u => u.email === this.email && u.senha === this.senha);
    if (usuario) {
      this.auth.login(usuario);
      this.usuarioLogado = usuario;
      alert(`Bem-vindo, ${usuario.tipo === 'admin' ? 'ADMIN' : 'usuário'}!`);

      if (usuario.tipo === 'admin') {
        this.router.navigate(['/listagem']); 
      } else {
        this.router.navigate(['/home']); 
      }

    } else {
      alert('Email ou senha inválidos!');
    }
  }
}
  logout() {
    this.auth.logout();
    this.usuarioLogado = null;  
    this.router.navigate(['/login']);
  }
}
