const BASE_URL="https://v6.exchangerate-api.com/v6/cefb83c975c2853827058f1d/latest/";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");

const tocurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");


for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
newoption.innerText=currcode;
newoption.value=currcode;
if (select.name==="from" && currcode==="USD"){
    newoption.selected="selected";
}
else if (select.name==="to" && currcode==="INR"){
    newoption.selected="selected";
}
select.append(newoption);
    }
select.addEventListener("change", (evt)=>{
updateFlag(evt.target);

});
    

}
const updateFlag=(element)=>{
let currcode=element.value;
let countrycode =countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;

};



btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
   let amt =amount.value;
   if(amt===""|| amt<=0){
    amt=1;
 amount.value="1";

   }
const URL=`${BASE_URL}${fromcurr.value}`;
let response = await fetch(URL);
let data=await response.json();
let rate=data[tocurr.value.toLowerCase()];
console.log(rate);
let finalamt = amt * rate;
msg.innerText=`${amt} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;

});


