const baseURL = "https://restcountries.com/v2/";
let countryHolder = document.querySelector('#country-holder');

document.addEventListener('DOMContentLoaded', getCountries);

let pageBody = document.getElementById('page-body')
let pageMode = document.getElementById('current-mode')
let modeIcon = document.getElementById('mode-icon')
let search = document.querySelector('#searched-country');
let region = document.querySelector('#searched-region');

let regions = ['Filter By Region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
let region_html = "";


search.addEventListener('input', searchCountry);
region.addEventListener('change', searchedRegion);



function getCountries() {
    let countryURL = baseURL + "all";
    let searchCountry = search.value;
    console.log(searchCountry)

    regions.forEach((region, index) => {
        if(index === 0) {
            region_html += `
            <option selected disabled value="${region.toLowerCase().trim()}">${region}</option>
            `  
        } else {
            region_html += `
            <option value="${region.toLowerCase().trim()}">${region}</option>
            `
        }
    })
    region.innerHTML = region_html;

    fetch(countryURL)
        .then((response) => {
            // console.log(response.json())
            return response.json()
        })
        .then((data) => {
            console.log(data)
            console.log(data[0].name)
            // data.name
            let html = "";
            data.forEach((country) => {
                html += `
                <div class="col-3">
                    <div class="card" onclick="getCountry('${country.name}')">
                        <div class="img-holder">
                            <img src="${country.flag}" alt="country" class="w-100">
                        </div>
                        <div class="country-details">
                            <div class="country-name">
                                <h3 class="font-bold">${country.name}</h3>
                            </div>
                            <div class="sub-details">
                                <p><span class="font-bold">Population:</span> ${country.population}</p>
                                <p><span class="font-bold">Region:</span> ${country.region}</p>
                                <p><span class="font-bold">Capital:</span> ${country.capital}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })

            countryHolder.innerHTML = html;
            
        })
        
}


function getCountry(country) {
    console.log(country)
    let singleCountryURL = baseURL + "name/" + country;
    
    localStorage.setItem("countryUrl", singleCountryURL);
   
    window.location.href = "/country.html"
}

function changeMode() {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        pageMode.innerHTML = 'Dark Mode'
        modeIcon.classList.add('fa-moon')
        modeIcon.classList.remove('fa-sun')
    } else {
        pageMode.innerHTML = 'Light Mode'
        modeIcon.classList.add('fa-sun')
        modeIcon.classList.remove('fa-moon')
    }
    
}

function searchCountry() {
    let searchCountry = search.value;
    console.log(searchCountry)
    let singleCountryURI = baseURL + "name/" + searchCountry;

    fetch(singleCountryURI)
        .then((response) => {
            // console.log(response.json())
            return response.json();
        })
        .then((data) => {
            console.log(data)
            let html = "";
            data.forEach((country) => {
                html += `
                <div class="col-3">
                    <div class="card" onclick="getCountry('${country.name}')">
                        <div class="img-holder">
                            <img src="${country.flag}" alt="country" class="w-100">
                        </div>
                        <div class="country-details">
                            <div class="country-name">
                                <h3 class="font-bold">${country.name}</h3>
                            </div>
                            <div class="sub-details">
                                <p><span class="font-bold">Population:</span> ${country.population}</p>
                                <p><span class="font-bold">Region:</span> ${country.region}</p>
                                <p><span class="font-bold">Capital:</span> ${country.capital}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })

            countryHolder.innerHTML = html;
        })
        .catch((e) => {
            console.log(e)
        })
}

function searchedRegion() {
    let searchRegion = region.value;
    console.log(searchRegion)

    let regionURI = baseURL + "region/" + searchRegion;
    // console.log(regionURI)

    fetch(regionURI)
        .then((response) => {
            // console.log(response.json())
            return response.json();
        })
        .then((data) => {
            console.log(data)
            let html = "";
            data.forEach((country) => {
                html += `
                <div class="col-3">
                    <div class="card" onclick="getCountry('${country.name}')">
                        <div class="img-holder">
                            <img src="${country.flag}" alt="country" class="w-100">
                        </div>
                        <div class="country-details">
                            <div class="country-name">
                                <h3 class="font-bold">${country.name}</h3>
                            </div>
                            <div class="sub-details">
                                <p><span class="font-bold">Population:</span> ${country.population}</p>
                                <p><span class="font-bold">Region:</span> ${country.region}</p>
                                <p><span class="font-bold">Capital:</span> ${country.capital}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })

            countryHolder.innerHTML = html;
        })
        .catch((e) => {
            console.log(e)
        })
}