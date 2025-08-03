"use strict";





// ------------------
// ELEMENTOS DEL DOM
// ------------------

const buttonMenu = document.querySelector('.button-menu');
const iconFlip = document.querySelector('.icon-flip');
const menuOverlay = document.querySelector('.menu-overlay');
const heroButton = document.querySelector(".button-hero-container");
const settings = document.querySelector(".configuracion");
const setupOverlay = document.querySelector(".setup");
const buttonTest = document.querySelector(".button-test");
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(option => {
    option.addEventListener("click",()=>{
        menuOverlay.classList.toggle("hidden")
    })
})




// ------------------
// MENÚ HAMBURGUESA
// ------------------

buttonMenu.addEventListener('click', () => {
  iconFlip.classList.toggle('rotated');
  menuOverlay.classList.toggle('hidden');
});


// ----------------------------
// MOSTRAR OVERLAY DEL SETUP
// ----------------------------

const goSetup = [heroButton, settings];

goSetup.forEach(btn => {
  btn.addEventListener("click", () => {
    setupOverlay.classList.toggle("hidden");
  });
});


// ---------------------------
// DATOS DEL SETUP INICIAL
// ---------------------------



function updateAllMoneyInput(value) {
  const moneyInput = document.querySelector(".home__allMoney-input");
  const formatted = parseFloat(value).toFixed(2);
  if (moneyInput) {
    moneyInput.value = formatted;
  }
  localStorage.setItem("target-money-allMoney", formatted);
}


let currentStep = 0; // Paso actual del cuestionario

const setupData = [
  {
    text: "¿Cómo te llamas? / What is your name?",
    answer : "input"
  },
  {
    text: "¿Cuánto dinero tienes? / How much money do you have?",
    money : "input",
  },
  {
    text: "¿Quieres recibir notificaciones? / Want receive notifications?",
    options: ["Sí", "No"]
  }

];


// ------------------------------------------
// BARRA DE PROGRESO
// ------------------------------------------
  const setupProgress = document.createElement("div");
  setupProgress.className = "progress-bar";

  const setupProgressFill = document.createElement("div");
  setupProgressFill.className = "fill";

  setupProgress.appendChild(setupProgressFill);




// ------------------------------------------
// FUNCIÓN PARA MOSTRAR UNA PREGUNTA NUEVA
// ------------------------------------------

