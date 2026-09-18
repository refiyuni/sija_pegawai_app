document.addEventListener("DOMContentLoaded", () => {
    // 1. Jalankan fungsi muat data saat halaman selesai di-load
    muatDataPegawai();

    // 2. Pasang event listener untuk cegat submit form HTML
    const form = document.getElementById("formPegawai");
    form.addEventListener("submit", tambahDataPegawai);
});

// FUNGSI 1: MEMBACA DATA DARI API (GET METHOD)
function muatDataPegawai() {
    fetch("api_read.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP Status Error: " + response.status);
            }
            return response.json();
        })
        .then(result => {
            if (result.status === "success") {
                renderTabel(result.data);
            }
        })
        .catch(error => console.error("Error Fetch Read:", error));
}

// FUNGSI UNTUK MERENDER ISI TABEL HTML (DOM MANIPULATION)
function renderTabel(dataPegawai) {
    const tbody = document.getElementById("tabelPegawai");
    tbody.innerHTML = ""; // Bersihkan tabel lama

    let no = 1;
    dataPegawai.forEach(pegawai => {
        const row = `
            <tr>
                <td>${no++}</td>
                <td>${pegawai.nip}</td>
                <td>${pegawai.nama_pegawai}</td>
                <td>${pegawai.id_jabatan}</td>
                <td>${pegawai.tenant_id}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// FUNGSI 2: MENGIRIM DATA KE API (POST METHOD JSON)
function tambahDataPegawai(event) {
    event.preventDefault(); // Mencegah reload/refresh halaman browser

    const elPesan = document.getElementById("pesanRespon");
    elPesan.innerText = "";

    // Menyusun objek payload masukan dari form
    const payload = {
        nip: document.getElementById("nip").value,
        nama_pegawai: document.getElementById("nama_pegawai").value,
        id_jabatan: parseInt(document.getElementById("id_jabatan").value),
        tenant_id: document.getElementById("tenant_id").value
    };

    // Mengirim payload JSON ke endpoint api_create.php
    fetch("api_create.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(async response => {
        const result = await response.json();
        return { status_code: response.status, body: result };
    })
    .then(res => {
        if (res.status_code === 201) {
            // Berhasil dibuat (HTTP 201 Created)
            elPesan.className = "pesan-sukses";
            elPesan.innerText = res.body.message;
            document.getElementById("formPegawai").reset(); // Clear isi form
            muatDataPegawai(); // Auto-refresh isi tabel tanpa reload halaman
        } else {
            // Gagal / Bad Request (HTTP 400 atau 500)
            elPesan.className = "pesan-error";
            elPesan.innerText = "Error (" + res.status_code + "): " + res.body.message;
        }
    })
    .catch(error => console.error("Error Fetch POST:", error));
}