"use strict";

const prompt = require("prompt-sync")({ sigint: true });

function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

function kali(a, b) {
  return a * b;
}

function bagi(a, b) {
  if (b === 0) {
    return "Angka ga bisa dibagi dengan 0";
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    return "Angka ga bisa modulo dengan 0";
  }
  return a % b;
}

function pangkat(a, b) {
  return a ** b;
}

function hitung(a, operator, b) {
  switch (operator) {
    case "+":
      return tambah(a, b);
    case "-":
      return kurang(a, b);
    case "*":
      return kali(a, b);
    case "/":
      return bagi(a, b);
    case "%":
      return modulo(a, b);
    case "**":
      return pangkat(a, b);
    default:
      return "Error: operator tidak dikenali";
  }
}

function mintaAngka(pesan) {
  while (true) {
    const input = prompt(pesan);
    const angka = Number(input);

    if (input !== null && input.trim() !== "" && !isNaN(angka)) {
      return angka;
    }

    console.log("harus memasukan angka");
  }
}

function mintaOperator() {
  const operatorValid = ["+", "-", "*", "/", "%", "**"];

  while (true) {
    const input = prompt("Masukan operator (+ - * / % **)");

    if (operatorValid.includes(input)) {
      return input;
    }

    console.log("Operator tidak valid. Pilih salah satu yang tersedia");
  }
}

function analisisHasil(hasil) {
  // --- KEMUNGKINAN 1: hasil null atau undefined ---
  if (hasil === null || hasil === undefined) {
    console.log(
      "Status : " + (hasil ?? "Tidak ada hasil yang bisa dianalisis."),
    );
    return;
  }

  if (typeof hasil === "string") {
    console.log("Status : " + hasil);
    return;
  }

  if (typeof hasil === "number") {
    if (Number.isNaN(hasil)) {
      console.log("Status : hasil bukan angka yang valid (NaN).");
      return;
    }

    console.log("Hasil  : " + hasil);

    const tanda = hasil > 0 ? "positif" : hasil < 0 ? "negatif" : "nol";
    console.log("  - Tanda angka : " + tanda);

    const jenis = Number.isInteger(hasil)
      ? "bilangan bulat"
      : "bilangan desimal";
    console.log("  - Jenis angka : " + jenis);

    if (Number.isInteger(hasil)) {
      const genapGanjil = hasil % 2 === 0 ? "genap" : "ganjil";
      console.log("  - Genap/Ganjil: " + genapGanjil);
    }
  }
}

// =====================================================================
// BAGIAN 5 - PROGRAM UTAMA (menggabungkan semua bagian di atas)
// =====================================================================
function main() {
  console.log("==============================================");
  console.log("     KALKULATOR INTERAKTIF & ANALISA DATA      ");
  console.log("==============================================\n");

  // while (true) -> program berjalan terus sampai user memilih berhenti.
  while (true) {
    // LANGKAH 1: kumpulkan semua input yang dibutuhkan.
    const angka1 = mintaAngka("Masukkan angka pertama : ");
    const operator = mintaOperator();
    const angka2 = mintaAngka("Masukkan angka kedua   : ");

    // LANGKAH 2: proses (hitung). Ini "otak" yang sama dengan versi gampang.
    const hasil = hitung(angka1, operator, angka2);

    // LANGKAH 3: tampilkan & analisa hasilnya.
    console.log("\n------------- HASIL -------------");
    analisisHasil(hasil);
    console.log("---------------------------------\n");

    // LANGKAH 4: mekanisme exit -> tanya user mau lanjut atau tidak.
    // (prompt(...) || '') -> kalau hasilnya null, ganti jadi string kosong
    // supaya .toLowerCase() di bawah tidak error.
    const lanjut = prompt("Mau menghitung lagi? (yes/no): ") || "";

    // .toLowerCase() supaya 'NO', 'No', 'nO', 'no' semua dianggap sama.
    // Istilahnya: "case-insensitive" (tidak peduli huruf besar/kecil).
    if (lanjut.toLowerCase() === "no") {
      console.log("\nTerima kasih sudah memakai kalkulator. Sampai jumpa!");
      break; // break -> KELUAR dari while loop -> program berhenti.
    }

    console.log(""); // baris kosong biar tampilan rapi sebelum hitungan baru.
  }
}

// Baris terakhir: jalankan programnya.
main();
