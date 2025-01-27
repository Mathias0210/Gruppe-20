//Tester.js

// Formålet med at oprette en variabel der er et array er at kunne opbevare de objekter vi vil tilføje i dette. MB
let item = [];

// Formålet med at oprette en klasse er at definere hvilke informationer et "produkt" består af.
// Klassen er ud fra en constructor givet 4 parametre der synes relevante for den ønskede funktion i programmet. MB
class Product {
    constructor(productName, productID, productPrice, initialProductQuantity) {
        this.productName = productName;
        this.productID = productID;
        this.productPrice = productPrice;
        this.productQuantity = initialProductQuantity;
    }

    // Laver en metode addProduct() der tilføjer et produkt til vores array item. Helt simpelt tager funktionen
    // addProduct(), de tre constructors (productName,productID,productPrice) og koger ned til et objekt (newProduct),
    // som bliver pushet til arrayet item. Dette gør at de tre constructors er samlet på en plads i arrayet, istedet
    // for eksempelvis 3 productQuantity bliver forøget med én som skal bruges længere nede i koden. MB*/
    addProduct() {
        this.productQuantity++;
        var newProduct = {
            product_Name: this.productName, //Sætter newProducts product_Name til at være lig produktets productName
            product_ID: this.productID, //Sætter newProducts product_ID til at være lig produktets productID
            product_Price: this.productPrice, //Sætter newProducts product_Price til at være lig produktets productPrice
        };

        //Pusher newProduct til arrayet item
        item.push(newProduct);
        console.log(JSON.stringify(item));

        //Gemmer items-array med product-objektet i sessionStorage og printer array i konsol for kontrol. /HG
        sessionStorage.setItem("itemInformation", JSON.stringify(item));
        console.log(JSON.parse(sessionStorage.getItem("itemInformation")));
    }

    // Denne metode er modstykket til addProduct sådan at vi også kan fjerne "produkter"/objekter i vores array. MB
    // HUSK skal reassigne til 0 hvis quantity er mindre end 0!!!
    removeProduct() {
        this.productQuantity--;
        //Her bruges et for loop til at itere igennem hele arrayet, item
        for (var x = 0; x < item.length; x++)

            //Conditional statement der sørger for at fjerne det relevante produkt
            if (item[x].product_ID === this.productID) {
                item.splice(x, 1);
                break; // Uden break(stopper for-loopet) vil for-loop fortsætte efter et produkt er fjernet.
            }
        console.log(JSON.stringify(item));

        // Gemmer items-array med product-objektet i sessionStorage og printer array i konsol for kontrol./HG
        sessionStorage.setItem("itemInformation", JSON.stringify(item));
        console.log(JSON.parse(sessionStorage.getItem("itemInformation")));
    }

    /* Jeg kender ikke til denne metode og ved ikke hvad meningen er med den. Den bliver ikke kaldt. MB
    ArrayCounter() {
        for (let x = 0; x < itemlist.length; x++) {
        }
        this.addProduct();
        console.log(JSON.stringify(item));
    }*/
}


//---------------------------------------------------------------------------------------

// Her deklareres vores sub-klasser som nedarvinger til super-klassen 'Product' og der instantieres et
// produkt-objekt under hver sub-klasse. Sub-klasserne nedarver automatisk attributter og metoder fra 'Product'.

// Deklarerer sub-klassen 'Food', der extender super-klassen 'Product'.
class Food extends Product {
}

// Instantiering af objekt under klassen "Food" med specifikke property-values.
let cheeseburger = new Food ("Cheeseburger", 2, 80, 0);

// Deklararing af sub-klassen 'Drinks'.
class Drinks extends Product {
}

// Instantiering af objekt under klassen "Drinks".
let water = new Drinks("Vand", 1, 20, 0);

// Deklararing af sub-klassen 'Extras'.
class Extras extends Product {
}
// Instantiering af objekt under klassen "Extras".
let fries = new Extras("Pomfritter", 3, 15, 0);


//-----------------------------------------------------------------------------------------------------------------------

// Deklarerer subklassen 'Delivery' som nedarving der extender superklassen 'Product'.
// Definerer klassens constructor med properties der nedarves fra superklassen, og properties der er unikke
// for 'Delivery'. /HG
class Delivery extends Product {
    // Kalder superklasses constructor med super-keyword, hvormed Delivery nedarver attributter og metoder fra 'Product'.
    constructor(productName, productID, productPrice, initialProductQuantity, deliverySelected) {
        super(productName, productID, productPrice, initialProductQuantity);
        this.deliverySelected = deliverySelected;
    }
}

