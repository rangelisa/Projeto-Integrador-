import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  agrupados: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    const carrinho = this.cartService.obtercart();
    console.log('Carrinho atual:', carrinho); // debug
    const mapa = new Map();

    carrinho.forEach((item) => {
      if (!mapa.has(item.nome)) {
        mapa.set(item.nome, {
          nome: item.nome,
          preco: parseFloat(item.preco),
          quantidade: 1,
        });
      } else {
        mapa.get(item.nome).quantidade++;
      }
    });

    this.agrupados = Array.from(mapa.values());
    this.total = this.agrupados.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
  }

  alterarQtd(nome: string, delta: number): void {
    if (delta > 0) {
      const item = this.agrupados.find((i) => i.nome === nome);
      if (item) {
        this.cartService.adicionarItem({ nome, preco: item.preco });
      }
    } else {
      this.cartService.removerItem(nome);
    }
    this.carregarCarrinho();
  }

  finalizarPagamento(): void {
    alert('Pagamento finalizado!');
    this.cartService.limparcart();
    this.carregarCarrinho();
  }
}
