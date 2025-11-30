# 💳 Guía de Configuración de Pasarela de Pagos para Donaciones

## 📋 Resumen de Opciones Implementadas

He implementado un sistema completo de donaciones con **3 opciones** para recibir pagos:

1. **PayPal** (Recomendado) - Tarjetas de crédito/débito y PayPal
2. **Transferencia Bancaria** - Para donantes locales sin comisiones
3. **WhatsApp** - Contacto directo como respaldo

---

## 🚀 Paso 1: Configurar PayPal

### Opción A: PayPal Donations (Recomendado para Fundaciones)

1. **Crear cuenta de PayPal Business**
   - Ve a: https://www.paypal.com/business
   - Crea una cuenta Business (gratis)
   - Verifica tu cuenta con documentos

2. **Obtener credenciales de PayPal**
   - Inicia sesión en PayPal
   - Ve a: **Configuración** → **API** → **Credenciales de API**
   - Genera un **Client ID** para tu aplicación
   - Copia el **Client ID** (público)

3. **Configurar en el código**
   - Abre `index.html`
   - Busca esta línea (aproximadamente línea 461):
     ```html
     <script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID_PAYPAL_AQUI&currency=USD&intent=capture"></script>
     ```
   - Reemplaza `TU_CLIENT_ID_PAYPAL_AQUI` con tu Client ID real
   - Ejemplo:
     ```html
     <script src="https://www.paypal.com/sdk/js?client-id=AXYz123...&currency=USD&intent=capture"></script>
     ```

4. **Cambiar la moneda (opcional)**
   - Para USD: `currency=USD`
   - Para EUR: `currency=EUR`
   - Para monedas locales, verifica si PayPal las acepta

### Opción B: PayPal Business (Más opciones)

Si quieres más control, puedes usar PayPal Business API completa:
- Requiere backend para seguridad completa
- Permite procesar pagos recurrentes
- Necesita Server-side integration

---

## 🏦 Paso 2: Configurar Transferencia Bancaria

1. **Abrir el archivo `index.html`**
   - Busca la sección de "Transferencia Bancaria" (aproximadamente línea 435)

2. **Editar la información bancaria**
   - Reemplaza `[Nombre del Banco]` con tu banco real
   - Reemplaza `[Número de cuenta]` con tu número de cuenta real
   - Ejemplo:
     ```html
     <strong>Banco:</strong> 
     <span class="text-primary">Banco Agrícola</span>
     
     <strong>Cuenta:</strong> 
     <span class="text-primary" id="account-number">1234-5678-9012-3456</span>
     ```

3. **Configurar en todos los archivos HTML**
   - Debes actualizar esta información en TODOS los archivos HTML que tengan el modal de donaciones:
     - `index.html`
     - `nosotros.html`
     - `galeria.html`
     - `proyectos.html`
     - `ejes.html`
     - `fundador.html`
     - `vicefundador.html`
     - Y todos los archivos en la carpeta `en/`

---

## ✅ Paso 3: Verificar Funcionamiento

1. **Abrir la página en el navegador**
2. **Hacer clic en el botón "Donar"**
3. **Probar cada opción:**
   - Montos predefinidos ($10, $25, $50, etc.)
   - Monto personalizado
   - Transferencia bancaria (copiar número)
   - WhatsApp

---

## 📝 Otras Pasarelas de Pago Recomendadas

Si prefieres otras opciones, aquí tienes recomendaciones:

### 1. Mercado Pago (Popular en Latinoamérica)
- **Ventajas:** Acepta tarjetas locales, transferencias, efectivo
- **Comisiones:** ~3.99% + IVA
- **Sitio:** https://www.mercadopago.com.sv
- **Integración:** Similar a PayPal, requiere SDK

### 2. Stripe (Profesional)
- **Ventajas:** Muy seguro, muchas opciones
- **Comisiones:** ~2.9% + $0.30 por transacción
- **Sitio:** https://stripe.com
- **Nota:** Requiere backend más complejo

### 3. Transferencias Directas
- **Ventajas:** Sin comisiones
- **Desventajas:** Proceso manual
- **Recomendación:** Mantener como opción alternativa

---

## 🔒 Consideraciones de Seguridad

1. **Nunca expongas credenciales privadas**
   - Solo usa el Client ID público de PayPal
   - Las credenciales secretas van en el servidor (backend)

2. **Usa HTTPS**
   - PayPal requiere conexión segura en producción
   - Considera usar un certificado SSL gratuito (Let's Encrypt)

3. **Verifica las donaciones**
   - PayPal envía notificaciones webhook
   - Guarda registros de todas las transacciones

---

## 💡 Recomendación Final

Para una fundación en El Salvador, recomiendo:

1. **PayPal** como opción principal (fácil, reconocido, seguro)
2. **Transferencia bancaria** para donantes locales (sin comisiones)
3. **WhatsApp** como respaldo (ya lo tienes configurado)

**Próximos pasos sugeridos:**
1. Configura PayPal con tu Client ID
2. Actualiza la información bancaria
3. Prueba todo el flujo de donaciones
4. Considera agregar un backend para recibir notificaciones de PayPal

---

## 📞 Soporte

Si necesitas ayuda adicional:
- **PayPal:** https://www.paypal.com/sv/webapps/mpp/paypal-safety-and-security
- **Documentación PayPal:** https://developer.paypal.com/docs

---

## ✨ Características Implementadas

✅ Botones de montos rápidos ($10, $25, $50, $100, $250)  
✅ Campo para monto personalizado  
✅ Integración con PayPal  
✅ Información de transferencia bancaria  
✅ Botón de WhatsApp como alternativa  
✅ Diseño responsive y profesional  
✅ Mensajes de confirmación  
✅ Funcionalidad de copiar número de cuenta  

¡Todo listo para recibir donaciones! 🎉

