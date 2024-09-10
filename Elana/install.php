<?php
$_API_KEY = 'b5f73c5a15d5e0a6795a19d47d3d100e';
$_NGROK_URL = 'https://d9c6-202-4-123-192.ngrok-free.app';

$shop = $_GET['shop'];

$scopes = 'read_products, write_products,read_orders, write_orders';
$redirect_uri=$_NGROK_URL.'shopify/elana/token.php';
$nonce = random_bytes(12);
