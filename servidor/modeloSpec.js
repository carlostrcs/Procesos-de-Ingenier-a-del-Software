
/*
describe('El sistema', function() {   
  let sistema;   
  
  beforeEach(function() {
      sistema=new Sistema()   
    });   
    
  it('inicialmente no hay usuarios', function() {     
    expect(sistema.numeroUsuarios()).toEqual(0);    
  }); 

  it('usuario agregado correctamente', function(){
    expect(sistema.numeroUsuarios()).toEqual(0);
    sistema.agregarUsuario("Pepe");
    expect(sistema.numeroUsuarios()).toEqual(1);
    expect("Pepe" in sistema.usuarios);
  })
})
*/

const modelo=require("./modelo.js");

describe('El sistema...', function() {
  let sistema;
 
  beforeEach(()=>{sistema=new modelo.Sistema()});
 
  it('inicialmente no hay usuarios', ()=> {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0)});

  it('agregar usuario', ()=> {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(1);
    expect(usuarioActivo.activo).toBe(true)});
  
  it('obtener usuarios', ()=>{
    expect(sistema.usuarios).toBe(sistema.obtenerUsuarios());
  });

  it('eliminar usuario', ()=>{
    sistema.agregarUsuario("Pepe")
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    expect(usuarioActivo.activo).toBe(true)
    sistema.eliminarUsuario("Pepe")
    let numeroUsuarios = sistema.numeroUsuarios();
    usuarioActivo = sistema.usuarioActivo("Pepe");
    expect(usuarioActivo.activo).toBe(false)
    expect(numeroUsuarios.num).toEqual(0)
   });

   it('usuario activo', ()=> {
    sistema.agregarUsuario("Pepe")
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    expect(usuarioActivo.activo).toBe(true)});

  
});