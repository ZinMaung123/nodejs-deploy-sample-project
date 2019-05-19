const BaseModel = require('./baseModel');
const bcrypt = require("bcrypt");
class User extends BaseModel {
    constructor() {
        super();
    }

    async signIn(username, password){
        return new Promise((resolve, reject)=>{
            this.sql.query('select * from users where name = ?', username, (err,data)=>{
                if(err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    for(let item of data){
                        bcrypt.compare(password, item.password,(err, result) => {
                            if(result){
                                resolve(item);
                            }
                            else{
                                reject();
                            }
                        });
                    }
                }
            });
        });
        
    }

    async register(name, email, password){
        /**
         * hash the password
         */
        return new Promise((resolve, reject) =>{
            bcrypt.hash(password, 10, (err, hashedPassword)=>{
                if(err) reject(err);
                else {
                    const password = hashedPassword;
                    this.sql.query('insert into users set ?',{
                        name, email, password
                    }, (err, data)=>{
                        if(err) reject(err);
                        else resolve(data);
                    });
                }
            });
        });
    }
}

module.exports = User;