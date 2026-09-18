=document.addEventListener("DOMContentLoaded", () => {
    loadPegawai();
});

function loadPegawai() {
    fetch('api_read.php')
        .then(res => res.json())
        .then(data => {
            let tbody = document.querySelector('tbody');
            if (!tbody) return;
            tbody.innerHTML = '';

            data.forEach((item, index) => {
                let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.nip || ''}</td>
                    <td>${item.nama || item.nama_pegawai || ''}</td>
                    <td>${item.id_jabatan || ''}</td>
                    <td>${item.email || item.tenant_id || ''}</td>
                    <td>
                        <button onclick="hapusPegawai('${item.nip}')" style="color:red; cursor:pointer;">Hapus</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error('Gagal memuat data:', err));
}

function hapusPegawai(nip) {
    if (confirm(`Yakin ingin menghapus pegawai dengan NIP ${nip}?`)) {
        fetch('delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nip: nip })
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            loadPegawai(); // Refresh tabel otomatis
        })
        .catch(err => console.error('Error:', err));
    }
}