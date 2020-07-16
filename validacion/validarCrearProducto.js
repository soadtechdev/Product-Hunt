export default function validarCrearProducto(valores) {
  let errores = {};

  //validar nombre
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  //validar empresa
  if (!valores.empresa) {
    errores.empresa = "La empresa es obligatorio";
  } 

  //validar url
  if (!valores.url) {
    errores.url = "La url es obligatorio";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Digite una url con el formato https://example.com";
  }

  //validar descripcion
  if (!valores.descripcion) {
    errores.descripcion = "La descripcion es obligatorio";
  } 

  return errores;
}
