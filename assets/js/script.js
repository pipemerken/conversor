const btnCalcular = document.querySelector("#calcular");  
const obtenerInformacion = async (selectValue) => {  
  const data = await fetch(`https://mindicador.cl/api/${selectValue}`);  
  const response = await data.json();  
  return response;  
};  
const crearGrafico = async (series) => {  
  const data = series.map((serie) => serie.valor);  
  const fechas = series.map((serie) => serie.fecha); 
  let fechasFormateadas = fechas.map(formatDate);
//   const fechaFormateada = formatDate(fechas).map;
//   console.log(fechaFormateada)
console.log(fechas)



//   const fechas2 = fechas.reverse();
  const ctx = document.getElementById("myChart");  
  console.log(ctx)  
  new Chart(ctx, {  
    type: "line",  
    data: {  
      labels: fechasFormateadas.reverse(),  
      datasets: [  
        {  
          label: "Historial de Indicador",  
          data: data.reverse(),  
          borderWidth: 1,  
        },  
      ],  
    },  
  });  
};  

function formatDate(dateString) {
    // Crear un objeto Date a partir del string de la fecha
    let date = new Date(dateString);

    // Obtener el día, mes y año
    let day = String(date.getDate()).padStart(2, '0'); // Asegurar que el día tenga 2 dígitos
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son base 0, por eso se suma 1
    let year = date.getFullYear();

    // Formatear la fecha como "dd-mm-yyyy"
    return `${day}/${month}/${year}`;
}


// let fecha = "2024-05-01T04:00:00.000Z";
// let fechaFormateada = formatDate(fecha);
// console.log(fechaFormateada); // "08-07-2024"



btnCalcular.addEventListener("click", async () => {  
  let grafico = Chart.getChart("myChart")  
  if (grafico !== undefined) {  
    grafico.destroy()  
  }  
  const inputValue = document.querySelector("#monto").value;  
  const selectValue = document.querySelector("#moneda").value;  
  const respuesta = await obtenerInformacion(selectValue);  
  let cambio = respuesta.serie[0].valor * inputValue;  
  // let cambio = inputValue * respuesta[selectValue].valor  
  crearGrafico(respuesta.serie);  
  document.querySelector("#resultado").innerHTML =`Resuldato: $${cambio}` 
});


