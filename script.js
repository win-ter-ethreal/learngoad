document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
        }
    });

    // 2. Modal Logic
    const modal = document.getElementById("authModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.querySelector(".close-modal");
    const toggleAuth = document.getElementById("toggleAuth");
    const modalTitle = document.getElementById("modalTitle");

    loginBtn.addEventListener('click', () => {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scroll
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    let isLogin = true;
    toggleAuth.addEventListener('click', () => {
        isLogin = !isLogin;
        modalTitle.innerText = isLogin ? "Selamat Datang" : "Buat Akun Baru";
        toggleAuth.innerText = isLogin ? "Daftar" : "Masuk";
    });

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});