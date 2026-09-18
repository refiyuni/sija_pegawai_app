document.addEventListener("DOMContentLoaded", () => {
    loadPegawai();
});

// Fungsi untuk membaca data pegawai
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
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error('Gagal memuat data:', err));
}

// Fungsi untuk menambah data pegawai
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let nip = document.querySelector('input[name="nip"]')?.value || document.querySelectorAll('input')[0].value;
    let nama = document.querySelector('input[name="nama"]')?.value || document.querySelectorAll('input')[1].value;
    let id_jabatan = document.querySelector('input[name="id_jabatan"]')?.value || document.querySelectorAll('input')[2].value;
    let tenant_id = document.querySelector('input[name="tenant_id"]')?.value || document.querySelectorAll('input')[3].value;

    fetch('api_create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nip: nip,
            nama: nama,
            id_jabatan: id_jabatan,
            tenant_id: tenant_id
        })
    })
    .then(res => res.json())
    .then(res => {
        let statusDiv = document.getElementById('status') || document.querySelector('.error') || document.createElement('div');
        statusDiv.style.color = res.success ? 'green' : 'red';
        statusDiv.innerText = res.message;

        if (res.success || res.status === 'success') {
            loadPegawai(); // Auto refresh tabel setelah simpan
        }
    })
    .catch(err => console.error('Error:', err));
});