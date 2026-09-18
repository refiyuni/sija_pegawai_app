<?php
include "koneksi.php";

$query  = "SELECT * FROM pegawai";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Pegawai SIJA</title>
</head>
<body>
    <h2>Daftar Data Pegawai (SaaS Multi-Tenant)</h2>
    <a href="tambah.php">+ Tambah Data Pegawai Baru</a><br><br>

    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Nama Pegawai</th>
            <th>ID Jabatan</th>
            <th>Tenant ID</th>
            <th>Aksi</th>
        </tr>
        <?php
        $no = 1;
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $no++ . "</td>";
            echo "<td>" . $row['nip'] . "</td>";
            echo "<td>" . $row['nama_pegawai'] . "</td>";
            echo "<td>" . $row['id_jabatan'] . "</td>";
            echo "<td>" . $row['tenant_id'] . "</td>";
            echo "<td>
                    <a href='edit.php?nip=" . $row['nip'] . "'>Edit</a> |
                    <a href='delete.php?nip=" . $row['nip'] . "' onclick='return confirm(\"Yakin menghapus data pegawai ini?\")'>Delete</a>
                </td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>