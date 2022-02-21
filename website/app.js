
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const myKEY = 'd1cf33417b41ab2fc342fc4348dce590';
//your Country Code

let nations = [];
let codes = [];

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

//  ASYNC GET
const getCodeOrNation = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData;
    } catch (error) {
        console.log("error", error);
    }

};
async function NationsAndCodes() {
    getCodeOrNation('/Nation').then(function (allData) {
        nations = allData;
    });
    getCodeOrNation('/Code').then(function (allData) {
        codes = allData;
    });

};
function construct() {
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < 239; i++) {
        const newElement = document.createElement('option');
        newElement.setAttribute('value', codes[i]);
        newElement.textContent = nations[i];
        //console.log(nations[i]);
        fragment.appendChild(newElement);
    };
    document.querySelector("#Nazioni").appendChild(fragment);
};
NationsAndCodes();
setTimeout(() => { construct(); value = e.options[e.selectedIndex].value; }, 50);
//NationsAndCodes()
let e = document.getElementById("Nazioni");
let cod = document.getElementById("cod");
e.addEventListener('change', () => {
    value = e.options[e.selectedIndex].value.toLowerCase().substr(0,2)  ;
    cod.textContent = value;

});

//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
buttonGenerate=document.querySelector('#generate');
buttonGenerate.addEventListener('click',generate);
function generate(){
    zipCode=document.querySelector('#zip');
    feel=document.getElementById("feelings").value;
    if (value=='---'||zipCode.value==''){
        alert('insert country and zipcode')
    }
    else{
        let weatherURL=baseURL+zipCode.value+','+value+'&appid='+myKEY+'&units=metric';
        console.log(weatherURL);
        getCodeOrNation(weatherURL).then(function (allData) {
        tim= allData;
        date.textContent = newDate;
        temp.textContent=`la temperatura è di ${tim.main["temp"]}°C`
        content.textContent=feel;
        data={'date':newDate,'temperature':tim.main["temp"],'feelings':feel};
        postData('/addData',data)
        });
    }
};
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content=document.getElementById("content");

const postData = async (url = '',data={}) => {
    console.log(data);
    const response=await fetch(url,{
        method:'POST',
        credential:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }


}