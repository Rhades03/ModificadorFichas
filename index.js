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
    const divHabilidad = crearHabilidadDiv(habilidades[i]);
    contenedor.appendChild(divHabilidad);
  }
}

function crearHabilidadDiv(habilidad) {
  const br1 = document.createElement('br');
  const br2 = document.createElement('br');
  const br3 = document.createElement('br');
  const br4 = document.createElement('br');

  const div = document.createElement('div');
  div.classList.add('habilidad');

  const nombre = document.createElement('span');
  nombre.classList.add('nombre');
  nombre.textContent = `${habilidad.getElementsByTagName('nombre')[0].textContent}`;

  const efecto = document.createElement('span');
  efecto.classList.add('efecto');
  efecto.textContent = `Efecto: ${habilidad.getElementsByTagName('efecto')[0].textContent}`;

  const daño = document.createElement('span');
  daño.classList.add('daño');
  daño.textContent = `Daño: ${habilidad.getElementsByTagName('daño')[0].textContent}`;

  const coste = document.createElement('span');
  coste.classList.add('coste');
  coste.textContent = `Coste: ${habilidad.getElementsByTagName('coste')[0].textContent}`;

  const boton = document.createElement('button');
  boton.textContent = 'Usar Habilidad';
  boton.onclick = () => {
    // Acción del botón
    alert(`Usando la habilidad: ${nombre.textContent}`);
  };

  // Añadir elementos al div

  div.appendChild(nombre);
  div.appendChild(br1);
  div.appendChild(efecto);
  div.appendChild(br2);
  div.appendChild(daño);
  div.appendChild(br3);
  div.appendChild(coste);
  div.appendChild(br4);
  div.appendChild(boton);

  return div;

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

// Código para manejar el modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("addHabilidadBtn");
var span = document.getElementsByClassName("close")[0];
var form = document.getElementById("habilidadForm");

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

form.onsubmit = function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreInput").value;
  const efecto = document.getElementById("efectoInput").value;
  const daño = document.getElementById("dañoInput").value;
  const coste = document.getElementById("costeInput").value;

  const habilidad = {
    getElementsByTagName: function (tagName) {
      const mapping = {
        'nombre': { textContent: nombre },
        'efecto': { textContent: efecto },
        'daño': { textContent: daño },
        'coste': { textContent: coste }
      };
      return [mapping[tagName]];
    }
  };

  const contenedor = document.getElementById('habilidades');
  const divHabilidad = crearHabilidadDiv(habilidad);
  contenedor.appendChild(divHabilidad);

  modal.style.display = "none";
  form.reset();
}