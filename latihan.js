"use strict";

function hitung(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      // EDGE CASE: angka tidak boleh dibagi 0. Kita cek dulu sebelum bagi.
      if (b === 0) {
        return "Error: tidak bisa dibagi nol";
      }
      return a / b;
    default:
      return "Error: operator tidak dikenali";
  }
}

// -------------------------------------------------------------------
// SOAL 2 - cekPositifNegatif(angka)
// -------------------------------------------------------------------
// Return 'positif' kalau angka lebih besar dari 0
// Return 'negatif' kalau angka lebih kecil dari 0
// Return 'nol'     kalau angka sama dengan 0
function cekPositifNegatif(angka) {
  // TODO: gunakan if / else if / else (atau ternary bertingkat).
}

// -------------------------------------------------------------------
// SOAL 3 - cekGenapGanjil(angka)
// -------------------------------------------------------------------
// Return 'genap'  kalau angka habis dibagi 2.
// Return 'ganjil' kalau tidak habis dibagi 2.
// Petunjuk: pakai modulo (%). angka % 2 === 0 berarti genap.
function cekGenapGanjil(angka) {
  // TODO: pakai modulo (%) + ternary atau if/else.
}

// ===================================================================
// BAGIAN TEST - JANGAN DIUBAH
// ===================================================================
// Function kecil ini membandingkan hasil function kamu dengan jawaban
// yang seharusnya, lalu mencetak "LULUS" atau "GAGAL".
function test(label, hasil, harapan) {
  const lulus = hasil === harapan;
  console.log(`${lulus ? "LULUS" : "GAGAL"} | ${label}`);
  if (!lulus) {
    console.log(`      -> dapat    : ${hasil}`);
    console.log(`      -> harusnya : ${harapan}`);
  }
}

console.log("--- Test Soal 1: hitung() ---");
test("10 + 5", hitung(10, "+", 5), 15);
test("10 - 5", hitung(10, "-", 5), 5);
test("10 * 5", hitung(10, "*", 5), 50);
test("10 / 5", hitung(10, "/", 5), 2);
test("10 / 0", hitung(10, "/", 0), "Error: tidak bisa dibagi nol");
test("operator '?'", hitung(10, "?", 5), "Error: operator tidak dikenali");

console.log("\n--- Test Soal 2: cekPositifNegatif() ---");
test("angka 7", cekPositifNegatif(7), "positif");
test("angka -3", cekPositifNegatif(-3), "negatif");
test("angka 0", cekPositifNegatif(0), "nol");

console.log("\n--- Test Soal 3: cekGenapGanjil() ---");
test("angka 8", cekGenapGanjil(8), "genap");
test("angka 5", cekGenapGanjil(5), "ganjil");
test("angka 0", cekGenapGanjil(0), "genap");
