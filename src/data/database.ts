import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Produto } from '../model/produto';
import { Imc } from '../model/imc';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Database {

  theConsole: string = "Console Messages";

  options: any = {
    name: 'projetodmmrodolfo.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connectDb();
  }

  private connectDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS produto (id_produto integer primary key autoincrement , descricao_produto VARCHAR(255), qt_estoque integer)';
        this.db.executeSql(sql, {})
          .then(() => console.log("SQL " + sql))
          .catch(e => console.log("Erro " + e));
      }).catch(e => alert("Erro " + e));

  }

  adicionarProduto(produto: Produto): void {

    var sql = "INSERT INTO produto (descricao_produto, qt_estoque) VALUES ('" + produto.descricaoProduto + "'," + produto.quantidadeEstoque + ")";

    this.db.executeSql(sql, {})
      .then(() => console.log("SQL " + sql))
      .catch(e => console.log("Erro " + e));
  }
  buscarProduto() {
    var sql = "SELECT * FROM produto";
    return Observable.create((observer) => {
      this.db.executeSql(sql, {})
        .then((result) => {
          let items: Produto[] = [];
          if (result.rows.length > 0) {
            for (var x = 0; x < result.rows.length; x++) {
              let produto: Produto = new Produto();
              produto.idProduto = result.rows.item(x).id_produto;
              produto.descricaoProduto = result.rows.item(x).descricao_produto;
              produto.quantidadeEstoque = result.rows.item(x).qt_estoque;
              items.push(produto);
            }
          }
          observer.next(items);
          observer.complete();
        })
        .catch(e => {
          alert("Erro " + e);
          alert("Errorr " + e);
        });
    }, error => {
      alert("Errorr " + error);
    });

  }








}
