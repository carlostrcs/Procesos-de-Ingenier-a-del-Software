const mongo=require("mongodb").MongoClient; 
const ObjectId=require("mongodb").ObjectId; 

function CAD(){       
    
    this.usuarios; 

    this.conectar = async function(callback) {
        let cad = this;
        let client = new mongo("mongodb+srv://carlos:1234@cluster0.ny49sup.mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
      }

      this.buscarOCrearUsuario = function (usr, callback) {
        buscarOCrear(this.usuarios, usr, callback);
      }
      
      function buscarOCrear(coleccion, criterio, callback) {
        coleccion.findOneAndUpdate(
          criterio,
          { $set: criterio },
          { upsert: true, returnDocument: "after", projection: { email: 1 } },
          function (err, doc) {
            if (err) {
              throw err;
            } else {
              console.log("Elemento actualizado");
              console.log(doc.value.email);
              callback({ email: doc.value.email });
            }
          }
        );
      }

      this.buscarUsuario = function (obj, callback) {
        buscar(this.usuarios, obj, callback);
      }

      this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
      }

      function buscar(coleccion, criterio, callback) {
        coleccion.find(criterio).toArray(function (error, usuarios) {
          if (usuarios.length == 0) {
            callback(undefined);
          } else {
            callback(usuarios[0]);
          }
        });
      }

      function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
          if (err) {
            console.log("Error");
          } else {
            console.log("Nuevo elemento creado");
            callback(elemento);
          }
        });
      } 
      
    this.actualizarUsuario=function(obj,callback){
        actualizar(this.usuarios,obj,callback);
    }
    
    function actualizar(coleccion,obj,callback){
      coleccion.findOneAndUpdate({_id:ObjectId(obj._id)}, {$set: obj},
      {upsert: false,returnDocument:"after",projection:{email:1}},
      function(err,doc) {
          if (err) { 
              throw err; 
          }
          else {
              console.log("Elemento actualizado");
              //console.log(doc);
              //console.log(doc);
              callback({email:doc.value.email});
          }
      });
  }

  this.eliminarUsuario=function(obj,callback){
    eliminar(this.usuarios,obj,callback);
  }

  function eliminar(coleccion,obj,callback){
      coleccion.remove(obj,function(err,result){
          if(!err){
              callback(result);
          }
      });
  }

}  


module.exports.CAD=CAD; 