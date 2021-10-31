//Crypto Class: Represents a Cypto
class Crypto {
    constructor(coin, amount, price, date) {
        this.coin = coin;
        this.amount = amount;
        this.price = price;
        this. date = date;
    }

}

//UI Class: Handles UI Tasks
class UI {
    static displayCryptos() {

       const cryptos = Store.getCryptos();

       cryptos.forEach((crypto) => UI.addCryptoToList(crypto));
    }

    static addCryptoToList(crypto){
        const list = document.getElementById('crypto-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${crypto.coin}</td>
        <td>${crypto.amount}</td>
        <td>${crypto.price}</td>
        <td>${crypto.date}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static deleteCrypto(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} mt-4`;
        div.appendChild(document.createTextNode(message));
        const containier = document.querySelector('.container');
        const form = document.getElementById('crypto-form');
        containier.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.getElementById('coin').value = "";
        document.getElementById('amount').value = "";
        document.getElementById('price').value = "";
        document.getElementById('date').value = "";
    }
}

//Store Class: Handles storage
class Store {
    static getCryptos() {
        let cryptos;
        if(localStorage.getItem('cryptos') === null) {
            cryptos = [];
        } else {
            cryptos = JSON.parse(localStorage.getItem('cryptos'));
        }

        return cryptos
    }

    static addCrypto(crypto) {
        const cryptos = Store.getCryptos();
        cryptos.push(crypto);
        localStorage.setItem('cryptos', JSON.stringify(cryptos))
    }

    static removeCrypto(date) {
        const cryptos = Store.getCryptos();

        cryptos.forEach((crypto, index) => {
            if(crypto.date === date) {
                cryptos.splice(index, 1);
            }
        });

        localStorage.setItem('cryptos', JSON.stringify(cryptos))
    }
}

//Event: Display Cryptos
document.addEventListener('DOMContentLoaded', UI.displayCryptos);


//Event: Add a Crypto
document.getElementById('crypto-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    const coin = document.getElementById('coin').value;
    const amount = document.getElementById('amount').value;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;

    //Validate
    if(coin === ''|| amount === '' || price === '' || date === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
    
     //Instantiate crytpo
     const crypto = new Crypto(coin, amount, price, date);

     console.log(crypto);
 
     //Ad Crypto to UI
     UI.addCryptoToList(crypto);

     //Add Crypto to store
     Store.addCrypto(crypto);
 
     //Success Message
     UI.showAlert('Crypto Successfully Added', 'success');
     
     //Clear fields
     UI.clearFields();    

     }
});


//Event: Remove a Crypto
document.getElementById('crypto-list').addEventListener('click', (e)=> {
    
    //Remove crypto from UI
    UI.deleteCrypto(e.target);
  
    //Remove crypto from Store
    Store.removeCrypto(e.target.parentElement.previousElementSibling.textContent);

    //Deleted Message
    UI.showAlert('Crypto Removed', 'info');

})