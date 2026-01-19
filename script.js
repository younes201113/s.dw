// بيانات التصنيفات
const categories = {
    'pc-games': {
        title: 'ألعاب PC',
        subcategories: ['اكشن', 'مغامرة', 'سباقات', 'استراتيجية', 'رعب', 'رياضة', 'قتال', 'أونلاين']
    },
    'mobile-games': {
        title: 'ألعاب جوال',
        subcategories: ['اكشن', 'مغامرة', 'ألغاز', 'رياضة', 'استراتيجية', 'محاكاة', 'كازينو', 'أونلاين']
    },
    'programs': {
        title: 'البرامج',
        subcategories: ['محررات', 'ميديا', 'الأمن', 'الانترنت', 'التعليم', 'الأوفيس', 'التصميم', 'التطوير']
    },
    'apps': {
        title: 'التطبيقات',
        subcategories: ['التواصل', 'التعليم', 'الترفيه', 'الصحة', 'الموسيقى', 'الفيديو', 'التصوير', 'الاجتماعية']
    },
    'apk': {
        title: 'APK محمي',
        subcategories: ['ألعاب محمية', 'تطبيقات محمية', 'مودات', 'هاكات']
    }
};

// متغيرات عامة
let currentCategory = null;
let currentFilter = null;

// ========== سلايدر الصور في الهيدر ==========
function initLogoSlider() {
    const sliderContainer = document.getElementById('logoSlider');
    if (!sliderContainer) return;

    const slidesContainer = sliderContainer.querySelector('.slides-container');
    const dots = sliderContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    // تغيير الصورة
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        slidesContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        
        // تحديث النقاط
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // أحداث النقر على النقاط
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // التبديل التلقائي كل 5 ثواني
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);
}

// ========== سلايدرات الأقسام ==========
const sliders = {};

function initSectionSliders() {
    // تهيئة كل قسم
    const sections = ['new', 'top-downloads', 'top-rated', 'trending', 'tools'];
    
    sections.forEach(section => {
        const track = document.getElementById(`${section}Track`);
        const prevBtn = document.querySelector(`.prev-btn[data-section="${section}"]`);
        const nextBtn = document.querySelector(`.next-btn[data-section="${section}"]`);
        
        if (track) {
            sliders[section] = {
                track: track,
                position: 0,
                itemWidth: 240,
                visibleItems: Math.floor(track.parentElement.offsetWidth / 240),
                totalItems: track.children.length
            };
            
            // أحداث الأزرار
            if (prevBtn) {
                prevBtn.addEventListener('click', () => slideSection(section, 'prev'));
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => slideSection(section, 'next'));
            }
            
            // السحب بالإصبع (للموبايل)
            let isDragging = false;
            let startX;
            
            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX - track.offsetLeft;
                track.style.cursor = 'grabbing';
            });
            
            track.addEventListener('mouseleave', () => {
                isDragging = false;
                track.style.cursor = 'grab';
            });
            
            track.addEventListener('mouseup', () => {
                isDragging = false;
                track.style.cursor = 'grab';
            });
            
            track.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 2;
                track.style.transform = `translateX(-${walk}px)`;
            });
            
            // للسحب باللمس
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX;
            });
            
            track.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX;
                const walk = startX - x;
                track.style.transform = `translateX(-${walk}px)`;
            });
            
            track.addEventListener('touchend', (e) => {
                const x = e.changedTouches[0].pageX;
                const walk = startX - x;
                if (Math.abs(walk) > 50) {
                    slideSection(section, walk > 0 ? 'next' : 'prev');
                } else {
                    track.style.transform = `translateX(-${sliders[section].position * sliders[section].itemWidth}px)`;
                }
            });
        }
    });
}

