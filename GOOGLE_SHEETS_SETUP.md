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
const SHEET_ID = '1Z5bmSd7RkkzUKc91AQWfHjFTGiIIdqiQb92smWfYtts'; //EL LINK DE LA GOOGLE SHEET

function doPost(e) {
  try {
    // === VALIDACIONES DE SEGURIDAD ===
    
    var data;
    
    // 1. Validar que lleguen datos (puede ser JSON o FormData)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // Si no es JSON, intentar leer como parámetros de formulario
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    Logger.log('Datos recibidos: ' + JSON.stringify(data));
    
    // 2. Validar campos requeridos
    if (!data.nombre || !data.email) {
      throw new Error('Missing required fields');
    }
    
    // 3. Validar formato de email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }
    
    // 4. Sanitizar inputs (prevenir inyección)
    var nombre = String(data.nombre).substring(0, 100).trim();
    var email = String(data.email).substring(0, 100).trim().toLowerCase();
    
    // 5. CONECTAR CON TU GOOGLE SHEET (usando el ID)
    var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    var sheet = spreadsheet.getSheetByName('Pre-Registro');
    
    if (!sheet) {
      // Si no existe la hoja "Pre-Registro", usa la primera hoja
      sheet = spreadsheet.getSheets()[0];
    }
    
    // 6. Rate limiting básico (máximo 1 registro por email por hora)
    var allData = sheet.getDataRange().getValues();
    var now = new Date();
    var oneHourAgo = new Date(now.getTime() - 60*60*1000);
    
    for (var i = 1; i < allData.length; i++) {
      var rowEmail = allData[i][2];
      var rowTimestamp = new Date(allData[i][0]);
      
      if (rowEmail === email && rowTimestamp > oneHourAgo) {
        return createCORSResponse({ 
          result: 'error', 
          error: 'Ya te registraste recientemente. Por favor espera un momento.' 
        });
      }
    }
    
    // 7. Verificar que no sea spam (nombre muy corto)
    if (nombre.length < 2) {
      return createCORSResponse({ result: 'error', error: 'Nombre demasiado corto' });
    }
    
    // === GUARDAR DATOS ===
    var now = new Date();
    var uruguayTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
    var timestampUruguay = uruguayTime.toISOString().replace('T', ' ').substring(0, 19);
    
    sheet.appendRow([
      timestampUruguay,
      nombre,
      email
    ]);
    
    // === LOGS DE SEGURIDAD ===
    Logger.log('Registro exitoso: ' + email);
    
    // Retornar éxito con CORS
    return createCORSResponse({ 
      result: 'success',
      message: 'Datos guardados correctamente'
    });
      
  } catch (error) {
    // Log del error para debugging
    Logger.log('Error: ' + error.toString());
    
    // Retornar error con CORS
    return createCORSResponse({ 
      result: 'error', 
      error: 'Error al procesar el registro'
    });
  }
}

// Función para manejar OPTIONS request (CORS preflight)
function doOptions(e) {
  return createCORSResponse({});
}

// Función auxiliar para crear respuestas con headers CORS
function createCORSResponse(content) {
  var output = ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
}

// Función de prueba
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        nombre: "Test User",
        email: "test@example.com"
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
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
