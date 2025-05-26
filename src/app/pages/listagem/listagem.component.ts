import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListagemComponent implements OnInit {
  produtos: Produto[] = [];
  produtoSelecionado?: Produto;

  produtoFormulario: Produto = {
    categoria: '',
    nome: '',
    preco: 0,
    imagem: '',
    descricao: ''
  };

  constructor(
    private produtoService: ProdutoService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.estaLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.auth.isAdmin()) {
      window.alert('Acesso negado! Você não tem permissão para acessar esta página.');
      this.router.navigate(['/home']);
      return;
    }

    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos) => this.produtos = produtos,
      error: (erro) => console.error('Erro ao carregar produtos', erro)
    });
  }

  adicionarProduto() {
    this.produtoService.adicionar(this.produtoFormulario).subscribe({
      next: (produto) => {
        this.produtos.push(produto);
        this.limparFormulario();
      },
      error: (erro) => console.error('Erro ao adicionar produto', erro)
    });
  }

  selecionarProduto(produto: Produto) {
    this.produtoSelecionado = produto;
    this.produtoFormulario = { ...produto };
  }

  atualizarProduto() {
    if (!this.produtoSelecionado) return;

    const produtoAtualizado = { ...this.produtoFormulario, id: this.produtoSelecionado.id };

    this.produtoService.atualizar(produtoAtualizado).subscribe({
      next: (produto) => {
        const index = this.produtos.findIndex(p => p.id === produto.id);
        if (index !== -1) this.produtos[index] = produto;
        this.limparFormulario();
      },
      error: (erro) => console.error('Erro ao atualizar produto', erro)
    });
  }

  excluirProduto(id?: number) {
    if (!id) return;
    this.produtoService.excluir(id).subscribe({
      next: () => this.produtos = this.produtos.filter(p => p.id !== id),
      error: (erro) => console.error('Erro ao excluir produto', erro)
    });
  }

  cancelarEdicao() {
    this.limparFormulario();
  }

  limparFormulario() {
    this.produtoFormulario = {
      categoria: '',
      nome: '',
      preco: 0,
      imagem: '',
      descricao: ''
    };
    this.produtoSelecionado = undefined;
  }

  trackById(index: number, produto: Produto) {
    return produto.id;
  }
}
