const { createApp } = Vue

// End Point REST API CodeIgniter 4 kamu
const apiUrl = 'http://localhost/lab11_php_ci/ci4/public'

createApp({
    data() {
        return {
            artikel: [],
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 0
            },
            showForm: false,
            formTitle: 'Tambah Data',
            statusOptions: [
                { text: 'Draft', value: 0 },
                { text: 'Publish', value: 1 }
            ]
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // 1. Ambil data dari REST API
        loadData() {
            axios.get(apiUrl + '/post')
                .then(response => {
                    // API CI4 Resource mengembalikan array data langsung
                    this.artikel = response.data
                })
                .catch(error => {
                    console.log("Error fetch data:", error)
                })
        },
        // 2. Memicu Modal Tambah Baru
        tambah() {
            this.showForm = true
            this.formTitle = 'Tambah Data'
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 1 // Default publish
            }
        },
        // 3. Memicu Modal Edit Data
        edit(data) {
            this.showForm = true
            this.formTitle = 'Ubah Data'
            this.formData = {
                id: data.id,
                judul: data.judul,
                isi: data.isi,
                status: data.status
            }
        },
        // 4. Menyimpan / Update data ke Server
        saveData() {
            if (this.formData.id) {
                // Proses UPDATE (PUT)
                axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                    .then(response => {
                        this.loadData()
                        this.showForm = false
                    })
                    .catch(error => console.log(error))
            } else {
                // Proses INSERT (POST)
                axios.post(apiUrl + '/post', this.formData)
                    .then(response => {
                        this.loadData()
                        this.showForm = false
                    })
                    .catch(error => console.log(error))
            }
        },
        // 5. Hapus Data dari Server
        hapus(index, id) {
            if (confirm('Yakin menghapus data?')) {
                axios.delete(apiUrl + '/post/' + id)
                    .then(response => {
                        // Hapus baris di array Vue local secara real-time
                        this.artikel.splice(index, 1)
                    })
                    .catch(error => console.log(error))
            }
        },
        // Helper konversi angka status ke teks display
        statusText(status) {
            return status == 1 ? 'Publish' : 'Draft'
        }
    }
}).mount('#app')