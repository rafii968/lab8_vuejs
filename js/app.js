const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost/lab11_php_ci/ci4/public';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
        path: '/artikel', 
        component: Artikel,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        component: About,
        meta: { requiresAuth: true }  // Tugas: About juga diproteksi
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Navigation Guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('Akses Ditolak! Anda harus login terlebih dahulu.');
        next('/login');
    } else {
        next();
    }
});

const app = createApp({
    data() {
        return {
            isLoggedIn: false
        }
    },
    mounted() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    },
    methods: {
        logout() {
            if (confirm('Apakah Anda yakin ingin keluar aplikasi?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userToken');
                this.isLoggedIn = false;
                this.$router.push('/');
            }
        }
    }
});

app.use(router);
app.mount('#app');