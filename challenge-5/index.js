const promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Todo {
  constructor(id, task) {
    this.id = id; // nomor unik, untuk membedakan tiap task
    this.task = task; // isi/teks task-nya
    this.completed = false; // task baru pasti BELUM selesai
  }

  /**
   * toggle — membalik status selesai/belum.
   * Method = "kemampuan" yang dimiliki objek Todo.
   */
  toggle() {
    this.completed = !this.completed;
  }

  /**
   * getLabel — mengubah objek Todo jadi teks rapi untuk ditampilkan.
   * Contoh hasil:  "[x] #2 - Belajar async"
   */
  getLabel() {
    const status = this.completed ? "[x]" : "[ ]";
    return `${status} #${this.id} - ${this.task}`;
  }
}

class TodoList {
  constructor() {
    this.todos = []; // array penampung semua objek Todo
    this.nextId = 1; // penghitung id; tiap dipakai langsung naik +1
  }

  /**
   * generateUniqueId — memberi id unik untuk task baru.
   * "this.nextId++" artinya: pakai nilai sekarang, lalu naikkan +1
   * untuk pemanggilan berikutnya. Jadi id tidak pernah kembar.
   */
  generateUniqueId() {
    return this.nextId++;
  }

  /**
   * loadInitialData — memuat beberapa task contoh saat aplikasi dibuka.
   *
   * Ini bagian ASYNC: kita pura-pura sedang mengambil data dari server.
   * "await delay(1000)" = program BERHENTI 1 detik di baris ini,
   * baru lanjut. Inilah inti async/await: menunggu tanpa membuat
   * seluruh program freeze.
   */
  async loadInitialData() {
    console.log("Memuat data awal dari 'server'...");
    await delay(1000); // tunggu 1 detik (simulasi proses jaringan)

    const dataContoh = ["Belajar class di JavaScript", "Latihan async/await"];
    dataContoh.forEach((teks) => {
      this.todos.push(new Todo(this.generateUniqueId(), teks));
    });

    console.log("Data awal berhasil dimuat!\n");
  }

  /**
   * addTodo — menambah task baru.
   * Kalau input kosong, kita LEMPAR error (throw) supaya ditangkap
   * oleh try/catch di menu. Program tidak boleh crash diam-diam.
   */
  addTodo(task) {
    if (!task || task.trim() === "") {
      throw new Error("Task tidak boleh kosong.");
    }
    const todoBaru = new Todo(this.generateUniqueId(), task.trim());
    this.todos.push(todoBaru);
    console.log(`Task ditambahkan: "${todoBaru.task}"`);
  }

  /**
   * findTodoById — mencari satu Todo berdasarkan id.
   * .find() mengembalikan elemen pertama yang cocok, atau undefined
   * kalau tidak ketemu.
   */
  findTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  /**
   * markTodoCompleted — menandai task selesai / belum (toggle).
   * Kalau id tidak ditemukan => lempar error.
   */
  markTodoCompleted(id) {
    const todo = this.findTodoById(id);
    if (!todo) {
      throw new Error(`Todo dengan id #${id} tidak ditemukan.`);
    }
    todo.toggle();
    const statusText = todo.completed ? "Selesai" : "Belum selesai";
    console.log(`Status todo #${id} diubah menjadi: ${statusText}`);
  }

  /**
   * deleteTodo — menghapus task berdasarkan id.
   * .findIndex() memberi POSISI (index) elemen; -1 berarti tidak ada.
   * .splice(index, 1) membuang 1 elemen pada posisi tersebut.
   */
  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error(`Todo dengan id #${id} tidak ditemukan.`);
    }
    const [todoTerhapus] = this.todos.splice(index, 1);
    console.log(` Task dihapus: "${todoTerhapus.task}"`);
  }

  /**
   * listTodos — menampilkan semua task.
   * Wajib menangani kondisi LIST KOSONG dengan pesan yang jelas.
   */
  listTodos() {
    console.log("\n=== DAFTAR TO-DO ===");
    if (this.todos.length === 0) {
      console.log("(kosong) Belum ada task. Tambah dulu ya");
    } else {
      this.todos.forEach((todo) => console.log(todo.getLabel()));
    }
    console.log("====================\n");
  }
}

/**
 * runTodoApp — "otak" aplikasi.
 * Ditandai `async` karena di dalamnya ada `await` (menunggu loadInitialData).
 */
async function runTodoApp() {
  console.log("==============================");
  console.log("     TO-DO LIST CLI APP");
  console.log("==============================\n");

  // LANGKAH 1 — siapkan manajer task.
  const todoList = new TodoList();

  // LANGKAH 2 — tunggu data awal selesai dimuat (async).
  await todoList.loadInitialData();

  // LANGKAH 3 — loop menu: ulang terus selama `running` masih true.
  let running = true;
  while (running) {
    console.log("Menu:");
    console.log("  1. Lihat semua task");
    console.log("  2. Tambah task");
    console.log("  3. Tandai task selesai / belum");
    console.log("  4. Hapus task");
    console.log("  5. Keluar");

    const pilihan = prompt("Pilih menu (1-5): ");

    // try/catch: kalau ada aksi yang error (input salah, id tidak ada),
    // error ditangkap di sini dan program TETAP jalan, tidak crash.

    try {
      switch (pilihan) {
        case "1":
          todoList.listTodos();
          break;

        case "2": {
          const task = prompt("Masukkan task baru: ");
          todoList.addTodo(task);
          break;
        }

        case "3": {
          todoList.listTodos();
          const id = Number(prompt("Masukkan id task: "));
          if (Number.isNaN(id)) throw new Error("Id harus berupa angka.");
          todoList.markTodoCompleted(id);
          break;
        }

        case "4": {
          todoList.listTodos();
          const id = Number(prompt("Masukkan id task yang dihapus: "));
          if (Number.isNaN(id)) throw new Error("Id harus berupa angka.");
          todoList.deleteTodo(id);
          break;
        }

        case "5":
          running = false; // syarat while jadi false => loop berhenti
          console.log("\n Terima kasih sudah memakai aplikasi ini!");
          break;

        default:
          console.log(" Pilihan tidak valid. Masukkan angka 1-5.");
      }
    } catch (error) {
      // Semua error dari blok try mendarat di sini.
      console.log(` Error: ${error.message}`);
    }

    console.log(""); // baris kosong biar tampilan lega
  }
}

runTodoApp();
