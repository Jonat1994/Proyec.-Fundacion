# 📝 Resumen de Actualización de Modal de Donaciones

## ✅ Archivos Ya Actualizados
- ✅ `index.html` - Modal nuevo + scripts
- ✅ `nosotros.html` - Modal nuevo + scripts

## 📋 Archivos Pendientes de Actualizar

### Archivos en Español (raíz):
1. `galeria.html`
2. `proyectos.html`
3. `fundador.html`
4. `vicefundador.html`
5. `ejes.html`
6. `colaboradores.html` (si tiene modal)
7. `contactanos.html` (si tiene modal)

### Archivos en Inglés (carpeta en/):
1. `en/index.html`
2. `en/galeria.html`
3. `en/proyectos.html`
4. `en/fundador.html`
5. `en/vicefundador.html`
6. `en/ejes.html`
7. `en/colaboradores.html`
8. `en/contactanos.html`
9. `en/nosotros.html`

## 🔧 Qué hacer en cada archivo:

1. **Reemplazar el modal antiguo** (líneas que dicen "Lo sentimos, estamos trabajando...") con el modal nuevo completo
2. **Agregar scripts antes de `</body>`**:
   - PayPal SDK
   - bootstrap.bundle.min.js
   - app.js
   - donaciones.js

## 📍 Notas Importantes:

- Para archivos en la **raíz**: usar rutas `./build/js/`
- Para archivos en **carpeta en/**: usar rutas `../build/js/`
- Para archivos en **inglés**: traducir los textos del modal

## 🚀 Scripts a agregar:

### En archivos de la raíz:
```html
<!-- PayPal SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID_PAYPAL_AQUI&currency=USD&intent=capture"></script>

<script src="./build/js/bootstrap.bundle.min.js"></script>
<script src="./build/js/app.js"></script>
<script src="./build/js/donaciones.js"></script>
```

### En archivos de carpeta en/:
```html
<!-- PayPal SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID_PAYPAL_AQUI&currency=USD&intent=capture"></script>

<script src="../build/js/bootstrap.bundle.min.js"></script>
<script src="../build/js/app.js"></script>
<script src="../build/js/donaciones.js"></script>
```

