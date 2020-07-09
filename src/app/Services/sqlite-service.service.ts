import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SQLiteServiceService {
  db : SQLiteObject
  dbName : string = ''
  userTable : string = 'user'
  constructor(private sqlite : SQLite, private plt : Platform) {
    this.checkState()

  }
  setDatabaseOptions() {
    return { name: 'details.db', location: 'default' }
  }
  checkState() {
    return this.plt.ready().then( rdy => {
      return this.createDatabase().then( () => {
        return rdy
      })
    })
  }
  createDatabase() {
    return this.sqlite.create( this.setDatabaseOptions() ).then( (db : SQLiteObject) => {
      alert('table succesfully created')
      this.db = db
    }).catch( e => alert(`error: ${JSON.stringify(e)}`))
  }
  createUserTable() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.userTable} (id INTEGER PRIMARY KEY, name VARCHAR(256), username VARCHAR(256), password VARCHAR(256))`
    let sqlParams = []
    return this.runSQL(sql, sqlParams, 'SQL table create success', 'create table user').then( res => { return res } )
  }
  registerUser(/*{ userObject } */ name, username, password) {
    let sql = `INSERT INTO ${this.userTable}(name, username, password) VALUES(?, ?, ?)`
    let sqlParams = [name, username, password]
    return this.runSQL(sql, sqlParams, 'SQL save success', 'save user details').then( res => { return res } )
  }
  updateUser( name, username, password, id ) {
    let sql = `UPDATE ${this.userTable} SET name=?, username=?, password=? WHERE id=?`
    let sqlParams = [name, username, password, id]
    return this.runSQL(sql, sqlParams, 'SQL update success', 'update user details').then( res => { return res } )
  }
  deleteUser(id) {
    let sql = `DELETE FROM ${this.userTable} WHERE id=?`
    let sqlParams = [id]
    //return this.db.executeSql(sql, sqlParams).then( deleteRes => )
    return this.runSQL(sql, sqlParams, 'SQL delete success. Data has been deleted', 'delete user').then( res => { return res } )
  }
  retrieveUser(id) {
    let sql =`SELECT name, username, password FROM ${this.userTable} WHERE id=?`
    let sqlParams = [id]
    return this.runSQL(sql, sqlParams, 'SQL retrieve success. Data has been retrieved', 'retrieve user details').then ( res => { return res} )
  }

  runSQL(sql, sqlParams, successMsg, errMsg){
    return this.db.executeSql(sql, sqlParams)
    .then( res => {
      alert(`runSQL: ${JSON.stringify(res)}`)
      let result = { res: res, msg: successMsg, code: 1, success: true }
      return result
    })
    .catch( e => {
      alert(`runSQL err: ${JSON.stringify(e)}`)
      let result = { res: e, msg: `Error while attempting to ${errMsg}, please try again`, code: 0, success: false }
      return result
    })

  }
}
