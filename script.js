const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


function debug(e){
    console.log("" + e.type);
}

let cart = [];

cartBtn.addEventListener("click", function() {

    updateCartModal();
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function(event){
if(event.target === cartModal){
cartModal.style.display = "none";
}
})


closeModalBtn.addEventListener("click", function(){
cartModal.style.display = "none";
})

menu.addEventListener("click", function(event){
let parentButton = event.target.closest(".add-to-cart-btn")

if(parentButton){
const name = parentButton.getAttribute("data-name")
const price = parseFloat(parentButton.getAttribute("data-price"))

addToCart(name, price)

}
})

function addToCart(name, price){

const existingItem = cart.find(item => item.name === name)

if(existingItem){
    existingItem.qtd += 1;
    
}else{
    cart.push({
        name,
        price,
        qtd: 1,
        })
    }

    updateCartModal()
}


// Atualizar o Carrinho
function updateCartModal() {
cartItemContainer.innerHTML = "";
let total = 0;

cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between","mb-4", "flex-col")

    cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.qtd}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

        
            <button class="remove-btn" data-name="${item.name}">
                Remover
            </button>
        
    </div>
    `

    total += item.price * item.qtd;

    cartItemContainer.appendChild(cartItemElement)
})

cartTotal.textContent = total.toLocaleString("pt-BR",{
    style: "currency",
    currency: "BRL"
});

cartCounter.innerHTML = cart.length;

}


cartItemContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];

        if(item.qtd > 1){
            item.qtd -= 1;
            updateCartModal();
            return;
        }
        
        cart.splice(index, 1);
        updateCartModal();

    }

}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

checkoutBtn.addEventListener("click", function(){

    const isOpen = checkFuncionamento();
    if(!isOpen){
        Toastify({
            text: "Ops, O restaurante está fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #0000CD, #0000FF)",
            },
        }).showToast();

        return;
    }


    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }


    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.qtd}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "13982086180"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

function checkFuncionamento(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <= 23;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkFuncionamento();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-blue-700")
}else{
    spanItem.classList.remove("bg-blue-700")
    spanItem.classList.add("bg-red-500")
}