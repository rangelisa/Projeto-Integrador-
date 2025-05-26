import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';

  obtercart(): any[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  salvarcart(cart: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }

  adicionarItem(item: { nome: string; preco: number }): void {
    const cart = this.obtercart();
    cart.push(item);
    this.salvarcart(cart);
  }

  removerItem(nome: string): void {
    const cart = this.obtercart();
    const index = cart.findIndex((p) => p.nome === nome);
    if (index > -1) {
      cart.splice(index, 1);
      this.salvarcart(cart);
    }
  }

  limparcart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
