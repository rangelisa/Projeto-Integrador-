import { Routes } from '@angular/router';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent, title: 'Página Inicial' }, 
  {path: 'cart', component: CartComponent, title: 'Carrinho'},
  { path: 'listagem', component: ListagemComponent, title: 'Listagem de Produtos' },
  {path: 'produtos', component:ProdutosComponent, title: 'Produtos'},
  {path: 'sobre-nos', component:SobreNosComponent, title: 'Sobre Nós'},
  {path: 'atendimento', component:AtendimentoComponent, title: 'Atendimento'},
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', redirectTo: 'home' }
];