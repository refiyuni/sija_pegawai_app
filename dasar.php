<?php
// 1. Deklarasi Variabel dan Tipe Data
$nama_app = "Sistem Informasi Kepegawaian (SaaS)";
$tahun = 2026;

// 2. Custom Function (Perhitungan Gaji Bersih Dipotong Pajak 10%)
function hitungGajiBersih($gaji_pokok, $tunjangan) {
    $pajak = 0.1 * $gaji_pokok;
    $total = ($gaji_pokok + $tunjangan) - $pajak;
    return $total;
}

// 3. Array Asosiatif Multidimensi Data Pegawai
$pegawai_list = [
    [
        "nip" => "1990010101",
        "nama" => "Annisa Azzahra",
        "jabatan" => "Manager",
        "gaji" => 8000000,
        "tunjangan" => 1500000
    ],
    [
        "nip" => "1992020202",
        "nama" => "Rizky Pratama",
        "jabatan" => "Staff IT",
        "gaji" => 5000000,
        "tunjangan" => 500000
    ]
];
?>

<!DOCTYPE html>
<html>
<head>
    <title><?= $nama_app; ?></title>
</head>
<body>
    <h2>Daftar Pegawai & Perhitungan Gaji Bersih (<?= $tahun; ?>)</h2>
    
    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>NIP</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Gaji Pokok</th>
            <th>Gaji Bersih (Setelah Pajak)</th>
        </tr>
        
        <?php foreach ($pegawai_list as $p) : ?>
            <tr>
                <td><?= $p['nip']; ?></td>
                <td><?= $p['nama']; ?></td>
                <td><?= $p['jabatan']; ?></td>
                <td>Rp <?= number_format($p['gaji'], 0, ',', '.'); ?></td>
                <td>
                    <b>Rp <?= number_format(hitungGajiBersih($p['gaji'], $p['tunjangan']), 0, ',', '.'); ?></b>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>