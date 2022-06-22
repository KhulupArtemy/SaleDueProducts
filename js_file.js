var cart = {};

$('document').ready(function(){
    loadProducts();
    checkCart();
});

function loadProducts(){ 
    $.getJSON('json/products.json', function (data){
        var out = '';
        for (var key in data){
            out+='<div class="single-goods"><button class="add-to-cart" data-art="'+key+'" onClick="window.location.reload();">';
            out+='<h4>'+data[key]['name']+'</h4>';
            out+='<h4>Дата просрочки: '+data[key]['due_date']+'</h4>';
            out+='<img src="'+data[key].image+'">';
            out+='<p>Цена: '+data[key]['cost']+' руб.</p>';
            out+='</button></div>';
        }
        $('#products').html(out);
        $('button.add-to-cart').on('click', addToCart);
    })
}

function addToCart(){
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined){
        cart[articul]++;
    }
    else{
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    alert('Товар добавлен в корзину');
    //showMiniCart();
}

function checkCart(){ //проверка налачие корзины в localstorage
    if (localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart(){ //показ содержимого корзины
    var out = '';
    for (var w in cart){
        out += w + ' x ' +cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}

let radius = 240; 
let autoRotate = true;
let rotateSpeed = -10; 
let imgWidth = 140; 
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth/26 + "vw";
ospin.style.height = imgHeight/26 + "vw";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 / 26 + "vw";
ground.style.height = radius * 3 / 26 + "vw";
function init(delayTime) {
    for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
        "rotateY(" +
        i * (360 / aImg.length) +
        "deg) translateZ(" +
        radius / 26 +
        "vw)";
        aImg[i].style.transition = "transform 1s";
        aImg[i].style.transitionDelay =
        delayTime || (aImg.length - i) / 4 + "s";
    }
}
function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
sY,
nX,
nY,
desX = 0,
desY = 0,
tX = 0,
tY = 10;
if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
    sY = e.clientY;
    this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};

$(function() {
    $('.slider').each(function() {    
        let $th = $(this);
        $th.attr('data-pos', 1);
        let slide = $th.find('.slider-slide');
        let num = $th.find('.slider-slide').length;
        let dots = $th.find('.slider-dots');
        dots.prepend('<span class="slider-indicator"></span>');
        for( let i = 1; i <= num; i++ ){ 
            dots.append('<span style="width:' + 100 / num + '%" class="slider-dot" data-pos="'+ i +'"></span>');    
        }
        $th.find('.slider-slides').css('width', 100 * num + '%');
        slide.css('width', 100 / num + '%');
        $th.find('.slider-dot').on('click', function(){
            let currentPos = $th.attr('data-pos');
            let newPos = $(this).attr('data-pos');
            let newDirection = (newPos > currentPos ? 'right' : 'left');
            let currentDirection = (newPos < currentPos ? 'right' : 'left');
            $th.find('.slider-indicator').removeClass('slider-indicator-' + currentDirection);
            $th.find('.slider-indicator').addClass('slider-indicator-' + newDirection);        
            $th.attr('data-pos', newPos);    
            $th.find('.slider-slides').css('transform', 'translateX(-' + 100 / num * (newPos - 1) + '%)');            
            $th.find('.slider-indicator').css({'left': 100 / num * (newPos - 1) + '%','right':100 - (100 / num) - 100 / num * (newPos - 1) + '%'});
        });        
        $th.find('.slider-indicator').css({'left': 0,'right': 100 - (100 / num) + '%'});
    });
});