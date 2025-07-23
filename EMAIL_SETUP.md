# Configuración de EmailJS para Evity

## Resumen
El sistema de registro de Evity está configurado para enviar automáticamente los datos de registro al correo **VeroMoes@evity.mx** usando EmailJS.

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### 2. Configurar servicio de email
1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Configura con el correo **VeroMoes@evity.mx**
5. Copia el **Service ID** generado

### 3. Crear plantilla de email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa esta plantilla:

```
Asunto: Nuevo Registro Evity - {{user_type}}: {{full_name}}

Cuerpo:
¡Nuevo registro en Evity!

INFORMACIÓN DEL USUARIO:
- Tipo: {{user_type}}
- Nombre: {{full_name}}
- Usuario: {{username}}
- Email: {{email}}
- Teléfono: {{phone}}
- País: {{country}}
- Ciudad: {{city}}
- CURP: {{curp}}
- Cédula Profesional: {{cedula}}

Fecha de registro: {{registration_date}}

---
Registro automático desde evity.mx
```

4. Copia el **Template ID** generado

### 4. Obtener clave pública
1. Ve a **Account** → **General**
2. Copia tu **Public Key**

### 5. Actualizar el código
En el archivo `script.js`, reemplaza estos valores:

```javascript
// Línea ~296
emailjs.init({
    publicKey: "TU_PUBLIC_KEY_AQUI", // Reemplazar
});

// Línea ~454
emailjs.send('TU_SERVICE_ID_AQUI', 'TU_TEMPLATE_ID_AQUI', templateParams)
```

## Configuración alternativa (Fallback)

Si EmailJS no funciona, el sistema automáticamente:
1. Abre el cliente de correo predeterminado
2. Pre-llena un email dirigido a **VeroMoes@evity.mx**
3. Incluye todos los datos del registro

## Datos que se envían

El email incluirá:
- ✅ Tipo de usuario (Médico/Paciente)
- ✅ Nombre completo
- ✅ Nombre de usuario
- ✅ Correo electrónico
- ✅ Teléfono
- ✅ País y ciudad
- ✅ CURP
- ✅ Cédula profesional (solo médicos)
- ✅ Fecha y hora de registro

## Seguridad

⚠️ **Importante**: Las contraseñas NO se envían por email por seguridad.

## Pruebas

Para probar el sistema:
1. Ve al sitio web
2. Haz clic en "Registrarse"
3. Completa el formulario
4. Verifica que llegue el email a VeroMoes@evity.mx

## Soporte

Si tienes problemas con la configuración:
- Revisa la consola del navegador para errores
- Verifica que las credenciales de EmailJS sean correctas
- Asegúrate de que el servicio de email esté activo
