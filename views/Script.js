//Getting the required sections that will be needed in the script
const blinds = document.querySelector("#blind");
const width = document.querySelector("#width");
const length = document.querySelector("#length");
const updatePrice = document.querySelector("h5");
const material = document.querySelector("#material");

//Only activates when it dectects user input
//Price based on user inputs
blinds.addEventListener("input", function(e) {
    price = 0;
    const area = width.value * length.value;
    price = (area / 100) + 100;

    if (material.value == "fabric") {
        price = price;
    } else if (material.value == "plastic") {
        price = price;
    } else if (material.value == "PVS") {
        price += 25;
    } else if (material.value == "vinyl") {
        price += 25;
    } else if (material.value == "wood") {
        price += 50;
    } else if (material.value == "metal") {
        price += 50;
    } else {
        price += 30;
    }
    //Constantly update the price based on inputs until form submitted 
    updatePrice.innerText = price;
})