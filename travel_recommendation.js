const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const country = document.getElementById("country").value;
  
    if (name && gender && age && country) {
      patients.push({ name, gender: gender.value, age, country });
      resetForm();
      generateReport();
    }
  }

  function pluralToSingular(word) {


    if (word.endsWith('ies')) {
        return word.slice(0, -3) + 'y';
    } else if (word.endsWith('es') && (word.endsWith('ses') || word.endsWith('zes') || word.endsWith('ches'))) {
        return word.slice(0, -2);
    } else if (word.endsWith('s') && !word.endsWith('ss')) {
        return word.slice(0, -1); 
    }
    return word;
}
   
  function resetForm() {
  
document.getElementById("country_name").remove();
document.getElementById("city_img").remove();
document.getElementById("city_name").remove();
document.getElementById("city_dis").remove();
document.getElementById("city_img2").remove();
document.getElementById("city_name2").remove();
document.getElementById("city_dis2").remove();

}
  function searchcountry() {
    const inputs = document.getElementById('countryInput').value.toLowerCase();
    const input = pluralToSingular(inputs);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const country = data.countries.find(item => item.name.toLowerCase() === input);
        const temple = data.temples.find(item => item.name.toLowerCase() === input);
        const beach = data.beaches.find(item => item.name.toLowerCase() === input);
        if (country) {
          resultDiv.innerHTML += `<h2 id = "country_name">${country.name}</h2>`;
          resultDiv.innerHTML += `<img id = "city_img"  src="${country.cities[0].imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_name"> ${country.cities[0].name}</p>`;
          resultDiv.innerHTML += `<p id = "city_dis">${country.cities[0].description}</p>`;
          resultDiv.innerHTML += `<img id = "city_img2"  src="${country.cities[1].imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_name2"> ${country.cities[1].name}</p>`;
          resultDiv.innerHTML += `<p id = "city_dis2">${country.cities[1].description}</p>`;
        } else if(temple){
          resultDiv.innerHTML += `<h2 id = "country_name">${temple.name}</h2>`;
          resultDiv.innerHTML += `<img id = "city_img"  src="${temple.imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_dis">${temple.description}</p>`;
        } else if(beach){
          resultDiv.innerHTML += `<h2 id = "country_name">${beach.name}</h2>`;
          resultDiv.innerHTML += `<img id = "city_img"  src="${beach.imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_dis">${beach.description}</p>`;
        }
         else {
          resultDiv.innerHTML = 'country not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchcountry);
    btnClear.addEventListener('click', resetForm);

