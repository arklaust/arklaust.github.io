// Data pengguna (dalam aplikasi nyata, ini akan disimpan di server)
const users = {
    admin: { password: "admin123", role: "admin" },
    siswa: { password: "siswa123", role: "student" }
};

// Variabel global untuk status login
let currentUser = null;

// Fungsi untuk menampilkan halaman berdasarkan peran
function showPageBasedOnRole(role) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = '';
    
    // Menu untuk semua pengguna
    const commonPages = [
        { id: 'dashboard', text: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'students', text: 'Data Siswa', icon: 'fas fa-users' },
        { id: 'schedule', text: 'Jadwal Pelajaran', icon: 'fas fa-calendar-alt' },
        { id: 'activities', text: 'Kegiatan', icon: 'fas fa-calendar-check' }
    ];
    
    // Tambahkan menu umum
    commonPages.forEach(page => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" class="nav-link" data-page="${page.id}"><i class="${page.icon}"></i> ${page.text}</a>`;
        navMenu.appendChild(li);
    });
    
    // Tambahkan menu admin jika peran adalah admin
    if (role === 'admin') {
        const adminLi = document.createElement('li');
        adminLi.innerHTML = `<a href="#" class="nav-link" data-page="admin"><i class="fas fa-cog"></i> Admin</a>`;
        navMenu.appendChild(adminLi);
    }
    
    // Perbarui badge peran pengguna
    document.getElementById('user-role').textContent = role === 'admin' ? 'Admin' : 'Siswa';
    
    // Aktifkan event listener untuk navigasi
    activateNavigation();
}

// Fungsi untuk mengaktifkan navigasi
function activateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus kelas active dari semua link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Tambahkan kelas active ke link yang diklik
            this.classList.add('active');
            
            // Sembunyikan semua halaman
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            
            // Tampilkan halaman yang dipilih
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Set halaman dashboard sebagai aktif secara default
    document.querySelector('.nav-link[data-page="dashboard"]').classList.add('active');
    document.getElementById('dashboard').classList.add('active');
}

// Fungsi untuk menangani login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Validasi input
    if (!username || !password || !role) {
        alert('Harap isi semua field!');
        return;
    }
    
    // Periksa kredensial
    if (users[username] && users[username].password === password && users[username].role === role) {
        // Login berhasil
        currentUser = { username, role };
        
        // Sembunyikan layar login, tampilkan aplikasi
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        
        // Tampilkan halaman berdasarkan peran
        showPageBasedOnRole(role);
        
        // Tampilkan pesan selamat datang
        alert(`Login berhasil! Selamat datang, ${username} (${role === 'admin' ? 'Admin' : 'Siswa'})`);
    } else {
        // Login gagal
        alert('Username, password, atau peran tidak valid!');
    }
}

// Fungsi untuk menangani logout
function handleLogout() {
    // Tampilkan konfirmasi
    if (confirm('Apakah Anda yakin ingin logout?')) {
        // Reset form login
        document.getElementById('login-form').reset();
        
        // Sembunyikan aplikasi, tampilkan layar login
        document.getElementById('app').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        
        // Reset status pengguna
        currentUser = null;
    }
}

// Fungsi untuk menangani penambahan siswa (hanya admin)
function handleAddStudent(event) {
    event.preventDefault();
    
    // Periksa apakah pengguna adalah admin
    if (currentUser && currentUser.role === 'admin') {
        const nis = document.getElementById('nis').value;
        const name = document.getElementById('name').value;
        const studentClass = document.getElementById('class').value;
        
        // Validasi input
        if (!nis || !name || !studentClass) {
            alert('Harap isi semua field!');
            return;
        }
        
        // Dalam aplikasi nyata, di sini data akan dikirim ke server
        alert(`Siswa ${name} (NIS: ${nis}) dari kelas ${studentClass} berhasil ditambahkan!`);
        
        // Reset form
        document.getElementById('add-student-form').reset();
    } else {
        alert('Anda tidak memiliki izin untuk melakukan aksi ini!');
    }
}

// Event listeners saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk form login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Event listener untuk tombol logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Event listener untuk form tambah siswa
    document.getElementById('add-student-form').addEventListener('submit', handleAddStudent);
    
    // Sample data (dalam aplikasi nyata, ini akan datang dari server)
    const sampleData = {
        totalStudents: 28,
        totalSubjects: 12,
        upcomingActivities: 5,
        attendanceRate: 92
    };
    
    // Update statistik dashboard (hanya contoh)
    document.querySelector('.stat-card:nth-child(1) h3').textContent = sampleData.totalStudents;
    document.querySelector('.stat-card:nth-child(2) h3').textContent = sampleData.totalSubjects;
    document.querySelector('.stat-card:nth-child(3) h3').textContent = sampleData.upcomingActivities;
    document.querySelector('.stat-card:nth-child(4) h3').textContent = `${sampleData.attendanceRate}%`;
});