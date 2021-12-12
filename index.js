// 1. Crear un servidor en Node con el módulo http. (2 Puntos)
const http = require("http");
const url = require("url");
const fs = require("fs");

const fechaFormato = (date) => {
  let dia = date.getDate()
  let mes = date.getMonth() + 1
  if (dia < 10) {
    dia = `0${dia}`
  } 
  if (mes < 10) {
    mes = `0${mes}`;
  } 
  return `${dia}/${mes}/${date.getFullYear()}`;
}

http
  .createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    if (req.url.includes("/crear")) {
      const { archivo, contenido } = params;
      fs.writeFile(
        archivo,
        `${fechaFormato(new Date())}\n${contenido}`,
        "utf8",
        (err) => {
          if (err) {
            res.write("Error");
            res.end();
          } else {
            res.write("Archivo creado con éxito");
            res.end();
          }
        }
      );
    } else if (req.url.includes("/leer")) {
        const { archivo } = params;
      fs.readFile(archivo, (err, data) => {
        if (err) {
          res.write("Error!");
          res.end();
        } else res.write(data);
        res.end();
      });
    } else if (req.url.includes("/renombrar")) {
      const { nombre, nuevoNombre } = params
      fs.rename(nombre, nuevoNombre, (err, data) => {
        if (err) {
          res.write("Error!");
          res.end();
        } else {
          res.write(`Archivo ${nombre} renombrado como ${nuevoNombre} con éxito.`);
          res.end();
        }
      });
    } else if (req.url.includes("/eliminar")) {
      const { archivo } = params;
      fs.unlink(archivo, (err) => {
        if (err) {
          res.write("Error!");
          res.end();
        } else {
          res.write("Tu solicitud para eliminar el archivo <nombre_archivo> se está procesando")
          setTimeout(() => {
            res.write("Archivo eliminado con éxito.", () => {
                return res.end()
            })
          }, 3000);
        }
      })
    }
  })
  .listen(8080, () => console.log("servidor On en el puerto 8080"))
// 2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
// recibida. (1.5 Puntos)
// 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
// declarado en los parámetros de la consulta recibida. (1.5 Puntos)
// 4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
// declarado en los parámetros de la consulta recibida. (1.5 Puntos)
// 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
// parámetros de la consulta recibida. (1.5 Puntos)
// 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
// recibida. (2 Puntos)
// 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
// “dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
// izquierda. (Opcional)
// 8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
// anterior del archivo y su nuevo nombre de forma dinámica . (Opcional)
// 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
// mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está
// procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
// nombre del archivo eliminado. (Opcional)
