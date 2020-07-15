export default function validarCrearProducto(valores) {
  let errores = {};

  //validar nombre
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  } else if (!/^[a-z ,.'-]+$/i.test(valores.nombre)) {
    errores.nombre = "Nombre no valido";
  }

  //validar email
  if (!valores.empresa) {
    errores.empresa = "La empresa es obligatorio";
  } else if (!/^[a-z ,.'-]+$/i.test(valores.empresa)) {
    errores.empresa = "Digite un valor valido";
  }

  //validar url
  if (!valores.url) {
    errores.url = "La url es obligatorio";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Digite una url con el formato https://example.com";
  }

  //validar nombre
  if (!valores.descripcion) {
    errores.descripcion = "La descripcion es obligatorio";
  } else if (!/^[a-z ,.'-]+$/i.test(valores.descripcion)) {
    errores.descripcion = "Nombre no valido";
  }

  return errores;
}
