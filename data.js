// بيانات الألعاب والتطبيقات
const gameData = [
    {
        id: "gta5",
        title: "GTA V",
        description: "لعبة أكشن ومغامرات في عالم مفتوح من Rockstar Games.",
        category: "pc-games",
        subcategory: "اكشن",
        type: "game",
        downloads: 25000000,
        rating: 4.8,
        size: "95 GB",
        // صور بسيطة تعمل
        image: "https://i.postimg.cc/vBPGdV4x/842447.jpg",
        screenshots: [
            "https://i.postimg.cc/vBPGdV4x/842447.jpg",
            "https://i.postimg.cc/vBPGdV4x/842447.jpg"
        ],
        specs: {
            cpu: "Intel Core i5-3470",
            ram: "8 GB",
            gpu: "NVIDIA GTX 660",
            os: "Windows 10"
        },
        downloadLinks: [
            { name: "التحميل المباشر", url: "https://otieu.com/4/10507035?url=https://www.instant-gaming.com/en/4211-buy-grand-theft-auto-v-enhanced-pc-rockstar/?igr=uptodown-promo", size: "95 GB" }
        ],
        trending: true,
        addedDate: "2024-01-15"
    },
    {
        id: "valorant",
        title: "Valorant",
        description: "لعبة تكتيكية مجانية من نوع FPS مع أبطال ذوي قدرات فريدة. تنافس مع لاعبين من حول العالم.",
        category: "pc-games",
        subcategory: "اكشن",
        type: "game",
        downloads: 15000000,
        rating: 4.5,
        size: "20 GB",
        image: "https://i.postimg.cc/Dwsfb0M8/3037903.jpg",
        screenshots: [
            "https://i.postimg.cc/Dwsfb0M8/3037903.jpg",
            "https://i.postimg.cc/wTnTvL05/4962535.jpg",
            "https://i.postimg.cc/wTnTvL05/4962535.jpg"
        ],
        specs: {
            cpu: "Intel Core 2 Duo E8400",
            ram: "4 GB RAM",
            gpu: "Intel HD 3000",
            os: "Windows 7/8/10",
            storage: "20 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "النسخة الكاملة", url: "https://playvalorant.com/ar-ae/", size: "20 GB" }
        ],
        featured: true,
        trending: true
    },
    {
        id: "pubg_mobile",
        title: "PUBG Mobile",
        description: "لعبة باتل رويال شهيرة على الجوال. 100 لاعب يتقاتلون للبقاء حتى النهاية على جزيرة ضخمة.",
        category: "mobile-games",
        subcategory: "اكشن",
        type: "game",
        downloads: 1000000000,
        rating: 4.7,
        size: "2 GB",
        image: "https://i.postimg.cc/6pR6Gqm7/837398.jpg",
        screenshots: [
            "https://i.postimg.cc/m2K2DC8D/190843.jpg",
            "https://i.postimg.cc/6pR6Gqm7/837398.jpg"
        ],
        specs: {
            android: "Android 5.1.1 أو أحدث",
            ram: "2 GB RAM",
            storage: "2 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "APK مباشر", url: "https://cpmlink.co/6ar", size: "2 GB" }
        ],
        featured: true,
        trending: true
    },
    {
        id: "clash_of_clans",
        title: "Clash of Clans",
        description: "العبة استراتيجية حيث تبني قرية وتهاجم لاعبين آخرين من حول العالم. انضم إلى قبيلة وكن الأقوى!",
        category: "mobile-games",
        subcategory: "استراتيجية",
        type: "game",
        downloads: 500000000,
        rating: 4.6,
        size: "250 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            android: "Android 4.1 أو أحدث",
            ios: "iOS 10.0 أو أحدث",
            storage: "250 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "نسخة Android", url: "https://apkpure.com/fr/clash-of-clans-android-app/com.supercell.clashofclans/download?utm_content=1008", size: "250 MB" },
            { name: "نسخة iOS", url: "https://apkpure.com/fr/clash-of-clans-android-app/com.supercell.clashofclans/download?utm_content=1008", size: "250 MB" }
        ],
        featured: true,
        trending: true
    },
    {
        id: "photoshop",
        title: "Adobe Photoshop 2023",
        description: "أقوى برنامج لتحرير الصور والتصميم الجرافيكي. يحتوي على جميع الأدوات الاحترافية.",
        category: "programs",
        subcategory: "التصميم",
        type: "program",
        downloads: 15000000,
        rating: 4.9,
        size: "3 GB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg",
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            cpu: "Intel أو AMD مع دعم 64-bit",
            ram: "8 GB RAM (16 GB موصى به)",
            gpu: "بطاقة شاشة تدعم OpenGL 2.0",
            os: "Windows 10 أو أحدث",
            storage: "4 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "النسخة الكاملة", url: "https://adobe-photoshop-express.fr.uptodown.com/android/telecharger", size: "3 GB" },
            { name: "التفعيل", url: "https://adobe-photoshop-express.fr.uptodown.com/android/telecharger", size: "50 MB" }
        ],
        featured: true,
        trending: true
    },
    {
        id: "winrar",
        title: "WinRAR",
        description: "برنامج ضغط وفك ضغط الملفات. يدعم جميع صيغ الأرشيف الشائعة مثل ZIP, RAR, 7Z.",
        category: "programs",
        subcategory: "محررات",
        type: "program",
        downloads: 50000000,
        rating: 4.3,
        size: "3 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            os: "Windows 7/8/10/11",
            storage: "3 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "إصدار 64-bit", url: "https://rar-for-android.fr.uptodown.com/android/telecharger", size: "3 MB" },
            { name: "إصدار 32-bit", url: "https://rar-for-android.fr.uptodown.com/android/telecharger", size: "3 MB" }
        ],
        trending: true
    },
    {
        id: "whatsapp",
        title: "WhatsApp",
        description: "تطبيق المراسلة الأشهر في العالم. أرسل رسائل نصية وصوتية وفيديوهات ومكالمات مجانية.",
        category: "apps",
        subcategory: "التواصل",
        type: "app",
        downloads: 5000000000,
        rating: 4.4,
        size: "80 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            android: "Android 4.1 أو أحدث",
            ios: "iOS 10.0 أو أحدث",
            storage: "80 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "نسخة Android", url: "https://whatsapp-messenger.fr.uptodown.com/android/telecharger", size: "80 MB" },
            { name: "نسخة iOS", url: "https://whatsapp-messenger.fr.uptodown.com/android/telecharger", size: "80 MB" }
        ],
        featured: true
    },
    {
        id: "snaptube",
        title: "SnapTube",
        description: "تطبيق لتحميل الفيديوهات من اليوتيوب وغيرها بجودة عالية. يدعم جميع الصيغ والدقات.",
        category: "apk",
        subcategory: "تطبيقات محمية",
        type: "apk",
        downloads: 100000000,
        rating: 4.2,
        size: "25 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg",
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            android: "Android 4.4 أو أحدث",
            storage: "25 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "الإصدار الأخير", url: "https://snaptube.fr.uptodown.com/android/telecharger", size: "25 MB" }
        ],
        trending: true
    },
    {
        id: "call_of_duty",
        title: "Call of Duty: Warzone",
        description: "لعبة باتل رويال مجانية من سلسلة Call of Duty الشهيرة. قتال واقعي مع 150 لاعب.",
        category: "pc-games",
        subcategory: "اكشن",
        type: "game",
        downloads: 85000000,
        rating: 4.6,
        size: "125 GB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg",
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            cpu: "Intel Core i5-2500K أو AMD Ryzen R5 1600X",
            ram: "12 GB RAM",
            gpu: "NVIDIA GTX 970 أو AMD R9 390",
            os: "Windows 10",
            storage: "125 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "النسخة الكاملة", url: "https://call-of-duty-warzone.fr.uptodown.com/android/telecharger", size: "125 GB" }
        ],
        trending: true
    },
    {
        id: "minecraft",
        title: "Minecraft",
        description: "لعبة بناء واستكشاف في عالم مكعبات. ابنِ كل ما تتخيله وشارك مع أصدقائك.",
        category: "pc-games",
        subcategory: "مغامرة",
        type: "game",
        downloads: 238000000,
        rating: 4.8,
        size: "1 GB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg",
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            cpu: "Intel Core i5-4690",
            ram: "8 GB RAM",
            gpu: "NVIDIA GeForce 700 Series أو AMD Radeon Rx 200",
            os: "Windows 10",
            storage: "4 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "النسخة الكاملة", url: "https://tlauncher.org/#dPopup", size: "1 GB" }
        ]
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        description: "محرر أكواد خفيف وقوي من مايكروسوفت. يدعم جميع لغات البرمجة والتخصيص الكامل.",
        category: "programs",
        subcategory: "التطوير",
        type: "program",
        downloads: 25000000,
        rating: 4.7,
        size: "100 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            os: "Windows 7/8/10, macOS, Linux",
            storage: "200 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "Windows 64-bit", url: "https://code.visualstudio.com/Download", size: "100 MB" },
            { name: "macOS", url: "https://code.visualstudio.com/Download", size: "100 MB" }
        ]
    },
    {
        id: "spotify",
        title: "Spotify Premium",
        description: "تطبيق الموسيقى الأشهر مع ميزة اللا محدود. استمع لأي أغنية بدون إعلانات وبدون اتصال.",
        category: "apk",
        subcategory: "تطبيقات محمية",
        type: "apk",
        downloads: 50000000,
        rating: 4.5,
        size: "50 MB",
        image: "https://i.ibb.co/mrrH8hTD/707055.jpg",
        screenshots: [
            "https://i.ibb.co/mrrH8hTD/707055.jpg"
        ],
        specs: {
            android: "Android 5.0 أو أحدث",
            storage: "50 MB مساحة حرة"
        },
        downloadLinks: [
            { name: "Spotify Premium APK", url: "https://spotify.fr.uptodown.com/android/telecharger", size: "50 MB" }
        ]
    }
];

