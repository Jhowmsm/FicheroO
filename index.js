<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Generar .add.WIP desde archivos PDF</title>
<style>
  body { font-family: Arial, sans-serif; margin: 2em; }
  button { padding: 0.5em 1em; font-size: 1em; }
  input { margin-bottom: 1em; }
</style>
</head>
<body>
<h1>Generar archivo .add.WIP desde archivos PDF</h1>

<p>Selecciona archivos PDF que sigan el patrón de nombre esperado (ejemplo: 20250115_LAN572_SCL-BOG_ECNBN_SALAS_DOCUMENTO.pdf).</p>

<input type="file" id="fileInput" multiple accept=".pdf" />
<br/>
<label for="nombreCarpeta">Nombre de carpeta:</label>
<input type="text" id="nombreCarpeta" placeholder="Ejemplo: Carpeta1" />
<br/>
<button onclick="procesarArchivos()">Generar Archivo</button>

<script>
function procesarArchivos() {
  const input = document.getElementById('fileInput');
  const files = input.files;
  const nombreCarpetaInput = document.getElementById('nombreCarpeta').value.trim();

  if (!files.length) {
    alert('Selecciona al menos un archivo PDF');
    return;
  }
  if (!nombreCarpetaInput) {
    alert('Escribe el nombre de la carpeta');
    return;
  }

  const campos_fijos = {
    campo_1: '"ME598"',
    campo_2: '"59580"',
    campo_3: '"595801"'
  };

  const nombre_carpeta = nombreCarpetaInput;

  let datos = [];

  for (const file of files) {
    const nombre = file.name.replace(/\.[^/.]+$/, ""); // sin extensión
    const partes = nombre.split("_");
    if (partes.length >= 6) {
      const fila = [
        campos_fijos.campo_1,
        `"${nombre_carpeta}"`,
        '""',
        campos_fijos.campo_2,
        campos_fijos.campo_3,
        '""',
        '""',
        `"${partes[1]}"`,
        `"${partes[2]}"`,
        '""',
        `"${partes[5]}"`,
        '""',
        '""',
        '""',
        `"${partes[3]}"`,
        `"${partes[4]}"`,
        '""',
        '""',
        '""',
        '""'
      ];
      datos.push(fila.join(" "));
    }
  }

  if (datos.length === 0) {
    alert("No se encontraron archivos PDF válidos con nombre esperado.");
    return;
  }

  const ahora = new Date();
  // Formatear fecha MMDDYY
  const fecha = ahora.toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'}).replace(/\//g,'');
  // Formatear hora HHMMSS
  const hora = ahora.toTimeString().slice(0,8).replace(/:/g,'');

  const nombreArchivo = `ME-ME-FILE-${fecha}_${hora}.add.WIP`;
  const contenido = datos.join("\n");

  const blob = new Blob([contenido], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  a.click();

  URL.revokeObjectURL(url);
}
</script>
</body>
</html>
