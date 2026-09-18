<?php
include "koneksi.php";

$nip_lama = $_GET['nip'];
$result   = mysqli_query($conn, "SELECT * FROM pegawai WHERE nip='$nip_lama'");
$row      = mysqli_fetch_assoc($result);

if (isset($_POST['update'])) {
    $nama_pegawai = $_POST['nama_pegawai'];
    $id_jabatan   = $_POST['id_jabatan'];
    $tenant_id    = $_POST['tenant_id'];

    $update_query = "UPDATE pegawai SET 
                        nama_pegawai='$nama_pegawai', 
                        id_jabatan='$id_jabatan', 
                        tenant_id='$tenant_id' 
                     WHERE nip='$nip_lama'";

    if (mysqli_query($conn, $update_query)) {
        header("Location: index.php");
    } else {
        echo "Gagal memperbarui data: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Pegawai</title>
</head>
<body>
    <h2>Form Edit Data Pegawai</h2>
    <form method="POST">
        NIP (Primary Key - Tidak diubah): <br>
        <input type="text" name="nip" value="<?= $row['nip']; ?>" disabled><br><br>

        Nama Pegawai: <br>
        <input type="text" name="nama_pegawai" value="<?= $row['nama_pegawai']; ?>" required><br><br>

        ID Jabatan: <br>
        <input type="number" name="id_jabatan" value="<?= $row['id_jabatan']; ?>" required><br><br>

        Tenant ID: <br>
        <input type="text" name="tenant_id" value="<?= $row['tenant_id']; ?>" required><br><br>

        <input type="submit" name="update" value="Simpan Perubahan">
        <a href="index.php">Batal</a>
    </form>
</body>
</html>