// دالة لتحميل المحتوى
function loadContent() {
    if (!window.gameData) return;
    
    // تجميع البيانات حسب التصنيفات
    const topGames = window.gameData
        .filter(item => item.type === 'game')
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 8);
    
    const topRatedGames = window.gameData
        .filter(item => item.type === 'game')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    
    const topPrograms = window.gameData
        .filter(item => item.type === 'program')
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 8);
    
    const topRatedPrograms = window.gameData
        .filter(item => item.type === 'program')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    
    const topApps = window.gameData
        .filter(item => item.type === 'app')
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 8);
    
    const topRatedApps = window.gameData
        .filter(item => item.type === 'app')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    
    const topApk = window.gameData
        .filter(item => item.type === 'apk')
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 8);
    
    // تعبئة الأقسام
    fillGrid('topGamesGrid', topGames);
    fillGrid('topRatedGamesGrid', topRatedGames);
    fillGrid('topProgramsGrid', topPrograms);
    fillGrid('topRatedProgramsGrid', topRatedPrograms);
    fillGrid('topAppsGrid', topApps);
    fillGrid('topRatedAppsGrid', topRatedApps);
    fillGrid('topApkGrid', topApk);
    
    // إعداد تصفية الألعاب
    setupGameFilters();
}

// دالة لملء الشبكة بالعناصر
function fillGrid(gridId, items) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    items.forEach(item => {
        const card = createItemCard(item);
        grid.appendChild(card);
    });
}

