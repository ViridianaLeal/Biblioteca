let libros=JSON.parse(localStorage.getItem("libros"));
if(!libros){  
  localStorage.setItem("libros",JSON.stringify([]));}

const cargarCatalogo=async(editorial)=>{
    var respuesta=await fetch("php/libro/cargarLibros.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    var librosHTML="";
    let i=1;
    if(editorial=="0"){
        resultado.data.forEach(libro=>{      
            if(i%2==1){librosHTML+=`<div class="row W-50">`}
            librosHTML+=`<div class="col">
                            <div class="card bg-white text-dark w-100 m-auto mb-1 p-4">
                                <img src="img.jpg" width="100%">
                                <p><b>${libro[1].toUpperCase()}</b></p>
                                <p><b>$${libro[2]}</b></p>
                                <button class="btn btn-primary" onclick="comprarLibro(${i})">Comprar</button>
                            </div>
                            </div>`
            if(i%2==0){librosHTML+=`</div>`}
            i++;
        })
        }else{
            resultado.data.forEach(libro=>{            
                if(editorial==libro[3]){
                    if(i%2==1){librosHTML+=`<div class="row W-50">`}
                librosHTML+=`<div class="col">
                                <div class="card bg-white text-dark w-100 m-auto mb-1 p-4">
                                    <img src="img.jpg" width="100%">
                                    <p><b>${libro[1].toUpperCase()}</b></p>
                                    <p><b>$${libro[2]}</b></p>
                                    <button class="btn btn-primary" onclick="comprarLibro(${i})">Comprar</button>
                                </div>
                                </div>`                          
                    if(i%2==0){librosHTML+=`</div>`}
                    i++;
                }                
            })
        }
    document.querySelector("#listLibros").innerHTML=librosHTML;
    
}



const cargarEditoriales=async()=>{
    var respuesta=await fetch("php/editorial/cargarEditoriales.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();
    registrosHTML=`<option value="0">TODAS</option>`;
    resultado.data.forEach(fila=>{
        registrosHTML+=`<option value"${fila[1]}">${fila[1]}</option>`;
    });
    document.querySelector("#editorial").innerHTML=registrosHTML;
}