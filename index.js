document.getElementById('fileInput').addEventListener('change', function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    var xmlString = event.target.result;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "application/xml");
    processXML(xmlDoc);
  };

  reader.readAsText(file);
});



function processXML(xml) {
  document.getElementById('nombre').value = xml.getElementsByTagName("nombre")[0].textContent;
  document.getElementById('lv').value = xml.getElementsByTagName("lv")[0].textContent;
  document.getElementById('sexo').value = xml.getElementsByTagName("sexo")[0].textContent;
  document.getElementById('vida').value = xml.getElementsByTagName("vida")[0].textContent;
  document.getElementById('inputMana').value = xml.getElementsByTagName("mana")[0].textContent;

  document.getElementById('fuerza').value = xml.getElementsByTagName("fuerza")[0].textContent;
  document.getElementById('destreza').value = xml.getElementsByTagName("destreza")[0].textContent;
  document.getElementById('constitucion').value = xml.getElementsByTagName("constitucion")[0].textContent;
  document.getElementById('inteligencia').value = xml.getElementsByTagName("inteligencia")[0].textContent;
  document.getElementById('sabiduria').value = xml.getElementsByTagName("sabiduria")[0].textContent;
  document.getElementById('carisma').value = xml.getElementsByTagName("carisma")[0].textContent;

  setCheckboxValue('atletismo', xml);
  setCheckboxValue('acrobacias', xml);
  setCheckboxValue('sigilo', xml);
  setCheckboxValue('cArcano', xml);
  setCheckboxValue('historia', xml);
  setCheckboxValue('investigacion', xml);
  setCheckboxValue('naturaleza', xml);
  setCheckboxValue('orientacion', xml);
  setCheckboxValue('percepcion', xml);
  setCheckboxValue('medicina', xml);
  setCheckboxValue('perspicacia', xml);
  setCheckboxValue('supervivencia', xml);
  setCheckboxValue('engano', xml);
  setCheckboxValue('intimidacion', xml);
  setCheckboxValue('interpretacion', xml);
  setCheckboxValue('persuasion', xml);
  setCheckboxValue('juegoDeManos', xml);

  setCheckboxValue('fuerzaTS', xml);
  setCheckboxValue('destrezaTS', xml);
  setCheckboxValue('constitucionTS', xml);
  setCheckboxValue('inteligenciaTS', xml);
  setCheckboxValue('sabiduriaTS', xml);
  setCheckboxValue('carismaTS', xml);

  setDoteValue('dotes1', xml, 0);
  setDoteValue('dotes2', xml, 1);
  setDoteValue('dotes3', xml, 2);
  setDoteValue('dotes4', xml, 3);
  setDoteValue('dotes5', xml, 4);

  updateTodo();

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateTodo);
  });

  // Añadir evento de cambio para la fuerza
  document.getElementById('fuerza').addEventListener('input', updateTodo);
  document.getElementById('destreza').addEventListener('input', updateTodo);
  document.getElementById('constitucion').addEventListener('input', updateTodo);
  document.getElementById('inteligencia').addEventListener('input', updateTodo);
  document.getElementById('sabiduria').addEventListener('input', updateTodo);
  document.getElementById('carisma').addEventListener('input', updateTodo);
  document.getElementById('lv').addEventListener('input', updateTodo);

  const habilidades = xml.getElementsByTagName('habilidad');
  const contenedor = document.getElementById('habilidades');
  contenedor.innerHTML = '';// Limpiar el contenedor antes de agregar nuevas habilidades
  const leyenda = document.createElement('legend');
  leyenda.textContent = 'Habilidades';
  contenedor.appendChild(leyenda);

  for (let i = 0; i < habilidades.length; i++) {
    const divHabilidad = lecturaHabilidadesDiv(habilidades[i]);
    contenedor.appendChild(divHabilidad);
  }

  function ajustarAltura(elemento) {
   elemento.style.height = 'auto';
    elemento.style.width = 'auto';
    elemento.style.height = (elemento.scrollHeight) + 'px';
    elemento.style.width = (elemento.scrollWidth) + 'px'; 
  }
  
  // Obtener todos los textareas
  var textareas = document.querySelectorAll('textarea');
  
  // Ajustar la altura inicial de cada textarea
  textareas.forEach(function(textarea) {
    ajustarAltura(textarea);
  
    // Ajustar la altura en el evento 'input'
    textarea.addEventListener('input', function() {
        ajustarAltura(this);
    });
  });
}
var contadorDiv = 1;
function lecturaHabilidadesDiv(habilidad) {
  const br1 = document.createElement('br');
  const br2 = document.createElement('br');
  const br3 = document.createElement('br');
  const br4 = document.createElement('br');
  const br5 = document.createElement('br');
  const br6 = document.createElement('br');
  const br7 = document.createElement('br');

  var img = document.createElement('img');
    img.src = 'https://img.icons8.com/ios/50/visible--v1.png';
    img.style.width = '30px';
    img.style.height = '30px';

  const btn =  document.createElement('button');
  btn.classList.add('hideInfo');
  btn.appendChild(img);
  btn.id = 'habilidad'+contadorDiv;
  btn.onclick = () => {
    // Acción del botón
    ocultismo(btn.id);
  };

  const div = document.createElement('div');
  div.classList.add('habilidad'+contadorDiv);

  const nombre = document.createElement('textarea');
  nombre.type = 'text';
  nombre.classList.add('nombre');
  nombre.value = `${habilidad.getElementsByTagName('nombre')[0].textContent}`;

  const efectoSpan = document.createElement('span');
  efectoSpan.textContent = 'Efecto:';
  const efecto = document.createElement('textarea');
  efecto.type = 'text';
  efecto.classList.add('efecto');
  efecto.value = `${habilidad.getElementsByTagName('efecto')[0].textContent}`;

  const dañoSpan = document.createElement('span');
  dañoSpan.textContent = 'Daño:';
  const daño = document.createElement('textarea');
  daño.type = 'text';
  daño.classList.add('daño');
  daño.value = `${habilidad.getElementsByTagName('daño')[0].textContent}`;

  const costeSpan = document.createElement('span');
  costeSpan.textContent = 'Coste:';
  const coste = document.createElement('textarea');
  coste.type = 'text';
  coste.classList.add('coste');
  coste.value = `${habilidad.getElementsByTagName('coste')[0].textContent}`;

  const boton = document.createElement('button');
  boton.textContent = 'Usar Habilidad';
  
  // Añadir elementos al div

  div.appendChild(nombre);
  div.appendChild(btn)
  div.appendChild(br1);
  div.appendChild(efectoSpan);
  div.appendChild(br5);
  div.appendChild(efecto);
  div.appendChild(br2);
  div.appendChild(dañoSpan);
  div.appendChild(br6);
  div.appendChild(daño);
  div.appendChild(br3);
  div.appendChild(costeSpan);
  div.appendChild(br7);
  div.appendChild(coste);
  div.appendChild(br4);
  div.appendChild(boton);
  contadorDiv++;
  return div;
 
}

