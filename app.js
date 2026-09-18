document.addEventListener("DOMContentLoaded", () => {
    loadPegawai();
});

// Fungsi Read (Membaca Data Pegawai)
function loadPegawai() {
    fetch('api_read.php')
        .then(res => res.json())
        .then(data => {
            let tbody = document.getElementById('tabelPegawai');
            if (!tbody) return;
            tbody.innerHTML = '';

            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Belum ada data pegawai.</td></tr>';
                return;
            }

            data.forEach((item, index) => {
                let nipVal = item.nip || '';
                let namaVal = item.nama || item.nama_pegawai || '';
                let jabatanVal = item.id_jabatan || '';
                let tenantVal = item.email || item.tenant_id || '';

                let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${nipVal}</td>
                    <td>${namaVal}</td>
                    <td>${jabatanVal}</td>
                    <td>${tenantVal}</td>
                    <td>
                        <button class="btn-hapus" onclick="hapusPegawai('${nipVal}')">Hapus</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error('Gagal memuat data:', err));
}

// Fungsi Create (Tambah Data)
document.getElementById('formPegawai')?.addEventListener('submit', function(e) {
    e.preventDefault();

    let nipInput = document.getElementById('nip').value;
    let namaInput = document.getElementById('nama_pegawai').value;
    let jabatanInput = document.getElementById('id_jabatan').value;
    let tenantInput = document.getElementById('tenant_id').value;
    let pesanBox = document.getElementById('pesanRespon');

    fetch('api_create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nip: nipInput,
            nama: namaInput,
            id_jabatan: jabatanInput,
            tenant_id: tenantInput
        })
    })
    .then(res => res.json())
    .then(res => {
        if (pesanBox) {
            pesanBox.className = (res.success || res.status === 'success') ? 'pesan-sukses' : 'pesan-error';
            pesanBox.innerText = res.message || 'Respon diterima';
        }

        if (res.success || res.status === 'success') {
            document.getElementById('formPegawai').reset();
            loadPegawai();
        }
    })
    .catch(err => {
        if (pesanBox) {
            pesanBox.className = 'pesan-error';
            pesanBox.innerText = 'Gagal mengirim data ke server.';
        }
    });
});

// Fungsi Delete (Hapus Data)
function hapusPegawai(nip) {
    if (!nip) return;
    if (confirm(`Yakin ingin menghapus pegawai dengan NIP ${nip}?`)) {
        fetch('delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nip: nip })
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            loadPegawai();
        })
        .catch(err => console.error('Gagal menghapus:', err));
    }
}