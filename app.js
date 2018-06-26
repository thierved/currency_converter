const from = 'USD';
const to = 'XOF';

const select_left = document.getElementById('select-left');
const select_right = document.getElementById('select-right');
const input_left = document.getElementById('input-left');
const input_right = document.getElementById('input-right');
const fromTo = from+"_"+to;


let url_convert = "https://free.currencyconverterapi.com/api/v5/convert?q="+fromTo;
const url_countries = 'https://free.currencyconverterapi.com/api/v5/countries';

fetch(url_countries).then(response => response.json())
                     .then(({results}) => {
                        let currency = ''; 
                        for(o in results) {
                            currency += `<option>${o}</option>`;
                        }
                        select_left.innerHTML = currency;
                        select_right.innerHTML = currency;                        
                     });

fetch(url_convert).then(res => res.json())
                    .then(({results}) => {
                        const ratio = results[fromTo].val;
                        input_left.value = 2;
                        input_right.value = input_left.value * ratio;
                    });