function crearHabilidad() {
  const br1 = document.createElement('br');
  const br2 = document.createElement('br');
  const br3 = document.createElement('br');
  const br4 = document.createElement('br');
  const br5 = document.createElement('br');
  const br6 = document.createElement('br');
  const br7 = document.createElement('br');

  const nombre1 = document.getElementById('nombreForm').value;
  const efecto1 = document.getElementById('efectoForm').value;
  const daño1 = document.getElementById('dañoForm').value;
  const coste1 = document.getElementById('costeForm').value;

  const div = document.createElement('div');
  div.classList.add('habilidad' + contadorDiv);

  var img = document.createElement('img');
  img.src = 'https://img.icons8.com/ios/50/visible--v1.png';
  img.style.width = '30px';
  img.style.height = '30px';
  img.classList.add('toggle-img'); // Añadir una clase para fácil acceso

  const btn = document.createElement('button');
  btn.classList.add('hideInfo');
  btn.appendChild(img);
  btn.id = 'habilidad' + contadorDiv;
  btn.onclick = () => {
    // Acción del botón
    ocultismo(btn.id);
  };

  const nombre = document.createElement('textarea');
  nombre.type = 'text';
  nombre.classList.add('nombre');
  nombre.value = nombre1;

  const efectoSpan = document.createElement('span');
  efectoSpan.textContent = 'Efecto:';
  const efecto = document.createElement('textarea');
  efecto.type = 'text';
  efecto.classList.add('efecto');
  efecto.value = efecto1;

  const dañoSpan = document.createElement('span');
  dañoSpan.textContent = 'Daño:';
  const daño = document.createElement('textarea');
  daño.type = 'text';
  daño.classList.add('daño');
  daño.value = daño1;

  const costeSpan = document.createElement('span');
  costeSpan.textContent = 'Coste:';
  const coste = document.createElement('textarea');
  coste.type = 'text';
  coste.classList.add('coste');
  coste.value = coste1;

  const boton = document.createElement('button');
  boton.textContent = 'Usar Habilidad';

  // Añadir elementos al div
  div.appendChild(nombre);
  div.appendChild(btn);
  div.appendChild(br1);
  div.appendChild(efectoSpan);
  div.appendChild(br5);
  div.appendChild(efecto);
  div.appendChild(br2);
  div.appendChild(dañoSpan);
  div.appendChild(br6);
  div.appendChild(daño);
  div.appendChild(br3);
  div.appendChild(costeSpan);
  div.appendChild(br7);
  div.appendChild(coste);
  div.appendChild(br4);
  div.appendChild(boton);

  const contenedor = document.getElementById('habilidades');
  contenedor.appendChild(div);

  contadorDiv++;
}

