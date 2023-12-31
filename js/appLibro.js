
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}





const agregarLibro=async()=>{
  var nombre=document.querySelector("#nombre").value;
  var precio=document.querySelector("#precio").value;
  var editorial=document.querySelector("#editorial").value;
  var autor=document.querySelector("#autor").value;

  if(nombre.trim()===''||
  precio.trim()===''||
  editorial.trim()===''||
  autor.trim()===''){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'FALTA LLENAR CAMPOS!',
          footer: 'CRUD EDITORIAL'
        })
        return;

  }
  
//Insertar a la BASE DE ATOS
  const datos=new FormData();
  datos.append("nombre",nombre);
  datos.append("precio",precio);
  datos.append("editorial",editorial);
  datos.append("autor",autor);
  

  var respuesta=await fetch("php/libro/agregarLibro.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();

  if(resultado.success==true){
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD LIBRO'
        })
        document.querySelector("#formAgregar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD LIBRO'
        })
  }
 
document.querySelector("#agregarModal").click();
cargarLibros();
}

const cargarLibros=async()=>{
  var respuesta=await fetch("php/libro/cargarLibros.php",{});
  var registrosHTML=``;
  var resultado=await respuesta.json();
  
//consola.log(resultado);

resultado.data.forEach(fila=>{
  registrosHTML+=`
  <tr>
    <td>${fila[1]}</td>
    <td>${fila[2]}</td>
    <td>${fila[3]}</td>
    <td>${fila[4]}</td>
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarLibro(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg> Editar</button></td>
    <td><button class="btn btn-danger" onclick="eliminarLibro(${fila[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 " viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg> Eliminar</button></td>
  </tr>
  `;
})  
document.querySelector("#registros").innerHTML=registrosHTML;
cargarEditoriales(); 
}


const eliminarLibro=(libroid)=>{
  Swal.fire({
    title: '¿Estás seguro de eliminar Libro?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `NO`,
  }).then(async(result) => {
    if (result.isConfirmed) {
      const datos=new FormData();
  datos.append("libroid",libroid);
      var respuesta=await fetch("php/libro/eliminarLibro.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();
  
    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: resultado.mensaje,
            footer: 'CRUD LIBRO'
          })
         
          
  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD LIBRO'
          })
    }
   
  cargarLibros();
    }
  })
}

const cargarLibro=async(libroid)=>{
  const datos=new FormData();
  datos.append("libroid",libroid);
      var respuesta=await fetch("php/libro/cargarLibro.php",{
        method:'POST',
        body:datos
    });
  
    var resultado=await respuesta.json();

    document.querySelector("#libroid").value=resultado.libroid;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#eprecio").value=resultado.precio;
    document.querySelector("#eeditorial").value=resultado.editorial;
    document.querySelector("#eautor").value=resultado.autor;
}

const editarLibro=async()=>{
    var libroid=document.querySelector("#libroid").value;
    var nombre=document.querySelector("#enombre").value;
    var precio=document.querySelector("#eprecio").value;
    var editorial=document.querySelector("#eeditorial").value;
    var autor=document.querySelector("#eautor").value;

    if(nombre.trim()===''||
    precio.trim()===''||
    editorial.trim()===''||
    autor.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD LIBRO'
          })
          return;
  
    }

    const datos=new FormData();
    datos.append("libroid",libroid);
    datos.append("nombre",nombre);
  datos.append("precio",precio);
  datos.append("editorial",editorial);
  datos.append("autor",autor);
  

  var respuesta=await fetch("php/libro/editarLibro.php",{
      method:'POST',
      body:datos
  });

  var resultado=await respuesta.json();
  document.querySelector("#editarModal").click();
  if(resultado.success==true){
    
      Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: resultado.mensaje,
          footer: 'CRUD LIBRO'
        })
        document.querySelector("#formEditar").reset();
        

  }else{
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: resultado.mensaje,
          footer: 'CRUD LIBRO'
        })
  }
 

cargarLibros();

}

const cargarEditoriales=async()=>{
  var respuesta=await fetch("php/editorial/cargarEditoriales.php",{});
  var registrosHTML=``;
  var resultado=await respuesta.json();

  //console.log(resultado);

  resultado.data.forEach(fila=>{
    registrosHTML+=`<option value"${fila[1]}">${fila[1]}</option>`;

  });
  document.querySelector("#editorial").innerHTML=registrosHTML;
  document.querySelector("#eeditorial").innerHTML=registrosHTML;
}
