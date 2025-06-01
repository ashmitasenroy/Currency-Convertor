const BASE_URL = "https://v6.exchangerate-api.com/v6/cefb83c975c2853827058f1d/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag image
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// Convert currency
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt = amount.value;

    if (amt === "" || amt <= 0) {
        amt = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${fromcurr.value}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();

        // ✅ Corrected line
        let rate = data.conversion_rates[tocurr.value];
        let finalamt = (amt * rate).toFixed(2);

        msg.innerText = `${amt} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
    } catch (error) {
        msg.innerText = "Something went wrong. Try again.";
        console.error("Error fetching data:", error);
    }
});