function slideSection(section, direction) {
    const slider = sliders[section];
    if (!slider) return;
    
    const maxPosition = slider.totalItems - slider.visibleItems;
    
    if (direction === 'next' && slider.position < maxPosition) {
        slider.position++;
    } else if (direction === 'prev' && slider.position > 0) {
        slider.position--;
    }
    
    slider.track.style.transform = `translateX(-${slider.position * slider.itemWidth}px)`;
    
    // تحديث حالة الأزرار
    updateNavButtons(section);
}

function updateNavButtons(section) {
    const slider = sliders[section];
    const prevBtn = document.querySelector(`.prev-btn[data-section="${section}"]`);
    const nextBtn = document.querySelector(`.next-btn[data-section="${section}"]`);
    
    if (prevBtn) {
        prevBtn.disabled = slider.position === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = slider.position >= slider.totalItems - slider.visibleItems;
    }
}

// ========== التنقل بين الأقسام ==========
function initSectionNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            // إضافة النشاط للرابط الحالي
            this.classList.add('active');
            
            // إخفاء جميع الأقسام
            sections.forEach(section => section.classList.remove('active'));
            
            // إظهار القسم المطلوب
            const targetSection = document.getElementById(`${this.dataset.section}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // الكشف عن القسم الظاهر عند التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.id;
            }
        });
        
        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== تهيئة القائمة الجانبية ==========
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarCategories = document.getElementById('sidebarCategories');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // تعبئة القائمة الجانبية بالتصنيفات
    if (sidebarCategories) {
        for (const [key, category] of Object.entries(categories)) {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            
            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'category-btn';
            categoryBtn.textContent = category.title;
            categoryBtn.setAttribute('data-category', key);
            
            // إضافة أيقونة السهم
            const arrowIcon = document.createElement('i');
            arrowIcon.className = 'fas fa-chevron-down';
            categoryBtn.appendChild(arrowIcon);
            
            // إنشاء القائمة الفرعية
            const subcategories = document.createElement('div');
            subcategories.className = 'subcategories';
            
            category.subcategories.forEach(sub => {
                const subBtn = document.createElement('button');
                subBtn.className = 'subcategory-btn';
                subBtn.textContent = sub;
                subBtn.setAttribute('data-subcategory', sub);
                subBtn.setAttribute('data-category', key);
                subcategories.appendChild(subBtn);
            });
            
            categoryItem.appendChild(categoryBtn);
            categoryItem.appendChild(subcategories);
            sidebarCategories.appendChild(categoryItem);
            
            // إضافة حدث النقر على التصنيف الرئيسي
            categoryBtn.addEventListener('click', function() {
                const isActive = subcategories.style.display === 'block';
                subcategories.style.display = isActive ? 'none' : 'block';
                arrowIcon.className = isActive ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            });
            
            // إضافة حدث النقر على التصنيف الفرعي
            subcategories.querySelectorAll('.subcategory-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const categoryKey = this.getAttribute('data-category');
                    const subcategory = this.getAttribute('data-subcategory');
                    
                    // إغلاق القائمة الجانبية
                    sidebar.classList.remove('active');
                    
                    // البحث عن الألعاب في هذا التصنيف
                    performCategorySearch(categoryKey, subcategory);
                });
            });
        }
    }
}

// ========== البحث حسب التصنيف ==========
function performCategorySearch(category, subcategory) {
    if (!window.gameData) return;
    
    const results = window.gameData.filter(item => 
        item.category === category && 
        item.subcategory === subcategory
    );
    
    if (results.length === 0) {
        alert('لم يتم العثور على نتائج في هذا التصنيف');
        return;
    }
    
    // عرض النتائج في قسم جديد
    showSearchResults(results, `تصنيف: ${categories[category].title} - ${subcategory}`);
}

// ========== البحث العام ==========
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        alert('الرجاء إدخال كلمة بحث مكونة من حرفين على الأقل');
        return;
    }
    
    if (!window.gameData) {
        alert('بيانات الألعاب غير متاحة حالياً');
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
    
    showSearchResults(results, `بحث عن: "${query}"`);
}

function showSearchResults(results, title) {
    const mainContent = document.querySelector('.main-content');
    
    // إخفاء جميع الأقسام
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // إنشاء قسم نتائج البحث
    let searchResultsSection = document.getElementById('search-results');
    if (!searchResultsSection) {
        searchResultsSection = document.createElement('section');
        searchResultsSection.className = 'content-section active';
        searchResultsSection.id = 'search-results';
        mainContent.appendChild(searchResultsSection);
    }
    
    let resultsHTML = `
        <div class="section-header">
            <h2 class="section-title">${title}</h2>
            <button class="btn" id="backToAll">
                <i class="fas fa-arrow-right"></i> العودة للأقسام
            </button>
        </div>
        <div class="items-slider">
            <div class="slider-track" id="searchResultsTrack">
    `;
    
    // إضافة نتائج البحث
    results.forEach(item => {
        const downloadsFormatted = formatNumber(item.downloads);
        const stars = getRatingStars(item.rating);
        
        resultsHTML += `
            <div class="item-card" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="item-image" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/000635/ffffff?text=صورة'">
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
            </div>
        `;
    });
    
    resultsHTML += `</div></div>`;
    searchResultsSection.innerHTML = resultsHTML;
    searchResultsSection.style.display = 'block';
    
    // زر العودة
    document.getElementById('backToAll').addEventListener('click', function() {
        searchResultsSection.style.display = 'none';
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'block';
        });
    });
    
    // تهيئة سلايدر النتائج
    setTimeout(() => {
        initSearchResultsSlider();
    }, 100);
}

function initSearchResultsSlider() {
    const track = document.getElementById('searchResultsTrack');
    if (!track) return;
    
    // نفس منطق سلايدرات الأقسام
    const slider = {
        track: track,
        position: 0,
        itemWidth: 240,
        visibleItems: Math.floor(track.parentElement.offsetWidth / 240),
        totalItems: track.children.length
    };
    
    // إضافة أزرار التنقل
    const sliderContainer = track.parentElement;
    const navHTML = `
        <div class="section-nav">
            <button class="nav-btn prev-btn" id="searchPrev">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="nav-btn next-btn" id="searchNext">
                <i class="fas fa-chevron-left"></i>
            </button>
        </div>
    `;
    
    sliderContainer.insertAdjacentHTML('beforeend', navHTML);
    
    // أحداث الأزرار
    document.getElementById('searchPrev').addEventListener('click', () => {
        if (slider.position > 0) {
            slider.position--;
            track.style.transform = `translateX(-${slider.position * slider.itemWidth}px)`;
        }
    });
    
    document.getElementById('searchNext').addEventListener('click', () => {
        if (slider.position < slider.totalItems - slider.visibleItems) {
            slider.position++;
            track.style.transform = `translateX(-${slider.position * slider.itemWidth}px)`;
        }
    });
}

// ========== أزرار التنقل الإضافية ==========
function initNavigationButtons() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========== نافذة التحميل ==========
function showDownloadModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>تحميل ${item.title}</h3>
            <p id="downloadMessage">
                <strong>${item.title}</strong><br>
                الحجم: ${item.size}<br>
                سيبدأ التحميل تلقائياً...
            </p>
            <button class="cancel-btn">
                <i class="fas fa-times"></i> إلغاء
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // زر الإلغاء
    modal.querySelector('.cancel-btn').addEventListener('click', function() {
        modal.remove();
    });
    
    // محاكاة التحميل
    setTimeout(() => {
        let linksHTML = '<br><strong>روابط التحميل:</strong><br>';
        item.downloadLinks.forEach(link => {
            linksHTML += `
                <a href="${link.url}" class="download-link" target="_blank">
                    <i class="fas fa-download"></i> ${link.name} (${link.size})
                </a><br>`;
        });
        modal.querySelector('#downloadMessage').innerHTML += linksHTML;
    }, 1000);
    
    // إغلاق بالنقر خارج النافذة
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ========== دوال مساعدة ==========
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

// ========== تهيئة كل شيء ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SnoyDown يبدأ التحميل...');
    
    // 1. تهيئة الأساسيات
    initSidebar();
    initSearch();
    initNavigationButtons();
    initLogoSlider();
    
    // 2. تهيئة التنقل بين الأقسام
    initSectionNavigation();
    
    // 3. تحميل المحتوى من data.js
    if (typeof window.loadContent === 'function') {
        console.log('📥 جارٍ تحميل بيانات الألعاب...');
        window.loadContent();
        
        // 4. بعد تحميل المحتوى، تهيئة السلايدرات
        setTimeout(() => {
            console.log('🌀 جارٍ تهيئة السلايدرات...');
            initSectionSliders();
        }, 500);
    }
    
    // 5. إعادة حساب السلايدرات عند تغيير الحجم
    window.addEventListener('resize', function() {
        if (typeof initSectionSliders === 'function') {
            console.log('🔄 إعادة حساب السلايدرات للحجم الجديد');
            initSectionSliders();
        }
    });
    
    // 6. إضافة أحداث لأزرار التحميل
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-btn') || 
            e.target.closest('.download-btn')) {
            const btn = e.target.classList.contains('download-btn') ? 
                       e.target : e.target.closest('.download-btn');
            const itemId = btn.getAttribute('data-id');
            
            if (itemId && window.gameData) {
                const item = window.gameData.find(i => i.id === itemId);
                if (item) {
                    showDownloadModal(item);
                }
            }
        }
    });
    
    console.log('✅ تم تحميل جميع الدوال بنجاح');
});
// تشغيل بعد تحميل المحتوى
setTimeout(() => {
    console.log('🔍 فحص الصور...');
    
    // فحص إذا الصور موجودة
    const images = document.querySelectorAll('.item-image');
    console.log(`📸 عدد الصور: ${images.length}`);
    
    images.forEach((img, index) => {
        img.onerror = function() {
            console.error(`❌ فشل تحميل الصورة ${index}:`, this.src);
            // وضع صورة بديلة
            this.src = `https://via.placeholder.com/300x200/000635/ffffff?text=Game${index + 1}`;
        };
        
        img.onload = function() {
            console.log(`✅ تحميل الصورة ${index}:`, this.src);
        };
    });
    
    // فحص بيانات الألعاب
    if (window.gameData) {
        console.log('🎮 عدد الألعاب:', window.gameData.length);
        console.log('📋 الألعاب المتاحة:', window.gameData.map(g => g.title));
    }
}, 1000);

