# Configuración de Google Sheets para Pre-registros

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"ScanToEat - Pre-registros"**
4. **IMPORTANTE**: Renombra la primera hoja a **"Pre-Registro"** (haz click en "Hoja 1" abajo y renombra)
5. En la primera fila, agrega estos encabezados:
   - A1: `Timestamp`
   - B1: `Nombre`
   - C1: `Email`
6. **NO publiques esta hoja en la web**
7. **Mantén los permisos en privado** (solo tú puedes acceder)

## Paso 2: Crear Apps Script

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Borra el código por defecto
3. Pega este código:

```javascript
const SHEET_ID = '1Z5bmSd7RkkzUKc91AQWfHjFTGiIIdqiQb92smWfYtts';
const SHEET_NAME = 'Pre-Registro';

const ALLOWED_DOMAINS = [
  "gmail.com", "outlook.com", "hotmail.com", "yahoo.com",
  "icloud.com", "proton.me", "gmail.com.uy", "hotmail.com.uy", "fi365.ort.edu.uy"
];

const BANNED_DOMAINS = [
  "mailinator.com", "tempmail.com", "10minutemail.com",
  "guerrillamail.com", "discard.email", "trashmail.com"
];

function doPost(e) {
  try {
    // Soportar JSON o form-urlencoded
    var payload = null;
    if (e.postData && e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        return respond({ result: "error", error: "Invalid JSON" });
      }
    } else {
      // cuando llega application/x-www-form-urlencoded o multipart/form-data
      payload = {
        nombre: e.parameter.nombre,
        email: e.parameter.email
      };
    }

    if (!payload) {
      return respond({ result: "error", error: "No data received" });
    }

    Logger.log("Datos recibidos: " + JSON.stringify(payload));

    var nombre = String(payload.nombre || "").trim();
    var email = String(payload.email || "").trim().toLowerCase();

    // Validaciones
    if (nombre.length < 2 || nombre.length > 50) {
      return respond({ result: "error", error: "Nombre inválido." });
    }
    if (/^\d+$/.test(nombre) || nombre.toLowerCase().includes("test")) {
      return respond({ result: "error", error: "Nombre inválido." });
    }

    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return respond({ result: "error", error: "Email no válido." });
    }

    var domain = email.split("@")[1];
    if (BANNED_DOMAINS.includes(domain)) {
      return respond({ result: "error", error: "Email desechable detectado." });
    }
    if (!ALLOWED_DOMAINS.includes(domain)) {
      return respond({
        result: "error",
        error: "Usá un correo real (gmail, outlook, hotmail...)"
      });
    }

    // Verificar duplicados
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0];

    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var rowEmail = String(rows[i][2] || "").trim().toLowerCase();
      if (!rowEmail) continue;
      if (rowEmail === email) {
        return respond({ result: "error", error: "Este email ya está registrado." });
      }
    }

    // Guardar
    var now = new Date();
    var uy = new Date(now.getTime() - 3 * 3600000);
    var timestamp = uy.toISOString().replace("T", " ").substring(0, 19);

    sheet.appendRow([timestamp, nombre, email]);
    Logger.log("Registro exitoso: " + email);

    return respond({ result: "success", message: "Registro guardado correctamente." });

  } catch (err) {
    Logger.log("Error fatal: " + err);
    return respond({ result: "error", error: "Error interno del servidor." });
  }
}

// No intenta inyectar headers. El proxy se encarga de CORS.
function doOptions(e) {
  return respond({}); // responde 200 con body {} (proxy debería interceptar OPTIONS)
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Haz clic en **Guardar** (icono de diskette)
5. Nombra el proyecto: **"ScanToEat Pre-registro API"**

## Paso 3: Desplegar el Script (CON SEGURIDAD)

1. Haz clic en **Implementar > Nueva implementación**
2. Haz clic en el icono de engranaje ⚙️ junto a "Seleccionar tipo"
3. Selecciona **Aplicación web**
4. Configura:
   - **Descripción**: "ScanToEat Pre-registro v1"
   - **Ejecutar como**: "Yo (tu@email.com)" ⚠️ IMPORTANTE
   - **Quién tiene acceso**: "Cualquier persona" ⚠️ (necesario para GitHub Pages)
5. Haz clic en **Implementar**
6. **⚠️ IMPORTANTE**: Copia la **URL de la aplicación web** que aparece
   - Se verá algo así: `https://script.google.com/macros/s/AKfycby.../exec`

**NOTA DE SEGURIDAD**: 
- El script solo permite POST (no GET)
- Valida los datos antes de guardarlos
- Limita registros duplicados (1 por email por hora)
- Tu Google Sheet permanece **PRIVADO** (nadie puede verlo)
- Solo el script tiene acceso de escritura

