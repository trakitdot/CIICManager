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
    let sql = `CREATE TABLE IF NOT EXISTS ${this.userTable} (id INTEGER PRIMARY KEY, name VARCHAR(256), username VARCHAR(256), password VARCHAR(256), verifiedEmail VARCHAR(256), verifiedNumber VARCHAR(256))`
    let sqlParams = []
    return this.runSQL(sql, sqlParams, 'SQL table create success', 'create table user').then( res => { return res } )
  }
  registerUser(user) {
    return this.createUserTable().then(tableRes => {
      if(tableRes.success) {
        alert(`tableRes: ${tableRes}`)
        return this.saveUser(user).then(userRes => {
          alert(`userRes: ${userRes}`)
          return userRes
        })
      } else {
        
      }
    })
  }
  saveUser(user) {
    let {username, password } = user
    // let sql = `INSERT INTO ${this.userTable} (name, username, password) VALUES(?, ?, ?)`
    let sql = `INSERT INTO ${this.userTable} (username, password) VALUES(?, ?)`
    let sqlParams = [/*name, */username, password]
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
  loginUser(user) {
    let { username, password } = user
    return this.isValidUser(username).then( ( user: any ) => {
      alert(`username results: ${JSON.stringify(user)}`)
      try {
        alert(`username res length: ${JSON.stringify(user.res.rows.length )}`)
      } catch (error) {
        alert(`username res length: ${JSON.stringify(user.res.length)}`)
      }
      
      if(user.res.rows.length > 0) {
        return this.isCorrectPass(user).then( ( userCred: any ) => {
          if(userCred.res.rows.length > 0) {
            let cred : object = { username: username, name: userCred.res.rows.item(0).name }
            let info : object = { isValid: true, userCred: cred }
            alert(`info with usercredentials: ${JSON.stringify(info)}`)
            return info
          } else {
            let cred : object = { username: username, name: undefined }
            let info : object = { isValid: false, userCred: cred }
            alert(`info without usercredentials: ${JSON.stringify(info)}`)
            return info
          }
        })
      } else {
        let info : object = { isValid: false, userCred: undefined }
        return info
      }
    })
      
  }
  isCorrectPass(user) {
    let { username, password } = user
    let sql = `SELECT name, username, password FROM ${this.userTable} WHERE username=?, password=?`
    let sqlParams = [username, password]
    //return this.db.executeSql(sql, sqlParams).then( deleteRes => )
    return this.runSQL(sql, sqlParams, 'SQL retrieve success. User info successfully retrieved', 'retrieve user credentials').then( res => { return res } )
  }
  isValidUser(username) {
    let sql = `SELECT username FROM ${this.userTable} WHERE username=?`
    let sqlParams = [username]
    //return this.db.executeSql(sql, sqlParams).then( deleteRes => )
    return this.runSQL(sql, sqlParams, 'SQL retrieve success. User has been retrieved.', 'retrieve user').then( res => { return res } )
      
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
