document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const modal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeBtn = document.querySelector('.close-modal');
    const toggleAuth = document.getElementById('toggleAuth');
    const modalTitle = document.getElementById('modalTitle');
    const authForm = document.getElementById('authForm');
    const authSubmit = document.getElementById('authSubmit');
    const registerFields = document.querySelectorAll('.register-only');
    const userProfile = document.getElementById('userProfile');
    const userNameEl = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const menuToggle = document.getElementById('menuToggle');
    const navLeft = document.querySelector('.nav-left');



    let isLogin = true;

    menuToggle.addEventListener('click', () => {
        navLeft.classList.toggle('active'); // ini penting!
    });




    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Modal logic
    loginBtn.addEventListener('click', () => { isLogin = true; renderFormMode(); openModal(); });
    registerBtn.addEventListener('click', () => { isLogin = false; renderFormMode(); openModal(); });
    toggleAuth.addEventListener('click', () => { isLogin = !isLogin; renderFormMode(); });
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Form submit
    authForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value.trim();
        const name = (document.getElementById('authName')?.value || '').trim();

        if (!email || !password || (!isLogin && !name)) {
            alert('Mohon lengkapi semua field.');
            return;
        }

        applyLoggedInUI(name || email.split('@')[0]);
        closeModal();
    });

    // Profile dropdown
    profileToggle.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
    });
    window.addEventListener('click', e => {
        if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add('hidden');
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userProfile.classList.add('hidden');
            loginBtn.style.display = 'inline-block';
            registerBtn.style.display = 'inline-block';
        });
    }

    // Helpers
    function renderFormMode() {
        if (isLogin) {
            modalTitle.textContent = 'Selamat Datang';
            toggleAuth.textContent = 'Daftar';
            authSubmit.textContent = 'Masuk';
            registerFields.forEach(el => el.classList.add('hidden'));
        } else {
            modalTitle.textContent = 'Buat Akun Baru';
            toggleAuth.textContent = 'Masuk';
            authSubmit.textContent = 'Daftar';
            registerFields.forEach(el => el.classList.remove('hidden'));
        }
    }

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function applyLoggedInUI(displayName) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userNameEl.textContent = displayName;
        userProfile.classList.remove('hidden');
    }
});

let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah → sembunyikan navbar
        navbar.style.transform = "translateY(-100%)";
    } else {
        // Scroll ke atas → tampilkan navbar
        navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // cegah nilai negatif
});