// دالة لإنشاء كارت العنصر
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-subcategory', item.subcategory);
    
    // تنسيق رقم التحميلات
    const downloadsFormatted = formatNumber(item.downloads);
    
    // إنشاء النجوم للتقييم
    const stars = getRatingStars(item.rating);
    
    card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='assets/default.jpg'">
        <div class="item-info">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description.substring(0, 100)}...</p>
            <div class="item-meta">
                <span class="item-rating">${stars}</span>
                <span class="item-downloads"><i class="fas fa-download"></i> ${downloadsFormatted}</span>
            </div>
            <button class="download-btn" data-id="${item.id}">
                <i class="fas fa-download"></i> تحميل (${item.size})
            </button>
        </div>
    `;
    
    // إضافة حدث النقر على زر التحميل
    const downloadBtn = card.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function() {
        showDownloadModal(item);
    });
    
    // إضافة حدث النقر على الكارت للذهاب لصفحة التفاصيل
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('download-btn')) {
            window.location.href = `game.html?id=${item.id}`;
        }
    });
    
    return card;
}

// دالة لعرض نافذة التحميل
function showDownloadModal(item) {
    const modal = document.getElementById('downloadModal');
    const message = document.getElementById('downloadMessage');
    
    if (modal && message) {
        message.innerHTML = `
            <strong>${item.title}</strong><br>
            الحجم: ${item.size}<br>
            سيبدأ التحميل تلقائياً...
        `;
        
        modal.classList.add('active');
        
        // زر الإلغاء
        const cancelBtn = document.getElementById('cancelDownload');
        if (cancelBtn) {
            cancelBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }
        
        // محاكاة التحميل (في الواقع ستكون رابط تحميل حقيقي)
        setTimeout(() => {
            // هنا يمكنك وضع رابط التحميل الفعلي
            // window.location.href = item.downloadLinks[0].url;
            
            // فقط للعرض: نعرض روابط التحميل
            let linksHTML = '<br><strong>روابط التحميل:</strong><br>';
            item.downloadLinks.forEach(link => {
                linksHTML += `<a href="${link.url}" style="color: #00a859;">${link.name} (${link.size})</a><br>`;
            });
            message.innerHTML += linksHTML;
        }, 1000);
    }
}

// دالة لعرض القسم المحدد
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // إظهار القسم المحدد
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // إظهار أو إخفاء زر التصفية
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer) {
        if (sectionId.includes('games')) {
            filterContainer.style.display = 'block';
        } else {
            filterContainer.style.display = 'none';
        }
    }
}

// دالة لتنفيذ البحث
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        alert('الرجاء إدخال كلمة بحث مكونة من حرفين على الأقل');
        return;
    }
    
    const results = window.gameData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.subcategory.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        alert('لم يتم العثور على نتائج لبحثك');
        return;
    }
    
    // عرض نتائج البحث في قسم الأكثر تحميلاً
    fillGrid('topGamesGrid', results.slice(0, 8));
    showSection('top-games');
    
    // تحديث القائمة النشطة
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.main-nav a[data-category="top-games"]').classList.add('active');
}

// دالة لإعداد تصفية الألعاب
function setupGameFilters() {
    const filterOptions = document.getElementById('filterOptions');
    if (!filterOptions) return;
    
    // جمع جميع أنواع الألعاب
    const gameTypes = [...new Set(window.gameData
        .filter(item => item.type === 'game')
        .map(item => item.subcategory))];
    
    // إضافة زر "الكل"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-option active';
    allBtn.textContent = 'الكل';
    allBtn.setAttribute('data-filter', 'all');
    filterOptions.appendChild(allBtn);
    
    // إضافة أزرار التصفية
    gameTypes.forEach(type => {
        const btn = document.createElement('button');
        btn.className = 'filter-option';
        btn.textContent = type;
        btn.setAttribute('data-filter', type);
        filterOptions.appendChild(btn);
    });
    
    // إضافة أحداث النقر على أزرار التصفية
    filterOptions.querySelectorAll('.filter-option').forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterOptions.querySelectorAll('.filter-option').forEach(b => {
                b.classList.remove('active');
            });
            
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // تطبيق التصفية
            const filter = this.getAttribute('data-filter');
            applyGameFilter(filter);
        });
    });
}

// دالة لتطبيق تصفية الألعاب
function applyGameFilter(filter) {
    const gameGrids = [
        'topGamesGrid',
        'topRatedGamesGrid'
    ];
    
    gameGrids.forEach(gridId => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        const cards = grid.querySelectorAll('.item-card');
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-subcategory') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// دالة لتصفية حسب التصنيف
function filterByCategory(category, subcategory) {
    // تحديث زر التصفية إذا كان في قسم الألعاب
    const filterOptions = document.getElementById('filterOptions');
    if (filterOptions && category.includes('games')) {
        filterOptions.querySelectorAll('.filter-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === subcategory) {
                btn.classList.add('active');
            }
        });
        
        applyGameFilter(subcategory);
    }
    
    // إظهار القسم المناسب
    let targetSection = '';
    
    if (category === 'pc-games' || category === 'mobile-games') {
        targetSection = 'top-games';
    } else if (category === 'programs') {
        targetSection = 'top-programs';
    } else if (category === 'apps') {
        targetSection = 'top-apps';
    } else if (category === 'apk') {
        targetSection = 'top-apk';
    }
    
    if (targetSection) {
        // تحديث القائمة النشطة
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.main-nav a[data-category="${targetSection}"]`).classList.add('active');
        
        showSection(targetSection);
    }
}

