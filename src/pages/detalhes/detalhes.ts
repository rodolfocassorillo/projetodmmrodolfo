import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Imc } from '../../model/imc';
import { Produto } from '../../model/produto';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Storage } from '@ionic/storage';
import { Database } from '../../data/database';

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  produtos:Produto[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,  public database: Database) {
    //console.log("Valor 1: "+this.navParams.get("valor1"));
    //console.log("Nome: "+this.navParams.get("nome"));
    this.consultarProdutoSqlite();
  }

  // buscarImcs(){
  //   this.http.get("http://200.17.98.122:8080/hellows/rest/service/listaImc?usuario="+this.navParams
  //   .get('usuario'))
  //   .map(res => res.json())
  //   .subscribe(
  //     data => {
  //         this.imcs = data;
  //     },
  //     error =>{
  //       console.log(error);
  //     });
  // }

  consultarProdutoSqlite(){
    this.database.buscarProduto().subscribe(data => {
      this.produtos = data;
      //alert(data.descricaoProduto);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPage');
  }

  fecharDetalhes(){
    this.navCtrl.pop();
  }

}