// Instantierer et objekt  med properties fra 'Delivery'-klassen, der definerer hvad et objekt i klassen 'Delivery'
// består af. Objektet 'delivery' er prædefineret og fungerer som et "produkt" hvis kunden vælger levering eller
// afhentning. Formålet med den for Delivery-klassen unikke attribut "deliverySelected" er, at den deklareres senere
// hen med en boolsk værdi på "true/false" afhængigt af, om kunden vælger hhv. levering/afhentning. /HG
let delivery = new Delivery(
    "Levering",
    "1",
    45,
    0,
    null,
);


// Funktion med formål at definere hvilken leveringsmetode kunden har valgt (levering/afhentning) efter hvilken
// radiobutton der er tjekket.
// DOM metoden .getElementById bruges til at finde den specifikke node for hver af de to radiobuttons.
// Bruger conditional execution i form af if-else statement: først et if...else der assigner "deliverySelected"
// til en boolean (true/false) alt efter hvilken radiobutton der er tjekket af. /HG
function deliveryMethodSelected() {
    let yesDelRadioBtn = document.getElementById('yes-delivery');
    let noDelRadioBtn = document.getElementById('no-delivery');

    // If-statement der tjekker hvilken leveringsmetode kunden har valgt. Anvender operatorer der tjekker om radiobtn
    // for levering har en checked-property lig true OG radiobtn for afhentning dermed er false.
    // Hvis kunde har valgt (levering) skal inputfelter til udfyldning af leveringsoplysninger være synlige og
    // delivery-objektets property "deliverySelected" assignes til den boolsk værdi 'true'. getElementByID-metoden
    // anvendes til at mutere noden med det specifikke ID så dens style bliver synlig eller skjult./HG
    if  (yesDelRadioBtn.checked === true && noDelRadioBtn.checked ===false ) {
        delivery.deliverySelected = true;
        document.getElementById('if-yes-delivery').style.visibility = 'visible';
        document.getElementById('if-no-delivery').style.visibility = 'visible';

        // else-if der tjekker modsat af første radiobtn. Hvis kunde vælger "afhentning" assignes boolean til 'false'.
        // Hvis kunde vælger "afhentning" skal felter for addresse, post nr. og by ikke være synlige. /HG
    } else if (yesDelRadioBtn.checked === false && noDelRadioBtn.checked ===true) {
        delivery.deliverySelected = false;
        document.getElementById('if-no-delivery').style.visibility = 'visible';
        document.getElementById('if-yes-delivery').style.visibility = 'hidden';

        // else statement der assigner objektets property til null hvis ingen radiobtns er tjekket
        // bruges til at validere om kunden har valgt leveringsmetode eller ej. /HG
    } else {
        delivery.deliverySelected = null;
    }

    // Anvender if else statement for at tjekke om der skal tilføjes leveringsgebyer til den totale pris.
    // Der tilføjes leveringsgebyer, hvis man har trykket på "Vælg levering" hvormed "deliverySelected=true"
    // Hvis man derimod trykker "hent selv" vil den igen fjerne leveringsgebyr, da "deliverySelected=false".
    // if-statement der kalder superklassens metode addProduct, hvis der er valgt levering hvormed
    // delivery-objektet pushes i item-array. /HG
    if (delivery.deliverySelected === true) {
        delivery.addProduct();
        console.log(JSON.stringify(item)); // Dette er kun relevant for console.log


        // Comparison operator sørger for at removeProduct kun kaldes, hvis der allerede er et delivery-objekt i item.
        // Hvis true, kaldes removeProduct-metoden og dermed fjernes leveringsobjekt fra item-array.
    } else if (delivery.productQuantity > 0 ) {
        delivery.removeProduct();
        console.log(JSON.stringify(item)); // Dette er kun relevant for console.log

        // Hvis kunden endnu ikke har valgt leveringsmetode er delivery.deliverySelected lig null, og
        // delivery-objektets productQuantity-attribut assignes til 0. Undgår at productQuantity bliver negativ.
    } else {
        delivery.productQuantity=0;
    }
}

