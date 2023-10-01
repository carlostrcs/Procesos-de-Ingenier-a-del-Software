function Sistema(){     
    this.usuarios={};     
    this.agregarUsuario=function(nick){   
        if(!this.usuarios[nick]){
            console.log("Nuevo usuario con nick: "+nick)
            this.usuarios[nick]=new Usuario(nick);
        } 
        else{
            console.log("El nick está en uso")
        }     
    } 
    this.obtenerUsuarios=function(){
        return this.usuarios;
    }
    this.obtenerTodosNick=function(){
        return Object.keys(this.usuarios);
    }
    this.usuarioActivo=function(nick){
        return (nick in this.usuarios);
    }
    this.eliminarUsuario=function(nick){
        delete this.usuarios[nick];
    }
    this.numeroUsuarios = ()=>{return Object.keys(this.usuarios).length}
}  

function Usuario(nick){
         this.nick=nick; 
} 

sistema=new Sistema();
sistema.agregarUsuario("Pepe");
sistema.agregarUsuario("Pepe1");
sistema.agregarUsuario("Pepe2");
sistema.agregarUsuario("Pepe3");