const openQuestionsSetup = () => {
  // Contenedor principal
  const setupQuestionsContainer = document.createElement("div");
  setupQuestionsContainer.className = "setup-questions-container";

  if (setupData[currentStep].answer === "input") {
    // Pregunta con input
    const setupH3 = document.createElement("h3");
    setupH3.className = "option-h3";
    setupH3.textContent = setupData[currentStep].text;
    setupQuestionsContainer.appendChild(setupH3);

    const setupInput = document.createElement("input");
    setupInput.className = "setup-input";
    setupQuestionsContainer.appendChild(setupInput);

    const setupButton = document.createElement("button");
    setupButton.className = "setup-button disabled";
    setupButton.textContent = "Continuar";
    setupQuestionsContainer.appendChild(setupButton);

    // Habilitar botón solo si hay texto en el input
    setupInput.addEventListener("input", () => {
      if (setupInput.value.trim() !== "") {
        setupButton.classList.remove("disabled");
      } else {
        setupButton.classList.add("disabled");
      }
    });

    
    // Evento para avanzar


    setupButton.addEventListener("click", () => {
        const inputValue = setupInput.value.trim();
      if (!inputValue) {
        alert("Por favor introduzca los datos solicitados");
        return;
      }



      localStorage.setItem(`respuesta ${currentStep}`, inputValue);

      // Actualiza el nombre en el saludo inmediatamente después de guardar
      changeName();

      const progreso = ((currentStep + 1) / setupData.length) * 100;
      setupProgressFill.style.width = `${progreso}%`;

      setTimeout(() => {
        currentStep++;
        if (currentStep < setupData.length) {
          openQuestionsSetup();
        } else {
          setupOverlay.style.display = "none";
        }
      }, 900);
    });


    setupQuestionsContainer.appendChild(setupProgress);

    const setupContent = document.querySelector(".setup-content");
    setupContent.innerHTML = "";
    setupContent.appendChild(setupQuestionsContainer);


    return setupQuestionsContainer;

  } else if(setupData[currentStep].money === "input"){

    // Pregunta con input
    const setupH3 = document.createElement("h3");
    setupH3.className = "option-h3";
    setupH3.textContent = setupData[currentStep].text;
    setupQuestionsContainer.appendChild(setupH3);

    const setupInput = document.createElement("input");
    setupInput.className = "setup-input";
    setupInput.setAttribute("type","number");
    setupQuestionsContainer.appendChild(setupInput);

    const setupButton = document.createElement("button");
    setupButton.className = "setup-button disabled";
    setupButton.textContent = "Continuar";
    setupQuestionsContainer.appendChild(setupButton);

    // Habilitar botón solo si hay texto en el input
    setupInput.addEventListener("input", () => {
      if (setupInput.value.trim() !== "") {
        setupButton.classList.remove("disabled");
      } else {
        setupButton.classList.add("disabled");
      }
    });

    
    // Evento para avanzar


    setupButton.addEventListener("click", () => {
        const inputValue = setupInput.value.trim();
      if (!inputValue) {
        alert("Por favor introduzca los datos solicitados");
        return;
      }



      localStorage.setItem(`respuesta ${currentStep}`, inputValue);

      
    updateAllMoneyInput(inputValue);

      const progreso = ((currentStep + 1) / setupData.length) * 100;
      setupProgressFill.style.width = `${progreso}%`;

      setTimeout(() => {
        currentStep++;
        if (currentStep < setupData.length) {
          openQuestionsSetup();
        } else {
          setupOverlay.style.display = "none";
        }
      }, 900);
    });


    setupQuestionsContainer.appendChild(setupProgress);

    const setupContent = document.querySelector(".setup-content");
    setupContent.innerHTML = "";
    setupContent.appendChild(setupQuestionsContainer);


    return setupQuestionsContainer;
  }
  
  
  
  
  else {
    // Preguntas con opciones

    // Título de la pregunta
    const setupH3 = document.createElement("h3");
    setupH3.className = "option-h3";
    setupH3.textContent = setupData[currentStep].text;
    setupQuestionsContainer.appendChild(setupH3);

    // Contenedor de opciones
    const setupOptionsContainer = document.createElement("div");
    setupOptionsContainer.className = "options-container";

    // Crear cada opción
    setupData[currentStep].options.forEach((op) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";
      optionDiv.setAttribute("tabindex", "0");

      const optionP = document.createElement("p");
      optionP.className = "option-p";
      optionP.textContent = op;

      optionDiv.appendChild(optionP);
      setupOptionsContainer.appendChild(optionDiv);

      // Al hacer click, marcar la opción
      optionDiv.addEventListener("click", () => {
        setupOptionsContainer
          .querySelectorAll(".checked")
          .forEach((el) => el.classList.remove("checked"));
        optionDiv.classList.add("checked");
        setupButton.classList.remove("disabled");
      });
    });

    // Botón para avanzar
    const setupButton = document.createElement("button");
    setupButton.className = "setup-button disabled";
    setupButton.textContent = "Continuar";

    // Evento del botón continuar
    setupButton.addEventListener("click", () => {
      const selectedOption = setupOptionsContainer.querySelector(".checked");

      // Si no hay opción seleccionada, detener
      if (!selectedOption) {
        alert("Debes seleccionar una de las opciones");
        return;
      }

      // Guardar respuesta
      const respuesta = selectedOption.textContent;
      localStorage.setItem(`respuesta${currentStep}`, respuesta);



      const progreso = ((currentStep + 1) / setupData.length) * 100;
      setupProgressFill.style.width = `${progreso}%`;

      setTimeout(() => {
        currentStep++;
        if (currentStep < setupData.length) {
          openQuestionsSetup();
        } else {
          setupOverlay.style.display = "none";
        }
      }, 900);
    });

    // Ensamblar elementos
    setupQuestionsContainer.appendChild(setupOptionsContainer);
    setupQuestionsContainer.appendChild(setupButton);
    setupQuestionsContainer.appendChild(setupProgress);

    // Insertar en el DOM
    const setupContent = document.querySelector(".setup-content");
    setupContent.innerHTML = "";
    setupContent.appendChild(setupQuestionsContainer);



    return setupQuestionsContainer;
  }
};




// ----------------------------------
// TEST: MOSTRAR EL SETUP MANUALMENTE
// ----------------------------------

buttonTest.addEventListener("click", () => {
  openQuestionsSetup();
});










window.addEventListener("DOMContentLoaded", () => {
  // Primero intenta cargar el dinero actual guardado
  const currentMoney = localStorage.getItem("target-money-allMoney");
  if (currentMoney !== null) {
    updateAllMoneyInput(currentMoney);
  } else {
    // Si no existe, usa el dinero del setup
    const savedMoney = localStorage.getItem("respuesta 1");
    if (savedMoney) {
      updateAllMoneyInput(savedMoney);
    }
  }
});















// ----------------------------------
// VISUALIZACIÓN DE OBJETIVOS
// ----------------------------------

const maxTargets = 3;
let currentTarget = 0;

const homeAddTarget = document.querySelector(".home__add-target");
const homeGreetingContainer = document.querySelector(".home__greeting-container");
const homeGreetingbg = document.querySelector(".home__greeting-background");

const modalBg = document.querySelector(".home__modal-bg");
const inputMeta = document.getElementById("input-meta");
const btnGuardarMeta = document.getElementById("btn-guardar-meta");

let idModalActivo = null;

