let libros=JSON.parse(localStorage.getItem("libros"));
if(!libros){  
  localStorage.setItem("libros",JSON.stringify([]));}

const mostrarLibros=(editorial)=>{
    var librosHTML="";
    libros=JSON.parse(localStorage.getItem("libros"))
    let i=1;
    if(editorial=="0"){
        libros.map(libro=>{       
            if(i%2==1){librosHTML+=`<div class="row W-50">`}
            librosHTML+=`<div class="col">
                            <div class="card bg-white text-dark w-100 m-auto mb-1 p-4">
                                <img src="img.jpg" width="100%">
                                <p><b>${libro.nombre.toUpperCase()}</b></p>
                                <p><b>$${libro.precio}</b></p>
                                                                    <p><b>${libro.autor}</b></p>
                                <button class="btn btn-primary" onclick="comprarLibro(${i})">Comprar</button>
                            </div>
                            </div>`
            if(i%2==0){librosHTML+=`</div>`}
            i++;
        })
        }else{
            libros.map(libro=>{                
                if(editorial==libro.editorial){
                    if(i%2==1){librosHTML+=`<div class="row W-50">`}
                librosHTML+=`<div class="col">
                                <div class="card bg-white text-dark w-100 m-auto mb-1 p-4">
                                    <img src="img.jpg" width="100%">
                                    <p><b>${libro.nombre.toUpperCase()}</b></p>
                                    <p><b>$${libro.precio}</b></p>
                                                                        <p><b>${libro.autor}</b></p>
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



const mostrarEditoriales=()=>{
    var editorialesHTML="";
    editoriales=JSON.parse(localStorage.getItem("editoriales"))
    editorialesHTML+=`<option value="0">TODAS</option>`; 
    editoriales.map(editorial=>{
        editorialesHTML+=`<option value="${editorial.nombre}">${editorial.nombre}</option>`;        
    })
    document.querySelector("#editorial").innerHTML=editorialesHTML;
}