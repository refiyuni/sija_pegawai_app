<?php
header('Content-Type: application/json');
require_once 'koneksi.php';

$input = json_decode(file_get_contents('php://input'), true);

$nip        = $input['nip'] ?? '';
$nama       = $input['nama'] ?? $input['nama_pegawai'] ?? '';
$id_jabatan = $input['id_jabatan'] ?? null;
$tenant_id  = $input['tenant_id'] ?? $input['email'] ?? '';

if (!empty($nip) && !empty($nama)) {
    try {
        $stmt = $pdo->prepare("UPDATE pegawai SET nama = ?, id_jabatan = ?, email = ? WHERE nip = ?");
        $stmt->execute([$nama, $id_jabatan, $tenant_id, $nip]);

        echo json_encode([
            "success" => true,
            "status" => "success",
            "message" => "Data pegawai berhasil diperbarui!"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "status" => "error",
            "message" => "Gagal mengubah data: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "status" => "error",
        "message" => "NIP atau Data tidak lengkap!"
    ]);
}
?>