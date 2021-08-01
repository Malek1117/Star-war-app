let chert_div = document.getElementById("chartcter");

var timerId;

async function serchChart() {
    let search = document.getElementById("search").value;

    if (search.length <= 2) {
        return false;
    }

    let res = await fetch(`https://swapi.dev/api/people/?search=${search}`);
    let data = await res.json();

    return data.results;

}

function throttleFuction() {

    if (timerId) {
        return false;
    }
    timerId = setTimeout(() => {
        main();
        timerId = undefined;
    }, 1000);

}

function appendMovies(d) {
    chert_div.innerHTML = null;
    d.forEach(({ name, birth_year, gender,height,mass,skin_color }) => {
        let div = document.createElement("div");
        div.addEventListener('click', () => {
            window.location.href = "profile.html";
        });
        let nam = document.createElement("p");
        nam.innerText = name;
        
        let birth = document.createElement("p");
        birth.innerText = birth_year;
        let gen = document.createElement("p");
        gen.innerText = gender;

        div.append(nam, birth, gen);
        chert_div.append(div);

        localStorage.setItem("profile", JSON.stringify({ name, birth_year, gender,height,mass,skin_color }));
    })
}

async function main() {
    let chartcters = await serchChart();
    console.log(chartcters);

    if (chartcters.length != 0) {
        appendMovies(chartcters);
    } else {
        chert_div.innerHTML = null;

        let div = document.createElement("div");
        div.innerText = "No results found!! Try again";

        chert_div.append(div);
    }
    
}
