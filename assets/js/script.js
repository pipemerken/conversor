const btnCalcular = document.querySelector("#calcular");  
const obtenerInformacion = async (selectValue) => {  
  const data = await fetch(`https://mindicador.cl/api/${selectValue}`);  
  const response = await data.json();  
  return response;  
};  
const crearGrafico = async (series) => {  
  const data = series.map((serie) => serie.valor);  
  const fechas = series.map((serie) => serie.fecha);  
  const fechas2 = fechas.reverse();
  const ctx = document.getElementById("myChart");  
  console.log(ctx)  
  new Chart(ctx, {  
    type: "line",  
    data: {  
      labels: fechas,  
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