document.addEventListener("DOMContentLoaded", function () {
    // === FORMULARIO ===
    const form = document.getElementById("registerForm");

    // Inputs
    const rutInput = document.getElementById("rut");
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const cumpleanosInput = document.getElementById("cumpleanos");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const selRegion = document.getElementById('region');
    const selComuna = document.getElementById('comuna');
    const direccionInput = document.getElementById("direccion");

    // Error spans
    const rutError = document.getElementById("rut-error");
    const nombreError = document.getElementById("nombre-error");
    const apellidoError = document.getElementById("apellido-error");
    const emailError = document.getElementById("email-error");
    const telefonoError = document.getElementById("telefono-error");
    const cumpleanosError = document.getElementById("cumpleanos-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirmPassword-error");
    const regionError = document.getElementById("region-error");
    const comunaError = document.getElementById("comuna-error");
    const direccionError = document.getElementById("direccion-error");

    // Función para validar RUT
    function validarRut(rut) {
        if (!/^\d{8,9}[0-9Kk]?$/.test(rut)) return false;
        return true;
    }

    // Validación del formulario
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Limpiar mensajes
            [rutError, nombreError, apellidoError, emailError, telefonoError, cumpleanosError, passwordError, confirmPasswordError, regionError, comunaError, direccionError].forEach(span => span.textContent = "");

            let valid = true;

            // Validar RUT
            const rut = rutInput.value.trim();
            if (!rut) {
                rutError.textContent = "Por favor ingresa tu RUT.";
                valid = false;
            } else if (!validarRut(rut)) {
                rutError.textContent = "RUT inválido (solo números, último dígito puede ser K).";
                valid = false;
            }

            // Nombre
            if (!nombreInput.value.trim()) {
                nombreError.textContent = "Por favor ingresa tu nombre.";
                valid = false;
            }

            // Apellido
            if (!apellidoInput.value.trim()) {
                apellidoError.textContent = "Por favor ingresa tu apellido.";
                valid = false;
            }

            // Email
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@(gmail\.com|duocuc\.cl|profesor\.duocuc\.cl)$/;
            if (!email) {
                emailError.textContent = "Por favor ingresa tu correo.";
                valid = false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = "Correo inválido. Solo @gmail.com, @duocuc.cl o @profesor.duocuc.cl.";
                valid = false;
            } else if (email.length > 100) {
                emailError.textContent = "Correo no puede exceder 100 caracteres.";
                valid = false;
            }

            // Teléfono
            const telefono = telefonoInput.value.trim();
            if (!telefono) {
                telefonoError.textContent = "Por favor ingresa tu teléfono.";
                valid = false;
            } else if (!/^\d{8,9}$/.test(telefono)) {
                telefonoError.textContent = "Teléfono debe tener 8 o 9 dígitos.";
                valid = false;
            }

            // Cumpleaños
            if (!cumpleanosInput.value.trim()) {
                cumpleanosError.textContent = "Por favor ingresa tu fecha de cumpleaños.";
                valid = false;
            }

            // Región
            if (!selRegion.value) {
                regionError.textContent = "Selecciona tu región.";
                valid = false;
            }

            // Comuna
            if (!selComuna.value) {
                comunaError.textContent = "Selecciona tu comuna.";
                valid = false;
            }

            // Dirección
            if (!direccionInput.value.trim()) {
                direccionError.textContent = "Por favor ingresa tu dirección.";
                valid = false;
            }

            // Contraseña
            const password = passwordInput.value.trim();
            if (!password) {
                passwordError.textContent = "Por favor ingresa tu contraseña.";
                valid = false;
            } else if (password.length < 4 || password.length > 10) {
                passwordError.textContent = "Contraseña debe tener entre 4 y 10 caracteres.";
                valid = false;
            }

            // Confirmar contraseña
            const confirmPassword = confirmPasswordInput.value.trim();
            if (!confirmPassword) {
                confirmPasswordError.textContent = "Confirma tu contraseña.";
                valid = false;
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = "Las contraseñas no coinciden.";
                valid = false;
            }

            if (!valid) return;

            // Guardar usuario en localStorage
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuarios.some(u => u.email === email)) {
                emailError.textContent = "Este correo ya está registrado.";
                return;
            }

            usuarios.push({ rut, nombre: nombreInput.value.trim(), apellido: apellidoInput.value.trim(), email, telefono, cumpleanos: cumpleanosInput.value, region: selRegion.value, comuna: selComuna.value, direccion: direccionInput.value.trim(), password });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
            form.reset();

            window.location.href = "login.html";
        });
    }

    // === TOGGLE CONTRASEÑA ===
    const toggleButtons = document.querySelectorAll(".toggle-password");
    toggleButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (input.type === "password") {
                input.type = "text";
                this.querySelector("i").classList.replace("bi-eye-fill", "bi-eye-slash-fill");
            } else {
                input.type = "password";
                this.querySelector("i").classList.replace("bi-eye-slash-fill", "bi-eye-fill");
            }
        });
    });

    // === REGIONES Y COMUNAS ===
    const regiones = [
        {name:'Arica y Parinacota'}, {name:'Tarapacá'}, {name:'Antofagasta'}, {name:'Atacama'},
        {name:'Coquimbo'}, {name:'Valparaíso'}, {name:'Metropolitana de Santiago'}, {name:"O’Higgins"},
        {name:'Maule'}, {name:'Ñuble'}, {name:'Biobío'}, {name:'La Araucanía'}, {name:'Los Ríos'},
        {name:'Los Lagos'}, {name:'Aysén'}, {name:'Magallanes y Antártica'}
    ];

    const COMUNAS = {
        'Arica y Parinacota':['Arica','Camarones','Putre','General Lagos'],
        'Tarapacá':['Iquique','Alto Hospicio','Pozo Almonte','Camiña','Colchane','Huara','Pica'],
        'Antofagasta':['Antofagasta','Mejillones','Sierra Gorda','Taltal','Calama','Ollagüe','San Pedro de Atacama','Tocopilla','María Elena'],
        'Atacama':['Copiapó','Caldera','Tierra Amarilla','Chañaral','Diego de Almagro','Vallenar','Freirina','Huasco','Alto del Carmen'],
        'Coquimbo':['La Serena','Coquimbo','Andacollo','La Higuera','Paihuano','Vicuña','Illapel','Canela','Los Vilos','Salamanca','Ovalle','Combarbalá','Monte Patria','Punitaqui','Río Hurtado'],
        'Valparaíso':['Valparaíso','Viña del Mar','Concón','Quintero','Puchuncaví','Quillota','La Calera','Hijuelas','La Cruz','Nogales','San Antonio','Cartagena','El Tabo','El Quisco','Algarrobo','Santo Domingo','San Felipe','Llaillay','Catemu','Panquehue','Putaendo','Santa María','Los Andes','Calle Larga','Rinconada','San Esteban','Petorca','Cabildo','La Ligua','Papudo','Zapallar','Isla de Pascua'],
        'Metropolitana de Santiago':['Santiago','Cerrillos','Cerro Navia','Conchalí','El Bosque','Estación Central','Huechuraba','Independencia','La Cisterna','La Florida','La Granja','La Pintana','La Reina','Las Condes','Lo Barnechea','Lo Espejo','Lo Prado','Macul','Maipú','Ñuñoa','Pedro Aguirre Cerda','Peñalolén','Providencia','Pudahuel','Quilicura','Quinta Normal','Recoleta','Renca','San Joaquín','San Miguel','San Ramón','Vitacura','Puente Alto','Pirque','San José de Maipo','San Bernardo','Buin','Calera de Tango','Paine','Melipilla','Alhué','Curacaví','María Pinto','San Pedro','Talagante','El Monte','Isla de Maipo','Padre Hurtado','Peñaflor','Colina','Lampa','Tiltil'],
        'O’Higgins':['Rancagua','Machalí','Graneros','Codegua','Mostazal','Requínoa','Rengo','Malloa','Quinta de Tilcoco','San Vicente','Pichidegua','Peumo','Las Cabras','Coltauco','Doñihue','Coinco','Olivar','Pichilemu','La Estrella','Marchihue','Navidad','Litueche','San Fernando','Chimbarongo','Nancagua','Placilla','Santa Cruz','Lolol','Pumanque','Peralillo'],
        'Maule':['Talca','Curepto','Empedrado','Maule','Pencahue','Pelarco','Río Claro','San Clemente','San Rafael','Constitución','Curicó','Hualañé','Licantén','Vichuquén','Rauco','Romeral','Sagrada Familia','Teno','Molina','Linares','Colbún','Longaví','Parral','Retiro','San Javier','Villa Alegre','Yerbas Buenas','Cauquenes','Chanco','Pelluhue'],
        'Ñuble':['Chillán','Chillán Viejo','Bulnes','Cobquecura','Coelemu','Coihueco','El Carmen','Ninhue','Ñiquén','Pemuco','Pinto','Portezuelo','Quillón','Quirihue','Ránquil','San Carlos','San Fabián','San Ignacio','San Nicolás','Trehuaco','Yungay'],
        'Biobío':['Concepción','Talcahuano','Hualpén','Chiguayante','San Pedro de la Paz','Penco','Tomé','Hualqui','Florida','Santa Juana','Arauco','Cañete','Contulmo','Curanilahue','Lebu','Los Álamos','Tirúa','Coronel','Lota','Los Ángeles','Mulchén','Nacimiento','Negrete','Quilaco','Santa Bárbara','Alto Biobío','Antuco','Cabrero','Laja','San Rosendo','Tucapel','Yumbel'],
        'La Araucanía':['Temuco','Padre Las Casas','Cunco','Curarrehue','Freire','Gorbea','Lautaro','Loncoche','Melipeuco','Nueva Imperial','Perquenco','Pitrufquén','Pucón','Saavedra','Teodoro Schmidt','Toltén','Vilcún','Villarrica','Cholchol','Carahue','Galvarino','Angol','Collipulli','Curacautín','Ercilla','Lonquimay','Los Sauces','Lumaco','Purén','Renaico','Traiguén','Victoria'],
        'Los Ríos':['Valdivia','Corral','Lanco','Los Lagos','Máfil','Mariquina','Paillaco','Panguipulli','La Unión','Futrono','Lago Ranco','Río Bueno'],
        'Los Lagos':['Puerto Montt','Puerto Varas','Llanquihue','Frutillar','Fresia','Los Muermos','Maullín','Calbuco','Osorno','San Pablo','Purranque','Río Negro','Puyehue','San Juan de la Costa','Puerto Octay','Castro','Ancud','Quellón','Dalcahue','Chonchi','Queilén','Puqueldón','Quinchao','Curaco de Vélez','Chaitén','Futaleufú','Hualaihué','Palena'],
        'Aysén':['Coyhaique','Aysén','Cisnes','Guaitecas','Chile Chico','Río Ibáñez','Cochrane',"O'Higgins",'Tortel','Lago Verde'],
        'Magallanes y Antártica':['Punta Arenas','Río Verde','Laguna Blanca','San Gregorio','Puerto Natales','Torres del Paine','Porvenir','Primavera','Timaukel','Cabo de Hornos','Antártica']
    };

    // Llenar select de regiones
    regiones.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.name;
        opt.textContent = r.name;
        selRegion.appendChild(opt);
    });

    selRegion.addEventListener('change', function () {
        const list = COMUNAS[selRegion.value] || [];
        selComuna.innerHTML = '<option value="">Selecciona comuna…</option>' +
            list.map(c => `<option value="${c}">${c}</option>`).join('');
    });

    // === DROPDOWN MENU ===
    const btnAcceder = document.querySelector(".btn-acceder");
    const dropdown = document.querySelector(".dropdown-content");
    if (btnAcceder && dropdown) {
        btnAcceder.addEventListener("click", function () {
            dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
        });

        window.addEventListener("click", function (e) {
            if (!e.target.matches(".btn-acceder")) {
                if (dropdown.style.display === "block") {
                    dropdown.style.display = "none";
                }
            }
        });
    }
});