// Deklarerer funktion der kalder flere funktioner i et nested scope
// kaldes ved buttons onclick-property i html. /HG
function delMethodFunctions() {
    deliveryMethodSelected();
    displayItems();
    calculateTotalPrice();
}

// Løser problem med at der kun kan tilvælges én levering: /HG
// addEventListener på radiobuttons for leveringsmetode bruges til at registrere event handler på de to radiobuttons.
// Eventet defineres ved typen "change", så når radiobtn ændres ved at den tjekkes af, så
// kaldes funktionen hvormed leveringsmetoden registreres.
let noDelRadioBtn = document.getElementById('no-delivery');
let yesDelRadioBtn = document.getElementById('yes-delivery');
noDelRadioBtn.addEventListener("change", delMethodFunctions);
yesDelRadioBtn.addEventListener("change", delMethodFunctions);


//----------------------------------------------------------------------------------------
// Anvendte funktioner:

// Funktion til at vise valgte items
function displayItems() {
    document.getElementById("displayed_items").innerHTML = "";

    // Conditional statements der sørger for kun at ændre DOM værdierne hvis productQuantity for det anførte objekt er over 0
    // Ikke brug for noget else da der ikke skal gøres noget hvis ingen af disse statements er opfyldt. MB
    if (cheeseburger.productQuantity > 0) {
        document.getElementById("displayed_items").innerHTML += cheeseburger.productQuantity
            + " X " + cheeseburger.productName + " "
            + cheeseburger.productPrice*cheeseburger.productQuantity + " KR." + "<br>"
    }
    if (water.productQuantity > 0) {
        document.getElementById("displayed_items").innerHTML += water.productQuantity
            + " X " + water.productName + " "
            + water.productPrice*water.productQuantity + " KR. " + "<br>";
    }
    if (fries.productQuantity > 0) {
        document.getElementById("displayed_items").innerHTML += fries.productQuantity
            + " X " + fries.productName + " "
            + fries.productPrice*fries.productQuantity + " KR. " + "<br>";

        // Fjerner først evt. værdi i HTML
        //document.getElementById("displayed_items").innerHTML="";
    }
    if (delivery.productQuantity > 0) {
        document.getElementById("displayed_items").innerHTML += delivery.productQuantity
            + " X " + delivery.productName + " "
            + delivery.productPrice*delivery.productQuantity + " KR. " + "<br>";
    }
}

