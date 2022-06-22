var cart={};
//alert('Скрипт работает');

$.getJSON('json/products.json', function(data){
    var goods = data;
    checkCart();
    printOrder();

    function printOrder(){
        var out='';
        summ = 0;
        out += '<input type="text" style="width: 14vw; margin-left: 19%;" name="order_" id="order_" value="';
        for (var key in cart){
            summ = summ + Number((cart[key]*goods[key].cost).toFixed(2));
            out += 'Товар - '+goods[key].name+', количество - '+cart[key]+', цена - '+(cart[key]*goods[key].cost).toFixed(2)+' руб. ';
        }
        out += 'Сумма заказа: '+Number(summ.toFixed(2))+' руб.';
        out += '" readonly>';
        out += '<button class="clear-cart" data-art="'+key+'">Удалить последний товар</button>';
        $('#goods').html(out);
        $('.clear-cart').on('click', clearCart);
    }

    function clearCart(){
        alert('Корзина очищена');
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();
        printOrder();
    }
});

function checkCart(){
    if (localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
