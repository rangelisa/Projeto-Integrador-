export interface Usuario {
  email: string;
  senha: string;
  tipo: 'admin' | 'usuario'; 
}