// Funktion der udregner den totale pris af valgte items.
function calculateTotalPrice(){
    // Dette er kun relevant for console.log
    console.log(""); //Laver "linebreak" i console.log
    console.log("Total pris af kurv ");

    // Her defineres 3 variabler der bruges til at udregne den sidste totalepris
    var discountField=document.getElementById("discountCodeField").value;
    var totalPrice = 0;
    var discount = 0;

    // Ideen med denne variabel er at nedenstående conditional statements ville sætte den til 1.
    // På den måde ville vi kunne registrere om en gydig rabatkode var indstastet og blokere for at andre kunne bruges
    // Man kan dog kun bruge en ad gangen så indtil videre kan man bare vælge hvilken kode man vil bruge uden at den
    // blokerer. MB
    // var couponsUsed=0;

    // Dette for-loop gennemgår arrayet i item for dets længde
    for (var x = 0; x < item.length; x++) {

        // Hvis der ikke indstastes en rabatkode udregnes samlet pris for kurven ved at for loopet gennemgår hele
        // vores array. Og vi derefter ganger objekterne med .product_price, dette gentages i loopet for ikke at
        // overskrive resultatet. MB
        if (discountField==="") {
            totalPrice = item[x].product_Price + totalPrice;
        }

        // Hvis der indstastes noget udregnes prisen på hele kurven.
        // Uden denne Else vil prisen blive 0 hvis man indtaster en ikke aktiv rabatkode, fordi ingen af if statements
        // vil execute prisudregningen.
        // Hvis der indtastes en kode giver den en fejlmeddelses, hvis et if statement nedenunder er sandt,
        // overskriver det fejlmeddelsen. MB
        else{
            totalPrice = item[x].product_Price + totalPrice;
            document.getElementById("activatedCoupons").innerHTML="";
            document.getElementById("discountError").innerHTML="Koden du har indtastet er ikke gyldig.";
        }

        // Hvis der indtastes noget i rabatkode feltet der matcher med en rabatkode udregnes discount.
        // Discount bliver udregnet og pga. ovenstående if/else har vi allerede udregnet totalPrice
        // Disse if statements "sletter" også else sætningens fejlmeddelelse.
        // Der findes 4 rabatkoder. 1. "burger10" 2. "rice10" 3. "water10" 4. "ALL10" . MB
        if (discountField==="burger10" && cheeseburger.productQuantity>0){
            document.getElementById("discountError").innerHTML="";
            discount=(cheeseburger.productQuantity*cheeseburger.productPrice)/10;
            console.log(discount);
            //totalPrice = item[x].product_Price + totalPrice;
            document.getElementById("activatedCoupons").innerHTML="Aktiverede rabatter" + "<br>"
                + "<b>Burger10:</b> Giver 10% rabat på din burger(e)"
        }

        if (discountField==="fries10" && fries.productQuantity>0) {
            document.getElementById("discountError").innerHTML="";
            discount=(fries.productQuantity*fries.productPrice)/10;
            console.log(discount);
            //totalPrice = item[x].product_Price + totalPrice;
            document.getElementById("activatedCoupons").innerHTML="Aktiverede rabatter" + "<br>"
                + "<b>fries10:</b> Giver 10% rabat på dine pomfritter"
        }

        if (discountField==="water10" && water.productQuantity>0){
            document.getElementById("discountError").innerHTML="";
            discount=(water.productQuantity*water.productPrice)/10;
            console.log(discount);
            //totalPrice = item[x].product_Price + totalPrice;
            document.getElementById("activatedCoupons").innerHTML="Aktiverede rabatter" + "<br>"
                + "<b>water10:</b> Giver 10% rabat på din vand"
        }

        if (discountField==="ALL10"){
            document.getElementById("discountError").innerHTML="";
            discount=totalPrice/10;
            console.log(discount);
            //totalPrice = item[x].product_Price + totalPrice;
            document.getElementById("activatedCoupons").innerHTML="Aktiverede rabatter"
                + "<br>" + "<b>ALL10:</b> Giver 10% rabat på hele din ordre"
        }
    }
    // Denne variabel er den egentlige totalpris da variablen totalPrice giver totale pris for kurven uden evt. discount
    // discount variablen bliver tildelt en anden værdi end 0 hvis et af if statements er sande.
    // Hvis ingen af if statements er sande skal der ikke være disount men den er 0 så det er ligegyldigt at
    // den fratrækkes. MB
    var totalPriceDiscount = totalPrice-discount;

    document.getElementById("basketTotalPrice").innerHTML = "Pris for produkter " + totalPrice + " kr";
    document.getElementById("discount").innerHTML= "Rabat " + discount + " KR.";
    document.getElementById("totalPriceWithDiscount").innerHTML= "Total pris " + totalPriceDiscount + "KR.";


    // Dette er kun relevant for console.log (Dette viser totalprice i konsollen)
    console.log("Den totale pris er: " + totalPrice + " kr");
    console.log("-----------------------------------------------");

    // Gemmer totalPrice i sessionStorage, så dens værdi senere kan tilgås under betaling.
    // Har ændret variablen til totalPriceDiscount så korrekt pris bliver gemt hvis der er rabatkode. MB
    sessionStorage.setItem("totalOrderPrice", JSON.stringify(totalPriceDiscount));
}


// Har optimeret validateCart(), så der tjekkes for flere conditions inden man kan gå videre. /HG
// Funktion der tjekker om man både har valgt varer OG har valgt leveringsmetode.
// Try-catch, exeption handling der kontrollerer kunde har udfyldt oplysninger og valgt produkter.
// Hvis true, kaldes funktion, der omdirigerer browser til side for indtastning af kunde-oplysninger.
function validateCart() {
    var cartValidated = true;

    try {
        if (item.length === 0 && delivery.deliverySelected===null && savedDelivery.length === 0 )
            throw "Du skal lægge varer i kurven og vælge leveringsmetode";
        if (item.length !== 0 && delivery.deliverySelected===null)
            throw "Du skal vælge leveringsmetode";
        if (item.length === 1 && delivery.deliverySelected ===true && savedDelivery.length === 0)
            throw "Du kan ikke vælge levering uden at have varer i kurven.";
        if (item.length === 0 && delivery.deliverySelected ===false && savedDelivery.length === 0)
            throw "Du kan ikke vælge afhentning uden at have varer i kurven.";
        if (item.length === 1 && delivery.deliverySelected ===true && savedDelivery.length === 1 )
            throw "Du kan ikke vælge levering uden at have lagt varer i kurven";
        if (item.length === 0 && delivery.deliverySelected ===false && savedDelivery.length === 1)
            throw "Du kan ikke vælge afhentning uden at have lagt varer i kurven";
        if (item.length >=1  && delivery.deliverySelected !==null && savedDelivery.length === 0 )
            throw "Leverings/afhentningsoplysninger er ikke gemt";

    } catch (error) {
        alert("Hov - du kan ikke gå videre endnu: " + error);
        cartValidated = false;
    }

    if (cartValidated===true) {
        goToCustomerInfo();
    }
}

