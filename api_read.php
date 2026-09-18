<?php
header('Content-Type: application/json');
require_once 'koneksi.php';

try {
    // Ambil data pegawai dari PostgreSQL Aiven
    $stmt = $pdo->query("SELECT * FROM pegawai ORDER BY id DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Mengembalikan data JSON
    echo json_encode($data);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>