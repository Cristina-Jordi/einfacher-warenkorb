//Burger Menues/Gerichte
let shopItem = ['Maki Salmon', 'Salmon Avocado', 'Gyoza (6 Stück)', 'Inside Out Green Veggie', 'Yakitori Salat', 'Edamame', 'Japanische Nudelsuppe', 'Nudelsuppe mit Huhn'];
let shopDescription = ['mit Lachs', 'Maki mit Avocado', 'Gefüllte Teigtaschen mit Huhn', 'mit Spinat und Kräuter', 'mit Mix-Salat, Hühnerfleisch und Teriyakisauce', 'Enthält Sojabohnen-Erzeugnisse', 'an feinen Kräutern', 'mit Hühnchenfleisch und Ei'];
let shopPrice = [4.90, 4.90, 5.90, 5.90, 6.90, 3.90, 5.90, 6.90];
let pic = ['img/maki_salmon_thumbs.jpg', 'img/salmon_avocado_thumb.jpg', 'img/gyoza_thumb.jpg', 'img/inside-out-green-veggie_thumbs.jpg', 'img/yakitori_salat_thumb.jpg', 'img/edamame_thumb.png', 'img/japanische_nudelsuppe_thumbs.jpg', 'img/nudelsuppe_huenchen_thumbs.jpg'];
let picLigtbox = ['img/maki_salmon.jpg', 'img/salmon_avocado.jpg', 'img/gyoza.jpg', 'img/inside-out-green-veggie.jpg', 'img/yakitori_salat.jpg', 'img/edamame.jpg', 'img/japanische_nudelsuppe.jpg', 'img/nudelsuppe_huenchen.jpg'];

// Der Warenkorb
let cartNumber = [];  // Anzahl Gerichte im Warenkorb
let cartItem = [];  // Food, welcher zum Warenkorb hinzugefügt wird
let cartPrice = [];  // Der Einzelpreis zu jedem Food

let delCost = 2.90;  // Die Lieferkosten sind immer gleich


function renderShop() {  // Alle Gerichte werden gerendert
    let shopContent = document.getElementById('food');  // Wohin die Inhalte kommen (Bezug)
    let footerContent = document.getElementById('footer');

    shopContent.innerHTML =
        `
    <p class="text-beliebte-gerichte">Beliebte Gerichte</p>
    `;

    for (let i = 0; i < shopItem.length; i++) {  // for-Schlaufe, mit der der Shop aufgebaut wird (alle Items)
        shopContent.innerHTML +=  // Mit dem += führt es alle Zeilen auf, nicht nur eine!
            renderShopHTML(i);  /*HMTL als Template darunter*/

        footerContent.innerHTML =
            footerHTML();
    }
    renderCart();
}

function renderShopHTML(i){
    return `
    <div class="food">
    <div class="border">
        <div class="meal-text">
            <div class="menu-title" id="menu">${shopItem[i]}</div>
            <div id="info">${shopDescription[i]}</div>
            <div><button class="btn-singleprice" onclick="pushToCart(${i})">${shopPrice[i].toFixed(2)} €</button></div>
        </div>
        <div class="meal-thumb"><img class="thumb" src="${pic[i]}" onclick="openLightbox(${i})"></div>
        
    </div><br>
    `;
}

function footerHTML(){
    return `
    <div class="footer-container">
        <div><h3>Impressum</h3>
        <p class="footer-text">
            Sushi Do Japanese Food, München<br>
            Henning-Straße 3<br>
            80993 München<br>
            Gesetzlicher Vertreter: Xing Tuan Do<br>
            <a href="mailto:#" class="mail-foodtogo">info@foodtogo.de</a><br>
            Unternehmensregister: München<br>
            Unternehmensregister-Nr: 06315000<br>
        </p></div>
        <div><a href="#top"><img src="img/top.png" class="top-pic"></a></div>
    </div>
    `;
}

function openLightbox(i) {
    let box = document.getElementById('box');

    box.innerHTML = /*html*/`
   <div class="box-container"> 
    <img class= "cancel" src="img/cancel.png" onclick="closeLightbox(${i})">
    <div><img class="img-zoom fade-in-image" src="${picLigtbox[i]}"></div>
    </div>
    `;

    box.classList.add('box-container');
}

function closeLightbox(i) {
    let box = document.getElementById('box');
    box.innerHTML = '';
    document.getElementById('box').classList.remove('box-container');
}

function pushToCart(i) {  // Es pusht erst in den Warenkorb, wenn nicht schon etwas drin, sonst erhöht es die Anzahl um 1
    let index = cartItem.indexOf(shopItem[i]);

    if (index == -1) {
        cartNumber.push(1);
        cartItem.push(shopItem[i]);
        cartPrice.push(shopPrice[i])
        delCost = 2.90;

        cartNumber.reverse();
        cartItem.reverse();
        cartPrice.reverse();

        document.getElementById('btn-cart').classList.remove('d-none');

    } else {
        cartNumber[index]++;
    }
    renderCart();
    saveToStorage();
}

function renderCart() {  // Der Warenkorb wird gerendert
    let addItemsToCart = document.getElementById('carts-container');

    if (cartItem.length == 0) {
        emptyCart();

    } else {

        addItemsToCart.innerHTML =
            `
         <br><h1 class="title-cart">Warenkorb</h1>
         <hr class="divider">
         `;
        for (let i = 0; i < cartItem.length; i++) {

            addItemsToCart.innerHTML += /*HMTL als Template darunter*/
                renderCartHTML(i);
                
            document.getElementById('hideCosts').classList.remove('d-none');
            sumRow();
        }
        sum();
        saveToStorage();
    }
}

