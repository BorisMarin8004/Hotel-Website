// const appConfig = require('../functions/appConfig')
async function getData(url){
    let response = await fetch(url);
    return await response.json();
}
function get_random(min, max) {
    return Math.random() * (max - min) + min;
}
async function displayRandomImages() {
    let urlHike = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=hike&orientation=horizontal`;
    let urlKayak = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=kayak&orientation=horizontal`;
    let urlNature = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=nature&orientation=horizontal`;
    let randIndex = Math.floor(get_random(0, 10));
    let randIndex2 = Math.floor(get_random(0, 10));
    let randIndex3 = Math.floor(get_random(0, 10));
    let data = await getData(urlHike);
    console.log(data.hits[0].webformatURL)
    $("#hikeImage").html(`<img class="res_img" src="${data.hits[randIndex].webformatURL}" alt = "hiking">`);
    let data2 = await getData(urlKayak);
    $("#kayakImage").html(`<img class="res_img" src="${data2.hits[randIndex2].webformatURL}" alt = "kayak">`);
    let data3 = await getData(urlNature);
    $("#natureImage").html(`<img class="res_img" src="${data3.hits[randIndex3].webformatURL}" alt = "nature">`);
}
displayRandomImages()