// Denne funktion er lavet for at man kan avancere i flowet videre til næste sider
// Hvis item er tom dvs. ingen produkter er valgt kommer an alert op på skærmen og man bliver ikke ført videre. MB
function goToCustomerInfo() {
    const currentPage=window.location="index.html";
    window.close(currentPage);
    const customerPage=window.location="Customer.html";
    window.open(customerPage);

}

// Eventlistener der kalder funktionen validateCart ved klik på 'bestil'-knap. /HG
document.getElementById('order_button').addEventListener("click", () => {
    validateCart()
});


/*Dette er et forsøg på at lave en funktion der tester om logikken ide forskellige dele af tester.js og tilhørende
Fungerer som ønsket. Det fungerer ved at tilføje alle vores forskellige prosukter (varer, levering, rabatkoder)
Samt det tilhørende information. Herefter bruges der conditional if-statements til at kontrollere felterne i DOM
For at det er den korrekte værdi. Der er dog mange ting den ikke tager højde for og den skulle være opbygget af
enten callback funktioner eller promises. Den er dog brugbar nok til hvis vi begyner at ændre i eksisterende logik
at vi kan kontrollere om en funktion ikke bliver kaldt eller ikke eksekverer korrekt. Det er nok nærmere et automatisk use-case. MB
 */
function testerJS() {

    //Tilføjer vores produkter
    cheeseburger.addProduct();
    water.addProduct();
    fries.addProduct();

    //Oprettet variabel til at kontrollere om if statements bliver eksekveret
    var correctResponse=0;

    //Validerer at produkterne er tilføjet og tilføjer levering
    if (cheeseburger.productQuantity == 1 & water.productQuantity == 1 & fries.productQuantity == 1){
        document.getElementById("yes-delivery").checked=true;
        delMethodFunctions();
        if (delivery.deliverySelected==true && delivery.productQuantity==1){
            document.getElementById("delivery_time-hours").value="10";
            document.getElementById("delivery_time-minutes").value="15";
            document.getElementById("delivery_address").value="Testgade";
            document.getElementById("delivery_region").value="2000";
            document.getElementById("delivery_city").value="Frederiksberg";
            document.getElementById("discountCodeField").value="ALL10";
            setTimeout(validateDeliveryInformation,3000);
            correctResponse=1;}
        else alert("Levering gik galt\nFejl opstod ved kondition:\ndelivery.deliverySelected==true" +
            "\neller\ndelivery.productQuantity>1");

    }
    else alert("Noget gik galt med ved at tilføje produkter til kurven\nFejl opstod ved kondtion" +
        "\ncheeseburger.productQuantity == 1 & water.productQuantity == 1 & fries.productQuantity == 1");


    //Igangsætter nu 1 funktion der kalder 3 andre som beskrevet nedenunder step=
    if (correctResponse===1){

        //Funktionen delMethodfunctions kalder deliveryMethodselected, calculateTotalPrice og displayItems
        setTimeout(delMethodFunctions,6000);
        if (totalPriceWithDiscount!==document.getElementById
        ("totalPriceWithDiscount" && delivery.productQuantity==1)){
            alert("prisen stemmer ikke" +
                "\nFejl opstod ved kondition" +
                "\ntotalPriceWithDiscount!==document.getElementById(\"totalPriceWithDiscount\")" +
                "\neller" +
                "\ndelivery.productQuantity==1")
            correctResponse=0;
        }
        if (correctResponse===1){
            alert("Tester.js har korrekt output ift. input.");
        }
    }
}

// Funktionen viser at det er muligt at tilføje levering flere gange. MB