// ========== جعل الدوال متاحة عالمياً ==========
window.initLogoSlider = initLogoSlider;
window.initSectionSliders = initSectionSliders;
window.initSectionNavigation = initSectionNavigation;
window.slideSection = slideSection;
window.performSearch = performSearch;
window.showDownloadModal = showDownloadModal;

console.log('📄 تم تحميل script.js بنجاح');

// في script.js، أضف هذا الكود في نهاية الملف:
document.addEventListener('click', function(e) {
    const card = e.target.closest('.item-card');
    
    if (card && !e.target.classList.contains('download-btn')) {
        const gameId = card.getAttribute('data-id');
        
        if (gameId) {
            // الانتقال لصفحة اللعبة
            window.location.href = `game.html?id=${gameId}`;
        }
    }
});

// تأكد أن كل كارت له data-id
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('data-id', item.id); // ⚠️ هذا السطر مهم
    
    card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image">
        <div class="item-info">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description.substring(0, 80)}...</p>
            <div class="item-meta">
                <span class="item-rating">${getRatingStars(item.rating)}</span>
                <span class="item-downloads">${formatNumber(item.downloads)}</span>
            </div>
            <button class="download-btn" data-id="${item.id}">
                تحميل (${item.size})
            </button>
        </div>
    `;
    
    return card;
}
// حل مشكلة ظهور الألعاب - أضف هذا في النهاية
function FORCE_SHOW_GAMES() {
    console.log('🎯 إظهار الألعاب بالقوة...');
    
    if (!window.gameData || window.gameData.length === 0) {
        console.error('❌ لا توجد بيانات ألعاب!');
        return;
    }
    
    // 1. تعبئة قسم "جديد"
    const newTrack = document.getElementById('newTrack');
    if (newTrack && newTrack.children.length === 0) {
        console.log('🔄 تعبئة قسم الجديد...');
        window.gameData.slice(0, 5).forEach(game => {
            const card = createItemCard(game);
            newTrack.appendChild(card);
        });
    }
    
    // 2. تعبئة قسم "الأكثر تحميلاً"
    const topTrack = document.getElementById('topDownloadsTrack');
    if (topTrack && topTrack.children.length === 0) {
        console.log('🔄 تعبئة قسم الأكثر تحميلاً...');
        window.gameData.slice(0, 5).forEach(game => {
            const card = createItemCard(game);
            topTrack.appendChild(card);
        });
    }
    
    // 3. إعادة تهيئة السلايدرات
    setTimeout(() => {
        if (typeof initSectionSliders === 'function') {
            initSectionSliders();
            console.log('✅ السلايدرات أعيد تهيئتها');
        }
    }, 500);
    
    console.log('✅ تم إظهار الألعاب');
}

// تشغيل بعد 3 ثواني
setTimeout(FORCE_SHOW_GAMES, 3000);

// 🔥 الحل النهائي - ظهور الألعاب في الهوم
function SHOW_GAMES_NOW() {
    console.log('🎮 محاولة إظهار الألعاب...');
    
    // 1. تأكد من وجود بيانات الألعاب
    if (!window.gameData || window.gameData.length === 0) {
        console.error('❌ gameData فارغ أو غير محمل');
        return;
    }
    
    console.log('✅ يوجد', window.gameData.length, 'لعبة');
    
    // 2. تعبئة قسم "جديد" إذا كان فارغاً
    const sections = ['new', 'top-downloads', 'top-rated', 'trending', 'tools'];
    
    sections.forEach(section => {
        const trackId = section + 'Track';
        const track = document.getElementById(trackId);
        
        if (track && track.children.length === 0) {
            console.log('🔄 تعبئة قسم', section);
            
            // أخذ أول 5 ألعاب
            window.gameData.slice(0, 5).forEach(game => {
                // إنشاء كارت لعبة
                const card = document.createElement('div');
                card.className = 'item-card';
                card.setAttribute('data-id', game.id);
                
                card.innerHTML = `
                    <img src="${game.image}" alt="${game.title}" class="item-image"
                         onerror="this.src='https://picsum.photos/300/200?random='+Math.random()">
                    <div class="item-info">
                        <h3 class="item-title">${game.title}</h3>
                        <p class="item-description">${game.description.substring(0, 80)}...</p>
                        <div class="item-meta">
                            <span class="item-rating">⭐⭐⭐⭐⭐</span>
                            <span class="item-downloads">${Math.floor(game.downloads/1000000)}M</span>
                        </div>
                        <button class="download-btn" data-id="${game.id}">
                            تحميل (${game.size})
                        </button>
                    </div>
                `;
                
                track.appendChild(card);
            });
        }
    });
    
    // 3. إضافة أحداث النقر
    document.querySelectorAll('.item-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.onclick = function(e) {
            if (!e.target.classList.contains('download-btn')) {
                const gameId = this.getAttribute('data-id');
                window.location.href = 'game.html?id=' + gameId;
            }
        };
    });
    
    console.log('✅ تم إظهار الألعاب بنجاح');
}

// تشغيل بعد تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(SHOW_GAMES_NOW, 1000);
});
