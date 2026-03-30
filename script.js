// ================= STEP 1 =================
function step1() {
  let nama = document.getElementById("nama").value.trim();
  let alamat = document.getElementById("alamat").value.trim();
  let email = document.getElementById("email").value.trim();
  let jmlBahasa = document.getElementById("jmlBahasa").value;
  let jmlHobi = document.getElementById("jmlHobi").value;
  let msg = document.getElementById("msg1");

  // VALIDASI
  if (!nama || !alamat || !email || jmlBahasa < 1 || jmlHobi < 1) {
    msg.innerHTML = `<div class="alert alert-danger">Semua field harus diisi dengan benar.</div>`;
    return;
  }

  msg.innerHTML = "";

  // SIMPAN DATA
  window.dataUser = { nama, alamat, email, jmlBahasa, jmlHobi };

  // BUAT INPUT BAHASA + HOBI
  let step2 = document.getElementById("step2");
  step2.classList.remove("d-none");

  let html = `<h5 class="mt-4">Input Bahasa & Hobi</h5><div class="row">`;

  // INPUT BAHASA
  for (let i = 1; i <= jmlBahasa; i++) {
    html += `
      <div class="col-md-6 mb-2">
        <input type="text" class="form-control" id="bahasa${i}" placeholder="Bahasa ${i}">
      </div>
    `;
  }

  // INPUT HOBI
  for (let i = 1; i <= jmlHobi; i++) {
    html += `
      <div class="col-md-6 mb-2">
        <input type="text" class="form-control" id="hobi${i}" placeholder="Hobi ${i}">
      </div>
    `;
  }

  html += `</div>
    <button class="btn btn-primary mt-3" onclick="step2()">Lanjut</button>
  `;

  step2.innerHTML = html;
}

// ================= STEP 2 =================
function step2() {
  let { jmlBahasa, jmlHobi } = window.dataUser;

  let bahasa = [];
  let hobi = [];

  // AMBIL DATA
  for (let i = 1; i <= jmlBahasa; i++) {
    let val = document.getElementById(`bahasa${i}`).value;
    if (!val) return alert("Isi semua bahasa!");
    bahasa.push(val);
  }

  for (let i = 1; i <= jmlHobi; i++) {
    let val = document.getElementById(`hobi${i}`).value;
    if (!val) return alert("Isi semua hobi!");
    hobi.push(val);
  }

  window.dataUser.bahasa = bahasa;
  window.dataUser.hobi = hobi;

  // TAMPILKAN PILIHAN
  let step3 = document.getElementById("step3");
  step3.classList.remove("d-none");

  let html = `<h5 class="mt-4">Pilih Bahasa & Hobi</h5>`;

  // RADIO BAHASA
  html += `<p><b>Pilihan Bahasa:</b></p>`;
  bahasa.forEach((b, i) => {
    html += `
      <div>
        <input type="radio" name="pilihBahasa" value="${b}">
        ${b}
      </div>
    `;
  });

  // CHECKBOX HOBI
  html += `<p class="mt-3"><b>Pilihan Hobi:</b></p>`;
  hobi.forEach((h, i) => {
    html += `
      <div>
        <input type="checkbox" value="${h}" class="pilihHobi">
        ${h}
      </div>
    `;
  });

  html += `<button class="btn btn-success mt-3" onclick="hasil()">Tampilkan</button>`;

  step3.innerHTML = html;
}

// ================= HASIL =================
function hasil() {
  let data = window.dataUser;

  let pilihBahasa = document.querySelector('input[name="pilihBahasa"]:checked');
  if (!pilihBahasa) {
    alert("Pilih salah satu bahasa!");
    return;
  }

  let pilihHobi = document.querySelectorAll(".pilihHobi:checked");
  let listHobi = [];

  pilihHobi.forEach((h) => listHobi.push(h.value));

  let hasilText = `
    Halo, nama saya <b>${data.nama}</b>, alamat ${data.alamat}, email ${data.email}.<br>
    Saya mempunyai ${data.jmlBahasa} bahasa yaitu ${data.bahasa.join(", ")}.<br>
    Saya memilih bahasa <b>${pilihBahasa.value}</b>.<br><br>

    Saya juga mempunyai ${data.jmlHobi} hobi yaitu ${data.hobi.join(", ")}.<br>
    Saya memilih hobi <b>${listHobi.join(", ")}</b>.
  `;

  let resultBox = document.getElementById("resultBox");
  resultBox.classList.remove("d-none");
  resultBox.innerHTML = `<div class="alert alert-success mt-3">${hasilText}</div>`;
}

// ================= RESET =================
function resetTask() {
  location.reload();
}