// دالة لتحميل تفاصيل اللعبة
function loadGameDetails(game) {
    // تحديث العنوان
    document.title = `${game.title} - موقع تحميلاتي`;
    
    // تحديث الصورة الرئيسية
    const mainImage = document.getElementById('gameMainImage');
    if (mainImage) {
        mainImage.src = game.image;
        mainImage.alt = game.title;
    }
    
    // تحديث العنوان
    const gameTitle = document.getElementById('gameTitle');
    if (gameTitle) {
        gameTitle.textContent = game.title;
    }
    
    // تحديث التقييم
    const ratingStars = document.getElementById('ratingStars');
    const ratingText = document.getElementById('ratingText');
    if (ratingStars && ratingText) {
        ratingStars.innerHTML = getRatingStars(game.rating);
        ratingText.textContent = `تقييم ${game.rating}/5`;
    }
    
    // تحديث عدد التحميلات
    const gameDownloads = document.getElementById('gameDownloads');
    if (gameDownloads) {
        gameDownloads.textContent = `${formatNumber(game.downloads)}+ تحميل`;
    }
    
    // تحديث الحجم
    const gameSize = document.getElementById('gameSize');
    if (gameSize) {
        gameSize.textContent = game.size;
    }
    
    // تحديث الوصف
    const gameDescription = document.getElementById('gameDescription');
    if (gameDescription) {
        gameDescription.textContent = game.description;
    }
    
    // تحديث المواصفات
    const gameSpecs = document.getElementById('gameSpecs');
    if (gameSpecs) {
        gameSpecs.innerHTML = '';
        for (const [key, value] of Object.entries(game.specs)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            gameSpecs.appendChild(li);
        }
    }
    
    // تحديث الصور
    const screenshotsGrid = document.getElementById('screenshotsGrid');
    if (screenshotsGrid) {
        screenshotsGrid.innerHTML = '';
        game.screenshots.forEach(screenshot => {
            const img = document.createElement('img');
            img.src = screenshot;
            img.alt = `${game.title} screenshot`;
            img.className = 'screenshot';
            screenshotsGrid.appendChild(img);
        });
    }
    
    // تحديث روابط التحميل
    const downloadLinks = document.getElementById('downloadLinks');
    const mainDownloadBtn = document.getElementById('mainDownloadBtn');
    
    if (downloadLinks) {
        downloadLinks.innerHTML = '';
        game.downloadLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'download-link';
            linkElement.innerHTML = `
                <i class="fas fa-download"></i>
                <span>${link.name} (${link.size})</span>
            `;
            downloadLinks.appendChild(linkElement);
        });
    }
    
    if (mainDownloadBtn) {
        mainDownloadBtn.addEventListener('click', function() {
            showDownloadModal(game);
        });
    }
}

// دوال مساعدة
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// جعل البيانات متاحة عالمياً
window.gameData = gameData;

// تحميل المحتوى عند جاهزية الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.loadContent);
} else {
    window.loadContent();
}