// ----------------------
// Carga inicial de objetivos
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Cargando objetivos guardados...");
    // Limpia objetivos previos
    homeGreetingContainer.querySelectorAll('.home__target-container').forEach(t => t.remove());

    let maxSavedIndex = -1;

    for (let i = 0; i < maxTargets; i++) {
        const savedTitle = localStorage.getItem(`target-title-${i}`);
        const savedMoney = localStorage.getItem(`target-money-${i}`);

        if (savedTitle) {
            console.log(`Cargando objetivo ${i}: título="${savedTitle}", dinero="${savedMoney || "0.00"}"`);
            crearObjetivoDesdeStorage(i, savedTitle, savedMoney || "0.00");
            maxSavedIndex = i;
        }
    }

    if (maxSavedIndex === -1) {
        console.log("No hay objetivos guardados, creando uno nuevo por defecto");
        crearObjetivoDesdeStorage(0);
        currentTarget = 1;
    } else {
        currentTarget = maxSavedIndex + 1;
        console.log(`Total objetivos cargados: ${currentTarget}`);
    }

    if (currentTarget >= maxTargets) {
        homeAddTarget.style.display = "none";
        console.log("Se ha alcanzado el máximo de objetivos, ocultando botón añadir");
    }
});

// ----------------------
// Crear objetivo en DOM desde storage o valores por defecto
// ----------------------
function crearObjetivoDesdeStorage(id, titleText = "(Edita el objetivo)", money = "0.00") {
    const targetContainer = document.createElement('div');
    targetContainer.classList.add('home__target-container');
    targetContainer.setAttribute("data-id", id);

    targetContainer.innerHTML = `
        <h4 class="home__target-title" contenteditable="false" spellcheck="false" data-id="${id}">${titleText}</h4>
        <span class="material-symbols-outlined home__target-bin" title="Eliminar objetivo">delete</span>
        <div class="home__target-bar" data-id="${id}">
            <div class="home__target-fill" style="width: 0%; transition: width 0.5s ease;"></div>
        </div>
        <span class="home__target-money" data-id="${id}">${parseFloat(money).toFixed(2)}</span>
        <div class="home__target-span-container">
            <span class="material-symbols-outlined home__target-add-money" title="Añadir dinero">add</span>
            <span class="material-symbols-outlined home__target-remove-money" title="Quitar dinero">remove</span>
        </div>
    `;

    // Añadir evento para eliminar objetivo
    const deleteBtn = targetContainer.querySelector('.home__target-bin');
    deleteBtn.addEventListener('click', () => {
        eliminarObjetivo(id);
    });

    // Añadir evento para activar edición título al hacer clic
    const titleEl = targetContainer.querySelector(".home__target-title");
    titleEl.addEventListener('click', () => {
        titleEl.setAttribute("contenteditable", "true");
        titleEl.style.border = "1px solid #f1f1f1";
        titleEl.focus();
    });

    // Guardar cambios al perder foco el título
    titleEl.addEventListener('blur', () => {
        titleEl.setAttribute("contenteditable", "false");
        titleEl.style.border = "none";

        const nuevoTitulo = titleEl.textContent.trim() || "(Edita el objetivo)";
        localStorage.setItem(`target-title-${id}`, nuevoTitulo);

        // Abrir modal para cantidad total solo si el título no es por defecto
        if (nuevoTitulo !== "(Edita el objetivo)") {
            mostrarModalParaCantidadTotal(id);
        }
    });

    // Añadir eventos para botones de añadir/quitar dinero
    const addMoneyBtn = targetContainer.querySelector(".home__target-add-money");
    const removeMoneyBtn = targetContainer.querySelector(".home__target-remove-money");

    addMoneyBtn.addEventListener('click', () => {
    // Leer dinero actual
    const currentMoney = parseFloat(localStorage.getItem(`target-money-${id}`)) || 0;
    // Definir cantidad a añadir (ejemplo: +10)
    const nuevoMoney = currentMoney ;
    modificarDinero(id, nuevoMoney);
});

    removeMoneyBtn.addEventListener('click', () => {
        const currentMoney = parseFloat(localStorage.getItem(`target-money-${id}`)) || 0;
        const nuevoMoney = currentMoney;
        modificarDinero(id, nuevoMoney);
    });


    homeGreetingContainer.appendChild(targetContainer);

    // Actualizar barra progreso al crear
    actualizarBarraProgreso(id);actualizarBarraProgreso
}

// ----------------------
// Añadir nuevo objetivo
// ----------------------
function crearObjetivo() {
    if (currentTarget >= maxTargets) {
        alert("No puedes crear más objetivos");
        homeAddTarget.style.display = "none";
        return;
    }

    crearObjetivoDesdeStorage(currentTarget);
    currentTarget++;

    if (currentTarget >= maxTargets) {
        homeAddTarget.style.display = "none";
    }


}

homeAddTarget.addEventListener("click", crearObjetivo);

