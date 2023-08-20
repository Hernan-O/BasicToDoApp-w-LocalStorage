const arrayItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

document.querySelector("#enter").addEventListener("click", () =>{
    const item = document.querySelector("#item")
    crearItem(item)
})

function crearItem(item){
    if(item.value.length>0){
        arrayItems.push(item.value)
        localStorage.setItem("items",JSON.stringify(arrayItems))
        location.reload()
    }
}

function mostrarItems(){
    let items = ""
    for(let i = 0; i < arrayItems.length; i++){
        items += `<div class="item">
                    <div class="input-controller">
                        <textarea disabled>${arrayItems[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-regular fa-square-minus btnBorrar"></i>
                                <i class="fa-regular fa-square-check btnEditar"></i>
                            </div>
                            </div>
                                <div class="update-controller">
                                <button class = "saveBtn">Guardar</button>
                                <button class = "cancelBtn">Cancelar</button>
                        </div>    
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    botonEliminarListeners()
    botonEditarListeners()
    botonGuardarListeners()
    botonCancelarListeners()
}

function botonEliminarListeners(){
    let btnBorrar = document.querySelectorAll(".btnBorrar")
    btnBorrar.forEach((db,i) =>{
        db.addEventListener("click",()=>{borrarItem(i)})
    })
}


function botonEditarListeners(){
    const btnEditar = document.querySelectorAll(".btnEditar")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    btnEditar.forEach((eb,i) => {
        eb.addEventListener("click",() =>{
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}

function botonGuardarListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb,i) =>{
        sb.addEventListener("click",()=>{
            actualizarItem(inputs[i].value,i)
        })
    })
}

function botonCancelarListeners(){ 
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener("click",()=>{
            updateController[i].style.display = "none"
            inputs[i].disabled = true
            inputs[i].style.border = "none"
            location.reload()
        })
    })  
}

function borrarItem(i){
    arrayItems.splice(i,1)
    localStorage.setItem("items",JSON.stringify(arrayItems))
    location.reload()
}

function actualizarItem(text,i){
    arrayItems[i] = text
    localStorage.setItem("items", JSON.stringify(arrayItems))
    location.reload()
}



function mostrarFecha(){    //Investigar si la fecha se puede mostrar en español
    let fecha = new Date()
    console.log(fecha)
    fecha = fecha.toString().split(" ")
    document.querySelector("#fecha").innerHTML = fecha[1] + " " + fecha[2] + " " + fecha[3]
}

window.onload = function(){
    mostrarFecha()
    mostrarItems()
}