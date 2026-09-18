<?php
header('Content-Type: application/json');
require_once 'koneksi.php';

// Ambil input JSON dari Fetch API atau URL parameter
$input = json_decode(file_get_contents('php://input'), true);
$nip = $input['nip'] ?? $_GET['nip'] ?? '';

if (!empty($nip)) {
    try {
        $stmt = $pdo->prepare("DELETE FROM pegawai WHERE nip = ?");
        $stmt->execute([$nip]);

        echo json_encode([
            "success" => true,
            "status" => "success",
            "message" => "Data pegawai dengan NIP $nip berhasil dihapus!"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "status" => "error",
            "message" => "Gagal menghapus data: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "status" => "error",
        "message" => "NIP tidak ditemukan!"
    ]);
}
?>