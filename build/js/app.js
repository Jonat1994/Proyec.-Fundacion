document.addEventListener("DOMContentLoaded", () => {
  const galeria_menu = document.querySelector(".galeria_menu");
  const galeria = document.querySelector("#galeria");

  if(galeria_menu){
    galeria_menu.addEventListener('click', e => {
      if(e.target.classList.contains("btn_proyect")){
        e.preventDefault();
        const proyectNum = e.target.dataset.proyect;
    
        cargarGaleria(proyectNum);
      }
    })
  }

  cargarModales();
  cargarMobilemenu();
  cargarGaleria();
  cargarStickyHeader();
})

function cargarStickyHeader() {
  const header = document.querySelector('.header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
}

function cargarModales() {
  const modalImagen = document.querySelector("#modal-img");
  const divImagen = document.querySelector('.modal-body');

if(modalImagen) {
    modalImagen.addEventListener('show.bs.modal', (e) =>{ 
        const link = e.relatedTarget;
        const rutaImagen = link.getAttribute('data-bs-image');
        const folderImagen = link.getAttribute('data-bs-folder');
        
        // Detectar la ruta correcta según la ubicación del archivo
        const isInEnFolder = window.location.pathname.includes('/en/');
        const basePath = isInEnFolder ? '../build/img/' : './build/img/';
        
        // Asegurar que el nombre de la carpeta esté en minúsculas
        const folderLower = folderImagen ? folderImagen.toLowerCase() : '';
    
        const imagen = document.createElement('IMG');
        imagen.src = `${basePath}${folderLower}/${rutaImagen}.webp`;
        imagen.setAttribute('href', imagen.src);
        imagen.classList.add('img-fluid');
        imagen.alt = 'Imagen galeria';
        imagen.style.maxWidth = '100%';
        imagen.style.height = 'auto';
    
        divImagen.appendChild(imagen);
    })
    
    modalImagen.addEventListener('hidden.bs.modal', (e) =>{ 
        divImagen.textContent= "";
    })
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
})()
}

function cargarMobilemenu() {
  const mobile_menu = document.querySelector("#mobile_menu");
  const menu = document.querySelector("#menu");
  const close_menu = document.querySelector("#menu .close");

  if(mobile_menu) {
    mobile_menu.addEventListener("click", () => {
      menu.classList.add("active");
      console.log(menu.classList.contains("active"));
    })
  }

  close_menu.addEventListener("click", () => {
    menu.classList.remove("active");
  })
}

function cargarGaleria(num) {
  // Detectar la ruta correcta según la ubicación del archivo
  const galeria = document.querySelector("#galeria");
  const isInEnFolder = window.location.pathname.includes('/en/');
  const url = isInEnFolder ? "../../json/galeria.json" : "./json/galeria.json";
  const numProyecto = num ?? 0;

  if(galeria) {
    fetch(url)
      .then( res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then( data => {
        console.log('Datos recibidos:', data);
        if (data && data.galeria && data.galeria[numProyecto]) {
          console.log('Cargando proyecto:', numProyecto, 'con', data.galeria[numProyecto].images_data.length, 'imágenes');
          printImages(data.galeria[numProyecto].images_data);
        } else {
          console.error('No se encontraron datos de galería para el proyecto:', numProyecto);
        }
      })
      .catch( error => {
        console.error('Error cargando galería:', error);
        // Intentar con la ruta alternativa
        const altUrl = isInEnFolder ? "./json/galeria.json" : "../../json/galeria.json";
        fetch(altUrl)
          .then( res => res.json() )
          .then( data => {
            if (data && data.galeria && data.galeria[numProyecto]) {
              printImages(data.galeria[numProyecto].images_data);
            }
          })
          .catch( err => console.error('Error alternativo cargando galería:', err) );
      });
  }
}

function printImages(data) {
  const galeria = document.querySelector("#galeria");
  console.log('Cargando imágenes:', data);
  
  if (!galeria) {
    console.error('No se encontró el elemento #galeria');
    return;
  }
  
  clearSelector(galeria);

  if (!data || data.length === 0) {
    console.error('No hay imágenes para mostrar');
    const mensaje = document.createElement('li');
    mensaje.classList.add('col-12');
    mensaje.innerHTML = '<p class="text-center">No hay imágenes disponibles</p>';
    galeria.appendChild(mensaje);
    return;
  }

  const isInEnFolder = window.location.pathname.includes('/en/');
  const basePath = isInEnFolder ? '../build/img/' : './build/img/';

  data.forEach(image => {
    const  { name, folder } = image;
    
    // Construir la ruta correcta usando basePath (folder ya está en minúsculas en el JSON)
    const imageUrl = `${basePath}${folder}/${name}.webp`;
    
    const li_image = document.createElement("li");
    li_image.classList.add("col-md-6", "col-lg-4", "mb-4");
    li_image.innerHTML = `
    <a data-bs-toggle="modal" data-bs-target="#modal-img" data-bs-image="${name}" data-bs-folder="${folder}">
      <img class="img-fluid rounded shadow-sm" src="${imageUrl}" alt="${name}" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; cursor: pointer;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\'%3E%3Crect fill=\\'%23ddd\\' width=\\'400\\' height=\\'250\\'/%3E%3Ctext fill=\\'%23999\\' font-family=\\'sans-serif\\' font-size=\\'16\\' x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\'%3EImagen no encontrada%3C/text%3E%3C/svg%3E'">
    </a>
    `;

    galeria.appendChild(li_image);
  })
  
  console.log('Imágenes cargadas en la galería');
}

function clearSelector(selector) {
  while(selector.firstChild){
    selector.removeChild(selector.firstChild);
  }
}