// ----------------------
// Eliminar objetivo
// ----------------------
function eliminarObjetivo(id) {
    const allTargets = document.querySelectorAll(".home__target-container");
    if (allTargets.length <= 1) {
        alert("Debe haber al menos un objetivo");
        return;
    }

    // Eliminar del localStorage
    localStorage.removeItem(`target-title-${id}`);
    localStorage.removeItem(`target-money-${id}`);
    localStorage.removeItem(`target-total-${id}`);

    // Eliminar del DOM
    const target = document.querySelector(`.home__target-container[data-id="${id}"]`);
    if (target) {
        target.remove();
    }

    // Recontar objetivos tras eliminar
    const objetivosActuales = document.querySelectorAll(".home__target-container").length;
    currentTarget = objetivosActuales;

    // Mostrar botón añadir si hay espacio
    if (currentTarget < maxTargets) {
        homeAddTarget.style.display = "inline-block";
    }

    // Ajustar altura contenedor y background
    homeGreetingContainer.style.height = `${homeGreetingContainer.offsetHeight - step}px`;
    homeGreetingbg.style.height = `${homeGreetingbg.offsetHeight - step}px`;
}


// ----------------------
// Mostrar modal para editar cantidad total
// ----------------------
function mostrarModalParaCantidadTotal(id) {
    idModalActivo = id;
    inputMeta.value = localStorage.getItem(`target-total-${id}`) || "";
    modalBg.classList.remove("hidden");
}

// ----------------------
// Guardar cantidad total y cerrar modal
// ----------------------
btnGuardarMeta.addEventListener("click", () => {
    const cantidad = parseFloat(inputMeta.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Introduce una cantidad válida.");
        return;
    }

    console.log(`Guardando cantidad total ${cantidad.toFixed(2)} para objetivo ${idModalActivo}`);
    localStorage.setItem(`target-total-${idModalActivo}`, cantidad.toFixed(2));

    modalBg.classList.add("hidden");

    actualizarBarraProgreso(idModalActivo);
});

// ----------------------
// Modificar dinero gastado en objetivo (sumar/restar)
// ----------------------
function modificarDinero(id, cantidadNueva) {
    // Guardar en localStorage
    localStorage.setItem(`target-money-${id}`, cantidadNueva.toFixed(2));

    // Actualizar cantidad en interfaz
    const moneySpan = document.querySelector(`.home__target-money[data-id="${id}"]`);
    if (moneySpan) {
        moneySpan.textContent = cantidadNueva.toFixed(2);
    }

    // Actualizar barra progreso inmediatamente
    actualizarBarraProgreso(id);
}

// ----------------------
// Actualizar barra progreso
// ----------------------
function actualizarBarraProgreso(id) {
    const total = parseFloat(localStorage.getItem(`target-total-${id}`)) || 0;
    const gastado = parseFloat(localStorage.getItem(`target-money-${id}`)) || 0;
    const porcentaje = total > 0 ? Math.min((gastado / total) * 100, 100) : 0;

    const barraFill = document.querySelector(`.home__target-bar[data-id="${id}"] .home__target-fill`);
    if (barraFill) {
        // Primero forzamos un reflujo para que la transición pueda activarse
        barraFill.style.transition = 'none';
        barraFill.style.width = barraFill.style.width; // leer propiedad para forzar reflujo

        // Ahora activamos la transición y aplicamos el nuevo width
        setTimeout(() => {
            barraFill.style.transition = 'width 0.5s ease';
            barraFill.style.width = porcentaje + "%";
        }, 10); // 10ms es suficiente para que el navegador procese el cambio
    }
}


// ----------------------
// Cerrar modal al hacer click fuera o ESC
// ----------------------
modalBg.addEventListener("click", (e) => {
    if (e.target === modalBg) {
        modalBg.classList.add("hidden");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalBg.classList.contains("hidden")) {
        modalBg.classList.add("hidden");
    }
});

















































//IMPLEMENTAR EL NOMBRE Y LO LLAMO EN OPENQUESTIONSSETUP

