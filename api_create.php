<?php
header('Content-Type: application/json');
require_once 'koneksi.php';

$input = json_decode(file_get_contents('php://input'), true);

$nip        = $input['nip'] ?? '';
$nama       = $input['nama'] ?? $input['nama_pegawai'] ?? '';
$id_jabatan = $input['id_jabatan'] ?? null;
$tenant_id  = $input['tenant_id'] ?? '';

if (!empty($nip) && !empty($nama)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO pegawai (nip, nama, id_jabatan, email) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nip, $nama, $id_jabatan, $tenant_id]);
        
        // Return respon sukses murni
        echo json_encode([
            "success" => true,
            "message" => "Data berhasil disimpan!"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Gagal Simpan: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Data tidak lengkap!"
    ]);
}
?>