document.addEventListener('DOMContentLoaded', () => {

    // --- Logika Menu Mobile ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Tutup menu saat link di-klik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Logika Active Nav Link saat Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% section terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('nav-link-active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-link-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- (Note 4: Logika API) ---

    // Contoh fungsi untuk memuat data dari FastAPI
    // Anda bisa panggil fungsi ini di sini
    // loadWebsiteData(); 

    async function loadWebsiteData() {
        // (Hapus komentar ini setelah memisah file)
        // console.log("Memuat data dari API...");
        try {
            // Ganti URL ini dengan URL FastAPI Anda
            const response = await fetch('http://127.0.0.1:8000/api/v1/content');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // (Hapus komentar ini setelah memisah file)
            // console.log("Data diterima:", data);

            // --- Mengisi Konten ---
            // (Contoh untuk Beranda)
            if (data.hero) {
                document.getElementById('hero-title').textContent = data.hero.title;
                document.getElementById('hero-desc').textContent = data.hero.description;
                document.getElementById('hero-image').src = data.hero.imageUrl;
            }
            
            
        } catch (error) {
            console.error("Gagal memuat data website:", error);
        }
    }
});