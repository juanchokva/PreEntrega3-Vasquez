//Arrays necesarios
const discos = [];
let carrito = [];


//Objeto

class DiscoCom{
    constructor(id, nombre, artista, precio){
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.precio = Number(precio);
    }
}
//FUNCIONES
// agregar elementos al carrito

function discoAlCarrito(disco){
    carrito.push(disco);
}

//Función para que cada botón agregue un disco específico
function controlSwitch(numeroBoton){
    switch(numeroBoton){
        case 1:
            discoAlCarrito(discos[0]);
            actualizarCarrito()
            break;
        case 2:
            discoAlCarrito(discos[1]);
            actualizarCarrito()
            break;
        case 3:
            discoAlCarrito(discos[2]);
            actualizarCarrito()
            break;
        case 4:
            discoAlCarrito(discos[3]);
            actualizarCarrito()
            break;
        case 5:
            discoAlCarrito(discos[4]);
            actualizarCarrito()
            break;
        default:
            break;
    }
}; 

//función para sumar precios del carrito

function calcularPrecio(){
    let precios = carrito.map(n => n.precio)
    let total = precios.reduce((acumulador, elemento) => acumulador + elemento, 0)
    let preciosIva = carrito.map(n => n.precio*1.19)
    let totalIva = preciosIva.reduce((acumulador2, elemento2) => acumulador2+ elemento2, 0)
    return [total, totalIva];
}

//función para mostrar discos en el carrito

const contenedorCarrito = document.querySelector(".carrito-compras");
function actualizarCarrito(){
    contenedorCarrito.innerHTML = "";
    for (const e of carrito) {
        let divConCarrito = document.createElement("div");
        divConCarrito.classList.add("contenedor-carrito");
        divConCarrito.innerHTML = `<h3 class="titulo-disco" id="titulo-discarrito${carrito.indexOf(e) + 1}">${e.nombre}</h3>
        <p class="descrip-disco" id="descrip-discarrito${carrito.indexOf(e) + 1}">Artista: ${e.artista} | Precio: $${e.precio}</p>
        <button type="submit" class="boton-eliminar" id="eliminar${carrito.indexOf(e)+1}">Eliminar del carrito</button>`;
        contenedorCarrito.appendChild(divConCarrito);
        document.querySelector(`#eliminar${carrito.indexOf(e)+1}`).addEventListener("click", ()=> eliminarDiscarrito(carrito.indexOf(e)));
    }
    let contadorDiscos = document.createElement("p");
    contadorDiscos.innerText = `Número de discos en el carrito: ${carrito.length}`;
    contenedorCarrito.prepend(contadorDiscos);
    
    let mostrarPrecios = document.createElement("p");
    mostrarPrecios.innerText = `Precio total sin impuestos: $${calcularPrecio()[0]}. precio total más iva: $${calcularPrecio()[1]}`
    contenedorCarrito.append(mostrarPrecios);

    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

//Función para eliminar discos del carrito
function eliminarDiscarrito(indiceDisco){
    carrito.splice(indiceDisco, 1);
    actualizarCarrito();
}


//Carga de los discos al array. 

discos.push(new DiscoCom(1, "Resonancias", "Vásquez-Ocampo", 51000)) 
discos.push(new DiscoCom(2, "Silencios", "Sergio Cote", 50000)) 
discos.push(new DiscoCom(3, "Gamelán intergaláctico", "CCC", 62000)) 
discos.push(new DiscoCom(4, "Guitarras y sinte", "Notch", 60000)) 
discos.push(new DiscoCom(5, "Intersticios", "Baho", 63000))


//mostrar discos en la página.
const contenedorProductos = document.querySelector(".listado-discos");
for (const disco of discos) {
    let divConDiscos = document.createElement("div");
    divConDiscos.classList.add("contenedor-disco");
    divConDiscos.innerHTML = `<h3 class="titulo-disco" id="titulo-disco${discos.indexOf(disco) + 1}">${disco.nombre}</h3>
                        <p class="descrip-disco" id="descrip-disco${discos.indexOf(disco) + 1}">Artista: ${disco.artista} | Precio: $${disco.precio}</p>
                        <button type="submit" class="boton-agregar" id="agregar${discos.indexOf(disco) + 1}">Agregar al carrito</button>`;
    contenedorProductos.appendChild(divConDiscos);
}

//Agregar eventos de escucha a cada botón para agregar discos al carrito

document.querySelector("#agregar1").addEventListener("click", ()=> controlSwitch(1));
document.querySelector("#agregar2").addEventListener("click", ()=> controlSwitch(2));
document.querySelector("#agregar3").addEventListener("click", ()=> controlSwitch(3));
document.querySelector("#agregar4").addEventListener("click", ()=> controlSwitch(4));
document.querySelector("#agregar5").addEventListener("click", ()=> controlSwitch(5));

//Carga del localStorage

if(localStorage.getItem("carritoLS") != null){
    carrito = JSON.parse(localStorage.getItem("carritoLS"))
    actualizarCarrito()
}















