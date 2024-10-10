<?php
$_API_KEY = 'b5f73c5a15d5e0a6795a19d47d3d100e';
$_NGROK_URL = 'https://f5d9-202-4-123-192.ngrok-free.app';

$shop = $_GET['shop'];

$scopes = 'read_products, write_products,read_orders, write_orders';
$redirect_uri=$_NGROK_URL.'shopify/elana/token.php';
$nonce = bin2hex(random_bytes(12));

$access_mode = 'per-user';
$oauth_url = 'https://'.$shop.'/admin/oauth/authorize?client_id='.$_API_KEY.'&scope='.$scopes.'&redirect_uri='.urlencode($redirect_uri).'&state='.$nonce.'&grant_options[]='.$access_mode.'';

header("Location: ".$oauth_url);
exit();
