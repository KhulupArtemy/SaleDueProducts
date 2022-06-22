<?php
  $name = filter_var(trim($_POST['name']), 
  FILTER_SANITIZE_STRING);
  $phone = filter_var(trim($_POST['phone']), 
  FILTER_SANITIZE_STRING);
  $address = filter_var(trim($_POST['address']), 
  FILTER_SANITIZE_STRING);
  $order_ = filter_var(trim($_POST['order_']), 
  FILTER_SANITIZE_STRING);

  
  if (mb_strlen($name) < 3 || mb_strlen($name) > 20){
    echo "Недопустимое имя. ";
    ?>
    <a href="index.php">Вернуться назад</a> 
    <?php 
    exit();
  }
  else if (mb_strlen($phone) < 9 || mb_strlen($phone) > 20){
    echo "Некорректный номер телефона.";
    ?>
    <a href="index.php">Вернуться назад</a> 
    <?php 
    exit();
  }
  else if (mb_strlen($address) < 2 || mb_strlen($address) > 20){
    echo "Некорректный адрес.";
    ?>
    <a href="index.php">Вернуться назад</a> 
    <?php 
    exit();
  }
  else if (mb_strlen($order_) <= 20){
    echo "В корзине отсутствуют товары.";
    ?>
    <a href="index.php">Вернуться назад</a> 
    <?php 
    exit();
  }
  else if (mb_strlen($order_) >= 1000){
    echo "Слишком много товаров";
    ?>
    <a href="index.php">Вернуться назад</a> 
    <?php 
    exit();
  }
  
  $mysql = new mysqli('localhost', 'root', 'root', 'expired_products_db');

  $mysql->query("INSERT INTO `orders` (`name`, `phone`, `address`, `order_`) VALUES('$name', '$phone', '$address', '$order_')");

  echo "Заказ успешно оформлен, спасибо за покупку!";
  ?>
  <a href="index.php">Вернуться в каталог</a> 
  <?php 
  exit();
  $mysql->close();
?>