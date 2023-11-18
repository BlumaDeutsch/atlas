const urlAll = `https://restcountries.com/v3.1/all/`; // give all countries
let capital = "rome";

let options = {
    fields: "population,region,languages,currencies,capital,flags,borders,name,capitalInfo,area",
};
const urlName = `https://restcountries.com/v3.1/name/`; // give country by name
const urlCapital = `https://restcountries.com/v3.1/capital/`; // give country by capital

const main = document.querySelector("#main");

const fetchApiAxios = async (urlName, options) => {
    const res = await axios.get(urlName, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Client-ID PGxw-cCQLzjhHfIamSQpXGP0VBiWr1FW2GxDGjtc3dQ",
        },
        params: options,
    });
    return res.data;
};

const getInfoAboutCountry = (country) => {
    fetchApiAxios(urlName + country, options) //url, searchTerm, orientation, page
        .then((data) => {
            console.log(data[0]);
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
    const [lat, lon] = data.capitalInfo.latlng;
    const area = data.area;
    console.log(lat, "ppp", lon);
    if (borders.length === 0) {
        borders[0] = `${name} is an iland!`
    }

    createCard(borders, capital, coin, flag, languages, name, population, region, lat, lon, area);
}
const createCard = (borders, capital, coin, flag, languages, name, population, region, lat, lon, area) => {
    // const card = document.querySelector("#card");
    let countBorders = 0;

    const content = document.querySelector("#content");

    const card = document.createElement("div");
    const flagg = document.createElement("div");
    const mapp = document.createElement("div");

    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-duration", "2000");

    flagg.setAttribute("data-aos", "zoom-in");
    flagg.setAttribute("data-aos-duration", "2000");

    mapp.setAttribute("data-aos", "zoom-in");
    mapp.setAttribute("data-aos-duration", "2000");

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
            <a id=b${countBorders} href="javascript:NULL">${element}</a>
        `
        ++countBorders;
    });
    flagg.innerHTML = `
        <img class="rounded-5 m-3 text-center" src=${flag} alt="flag">
    `;
    if (area < 100000) {
        mapp.innerHTML = `
        <iframe class="rounded-5 m-3 text-center" width="100%" height="100%" frameborder="0" scrolling="yes" marginwidth="0"
        src="https://maps.google.com/maps?q=${lat},${lon}&hl=iw&z=6&amp;output=embed">
        </iframe>
    `}
    else if (area < 1000000) {
        mapp.innerHTML = `
        <iframe class="rounded-5 m-3 text-center" width="100%" height="100%" frameborder="0" scrolling="yes" marginwidth="0"
        src="https://maps.google.com/maps?q=${lat},${lon}&hl=iw&z=4&amp;output=embed">
        </iframe>
    `}
    else if (area < 10000000) {
        mapp.innerHTML = `
        <iframe class="rounded-5 m-3 text-center" width="100%" height="100%" frameborder="0" scrolling="yes" marginwidth="0"
        src="https://maps.google.com/maps?q=${lat},${lon}&hl=iw&z=3&amp;output=embed">
        </iframe>
    `}
    else {
        mapp.innerHTML = `
        <iframe class="rounded-5 m-3 text-center" width="100%" height="100%" frameborder="0" scrolling="yes" marginwidth="0"
        src="https://maps.google.com/maps?q=${lat},${lon}&hl=iw&z=2&amp;output=embed">
        </iframe>
    `}

    content.innerHTML = flagg;
    content.innerHTML += card;
    content.innerHTML += mapp

    content.append(flagg);
    content.append(card);
    content.append(mapp);

    addBorders(countBorders);

    console.log(`borders: ${borders}, capital: ${capital}, coin: ${coin}, flag: ${flag}, languages: ${languages}, population: ${population}, region: ${region}`);
}
const addBorders = (countBorders) => {
    for (let index = 0; index < countBorders; index++) {
        // console.log(`b${index}`);
        // console.log(document.getElementById(`b${index}`).innerText);
        document.getElementById(`b${index}`).addEventListener("click", () => {
            console.log(document.getElementById(`b${index}`).textContent);
            getInfoAboutCountry(document.getElementById(`b${index}`).textContent);
        })

    }
}

const addBordersStart = (countries) => {
    countries.forEach((country) => {
        document.getElementById(country).addEventListener("click", getInfoAboutCountry(document.getElementById(`b${index}`).textContent));
    })
}

const countryOptions = document.querySelector("#select");


const select = (countries) => {

    countries.forEach((country) => {
        countryOptions.innerHTML += `
            <option value="${country.name.common}">${country.name.common}</option>
        `

    })

}

countryOptions.addEventListener("change", (country) => {
    getInfoAboutCountry(country.target.value);
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



export { getListOfCountries, addBordersStart };
