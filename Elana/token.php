<?php
$api_key='b5f73c5a15d5e0a6795a19d47d3d100e';
$secret_key='5f0db2d7fd5bc9ab5d689f62e9340bad';
$parameters = $_GET;
$shop_url = $parameters['shop'];
$hmac=$parameters['hmac'];
$parameters = array_diff_key($parameters, array('hmac'=>''));
ksort($parameters);

$new_hmac = hash_hmac('sha256', http_build_query($parameters), $secret_key);

if(hash_equals($hmac, $new_hmac)){
    $access_token_endpoint = 'https://'.$shop_url.'/admin/oauth/access_token';
    $var = array(
        "client_id"=>$api_key,
        "client_secret"=> $secret_key,
        "code"=>$parameters['code']
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $access_token_endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, count($var));
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($var));

    curl_close($ch);
}else{
    echo 'This is not coming from shopify and probably someone is hacking';
}

// https://33a9-202-4-123-192.ngrok-free.app/shopify/Elana/?hmac=5e9ba995d65390ada0f82bf3e0d40d506a8babff6b5efeb285c697c7956081c5&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvZWxhbmEtZGV2ZWxvcG1lbnQtc3Q&shop=elana-development-st.myshopify.com&timestamp=1727064936
