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
        // Menggunakan kolom 'nama' sesuai tabel PostgreSQL Aiven
        $stmt = $pdo->prepare("INSERT INTO pegawai (nip, nama, id_jabatan, email) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nip, $nama, $id_jabatan, $tenant_id]);
        
        echo json_encode(["status" => "success", "message" => "Data berhasil disimpan!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Gagal Simpan: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap!"]);
}
?>