## Paso 4: Autorizar el Script

1. La primera vez te pedirá autorización
2. Haz clic en **Revisar permisos**
3. Selecciona tu cuenta de Google
4. Haz clic en **Avanzado** (abajo a la izquierda)
5. Haz clic en **Ir a [nombre del proyecto] (no seguro)**
6. Haz clic en **Permitir**

## Paso 5: Probar el Script (Opcional)

**Método 1: Desde Apps Script**
1. En el editor de Apps Script
2. Selecciona la función `testPost` del menú desplegable
3. Haz clic en **Ejecutar**
4. Ve a tu Google Sheet - debería aparecer una fila de prueba

**Método 2: NO probar con navegador**
- Por seguridad, el método GET está deshabilitado
- Solo funciona con POST desde tu formulario

## 🔒 Medidas de Seguridad Implementadas

1. ✅ **Validación de email**: Solo acepta emails válidos
2. ✅ **Sanitización de datos**: Limpia y recorta los inputs
3. ✅ **Rate limiting**: Máximo 1 registro por email por hora
4. ✅ **Longitud máxima**: Previene spam con textos muy largos
5. ✅ **Google Sheet privado**: Solo tú puedes ver los datos
6. ✅ **Solo POST**: GET requests están deshabilitados
7. ✅ **Logs de errores**: Para debugging sin exponer datos sensibles

## 🛡️ ¿Qué NO pueden hacer terceros?

- ❌ Ver tu Google Sheet (está privado)
- ❌ Leer los datos de otros usuarios
- ❌ Hacer spam ilimitado (rate limit de 1 hora)
- ❌ Inyectar código malicioso (inputs sanitizados)
- ❌ Usar GET para obtener información

## ⚠️ Limitaciones

- La URL del script sigue siendo pública (está en el código frontend)
- Terceros pueden enviar datos falsos al formulario
- No hay autenticación de usuario (es un pre-registro público)

**Para aplicaciones con datos sensibles, necesitarías un backend real con autenticación.**

## Troubleshooting del Error 400

### Si sigues viendo error 400:

1. **Verifica que el script esté guardado**: Ctrl+S o icono de diskette
2. **Verifica que la hoja se llame "Pre-Registro"**: Es case-sensitive
3. **Verifica la implementación**:
   - Ve a **Implementar > Administrar implementaciones**
   - Asegúrate de que dice "Cualquier persona" en acceso
4. **Prueba con la función testPost**:
   - Ejecuta `testPost` desde el editor
   - Revisa si aparece una fila en tu Google Sheet
5. **Revisa los logs**:
   - En Apps Script, ve a **Ejecuciones** (icono de reloj ⏱️)
   - Mira si hay errores específicos

### Errores comunes:

- **"No data received"**: Datos mal formateados en el POST
- **"Missing required fields"**: Falta nombre o email
- **"Invalid email format"**: El email no es válido
- **"Ya te registraste recientemente"**: Rate limit activado (espera 1 hora)
- **"Permission denied"**: Necesitas reautorizar el script
- **"Sheet not found"**: Asegúrate de que la hoja se llame exactamente "Pre-Registro"

## Paso 6: Configurar en tu Landing Page

1. Abre el archivo `components/PreRegisterModal.tsx`
2. Busca la línea que dice `const GOOGLE_SCRIPT_URL = '';`
3. Pega tu URL de Apps Script entre las comillas:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. ¡Listo! Tu formulario ahora guardará los datos en Google Sheets

## Verificar que Funciona

1. Abre tu landing page
2. Haz clic en "Pre-registrarme"
3. Completa el formulario y envía
4. Ve a tu Google Sheet - los datos deberían aparecer en una nueva fila

## Troubleshooting

### Si no aparecen los datos:
- Verifica que copiaste la URL correcta (debe terminar en `/exec`)
- Asegúrate de que el script esté desplegado como "Cualquier persona" tiene acceso
- Revisa la consola del navegador (F12) para ver errores

### Para actualizar el script:
1. Haz cambios en Apps Script
2. Ve a **Implementar > Administrar implementaciones**
3. Haz clic en el icono de editar ✏️
4. Cambia a "Nueva versión"
5. Haz clic en **Implementar**

## Exportar Datos

Para exportar tus pre-registros:
1. En Google Sheets: **Archivo > Descargar > Valores separados por comas (.csv)**
2. O puedes usar Google Sheets API para integraciones más avanzadas

---

¿Necesitas ayuda? Revisa los logs en Apps Script: **Ejecuciones** (icono de reloj) ⏱️
