// بيانات الألعاب والتطبيقات
const gameData = [
    {
        id: "gta5",
        title: "GTA V",
        description: "لعبة أكشن ومغامرات في عالم مفتوح مع قصة شيقة وأداء مذهل. العب مع أصدقائك في وضع الأونلاين.",
        category: "pc-games",
        subcategory: "اكشن",
        type: "game",
        downloads: 25000000,
        rating: 4.8,
        size: "95 GB",
        image: "https://uptogames.net/wp-content/uploads/2021/05/GTA-5-8-150x150.webp",
        screenshots: [
            "https://uptogames.net/wp-content/uploads/2021/05/GTA-5-1.webp",
            "https://uptogames.net/wp-content/uploads/2021/05/GTA-5-2.webp",
            "https://uptogames.net/wp-content/uploads/2021/05/GTA-5-3.webp",
            "https://uptogames.net/wp-content/uploads/2021/05/GTA-5-4.webp"
        ],
        specs: {
            cpu: "Intel Core i5-3470 أو AMD FX-8350",
            ram: "8 GB RAM",
            gpu: "NVIDIA GTX 660 أو AMD HD 7870",
            os: "Windows 10",
            storage: "95 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "الجزء 1", url: "https://download2435.mediafire.com/jc8ygydc6tkgvI8gmahd1zWoKx6N0PnBS-HDMIsG0x4H0N24VZKrLg91NMBZN5jPWD5sAFgFE359NwpzrXzHCazEvFtvg4Igf1Avlzc8eZDFrB_RXZOSUozQbq6BCXtWZxyIMzFCVbLZzPMSKzFDAAJE7ShLsUjKK5Jnw9NkYnPQ3g/vr10jsh4350pta9/Free+Download+Files.zip", size: "10 GB" },
            { name: "الجزء 2", url: "https://download2435.mediafire.com/jc8ygydc6tkgvI8gmahd1zWoKx6N0PnBS-HDMIsG0x4H0N24VZKrLg91NMBZN5jPWD5sAFgFE359NwpzrXzHCazEvFtvg4Igf1Avlzc8eZDFrB_RXZOSUozQbq6BCXtWZxyIMzFCVbLZzPMSKzFDAAJE7ShLsUjKK5Jnw9NkYnPQ3g/vr10jsh4350pta9/Free+Download+Files.zip", size: "10 GB" },
            { name: "الجزء 3", url: "https://download2435.mediafire.com/jc8ygydc6tkgvI8gmahd1zWoKx6N0PnBS-HDMIsG0x4H0N24VZKrLg91NMBZN5jPWD5sAFgFE359NwpzrXzHCazEvFtvg4Igf1Avlzc8eZDFrB_RXZOSUozQbq6BCXtWZxyIMzFCVbLZzPMSKzFDAAJE7ShLsUjKK5Jnw9NkYnPQ3g/vr10jsh4350pta9/Free+Download+Files.zip", size: "10 GB" }
        ],
        featured: true,
        trending: true
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
        image: "https://th.bing.com/th/id/ODF.FFPVJ6dLO7g0Tno32UWDJQ?w=32&h=32&qlt=90&pcl=fffffc&r=0&o=6&pid=1.2",
        screenshots: [
            "https://th.bing.com/th/id/R.e285b26b018da31c9be91c913e02684e?rik=7s89tfb%2fQBIR5A&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.HZoXzbh99OAz7TKx2yWFlwHaEK?w=315&h=180&c=7&r=0&o=5&pid=1.7",
            "https://tse3.mm.bing.net/th/id/OIP.OYotQ7KMypGmnb1CL1oIAgHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3"
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
        image: "https://img.utdstc.com/icon/ad3/e98/ad3e98abe9de44760d7dfe5f65cd833bd059c163c3cdbe5a8703c2e35a5bb02f:100",
        screenshots: [
            "https://img.utdstc.com/screen/554/199/554199f937c04389e2089ed74eb2114df70cd15e416f3a1cbb98621a9825baca:200",
            "https://img.utdstc.com/screen/a89/0e7/a890e724f6ead25ae2796f3585ab4ded117bba6257d4337bdcc65185c69a9fa6:200"
        ],
        specs: {
            android: "Android 5.1.1 أو أحدث",
            ram: "2 GB RAM",
            storage: "2 GB مساحة حرة"
        },
        downloadLinks: [
            { name: "APK مباشر", url: "https://d.apkpure.com/b/APK/com.tencent.ig?version=latest", size: "2 GB" }
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
        image: "https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5jbGFzaG9mY2xhbnNfaWNvbl8xNzU5MzIzNDA5XzAwNw/icon.webp?w=320&fakeurl=1&type=.webp",
        screenshots: [
            "https://img.utdstc.com/screen/f49/830/f49830795863850a8e76537b760deb46de57687ece3f82870b673834a55eb2ff:200"
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
        image: "https://img.utdstc.com/icon/a72/da4/a72da47b9cfb34eac94550bc25fb376dd66066c7ad92aeea4d13e84ac8ec2929:100",
        screenshots: [
            "https://www.bing.com/th/id/OIP.Ti_NOMGVPVUqLLxFr8swtQHaE5?w=263&h=211&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2",
            "https://www.bing.com/th/id/OIP.sbQQO89rcuM4uJbkM5W09wHaEo?w=277&h=211&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
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
        image: "https://img.utdstc.com/icon/e60/55f/e6055f932d15a9451379c6bd0eceee301bd94f867dc7377cb2959be9a6861abd:100",
        screenshots: [
            "https://img.utdstc.com/screen/4e5/9d8/4e59d8496d9403e233d350e6f03119f06f6c9d2470a2b07ad87a3312ce57eae8:200"
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
        image: "https://img.utdstc.com/icon/ce6/4c5/ce64c5fdcab44eb799b11d71e554c06ede50bc8524cc906de9da7c9aed58983b:100",
        screenshots: [
            "https://img.utdstc.com/screen/fbf/746/fbf746a46cfe04e688dfeb8c3e610d4aec1338f9d63ea2d0d5428f3aa28f3d99:200"
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
        image: "https://img.utdstc.com/icon/b11/7ce/b117ce7ff728bd1bf2883fdffdcb170f487a793a8f65db956649a846861e138c:100",
        screenshots: [
            "https://img.utdstc.com/screen/8c5/563/8c556358775ce4366841923259ecef405db1a949602a545d4deb1ff9c3f43900:200",
            "https://img.utdstc.com/screen/826/8df/8268df111e2c911ce053dcacb08449620f659e50b31106e99ad84c4d3b16f12e:200"
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
        image: "https://img.utdstc.com/icon/398/3aa/3983aa6b3ad0e1723ab331d6ef41c6ceb9bdd0d6c93acb57b4ce352c06ddc01b:100",
        screenshots: [
            "https://img.utdstc.com/screen/311/b8d/311b8da9ce2867154790855052e7459aa7ad2041d02d8daeb94f83fa80ea698d:200",
            "https://img.utdstc.com/screen/862/f9b/862f9b9229b96fa59925e8e931ad448382b657a774e7c5b507419448d5608c7a:200"
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
        image: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/Global-Header_MCCB-Logo_300x51.svg",
        screenshots: [
            "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/CREATE_BuildAlmostAnything.png",
            "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/EXPLORE_PDPScreenshotRefresh2024_multipleBiomes_01.png"
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
        image: "https://th.bing.com/th/id/ODF.-g0sg8HWLH6lfjy77LRUug?w=32&h=32&qlt=90&pcl=fffffc&r=0&o=6&pid=1.2",
        screenshots: [
            "https://th.bing.com/th/id/ODF.-g0sg8HWLH6lfjy77LRUug?w=32&h=32&qlt=90&pcl=fffffc&r=0&o=6&pid=1.2"
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
        image: "https://img.utdstc.com/icon/4ba/1ef/4ba1ef03c48c81bb20965a85d244c07ec086c20f4ec9a047828e19ecbf245490:100",
        screenshots: [
            "https://img.utdstc.com/screen/9b5/788/9b5788ebd556711506eb976a4fda9f20a8b3ddeb84199f6bbc51708c6f8fd276:200"
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
    document.addEventListener('DOMContentLoaded', loadContent);
} else {
    loadContent();
}
