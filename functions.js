const urlAll = `https://restcountries.com/v3.1/all`; // give all countries
let capital = "rome";
let fields = "languages";
const urlName = `https://restcountries.com/v3.1/name/`; // give country by name
const urlCapital = `https://restcountries.com/v3.1/capital/${capital}?fields=name,capital,currencies`; // give country by capital
const urlFields = `https://restcountries.com/v3.1/name/${country}?fields=${fields}`; // give country by name and fields





const getInfoAboutCountry = (country) => {
    console.log(country);
    console.log(urlName + country);
    fetch(urlName + country)
        .then((res) => res.json())
        .then((data) => {
            console.log(data[0]);
            document.getElementById("bod").innerHTML = `
        <img src=${data[0].flags.png} alt="">

        `

        })
        .catch((err) => console.log(err));

}





export { getInfoAboutCountry };