function changeName() {
    const name = localStorage.getItem("respuesta 0");
    const homeGreetingName = document.querySelector(".home__greeting-name");

    if (homeGreetingName) {
        if (!name || !name.trim()) {
            homeGreetingName.textContent = "usuario";
        } else {
            homeGreetingName.textContent = name;
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    changeName();
});





// ------------------------------------------
// REGISTRO DE GASTOS/INGRESOS
// ------------------------------------------




// Función para obtener el icono correspondiente
function getIconForCategory(category) {
  const icons = {
    "Casa": "home",
    "Alimentación": "restaurant",
    "Ocio": "joystick",
    "Suscripciones": "tv",
    "Transporte": "directions_car",
    "Salud": "health_and_safety",
    "Educación": "school",
    "Ropa": "checkroom",
    "Mascotas": "pets",
    "Tecnología": "devices",
    "Regalos": "featured_seasonal_and_gifts",
    "Imprevistos": "warning",
    "Otros": "more_horiz"
  };

  return icons[category] || "add"; // Icono por defecto si no lo encuentra
}

// Estructura de datos por defecto

const defaultRegisterData = [
    {
        category: "Casa",
        subcategories: [
            { name: "Luz", amount: 0 },
            { name: "Agua", amount: 0 },
            { name: "Reparaciones", amount: 0 },
            { name: "Alquiler", amount: 0 }
        ]
    },
    {
        category: "Alimentación",
        subcategories: [
            { name: "Supermercado", amount: 0 },
            { name: "Restaurantes", amount: 0 },
            { name: "Cafeterías", amount: 0 },
            { name: "Snacks", amount: 0 }
        ]
    },
    {
        category: "Ocio",
        subcategories: [
            { name: "Cine", amount: 0 },
            { name: "Viajes", amount: 0 },
            { name: "Deporte", amount: 0 },
            { name: "Eventos", amount: 0 }
        ]
    },
    {
        category: "Suscripciones",
        subcategories: [
            { name: "Netflix", amount: 0 },
            { name: "Spotify", amount: 0 },
            { name: "HBO", amount: 0 },
            { name: "Disney+", amount: 0 }
        ]
    },
    {
        category: "Transporte",
        subcategories: [
            { name: "Gasolina", amount: 0 },
            { name: "Transporte", amount: 0 },
            { name: "Parking", amount: 0 },
            { name: "Taxis / Uber", amount: 0 }
        ]
    },
    {
        category: "Salud",
        subcategories: [
            { name: "Farmacia", amount: 0 },
            { name: "Médico", amount: 0 },
            { name: "Psicología", amount: 0 },
            { name: "Seguro médico", amount: 0 }
        ]
    },
    {
        category: "Educación",
        subcategories: [
            { name: "Matrícula", amount: 0 },
            { name: "Material", amount: 0 },
            { name: "Libros", amount: 0 },
            { name: "Cursos", amount: 0 }
        ]
    },
    {
        category: "Ropa",
        subcategories: [
            { name: "Ropa", amount: 0 },
            { name: "Zapatos", amount: 0 },
            { name: "Accesorios", amount: 0 }
        ]
    },
    {
        category: "Mascotas",
        subcategories: [
            { name: "Comida", amount: 0 },
            { name: "Veterinario", amount: 0 },
            { name: "Juguetes", amount: 0 },
            { name: "Otros", amount: 0 }
        ]
    },
    {
        category: "Tecnología",
        subcategories: [
            { name: "Dispositivos", amount: 0 },
            { name: "Accesorios", amount: 0 },
            { name: "Apps de pago", amount: 0 },
            { name: "Reparaciones", amount: 0 }
        ]
    },
    {
        category: "Regalos",
        subcategories: [
            { name: "Cumpleaños", amount: 0 },
            { name: "Navidad", amount: 0 },
            { name: "Pareja", amount: 0 },
            { name: "Detalles", amount: 0 }
        ]
    },
    {
        category: "Imprevistos",
        subcategories: [
            { name: "Urgencias", amount: 0 },
            { name: "Multas", amount: 0 },
            { name: "Averías", amount: 0 },
            { name: "Otros", amount: 0 }

        ]
    },
    {
        category: "Otros",
        subcategories: [
            { name: "Donaciones", amount: 0 },
            { name: "Comisiones", amount: 0 },
            { name: "Varios", amount: 0 }
        ]
    },
];


// Este bloque se ejecuta cuando el DOM ya está listo
document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar datos del localStorage o usar los por defecto
  let registerData = JSON.parse(localStorage.getItem("rememberCategories")) || defaultRegisterData;

  // 2. Pintar los botones
  renderCategoryButtons(registerData);
});

// Función que pinta los botones
function renderCategoryButtons(registerData) {
  const container = document.querySelector(".home__register-button-container");
  if (!container) {
    console.warn("No se encontró el contenedor .home__register-button-container");
    return;
  }


  registerData.forEach(cat => {
    const button = document.createElement("button");
    button.className = "home__register-button";
    button.setAttribute("title", cat.category);
    button.dataset.category = cat.category;

    const div = document.createElement("div");
    div.className = "home__register-span-container";

    const span = document.createElement("span");
    span.className = "material-symbols-outlined";
    span.textContent = getIconForCategory(cat.category);

    div.appendChild(span);
    button.appendChild(div);
    container.appendChild(button);

    // Evento click para mostrar modal y actualizar gráfica
    button.addEventListener('click', () => {
      renderModal(cat.category);
      renderChart(cat.category);
    });
  });
}


// Estructura de datos inicial



let registerData = JSON.parse(localStorage.getItem("rememberCategories")) || defaultRegisterData;


//Renderizar categorías

let currentCategoryName = null;

