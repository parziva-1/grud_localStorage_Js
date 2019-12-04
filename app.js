// variables globales
const formularioUI = document.querySelector("#formulario");
const listaActividades = document.querySelector("#listaActividades");
let arrayA = [];


// funciones
const crearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
        
    }
    arrayA.push(item);

    return item;
}

const guardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayA));
    pintarDB();
};

const pintarDB = () => {
    listaActividades.innerHTML = '';
    arrayA = JSON.parse(localStorage.getItem('rutina'));
    if(arrayA === null){    
        arrayA = [];
    }else{
        arrayA.forEach(element => {
            if(element.estado == true){
                listaActividades.innerHTML += `<div class="alert alert-primary" role="alert"><i class="material-icons float-left mr-3">accessibility_new</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><b>D </b><b>E<i class="material-icons">done</i></b></span></div>`
            }else{
                listaActividades.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-3">I</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><b>D </b><b>E</b></span></div>`
            }
        });
    }
};

const eliminarDB = (actividad) => {

    console.log(actividad);
    let indexA;
    arrayA.forEach( (elemento, index) => {
        if(elemento.actividad === actividad){
            indexA = indexA
        };
    })
    // console.log(indexA);
    arrayA.splice(indexA,1);
    guardarDB();

};

const editarDB = (actividad) => {
   let indexArray = arrayA.findIndex((elemento) => {return elemento.actividad === actividad});
    console.log(arrayA[indexArray]);
    if(arrayA[indexArray].estado == true){
        arrayA[indexArray].estado = false;
    }else if(arrayA[indexArray].estado == false){
        arrayA[indexArray].estado = true;
    }
    guardarDB();
};

//eventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    crearItem(actividadUI);
    guardarDB();
    pintarDB();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', pintarDB);

listaActividades.addEventListener('click', (e) => {
    e.preventDefault();
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML == 'D ' || e.target.innerHTML == 'E'){
        // console.log('accion de d');
        if(e.target.innerHTML == 'D '){
            editarDB(texto);
        };

        if(e.target.innerHTML == 'E'){
            eliminarDB(texto);
        };
    }
    }
);