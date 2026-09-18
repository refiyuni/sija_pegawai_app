<?php
header('Content-Type: application/json');
require_once 'koneksi.php';

try {
    $stmt = $pdo->query("SELECT * FROM pegawai ORDER BY id DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>