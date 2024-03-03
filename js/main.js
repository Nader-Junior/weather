let search = document.getElementById('search')
let forignDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//catch api forecast obj for 3 days
async function searchVal(area) {
    let response = await fetch(` https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${area}&days=3`);
        let result = await response.json();
        displayArea(result.location, result.current)
        dateCard(result.forecast.forecastday)
}

// display current forecast day
let position = 'cairo'
function displayArea(location, temperature) {
    let dating = new Date(temperature.last_updated)
    let day = dating.getDay()
    let dayNum = dating.getDate()
    let month = dating.getMonth()
    let currentDay = forignDay[day]
    position = `
    <div class="card d-block me-1">
            <div class="header d-flex justify-content-between px-3 mb-2">
                <p>${currentDay}</p>
                <p>${dayNum} ${monthName[month]}</p>
            </div>

            <div class="card-body">
                <div class="card-body-header mb-3 fs-3">${location.name}</div>

                <div class="card-body-inner d-flex justify-content-between">
                    <h1 class="degree">${temperature.temp_c}<sup>o</sup>c</h1>

                    <img src="https:${temperature.condition.icon}" alt="weather icon" class="w-25 ">

                </div>

                <p class="blue my-4">${temperature.condition.text}</p>
                <div class="footer d-flex justify-content-around ">
                    <span><img src="./images/icon-umberella.png" alt="rain"> ${temperature.humidity}%</span>
                    <span><img src="./images/icon-wind.png" alt="wind"> ${temperature.wind_kph}km/h</span>
                    <span><img src="./images/icon-compass.png" alt="compass"> ${temperature.wind_dir}</span>
                </div>
            </div>
    </div>
    `
    document.getElementById('card-main').innerHTML = position
}
//display next forecast days
function dateCard(next) {
    let arr = ''
    for (var i = 1; i < next.length; i++) {
        let dating = new Date(next[i].date)
        let day = dating.getDay()
        let dayNum = dating.getDate()
        let month = dating.getMonth()
        let currentDay = forignDay[day]
        arr+= `
            <div class="card d-block me-1">
                <div class="header num2  d-flex justify-content-center mb-2">
                    <p>${currentDay}</p>
                </div>
                <div class="card-body num2 d-flex flex-column justify-content-center align-items-center text-center">
                    <div class="card-body-header mb-3"><img src="http:${next[i].day.condition.icon}" alt="weather icon" class='w-75'></div>
                    <div class="card-body-inner">
                        <h3 class='mb-3'>${next[i].day.maxtemp_c}<sup>o</sup>c</h3>
                        <p>${next[i].day.mintemp_c}<sup>o</sup></p>
                        <p class="blue my-4">${next[i].day.condition.text}</p>
                    </div>
                </div>
            </div> `
    }
    document.getElementById('card-main').innerHTML += arr
}
// user location fn
function call() { 
    function lat(position) {
        searchVal(position.coords.latitude,position.coords.longitude)
      }
      
      navigator.geolocation.getCurrentPosition(lat)
      async function searchVal(x,y) {
        let response = await fetch(` https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${x},${y}&days=3`);
            let result = await response.json();
            displayArea(result.location, result.current)
            dateCard(result.forecast.forecastday)
    }
}
if (search.value=='') {
    call()
}
searchVal('cairo')
search.addEventListener('keyup', (e) => {
        searchVal(e.target.value)
})
  