function renderCartHTML(i){
    return `
            <div id="wholeCart">
                <div class="cart">
                    <div class="cart-btn-container">
                        <div class="cart-content">
                            <div id="quantity" class="cart-content-container"><p><b>${cartNumber[i]}</p></div>
                            <div class="menu-cart" id="menu"><p>${cartItem[i]}</p></div>
                            <div id="price"><p class="price-cart">${cartPrice[i].toFixed(2)} €</b></p></div>
                        </div>
                        <div class="btn-cart-container">
                            <button class="decrease-btn" onclick="decrease(${i})">-</button>
                            <button onclick="increase(${i})">+</button>
                        </div>
                    </div>

                    <div class="cart-subtotal">
                        <div class="priceRow-container"><p><i>Zeilentotal: </i></p></div>
                        <div id="priceRow"><p><i>${sumRow(i).toFixed(2)} €</i></p></div>
                    </div>
                </div>
            </div>
            `;
}

function sumRow(i) {
    let sumRow = 0;
    // Preis pro Zeile zusammengerechnet
    sumRow += cartNumber[i] * cartPrice[i];
    return sumRow;
}

function emptyCart() {
    let addItemsToCart = document.getElementById('carts-container');
    addItemsToCart.innerHTML =
        `
             <br>
         <h1 class="title-cart">Warenkorb</h1>
         <hr class="divider">
         <div class="center-cart-pic"><img src="img/cart_256x256.png" class="cart-pic"></div><br>
         <p class="text-cart-title">Fülle Deinen Warenkorb</p>
         <p class="text-cart">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen!</p>
         `;
    document.getElementById('hideCosts').classList.add('d-none');
    document.getElementById('btn-cart').classList.add('d-none');
}

function increase(index) {   // Bei Klick auf das Plus im Warenkorb soll es um 1 erhöhen, wenn bereits etwas drin!

    cartNumber[index]++;

    renderCart();
    sum();
    saveToStorage();
}

function decrease(i) {

    if (cartNumber[i] > 1) { // Wenn 1 oder mehr im Warenkorb, um 1 Position löschen

        cartNumber[i]--;

    } else {  // Wenn nur noch 1 vorhanden, ganze Zeile löschen
        cartNumber.splice(i, 1);
        cartItem.splice(i, 1);
        cartPrice.splice(i, 1);
    }
    renderCart();
    sum();
    saveToStorage();
}

function sum() { // Die Summen werden berechnet
    let addCostsToCart = document.getElementById('costs-container');

    let adSum = 0;  // Die Zwischensumme muss interiert werden, damit sie aufrechnet!
    for (let i = 0; i < cartPrice.length; i++) {  // Iterieren mit dem Preis im Warenkorb
        adSum += cartNumber[i] * cartPrice[i];
    }

    let total = adSum;
    total = (adSum + delCost);

    addCostsToCart.innerHTML = // Ohne += sonst wird die Zeile immer wieder hinzugefügt!
        sumHTML(adSum, total); /*HMTL als Template darunter*/

    saveToStorage();

    let btnCartHide = document.getElementById('btn-cart');

    btnCartHide.innerHTML =
        `
            <button class="button-cart boxCart" onclick="openCartLighbox()">Bezahlen (${total.toFixed(2)} €)</button>
             `;
}

function sumHTML(adSum, total){
     return `
<div class="cost-container">
    <div class="costs"> 
        <div class="cart-tot"><p>Subtotal</p></div>
        <div id="subTot"><p>${adSum.toFixed(2)} €</p></div>
    </div>
    <div class="costs">
        <div class="cart-tot"><p>Lieferkosten (pauschal)</p></div>
        <div id="delCost"><p>${delCost.toFixed(2)} €</p></div>
    </div>
    <div class="costs">
        <div class="cart-tot"><p><b>Total</b></p></div>
        <div id="totSum"><p>${total.toFixed(2)} €</p></div>
    </div>
    <button class="bezahlen-btn" onclick="thankYou()">Bezahlen (${total.toFixed(2)} €)</button>
    
</div>
         `;
 }

function thankYou() {

    if (window.innerWidth < 800) {

        alert('Danke für die Bestellung. Schon bald wird geliefert!');
        emptyCart();
        closeCartLighbox();
    } else {
        alert('Danke für die Bestellung. Schon bald wird geliefert!');
        emptyCart();
    }
}

function openCartLighbox() {
    let boxCart = document.getElementById('boxCart');

    boxCart.innerHTML = /*html*/`
   <div class="box-container-cart">
    <img class= "cancel" src="img/cancel.png" onclick="closeCartLighbox()"></div>
    </div>
    `;
    boxCart.classList.add('boxCart');
    document.getElementById('wholeCart').classList.remove('d-none');
    document.getElementById('carts-container');
    renderCart();
}

function closeCartLighbox() {
    let boxCart = document.getElementById('boxCart');
    boxCart.innerHTML = '';
    document.getElementById('boxCart').classList.remove('boxCart');
    document.getElementById('wholeCart').classList.add('d-none');
    renderCart();
}

function loadFromStorage() {  // Nimm die Strings aus dem Speicher
    let amountAsText = localStorage.getItem('cartNumber');
    let cartAsText = localStorage.getItem('cartItem');
    let priceAsText = localStorage.getItem('cartPrice');

    if (amountAsText && cartAsText && priceAsText) {
        cartNumber = JSON.parse(amountAsText);
        cartItem = JSON.parse(cartAsText);
        cartPrice = JSON.parse(priceAsText);
    }
}

function saveToStorage() {  // Speichere die Strings
    localStorage.setItem('cartNumber', JSON.stringify(cartNumber));
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    localStorage.setItem('cartPrice', JSON.stringify(cartPrice));
}