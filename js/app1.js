let pageBody = document.getElementById('page-body');
let pageMode = document.getElementById('current-mode');
let modeIcon = document.getElementById('mode-icon');
let backButton = document.getElementById('back-btn');

const baseURL = "https://restcountries.eu/rest/v2/all";
let countryURL = localStorage.getItem("countryUrl")
let countryHolder = document.querySelector('#country-holder');

document.addEventListener('DOMContentLoaded', getCountries);

async function getCountries() {
    // let countryURL = baseURL + "all";
    fetch(baseURL)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((e) => console.log(error))

    fetch(countryURL)
        .then((response) => {
            // console.log(response.json())
            return response.json()
        })
        .then((data) => {
            console.log(data)
            console.log(data[0].borders)
            // data[0].borders.forEach((e, i) => {
            //     // let border-one = e
            // })
            // localStorage.setItem('borders', borders)
            // data.name
            let html = "";
            data.forEach((country) => {
                html += `
                <div class="col-6">
                    <div class="img-box">
                    <img src="${country.flag}" alt="country" class="w-100 img-holder-country">
                </div>
                </div>
                <div class="col-6">
                    <div class="country-details">
                        <div class="country-name">
                            <h2 class="font-bold">${country.name}</h2>
                        </div>
                        <div class="d-flex">
                            <div class="col-6">
                                <div class="sub-details">
                                    <p><span class="font-bold">Native Name:</span> ${country.nativeName}</p>
                                    <p><span class="font-bold">population:</span> ${country.population}</p>
                                    <p><span class="font-bold">Region:</span> ${country.region}</p>
                                    <p><span class="font-bold">Sub Region:</span> ${country.subRegion}</p>
                                    <p><span class="font-bold">Capital:</span> ${country.capital}</p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="sub-details">
                                    <p><span class="font-bold">Top Level Domain:</span> name</p>
                                    <p><span class="font-bold">Currency:</span> ${country.currencies[0].name}</p>
                                        <p><span class="font-bold">Languages:</span>${country.languages.map((item, i) => ` ${item.name},
                                `).join('')}
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="sub-details">
                            <hr class="mb-20">
                            <div class="d-flex">
                                <p class="font-bold border-title">Borders:</p>
                                <div class="d-flex">
                                ${country.borders.map((item, i) => ` 
                                    <div class="border-cube">
                                        ${item}
                                    </div>
                                `).join('')}
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>`
            })

            countryHolder.innerHTML = html;
            
        });

        
        
}

backButton.addEventListener('click', ()=> {
    window.location.href = "/index.html"
})

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