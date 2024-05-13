import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { TheCatAPI } from "@thatapicompany/thecatapi";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_FLCrVSt3i1kfU28uyZydfTdmrT1JSk5CXAJoUaKHSZ5qjNSLIj0PcLCHcqi79a3V";
new SlimSelect({
  select: '#selectElement'
})

//const theCatAPI = new TheCatAPI("live_FLCrVSt3i1kfU28uyZydfTdmrT1JSk5CXAJoUaKHSZ5qjNSLIj0PcLCHcqi79a3V");
const dropDownMenuVal = document.querySelector(".breed-select");
const loaderVal = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const errorVal = document.querySelector(".error");
//change the limit to however many images to use
const url = `https://api.thecatapi.com/v1/breeds`;

axios
  .get(url)
  .then((response) => 
  {return response})
  .then((data) => {
    //console.log(data);
  for(let i = 0; i < data.data.length; i += 1) {
    let option = document.createElement('option');
    option.setAttribute('value', data.data[i].id);
    option.appendChild(document.createTextNode(data.data[i].name));
    dropDownMenuVal.appendChild(option);
  }
  dropDownMenuVal.classList.toggle("hide");
  loaderVal.classList.toggle("hide");
  })
  .catch(function(error) {
    console.log(error);
    errorVal.classList.toggle("hide");
    loaderVal.classList.toggle("hide");
  })


function fetchCatByBreed(breedID) {

  loaderVal.classList.toggle("hide");
  while(catInfo.hasChildNodes()){
    catInfo.removeChild(catInfo.firstChild);
  }
axios
  .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`)
  .then((response) => {
   return response;
  })
  .then((data) => {
  //console.log(data);
  let catInformation = data.data[0].breeds[0];
  let img = document.createElement('img');
  let title = document.createElement('h1');
  let description = document.createElement('p');
  let temperament = document.createElement('p');

  img.src = data.data[0].url;
  catInfo.appendChild(img);
  
  title.innerText = catInformation.name;
  catInfo.appendChild(title);

  description.innerText = catInformation.description;
  catInfo.appendChild(description);

  temperament.innerText = "Temperament: " + catInformation.temperament;
  catInfo.appendChild(temperament);

  loaderVal.classList.toggle("hide");
  })
  .catch(function(error) {
   console.log(error);
   errorVal.classList.toggle("hide");
    loaderVal.classList.toggle("hide");
  });

}

let dropDownMenu = document.querySelector(".breed-select");

dropDownMenu.addEventListener("change", function() {fetchCatByBreed(dropDownMenu.value)});
//console.log("hello");

//fetchCatByBreed("ebur");