function renderModal(categoryName) {
    const existingModal = document.querySelector(".home__register-modal-bg");
    if (existingModal) existingModal.remove();

  currentCategoryName = registerData.find(c => c.category === categoryName);
  if (!currentCategoryName){
    alert("No se encontró la categoría")
    return;
  };

  // Creamos elementos base
  const modalBg = document.createElement("div");
  modalBg.className = "home__register-modal-bg";
  modalBg.setAttribute("role", "dialog");
  modalBg.setAttribute("aria-modal", "true");
  modalBg.setAttribute("aria-labelledby", "modal-title");

  const modalContainer = document.createElement("div");
  modalContainer.className = "home__register-modal-container";

  // Título
  const title = document.createElement("h5");
  title.className = "home__register-modal-title";
  title.id = "modal-title";
  title.textContent = "Subcategorías";

  // Nombre de la categoría
  const spanCategory = document.createElement("span");
  spanCategory.className = "home__register-modal-category";
  spanCategory.textContent = categoryName;

  // Lista de subcategorías
  const ul = document.createElement("ul");
  ul.className = "home__register-modal-subcategories";

  currentCategoryName.subcategories.forEach(sub => {
    const li = document.createElement("li");
    li.className = "home__register-modal-li";
    li.innerHTML = `${sub.name}: <input type="number" data-sub="${sub.name}">`;
    ul.appendChild(li);
  });

  // Botones
  const btnContainer = document.createElement("div");
  btnContainer.className = "home__register-modal-button-container";

  const btnAdd = document.createElement("button");
  btnAdd.className = "home__register-modal-button addExpense";
  btnAdd.textContent = "Añadir gasto";

  const btnBack = document.createElement("button");
  btnBack.className = "home__register-modal-button back";
  btnBack.textContent = "Atrás";

  btnContainer.append(btnAdd, btnBack);

//Creamos el event listener de los btn

  btnBack.addEventListener("click",()=>{
    modalBg.classList.add("hidden");
  })

  btnAdd.addEventListener("click",()=>{
    const registerInputs = modalBg.querySelectorAll(`input[type="number"]`);

    let error = false;

    registerInputs.forEach(input=>{
        let inputValue = input.value.trim();
        const isNumber = !isNaN(inputValue) && inputValue !== "";
        const isEmpty = inputValue === "";

        const subName = input.dataset.sub;
        if(isEmpty) return;
        if(!isNumber) error = true;
        else{
            //Buscamos en registerData la categoria actual || cat = category || sub = subcategorie
            const cat = registerData.find(c => c.category === currentCategoryName.category);
            const sub = cat.subcategories.find(s => s.name === subName);
            if(sub) sub.amount = Number(inputValue);
        }
        
    })


if (!error) {
  // 1. Guardar gastos
  localStorage.setItem("rememberCategories", JSON.stringify(registerData));
  alert("Gastos registrados correctamente");

  // 2. Calcular el total de gastos introducidos
  let totalGasto = 0;
  registerInputs.forEach(input => {
    const valor = parseFloat(input.value);
    if (!isNaN(valor) && valor > 0) {
      totalGasto += valor;
    }
  });

  // 3. Restar del total de dinero
  const allMoneyInput = document.querySelector(".home__allMoney-input");
  let dineroActual = parseFloat(allMoneyInput.value);
  if (!isNaN(dineroActual)) {
    let nuevoDinero = dineroActual - totalGasto;
    if (nuevoDinero < 0) nuevoDinero = 0; // Evitar negativos
    updateAllMoneyInput(nuevoDinero);
  }

  // 4. Cerrar modal y actualizar gráfica
  if (typeof renderChart === "function") {
    renderChart(currentCategoryName.category);
  }

  document.querySelector(".home__register-modal-bg").classList.add("hidden");
}

    else alert("Debes introducir tan solo caracteres numéricos");

  })

  // Juntamos todo
  modalContainer.append(title, spanCategory, ul, btnContainer);
  modalBg.appendChild(modalContainer);

  // Insertamos en el DOM (por ejemplo en el body o en un contenedor específico)
  document.body.appendChild(modalBg);


}










let categoriesCreated = 0;
const maxCategories = 3;


function createCategories (){
    if(categoriesCreated >= maxCategories){
        alert("No puedes crear más categorías");
        return
    } 

        currentCategoryName = `Categoría ${categoriesCreated + 1}`;


        if(registerData.some(cat => cat.category === currentCategoryName)){
            alert("No puedes crear más categorías");
            return;
        }

        const button = document.createElement("button");
        button.className = "home__register-button";
        button.setAttribute("title", currentCategoryName);
        button.dataset.category = currentCategoryName;

        const div = document.createElement("div");
        div.className = "home__register-span-container";
        button.appendChild(div);

        const span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = "add";
        div.appendChild(span);

        const container = document.querySelector(".home__register-button-container");
        container.appendChild(button);

        // Añadir la nueva categoría al array y guardar en localStorage
        registerData.push({
            category: currentCategoryName,
            subcategories: [
                { name: "Subcategoría 1", amount: 0 },
                { name: "Subcategoría 2", amount: 0 },
                { name: "Subcategoría 3", amount: 0 }
            ]
        });
        localStorage.setItem("rememberCategories", JSON.stringify(registerData));
        categoriesCreated++;


}






const addCategoriesButton = document.querySelector(".home__register-add");

addCategoriesButton.addEventListener("click", createCategories);

















