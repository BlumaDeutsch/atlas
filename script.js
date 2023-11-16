// import { getInfoAboutCountry } from "./functions.js";
const urlAll = `https://restcountries.com/v3.1/all/`; // give all countries
let capital = "rome";
let fields = "?fields=population,region,languages,currencies,capital,flags,borders,name";
const urlName = `https://restcountries.com/v3.1/name/`; // give country by name
const urlCapital = `https://restcountries.com/v3.1/capital/`; // give country by capital

const main = document.querySelector("#main");


const getInfoAboutCountry = (country) => {
    fetch(urlName + country + fields)
        .then((res) => res.json())
        .then((data) => {
            extractData(data[0])
        })
        .catch((err) => console.log(err));
}

const extractData = (data) => {
    console.log(data);
    let borders = data.borders;
    const capital = data.capital;
    const coin = Object.keys(data.currencies);
    const flag = data.flags.png;
    const languages = Object.keys(data.languages);
    const name = data.name.common;
    const population = data.population;
    const region = data.region;
    if (borders.length === 0) {
        borders[0] = `${name} is an iland!`
    }

    createCard(borders, capital, coin, flag, languages, name, population, region);
}
const createCard = (borders, capital, coin, flag, languages, name, population, region) => {
    // const card = document.querySelector("#card");
    const content = document.querySelector("#content");
    const card = document.createElement("div");
    card.className = "p-4 justify-content-center myCard";
    
    card.innerHTML = `
            <h2>${name}</h2>
            <h4>POP: ${population}</h4>
            <h4>Region: ${region}</h4>
            <h4>Languages: ${languages}</h4>
            <h4>Coin: ${coin}</h4>
            <h4>Capital: ${capital}</h4>
            <h4>States with borders:</h4>
    `;
    borders.forEach(element => {
        window.e = element
        console.log(e);
        card.innerHTML += `
            <a href= "javascript:getInfoAboutCountry(e)">${element}</a>
        `
    });
    content.innerHTML = `
        <img class="rounded-5 m-3 text-center" src=${flag} alt="flag">
    `;
    content.innerHTML += card;
    content.append(card);
    console.log(`borders: ${borders}, capital: ${capital}, coin: ${coin}, flag: ${flag}, languages: ${languages}, population: ${population}, region: ${region}`);
}


const printData = (sw) => {
    console.log(sw);
}
const options = document.querySelector("#select");


const select = (countries) => {

    countries.forEach((country) => {
        options.innerHTML += `
            <option value="${country.name.common}">${country.name.common}</option>
        `

    })

}

options.addEventListener("change", (country) => {
    getInfoAboutCountry(country.target.value);
    console.log(country.target.value);
})

const getListOfCountries = () => {
    const field = "?fields=name";
    fetch(urlAll + field)
        .then((res) => res.json())
        .then((data) => {
            select(data);
        })
        .catch((err) => console.log(err));

}
getListOfCountries();

const qwe = () => {

}
const countries = ["THAILAND", "USA", "ISRAEL", "FRANCE"];
countries.forEach((country) => {

})
