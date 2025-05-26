import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto, ProdutoService } from '../services/produto.services';
import { CartService } from '../services/cart.services';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  // ✅ Novo: categorias agrupadas
  categorias: { nome: string, produtos: Produto[] }[] = [];

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe(res => {
      this.produtos = res;
      this.agruparPorCategoria();  
    });
  }

  
  agruparPorCategoria(): void {
    const categoriasMap = new Map<string, Produto[]>();

    this.produtos.forEach(produto => {
      if (!categoriasMap.has(produto.categoria)) {
        categoriasMap.set(produto.categoria, []);
      }
      categoriasMap.get(produto.categoria)!.push(produto);
    });

    this.categorias = Array.from(categoriasMap, ([nome, produtos]) => ({ nome, produtos }));
  }

  excluirProduto(id: number) {
    this.produtoService.excluir(id).subscribe(() => {
      this.carregarProdutos();
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.cartService.adicionarItem({ nome: produto.nome, preco: produto.preco });
    alert(`Adicionado ao carrinho: ${produto.nome}`);
  }
}
