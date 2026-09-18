<?php
include "koneksi.php";

if (isset($_GET['nip'])) {
    $nip = $_GET['nip'];

    $query_delete = "DELETE FROM pegawai WHERE nip='$nip'";

    if (mysqli_query($conn, $query_delete)) {
        header("Location: index.php");
    } else {
        echo "Gagal menghapus data: " . mysqli_error($conn);
    }
}
?>