const datos=require("./cad.js");
const correo=require("./email.js"); 
const bcrypt = require("bcrypt");

function Sistema(test){     
    this.cad=new datos.CAD();
    this.usuarios={};     
    this.test=test;
    this.cad.conectar(function(db){console.log("Conectado a Mongo Atlas");}); 

    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 }; 
      
        if (!this.usuarios[nick]) {
          this.usuarios[nick] = new Usuario(nick); 
          res.nick = nick;
        } else {
          console.log("El nick " + nick + " está en uso");
        }
      
        return res; // Devuelve el objeto res, que ahora puede contener el nick o el valor predeterminado -1
      }

    this.obtenerUsuarios=function(){
        return this.usuarios;
    }

    this.obtenerTodosNick=function(){
        return Object.keys(this.usuarios);
    }

    this.usuarioActivo=function(nick){
        let res = {activo:false};
        if(nick in this.usuarios){
            res.activo = true;
        }
        return res;
    }
    this.eliminarCuenta=function(nick,callback){
      let {cad} = this;
      cad.buscarUsuario({email:nick},function(usr){
        if(!usr){
          callback({email:-1}) 
        }
        else{
          cad.eliminarUsuario(usr,function(ok){
            callback({email:1,msg:`Se ha eliminado al usuario ${usr.email}`})
          });
        }
      })
    }
    this.eliminarUsuario=function(nick,callback){
      console.log("modelo eliminarUsuario " + nick);
      let res={"usuario_eliminado":-1};
      if (this.usuarios[nick]){
          delete(this.usuarios[nick]);
          console.log("Se ha eliminado el usuario con nick " + nick);
          res.usuario_eliminado = nick;
      }
      else {
          console.log("No existe un usuario con nick " + nick);
          console.log(this.usuarios);
        }
      return res;
  }
    
    this.numeroUsuarios = ()=>{
        return {num:Object.keys(this.usuarios).length};
    }

    this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (obj) {
          callback(obj);
        });
      }

      this.registrarUsuario=function(obj,callback){
        let modelo=this;
        if (!obj.nick){
            obj.nick=obj.email;
        }
        this.cad.buscarUsuario(obj,function(usr){
            if (!usr){
                //el usuario no existe, luego lo puedo registrar
                obj.key=Date.now().toString();
                obj.confirmada=false; 
                bcrypt.hash(obj.password, 10, function (err, hash) {
                    obj.password = hash;
                    modelo.cad.insertarUsuario(obj,function(res){
                        callback(res);
                    });
                });
                console.log/({obj});
                //correo.enviarEmail(obj.email,ob.key,"Confirmar cuenta");
                //correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
                //correo.enviarEmail("alguienanonimo2000@gmail.com", "ss", "Hola");
            }
            else
            {
                callback({"email":-1});
            }
        });
    }

      this.loginUsuario=function(obj,callback){
        console.log({obj});
        this.cad.buscarUsuario({"email":obj.email, "confirmada":true},function(usr){
            if (usr){
                if (usr.password) {
                    bcrypt.compare(obj.password, usr.password, function (err, result) {
                      if (err) {
                        console.error("Error al comparar contraseñas:", err);
                        callback({ email: -1, err: "Error al comparar contraseñas"});
                      } else if (result) {
                        callback(usr); // Contraseña válidas
                      } else {
                        callback({ email: -1, err: "Usuario o contraseña incorrecta"}); // Contraseña incorrecta
                        console.error({ email: -1, err: "Usuario o contraseña incorrecta"});
                        console.error({result});
                      }
                    });
                }
            }    
            else
            {
                callback({"email":-1});
                console.error({ email: -1, err: "Usuario no encontrado"});
                console.error({usr});
            }
        });
    }

    this.confirmarUsuario=function(obj,callback){
      let modelo=this;
      this.cad.buscarUsuario({email:obj.email,confirmada:false,key:obj.key},function(usr){
          if (usr){
              usr.confirmada=true;
              modelo.cad.actualizarUsuario(usr,function(res){
                  callback({"email":res.email}); //callback(res)
              })
          }
          else
          {
              callback({"email":-1});
          }
      })
  }
      
  if (!this.test){
    this.cad.conectar(function(){
        console.log("Conectando a Mongo Atlas");
    })
} 


}  

function Usuario(nick){
         this.nick=nick; 
} 

module.exports.Sistema=Sistema;

/*
sistema=new Sistema();
sistema.agregarUsuario("Pepe");
sistema.agregarUsuario("Pepe1");
sistema.agregarUsuario("Pepe2");
sistema.agregarUsuario("Pepe3");
*/