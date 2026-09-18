<?php
include "koneksi.php";

if (isset($_POST['submit'])) {
    $nip          = $_POST['nip'];
    $nama_pegawai = $_POST['nama_pegawai'];
    $id_jabatan   = $_POST['id_jabatan'];
    $tenant_id    = $_POST['tenant_id'];

    $query = "INSERT INTO pegawai (nip, tenant_id, nama_pegawai, id_jabatan)
            VALUES ('$nip', '$tenant_id', '$nama_pegawai', '$id_jabatan')";

    if (mysqli_query($conn, $query)) {
        header("Location: index.php");
    } else {
        echo "Gagal menambahkan data pegawai: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Tambah Pegawai</title>
</head>
<body>
    <h2>Form Tambah Data Pegawai</h2>
    <form method="POST">
        NIP: <br>
        <input type="text" name="nip" required><br><br>

        Nama Pegawai: <br>
        <input type="text" name="nama_pegawai" required><br><br>

        ID Jabatan: <br>
        <input type="number" name="id_jabatan" required><br><br>

        Tenant ID: <br>
        <input type="text" name="tenant_id" required><br><br>

        <input type="submit" name="submit" value="Simpan Data">
        <a href="index.php">Batal</a>
    </form>
</body>
</html>