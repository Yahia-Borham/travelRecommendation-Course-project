const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
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
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("country").value = "";
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
        if (country) {
          resultDiv.innerHTML += `<h2 id = "country_name">${country.name}</h2>`;
          resultDiv.innerHTML += `<img id = "city_img"  src="${country.cities[0].imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_name"> ${country.cities[0].name}</p>`;
          resultDiv.innerHTML += `<p id = "city_dis">${country.cities[0].description}</p>`;
          resultDiv.innerHTML += `<img id = "city_img2"  src="${country.cities[1].imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_name2"> ${country.cities[1].name}</p>`;
          resultDiv.innerHTML += `<p id = "city_dis2">${country.cities[1].description}</p>`;
        } else if(temple){
          resultDiv.innerHTML += `<h2 id = "country_name2">${temple.name}</h2>`;
          resultDiv.innerHTML += `<img id = "country_img2"  src="${temple.imageUrl}" />`;
          resultDiv.innerHTML += `<p id = "city_dis2">${temple.description}</p>`;
        } else {
          resultDiv.innerHTML = 'country not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchcountry);

  function generateReport() {
    const numPatients = patients.length;
    const countrysCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const gendercountrysCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      countrysCount[patient.country]++;
      gendercountrysCount[patient.gender][patient.country]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `countrys Breakdown:<br>`;
    for (const country in countrysCount) {
      report.innerHTML += `${country}: ${countrysCount[country]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based countrys:<br>`;
    for (const gender in gendercountrysCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const country in gendercountrysCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${country}: ${gendercountrysCount[gender][country]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);