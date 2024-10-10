<?php
$server = 'localhost';
$username = 'root';
$password = '';
$database= 'elana';

$mysql = mysqli_connect($server, $username, $password, $database);
if(!$mysql){
    die("Error". mysqli_connect_error());
}

