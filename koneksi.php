<?php
$host     = getenv('DB_HOST');
$port     = getenv('DB_PORT');
$user     = getenv('DB_USER');
$pass     = getenv('DB_PASS');
$dbname   = getenv('DB_NAME');

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Koneksi Gagal: " . $e->getMessage()]));
}
?>