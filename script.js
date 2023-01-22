//lightbox gallery
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'

const gallery = document.getElementById('gallery')
const images = document.getElementsByName('gallery-img')
images.wdith = "400px"
images.forEach(image => {
    if(image.name == "gallery-img"){
        image.addEventListener('click', e => {
            document.body.appendChild(lightbox)
            lightbox.classList.add('active')
            const img = document.createElement('img')
            img.id = 'lightbox-img'
            img.classList.add('img-active')
            img.src = image.src
            while(lightbox.firstChild){
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)    
        })
    }
})

lightbox.addEventListener('click', e => {   
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

//ordering section
const plusBtn = document.getElementById('plus-button')
const minusBtn = document.getElementById('minus-button')
const itemCounterCont = document.getElementById('item-counter')
let itemCounter = 0

plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', removeOne)

function addOne(){
    if(itemCounter < 99){
        itemCounter += 1
        itemCounterCont.innerHTML = itemCounter
    }
}

function removeOne(){
    if(itemCounter > 0){
        itemCounter -= 1
        itemCounterCont.innerHTML = itemCounter
    }
}

//cart panel
const cartBtn = document.getElementById('cart-button')
const cartPanel = document.getElementById('cart-panel')
const cartSumUp = document.getElementById('cart-sum-up')
const addToCartBtn = document.getElementById('add-to-cart-button')
const deleteBtn = document.getElementById('delete-from-cart')
const cartFull = document.getElementById('cart-with-items')
const cartEmpty = document.getElementById('cart-without-items')

let finalPrice = 0
let finalItemCounter = 0

cartBtn.addEventListener('click', e =>{
    cartPanel.classList.toggle('active')  
})

addToCartBtn.addEventListener('click', e =>{
    finalItemCounter += itemCounter
    finalPrice = parseFloat(125.00 * finalItemCounter)
    cartSumUp.innerHTML = " " + finalItemCounter + " $" + finalPrice
    switchCart()
})

deleteBtn.addEventListener('click', e =>{
    finalItemCounter = 0
    itemCounter = 0
    itemCounterCont.innerHTML = 0
    switchCart()
})

function switchCart(){
    if(finalItemCounter > 0){
        cartFull.classList.add('active')
        cartEmpty.classList.add('deactive')
    }else{
        cartFull.classList.remove('active')
        cartEmpty.classList.remove('deactive')
    }
}

//mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileMenuBg = document.getElementById('mobile-menu-container')
const mobileMenu = document.getElementById('mobile-menu')
const exitBtn = document.getElementById('mobile-menu-exit-btn')

const animateCloseMenu = [
    {transform: "translate(0px)"},
    {transform: "translate(-500px)"}
]

const animateFadeMenu = [
    {filter: "opacity(1)"},
    {filter: "opacity(0)"}
]

mobileMenuBtn.addEventListener("click", e =>{
    mobileMenuBg.classList.add('active')
})

exitBtn.addEventListener("click", e =>{
    const closeMenuAnimation = mobileMenu.animate(animateCloseMenu, 600)
    mobileMenuBg.animate(animateFadeMenu, 600)
    closeMenuAnimation.onfinish = ( e =>{
        mobileMenuBg.classList.remove('active')
    })
})

//mobile switch photo
const prevBtn = document.getElementById('left-arrow')
const nextBtn = document.getElementById('right-arrow')
const mainImage = document.getElementById('gallery-main-img')
const img = document.createElement('img')
let currentImg = 2

const moveIn = [
    { transform: "translateX(1000px)" },
    { transform: "translateX(0px)" }
]

const moveOut = [
    { transform: "translateX(0px)" },
    { transform: "translateX(-1000px)" }
]

const moveBackwardsOut = [
    { transform: "translateX(-1000px)" },
    { transform: "translateX(0px)" }
]

const moveBackwardsIn = [
    { transform: "translateX(0px)" },
    { transform: "translateX(1000px)" }
]

nextBtn.addEventListener("click", e =>{
    currentImg += 1
    if(currentImg > 5){
        currentImg = 2
    }
    const animation = mainImage.animate(moveOut, 300)
    animation.onfinish = ( e =>{
        mainImage.src = images[currentImg].src
        mainImage.animate(moveIn, 300)
    })
    
})

prevBtn.addEventListener("click", e =>{
    currentImg -= 1
    if(currentImg < 2){
        currentImg = 5
    }
    const animationBackwards = mainImage.animate(moveBackwardsIn, 300)
    animationBackwards.onfinish = ( e =>{
        mainImage.src = images[currentImg].src
        mainImage.animate(moveBackwardsOut, 300)
    })
})