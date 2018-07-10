import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';
import { Imc } from '../../model/imc';
import { Produto } from '../../model/produto';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage';
import { Database } from '../../data/database';
import { ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imc: Imc = new Imc();

  produto: Produto = new Produto();

  constructor(public navCtrl: NavController, public http: Http, public storage: Storage, public database: Database, public toastCtrl: ToastController) {

  }

  cadastrarProdutoSqlite(){
    this.database.adicionarProduto(this.produto);

    const toast = this.toastCtrl.create({
      message: 'Salvo com sucesso',
      duration: 3000
    });
    toast.present();

  }

  consultarProdutoSqlite(){
    this.database.buscarProduto().subscribe(data => {
      alert(data[0].descricaoProduto);
    });
  }

  chamaListaProdutos(){
     this.navCtrl.push(DetalhesPage);
  }

  converterNumber(numero): number {
    return parseFloat(numero);
  }

  cadastrarImcStorage(){
    this.storage.set('imc', this.imc);
    console.log('cadastrado com sucesso');
  }

  buscarImc(){
    this.storage.get('imc').then((data) => {
      console.log(data);
    });
  }

  cadastrarImc() {
    this.http.post("http://200.17.98.122:8080/hellows/rest/service/inserirImc", this.imc).retry(2).map(res => res.json()).subscribe(
      data => {
        alert(data.situacao);
        console.log(data);
      }, error => {
        alert(error);
      });
  }

  chamarDetalhesSemParametros() {
    this.navCtrl.push(DetalhesPage);
  }

  chamarDetalhesComParametros() {
    this.navCtrl.push(DetalhesPage, { 'usuario': this.imc.usuario });
  }

  definirDetalhesRaiz() {
    this.navCtrl.setRoot(DetalhesPage, { 'valor1': 10, 'valor2': 20, 'nome': 'José' });
  }

}
