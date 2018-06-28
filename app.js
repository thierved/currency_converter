const select_left = document.getElementById('select-left');
const select_right = document.getElementById('select-right');
const input_left = document.getElementById('input-left');
const input_right = document.getElementById('input-right');
const convert_button = document.getElementById('convert');
const user_input = document.getElementById('input');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(console.log('registered !') );
}


let from, to ;
let moneyCode = {};



const url_currencies = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(url_currencies)
    .then(response => response.json())
        .then(({results}) => {
        let currency = '';         
        
        for(o in results) {
            currency += `<option>${results[o].currencyName}</option>`;
            moneyCode[results[o].currencyName] = o;
        }
        select_left.innerHTML = currency;
        select_right.innerHTML = currency;                        
    });
user_input.addEventListener('click', () =>{
    user_input.value = "";
    input_left.value = 0;
    input_right.value = 0;    
});

convert_button.addEventListener('click', () => {
    input_left.value = "loading...";
    input_right.value = "loading...";

    from = moneyCode[select_left.options[select_left.selectedIndex].text];
    to = moneyCode[select_right.options[select_right.selectedIndex].text];
    const fromTo = from+"_"+to;

    let url_convert = "https://free.currencyconverterapi.com/api/v5/convert?q="+fromTo;
    fetch(url_convert)
        .then(res => res.json())
            .then(({results}) => {
                const ratio = results[fromTo].val;
                input_left.value = user_input.value;
                input_right.value = Math.round(input_left.value * ratio * 100)/100;
        });

});






