# 📖 Cómo Ver la Página con los Cambios

## Opción 1: Abrir Directamente (MÁS FÁCIL)

1. **Abre el archivo `index.html`** directamente en tu navegador:
   - Haz doble clic en el archivo `index.html`
   - O arrastra el archivo a tu navegador
   - O haz clic derecho → "Abrir con" → Tu navegador

⚠️ **NOTA IMPORTANTE**: Para ver los cambios visuales que hicimos, primero debes compilar los archivos SCSS a CSS (ver Opción 2).

---

## Opción 2: Compilar y Ver (RECOMENDADO)

### Paso 1: Instalar Dependencias (solo la primera vez)

Abre una terminal en esta carpeta y ejecuta:
```bash
npm install
```

### Paso 2: Compilar los Estilos SCSS a CSS

Ejecuta uno de estos comandos:

**Opción A - Usando npm:**
```bash
npm run build:css
```

**Opción B - Usando gulp directamente:**
```bash
npx gulp css
```

Esto compilará todos los archivos SCSS de `src/sass/` y creará el archivo `build/css/app.css` actualizado.

### Paso 3: Abrir el HTML

Ahora puedes abrir `index.html` directamente en tu navegador y verás todos los cambios.

---

## Opción 3: Usar un Servidor Local (OPCIONAL)

Si quieres usar un servidor local (útil para desarrollo), puedes:

### Con Python (si lo tienes instalado):
```bash
# Python 3
python -m http.server 8000

# O Python 2
python -m SimpleHTTPServer 8000
```

Luego abre en tu navegador: `http://localhost:8000`

### Con Node.js (npx):
```bash
npx http-server -p 8000
```

### Con VS Code:
1. Instala la extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## 📝 Resumen Rápido

**Para ver los cambios rápidamente:**

1. Ejecuta: `npm install` (solo la primera vez)
2. Ejecuta: `npm run build:css`
3. Abre `index.html` en tu navegador

**Si no puedes compilar:**
- Puedes abrir `index.html` directamente, pero no verás los nuevos estilos hasta compilar.

---

## 🔄 Modo Desarrollo (Watch)

Si vas a hacer cambios frecuentes, puedes usar:

```bash
npm run dev
```

Esto compilará automáticamente los SCSS cada vez que guardes un archivo.