function ocultismo(divId) {
  const button = document.getElementById(divId);
  const divaOcultar = button.parentElement;
  const img = button.querySelector('img'); // Obtener la imagen dentro del botón

  const elements = Array.from(divaOcultar.children).filter(child => 
    child !== button && !(child.tagName === 'TEXTAREA' && child.classList.contains('nombre'))
  );

  elements.forEach(element => {
    if (element.style.display === 'none') {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  });

  // Cambiar la imagen del botón
  const anyHidden = elements.some(element => element.style.display === 'none');
  if (anyHidden) {
    img.src = 'https://img.icons8.com/ios/50/hide.png';
  } else {
    img.src = 'https://img.icons8.com/ios/50/visible--v1.png';
  }
}

function setCheckboxValue(id, xml) {
  var element = xml.getElementsByTagName(id)[0];
  if (element) {
    document.getElementById(id).checked = (element.textContent === 'true');
  }
}
function setDoteValue(id, xml, index) {
  console.log("dote seteado en teoria");
  var doteElements = xml.getElementsByTagName("dote");
  if (doteElements && doteElements.length > index) {
    document.getElementById(id).value = doteElements[index].textContent;
  }
}

function updateTodo() {
  var fuerza = parseFloat(document.getElementById('fuerza').value);
  var destreza = parseFloat(document.getElementById('destreza').value);
  var constitucion = parseFloat(document.getElementById('constitucion').value);
  var inteligencia = parseFloat(document.getElementById('inteligencia').value);
  var sabiduria = parseFloat(document.getElementById('sabiduria').value);
  var carisma = parseFloat(document.getElementById('carisma').value);
  var lv = parseFloat(document.getElementById('lv').value);

  updateHabilidad('atletismo', lv, fuerza, constitucion);
  updateHabilidad('acrobacias', lv, destreza, 10);
  updateHabilidad('cArcano', lv, inteligencia, sabiduria);
  updateHabilidad('historia', lv, inteligencia, 10);
  updateHabilidad('investigacion', lv, inteligencia, 10);
  updateHabilidad('naturaleza', lv, inteligencia, 10);
  updateHabilidad('orientacion', lv, inteligencia, destreza);
  updateHabilidad('percepcion', lv, sabiduria, 10);
  updateHabilidad('medicina', lv, inteligencia, 10);
  updateHabilidad('perspicacia', lv, sabiduria, 10);
  updateHabilidad('supervivencia', lv, sabiduria, destreza);
  updateHabilidad('engano', lv, carisma, 10);
  updateHabilidad('presencia', lv, carisma, inteligencia);
  updateHabilidad('interpretacion', lv, destreza, carisma);
  updateHabilidad('persuasion', lv, carisma, inteligencia);
  updateHabilidad('juegoDeManos', lv, destreza, 10);
  updateHabilidad('trabajosForzados', lv, destreza, fuerza);

  updateTiradaSalvacion('fuerza', lv, fuerza);
  updateTiradaSalvacion('destreza', lv, destreza);
  updateTiradaSalvacion('constitucion', lv, constitucion);
  updateTiradaSalvacion('inteligencia', lv, inteligencia);
  updateTiradaSalvacion('sabiduria', lv, sabiduria);
  updateTiradaSalvacion('carisma', lv, carisma);

  updateBonificador(lv);
}

function updateHabilidad(skillId, lv, baseValue, baseValue2) {
  var checkbox = document.getElementById(skillId);
  var pValue = document.getElementById(skillId + 'Valor');
  var bonificadorCompetencia;
  if (lv >= 1) bonificadorCompetencia = 2;
  if (lv >= 5) bonificadorCompetencia = 3;
  if (lv >= 9) bonificadorCompetencia = 4;
  if (lv >= 13) bonificadorCompetencia = 5;
  if (lv >= 17) bonificadorCompetencia = 6;

  if (checkbox.checked) {
    if (baseValue >= baseValue2) var modifiedValue = ((baseValue - 10) / 2) + bonificadorCompetencia;
    else var modifiedValue = ((baseValue2 - 10) / 2) + bonificadorCompetencia;

    pValue.textContent = Math.floor(modifiedValue); // Redondear hacia abajo
  } else {
    if (baseValue >= baseValue2) pValue.textContent = Math.floor(((baseValue - 10) / 2)); // Redondear hacia abajo
    else pValue.textContent = Math.floor(((baseValue2 - 10) / 2));

  }
}

function updateTiradaSalvacion(salvacionID, lv, baseValue) {
  var checkbox = document.getElementById(salvacionID + 'TS');
  var pValue = document.getElementById(salvacionID + 'Text');
  var bonificadorCompetencia;
  if (lv >= 1) bonificadorCompetencia = 2;
  if (lv >= 5) bonificadorCompetencia = 3;
  if (lv >= 9) bonificadorCompetencia = 4;
  if (lv >= 13) bonificadorCompetencia = 5;
  if (lv >= 17) bonificadorCompetencia = 6;

  if (checkbox.checked) {
    var modifiedValue = ((baseValue - 10) / 2) + bonificadorCompetencia;
    pValue.textContent = Math.floor(modifiedValue); // Redondear hacia abajo
  } else {
    pValue.textContent = Math.floor(((baseValue - 10) / 2)); // Redondear hacia abajo
  }
}

function copiarTirada(origen) {
  var bonificador = document.getElementById(origen);
  navigator.clipboard.writeText("/r d20+" + bonificador.textContent);
}

function updateBonificador(lv) {
  var bonificadorCompetencia = document.getElementById('bonificadorComp');
  if (lv >= 1) bonificadorCompetencia.textContent = 2;
  if (lv >= 5) bonificadorCompetencia.textContent = 3;
  if (lv >= 9) bonificadorCompetencia.textContent = 4;
  if (lv >= 13) bonificadorCompetencia.textContent = 5;
  if (lv >= 17) bonificadorCompetencia.textContent = 6;
}






function guardarXML() {
  const nombre = document.getElementById("nombre").value;
  const nivel = document.getElementById("lv").value;
  const sexo = document.getElementById("sexo").value;
  const vida = document.getElementById("vida").value;
  const mana = document.getElementById("inputMana").value;

  const fuerza = document.getElementById("fuerza").value;
  const destreza = document.getElementById("destreza").value;
  const constitucion = document.getElementById("constitucion").value;
  const inteligencia = document.getElementById("inteligencia").value;
  const sabiduria = document.getElementById("sabiduria").value;
  const carisma = document.getElementById("carisma").value;

  // Obtener las habilidades generales y sus valores
  const habilidadesGenerales = [
    "acrobacias", "atletismo", "cArcano", "engano", "historia", "interpretacion", 
    "investigacion", "juegoDeManos", "medicina", "naturaleza", "orientacion", 
    "percepcion", "perspicacia", "persuasion", "presencia", "supervivencia", 
    "trabajosForzados"
  ];

  // Obtener las dotes
  const dotes = [
    document.getElementById("dotes1").value,
    document.getElementById("dotes2").value,
    document.getElementById("dotes3").value,
    document.getElementById("dotes4").value,
    document.getElementById("dotes5").value
  ];

  // Obtener las tiradas de salvación
  const tiradasSalvacion = [
    "fuerzaTS", "destrezaTS", "constitucionTS", "inteligenciaTS", "sabiduriaTS", "carismaTS"
  ];

  // Crear la estructura XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<ficha>
  <nombre>${nombre}</nombre>
  <lv>${nivel}</lv>
  <sexo>${sexo}</sexo>
  <vida>${vida}</vida>
  <mana>${mana}</mana>
  <estadisticas>
    <fuerza>${fuerza}</fuerza>
    <destreza>${destreza}</destreza>
    <constitucion>${constitucion}</constitucion>
    <inteligencia>${inteligencia}</inteligencia>
    <sabiduria>${sabiduria}</sabiduria>
    <carisma>${carisma}</carisma>
  </estadisticas>
  <tiradasSalvacion>`;

  // Agregar las tiradas de salvación al XML
  tiradasSalvacion.forEach(tirada => {
    const valor = document.getElementById(tirada).checked ? "true" : "false";
    xml += `\n    <${tirada}>${valor}</${tirada}>`;
  });

  xml += `
  </tiradasSalvacion>
  <habilidades>`;

  // Agregar habilidades generales al XML
  habilidadesGenerales.forEach(habilidad => {
    const valor = document.getElementById(habilidad).checked ? "true" : "false";
    xml += `\n    <${habilidad}>${valor}</${habilidad}>`;
  });

  
  xml += `
  </habilidades>
  <dotes>`;
  
  dotes.forEach(dote => {
      xml += `\n        <dote>${dote}</dote>`;
  });

  xml += `
  </dotes>
  <habilidades>`
  
  const fieldset = document.getElementById('habilidades');
  // Obtener las habilidades personalizadas y agregarlas al XML
  const habilidadesPersonalizadas = fieldset.querySelectorAll("div");
  
  habilidadesPersonalizadas.forEach(habilidadDiv => {
    console.log("me cago en tu puta madre");
    const nombre = habilidadDiv.querySelector(".nombre").value;
    const efecto = habilidadDiv.querySelector(".efecto").value;
    const daño = habilidadDiv.querySelector(".daño").value;
    const coste = habilidadDiv.querySelector(".coste").value;
    
    xml += `
    <habilidad>
      <nombre>${nombre}</nombre>
      <efecto>${efecto}</efecto>
      <daño>${daño}</daño>
      <coste>${coste}</coste>
    </habilidad>`;
  });

  xml += `
  </habilidades>
</ficha>`;

  // Descargar el archivo XML
  const blob = new Blob([xml], { type: "application/xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ficha.xml";
  a.click();
}





function ocultismo(div){
  const button = document.getElementById(div);
  const divaOcultar = button.parentElement;
  const img = button.querySelector('img'); // Obtener la imagen dentro del botón

  const elements = Array.from(divaOcultar.children).filter(child => 
    child !== button && !(child.tagName === 'TEXTAREA' && child.classList.contains('nombre'))
  );

  elements.forEach(element => {
    if (element.style.display === 'none') {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  });

  // Cambiar la imagen del botón
  const anyHidden = elements.some(element => element.style.display === 'none');
  if (anyHidden) {
    img.src = 'https://img.icons8.com/ios/50/hide.png';
  } else {
    img.src = 'https://img.icons8.com/ios/50/visible--v1.png';
  }
}
