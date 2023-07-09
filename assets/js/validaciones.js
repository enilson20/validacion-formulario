export function valida(input){
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }
    else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}
const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "el campo nombre no puede estar vacio"
    },
    email:{
        valueMissing: "el campo email no puede estar vacio",
        typeMismatch: "el correo no es valido"
    },
    password: {
        valueMissing: "el campo contraseña no puede estar vacio",
        patternMismatch: "debe contener 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número o carácter especial."
    },
    nacimiento:{
        valueMissing: "este campo no puede estar vacio",
        customError: "debe tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es xxxxxxxxxx 10 digitos"
    },
    direccion:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es xxxxxxxxxx 10 digitos"
    },
    ciudad:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la ciudad debe contener de 4 a 40 caracteres"
    },
    estado:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el estado debe contener de 4 a 40 caracteres"
    }
}

const validadores={
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

 function validarNacimiento(input){
    const fechaCliente = new Date (input.value)
    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de adad"
    }

    input.setCustomValidity(mensaje)
}
 function mayorDeEdad(fecha){
    const fechaActual = new Date()
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate())
    return diferenciaFechas <= fechaActual
}