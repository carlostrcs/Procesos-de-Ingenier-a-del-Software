
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
    expect(sistema.numeroUsuarios()).toEqual(0)});

  it('agregar usuario', ()=> {
    expect(sistema.numeroUsuarios()).toEqual(0);
    sistema.agregarUsuario("Pepe");
    expect(sistema.numeroUsuarios()).toEqual(1);
    expect(sistema.usuarioActivo("Pepe")).toBe(true)});
  
  it('obtener usuarios', ()=>{
    expect(sistema.usuarios).toBe(sistema.obtenerUsuarios());
  });

  it('eliminar usuario', ()=>{
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toBe(true)
    sistema.eliminarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toBe(false)
    expect(sistema.numeroUsuarios()).toEqual(0)
   });

   it('usuario activo', ()=> {
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toBe(true)});

  
});