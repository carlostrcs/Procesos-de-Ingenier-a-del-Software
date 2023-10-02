function Sistema(){     
    this.usuarios={};     
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

    this.eliminarUsuario=function(nick){
        delete this.usuarios[nick];
    }
    
    this.numeroUsuarios = ()=>{
        return {num:Object.keys(this.usuarios).length};
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