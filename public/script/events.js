const appConfig = require('../functions/appConfig')

async function displayRandomImages() {
    console.log("Searching image...");
    $("#hikeImage").html("");
    $("#kayakImage").html("");
    $("#natureImage").html("");

    let urlHike = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=hike&`;
    let urlKayak = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=kayak&orientation=horizontal`;
    let urlNature = `https://pixabay.com/api/?key=20481069-b7515ab630a25b9504d55e812&q=nature&orientation=horizontal`;

    let data = await appConfig.getData(urlHike);
    $("#hikeImage").html(`<img class="res_img" src="${data.hits[0].webformatURL}" alt = "hiking">`);
    let data2 = await appConfig.getData(urlKayak);
    $("#kayakImage").html(`<img class="res_img" src="${data2.hits[0].webformatURL}" alt = "kayak">`);
    let data3 = await appConfig.getData(urlNature);
    $("#natureImage").html(`<img class="res_img" src="${data3.hits[2].webformatURL}" alt = "nature">`);

}

$("#hikeSearch").on("click", displayRandomImages);