const container = document.querySelector(".home__register-button-container");

container.addEventListener("click", (e) => {
  const btn = e.target.closest(".home__register-button");
  if (!btn) return;

  const categoryText = btn.dataset.category;
  const categoryData = registerData.find(c => c.category === categoryText);
  if (categoryData) renderModal(categoryText);
});



let objetosVistos = {};


document.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("home__target-add-money") ||
        e.target.classList.contains("home__target-remove-money")
    ) {
        const isAdd = e.target.classList.contains("home__target-add-money");
        const targetContainer = e.target.closest(".home__target-container") || e.target.closest(".home__allMoney");
        const isAllMoney = targetContainer.classList.contains("home__allMoney");

        const targetTitle = isAllMoney
            ? targetContainer.querySelector(".home__allMoney-h4").textContent.trim()
            : targetContainer.querySelector(".home__target-title").textContent.trim();

        let targetId;

        if (isAllMoney) {
        targetId = targetContainer.querySelector(".home__allMoney-h4").dataset.id;
        } else {
        targetId = targetContainer.querySelector(".home__target-title").dataset.id;
        }


        // Eliminar modal anterior
        const existingModal = document.querySelector(".home__target-money-modal-bg");
        if (existingModal) existingModal.remove();


        // Crear modal
        const modalBg = document.createElement("div");
        modalBg.className = "home__target-money-modal-bg";
        Object.assign(modalBg.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
        });

        const modalContainer = document.createElement("div");
        modalContainer.className = "home__target-money-modal-container";
        Object.assign(modalContainer.style, {
            background: "#fff",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            minWidth: "300px",
            textAlign: "center",
        });

        const title = document.createElement("h4");
        title.textContent = isAdd ? "¿Cuánto dinero quieres añadir?" : "¿Cuánto dinero quieres quitar?";
        title.style.marginBottom = "1rem";

        const input = document.createElement("input");
        Object.assign(input, {
            type: "number",
            min: "0",
            step: "0.01",
            placeholder: "Cantidad",
        });
        Object.assign(input.style, {
            marginBottom: "1rem",
            width: "80%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "2px solid black",
            borderRadius: "1rem",
        });

        const btnContainer = document.createElement("div");
        Object.assign(btnContainer.style, {
            display: "flex",
            justifyContent: "space-around",
            marginTop: ".5rem",
        });

        const btnConfirm = document.createElement("button");
        btnConfirm.textContent = isAdd ? "Añadir" : "Quitar";
        Object.assign(btnConfirm.style, {
            padding: "0.75rem 1.25rem",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        });

        const btnCancel = document.createElement("button");
        btnCancel.textContent = "Cancelar";
        Object.assign(btnCancel.style, {
            padding: "0.5rem 1rem",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        });

        btnContainer.appendChild(btnConfirm);
        btnContainer.appendChild(btnCancel);

        modalContainer.appendChild(title);
        modalContainer.appendChild(input);
        modalContainer.appendChild(btnContainer);
        modalBg.appendChild(modalContainer);
        document.body.appendChild(modalBg);

        btnCancel.addEventListener("click", () => {
            modalBg.remove();
        });

        btnConfirm.addEventListener("click", () => {
            const value = parseFloat(input.value);
            if (isNaN(value) || value <= 0) {
                alert("Introduce una cantidad válida.");
                return;
            }

            // Obtener el valor actual
            let currentMoney;

            if (isAllMoney) {
                currentMoney = parseFloat(document.querySelector(".home__allMoney-input").value) || 0;
            } else {
                const saved = localStorage.getItem(`target-money-${targetId}`);
                if(saved !== null) currentMoney = parseFloat(saved);
                else{
                    const moneyText = targetContainer.querySelector(".home__target-money")?.textContent;
                    currentMoney = parseFloat(moneyText) || 0;
                }
            }

            let newMoney;

            if (isAdd) {
            newMoney = currentMoney + value;
            } else {
            newMoney = currentMoney - value;
            }

            if (newMoney < 0) newMoney = 0;
            


            // Actualizar UI y guardar solo una vez para evitar duplicados
            if (isAllMoney) {
                document.querySelector(".home__allMoney-input").value = newMoney.toFixed(2);
                localStorage.setItem("target-money-allMoney", newMoney.toFixed(2));
            } else {
                // Si NO es el total general y se está añadiendo dinero al objetivo, restar del total general
                if (isAdd) {
                    const totalInput = document.querySelector(".home__allMoney-input");
                    let currentTotal = parseFloat(totalInput.value) || 0;

                    // Si el usuario intenta añadir más de lo que hay en el total, solo puede añadir lo que hay
                    let cantidadRealmenteAñadida = value;
                    if (value > currentTotal) {
                        cantidadRealmenteAñadida = currentTotal;
                        alert(`Solo puedes añadir ${cantidadRealmenteAñadida.toFixed(2)} porque es lo que tienes disponible.`);
                    }

                    // Actualizar el objetivo con la cantidad realmente añadida
                    let moneySpan = targetContainer.querySelector(".home__target-money");
                    let objetivoActual = parseFloat(moneySpan?.textContent) || 0;
                    let nuevoObjetivo = objetivoActual + cantidadRealmenteAñadida;
                    if (moneySpan) moneySpan.textContent = nuevoObjetivo.toFixed(2);
                    localStorage.setItem(`target-money-${targetId}`, nuevoObjetivo.toFixed(2));

                    // Restar del total global solo lo que realmente se añadió
                    let updatedTotal = currentTotal - cantidadRealmenteAñadida;
                    if (updatedTotal < 0) updatedTotal = 0;
                    totalInput.value = updatedTotal.toFixed(2);
                    localStorage.setItem("target-money-allMoney", updatedTotal.toFixed(2));
                }
                // Si NO es el total general y se está quitando dinero al objetivo, sumar al total general
                else {
                    const totalInput = document.querySelector(".home__allMoney-input");
                    let currentTotal = parseFloat(totalInput.value) || 0;

                    // Si el usuario pide quitar más de lo que hay, solo se puede quitar lo que hay
                    let cantidadRealmenteQuitada = value;
                    if (value > currentMoney) {
                        cantidadRealmenteQuitada = currentMoney;
                    }

                    // Actualizar el objetivo restando solo lo que realmente se quitó
                    let moneySpan = targetContainer.querySelector(".home__target-money");
                    let objetivoActual = parseFloat(moneySpan?.textContent) || 0;
                    let nuevoObjetivo = objetivoActual - cantidadRealmenteQuitada;
                    if (nuevoObjetivo < 0) nuevoObjetivo = 0;
                    if (moneySpan) moneySpan.textContent = nuevoObjetivo.toFixed(2);
                    localStorage.setItem(`target-money-${targetId}`, nuevoObjetivo.toFixed(2));

                    // Sumar al total global solo lo que realmente se quitó
                    let updatedTotal = currentTotal + cantidadRealmenteQuitada;
                    totalInput.value = updatedTotal.toFixed(2);
                    localStorage.setItem("target-money-allMoney", updatedTotal.toFixed(2));
                }
            }
            
actualizarBarraProgreso(targetId);


            modalBg.remove();
        });
    }
});



