document.addEventListener("DOMContentLoaded", () => {
    loadPegawai();
});

// Load Data
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
                        <button class="btn-edit" onclick="setEditForm('${nipVal}', '${namaVal}', '${jabatanVal}', '${tenantVal}')">Edit</button>
                        <button class="btn-hapus" onclick="hapusPegawai('${nipVal}')">Hapus</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error('Gagal memuat data:', err));
}

// Persiapan Form Edit
function setEditForm(nip, nama, id_jabatan, tenant_id) {
    document.getElementById('nip').value = nip;
    document.getElementById('nip').readOnly = true; // NIP tidak boleh diubah saat edit
    document.getElementById('nama_pegawai').value = nama;
    document.getElementById('id_jabatan').value = id_jabatan;
    document.getElementById('tenant_id').value = tenant_id;

    document.getElementById('is_edit').value = "1";
    document.getElementById('formTitle').innerText = "Form Edit Pegawai";
    document.getElementById('btnSubmit').innerText = "Simpan Perubahan";
    document.getElementById('btnBatal').style.display = "inline-block";
}

// Reset Form ke Mode Tambah
function resetForm() {
    document.getElementById('formPegawai').reset();
    document.getElementById('nip').readOnly = false;
    document.getElementById('is_edit').value = "0";
    document.getElementById('formTitle').innerText = "Form Tambah Pegawai Via API";
    document.getElementById('btnSubmit').innerText = "Kirim Data via Fetch API";
    document.getElementById('btnBatal').style.display = "none";
}

// Submit Form (Tambah / Edit)
document.getElementById('formPegawai')?.addEventListener('submit', function(e) {
    e.preventDefault();

    let isEdit = document.getElementById('is_edit').value === "1";
    let targetApi = isEdit ? 'edit.php' : 'api_create.php';

    let payload = {
        nip: document.getElementById('nip').value,
        nama: document.getElementById('nama_pegawai').value,
        id_jabatan: document.getElementById('id_jabatan').value,
        tenant_id: document.getElementById('tenant_id').value
    };

    let pesanBox = document.getElementById('pesanRespon');

    fetch(targetApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        if (pesanBox) {
            pesanBox.className = (res.success || res.status === 'success') ? 'pesan-sukses' : 'pesan-error';
            pesanBox.innerText = res.message || 'Respon diterima';
        }

        if (res.success || res.status === 'success') {
            resetForm();
            loadPegawai();
        }
    })
    .catch(err => {
        if (pesanBox) {
            pesanBox.className = 'pesan-error';
            pesanBox.innerText = 'Gagal memproses data.';
        }
    });
});

// Hapus Data
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