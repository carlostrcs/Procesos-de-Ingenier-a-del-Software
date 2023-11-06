function ControlWeb(){

    this.mostrarAgregarUsuario = ()=>{
        
        $('#bnv').remove();
        $('#mAU').remove();
    
        let cadena = '<div id="mAU">';
        cadena += '<div class="card"><div class="card-body">';
        cadena += '<div class="form-group">';
        cadena += '<label for="nick">Nick:</label>';
        cadena += '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena += '<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_focus_web@2x.png" style="height:40px;"></a></div>';
        cadena += '</div>';
        cadena += '</div></div></div>';

        $("#au").append(cadena);

        $("#btnAU").on("click", ()=>{
            let nick=$("#nick").val();
            if(nick)
            {
                $('#mAU').remove()
                rest.agregarUsuario(nick)
            }             
        });
    }
    this.mostrarMsg=(msg)=>{
        $('#mMsg').remove()
        let cadena ='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
    }
    this.comprobarSesion = function () {
        // let nick = localStorage.getItem("nick");
        let nick = $.cookie("nick");
        if (nick) {
          cw.mostrarMsg("Bienvenido al sistema, " + nick);
        } else {
          cw.mostrarRegistro();
          cw.init();
        }
      }

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
          client_id: "816518100249-p29fro21jrbkh01u1ddf8mfo16vkt119.apps.googleusercontent.com", //prod
          auto_select: false,
          callback: cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.handleCredentialsResponse = function (response) {
        let jwt = response.credential;
        // let user = JSON.parse(atob(jwt.split(".")[1]));
        // console.log(user.name);
        // console.log(user.email);
        // console.log(user.picture);
        rest.enviarJwt(jwt);
      }
      
        
      
      this.salir=function(){
        $.removeCookie("nick");
        location.reload();
        rest.cerrarSesion();
    }


    this.mostrarRegistro=function(){
        if ($.cookie("nick")) {
            return true;
        }
        $("#BienvenidoText").hide();
        this.limpiar();
        $("#registro").load("./cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(){
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                    rest.registrarUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

      this.limpiar=function(){
        $("#au").empty();
        $("#ou").empty();
        $("#nu").empty();
        $("#ua").empty();
        $("#eu").empty();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
        $('#mMsg').remove();
    }

    this.mostrarLogin = function () {
        if ($.cookie("nick")) {
          return true;
        }
        $("#BienvenidoText").hide();
        this.limpiar();
        $("#login").load("./cliente/login.html", function () {
          $("#btnLogin").on("click", function () {
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            if (email && pwd) {
              rest.loginUsuario(email, pwd);
              console.log(email + " " + pwd);
            }
          });
        });
      };


      this.eliminarUsuario=function(){
        // $("#mUA").remove();
        if (!$.cookie("nick")) {
          return true;
        }
        this.limpiar();
        $("#BienvenidoText").hide();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
        let cadena='<div id="mEU">';
        cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label style="display: block;">Eliminar un usuario:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="EU" placeholder="Introduce un nick"></p>';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary" >Submit</button>';
        cadena = cadena + '</div>';
        
        $("#eu").append(cadena); //au es una etiqueta que viene de agregarUsuario

        $("#btnEU").on("click",function(){ 
            let nick=$("#EU").val();
            if (nick){
              console.log("controlWeb botón eliminar " + nick);
                rest.eliminarUsuario(nick);
            }
        })
    }

    this.eliminarCuenta=function(){
      // $("#mUA").remove();
      if (!$.cookie("nick")) {
        return true;
      }
      this.limpiar();
      $("#BienvenidoText").hide();
      $("#fmLogin").remove();
      $("#fmRegistro").remove();
      let cadena='<div id="mEU">';
      cadena = cadena + '<div class="card" style="margin-top: 30px;"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<label style="display: block;">Eliminar un usuario:</label>';
      cadena = cadena + '<p><input type="text" class="form-control" id="EU" placeholder="Introduce un nick"></p>';
      cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary" >Submit</button>';
      cadena = cadena + '</div>';
      
      $("#eu").append(cadena); //au es una etiqueta que viene de agregarUsuario

      $("#btnEU").on("click",function(){ 
          let nick=$("#EU").val();
          if (nick){
            console.log("controlWeb botón eliminar " + nick);
              rest.eliminarCuenta(nick);
          }
      })
  }
      
    
    

}