//Si nunca le has metido dinero, que salga un modal, que diga cuanto dinero tienes ya invertido y cuanto es el total que necesitas para alcanzarlo y una vez que conteste que ya le salga el modal de añadir o quitar



// /**
//  * Resta automáticamente el total de gastos de todas las categorías al dinero total.
//  * Llama a esta función cada vez que se añada un gasto.
//  */function actualizarDineroTotal() {
//   console.log("actualizarDineroTotal llamada");

//   let registerDataActual = JSON.parse(localStorage.getItem("rememberCategories")) || defaultRegisterData;
//   console.log("registerDataActual:", registerDataActual);

//   let totalGastos = 0;
//   registerDataActual.forEach(cat => {
//       cat.subcategories.forEach(sub => {
//           totalGastos += Number(sub.amount) || 0;
//       });
//   });
//   console.log("totalGastos:", totalGastos);

//   let dineroInicial = parseFloat(localStorage.getItem("respuesta 1")) || 0;
//   console.log("dineroInicial:", dineroInicial);

//   const dineroRestante = Math.max(dineroInicial - totalGastos, 0);
//   console.log("dineroRestante calculado:", dineroRestante);

//   updateAllMoneyInput(dineroRestante);
//   localStorage.setItem("target-money-allMoney", dineroRestante.toFixed(2));
// }


// document.addEventListener("click", (e) => {
//     if (e.target.classList.contains("addExpense")) {
//         setTimeout(actualizarDineroTotal, 100); // Espera a que se guarden los datos
//     }
// });









//=================
//CAMBIAR DE IDIOMAS
//=================
const flagsElement = document.getElementById("flags");

// Todos los elementos que tengan atributos data-section y data-value
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  // Carga el JSON con los textos para el idioma seleccionado
  const requestJson = await fetch(`./${language}.json`);
  const texts = await requestJson.json();

  // Para cada elemento que debe cambiar su texto...
  for (const textElement of textsToChange) {
    const section = textElement.dataset.section; // Ejemplo: "nav"
    const value = textElement.dataset.value;     // Ejemplo: "inicio"

    // Cambiar el texto interior por el texto que corresponda en el JSON
    if (texts[section] && texts[section][value]) {
      textElement.innerHTML = texts[section][value];
    }
  }
}

// Escucha el click en la bandera
flagsElement.addEventListener("click", (e) => {
  // El dataset del padre del target es el idioma
  const language = e.target.parentElement.dataset.language;
  if (language) {
    changeLanguage(language);
  }
});






//Funciona bien los objetivos con all money pero no con registro de gastos y poner lo de q si tengo 10 euros y pongo 20 q te diga q solo puedes 10



window.addEventListener("resize",()=>{
    document.body.style.width = window.innerWidth + "px";
})







