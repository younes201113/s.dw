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

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة شريط التصفية
    initFilter();
    
    // تهيئة المحتوى الرئيسي
    initContent();
    
    // تهيئة البحث
    initSearch();
    
    // تهيئة التنقل بين الأقسام
    initNavigation();
    
    // تهيئة أزرار التنقل الإضافية
    initNavigationButtons();
    
    // تحميل البيانات إذا كانت موجودة
    if (typeof window.gameData !== 'undefined') {
        loadContent();
    }
});

// تهيئة القائمة الجانبية
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
                    
                    // تصفية المحتوى حسب التصنيف
                    filterByCategory(categoryKey, subcategory);
                });
            });
        }
    }
}

// تهيئة شريط التصفية
function initFilter() {
    const filterToggle = document.getElementById('filterToggle');
    const filterOptions = document.getElementById('filterOptions');
    
    if (filterToggle && filterOptions) {
        filterToggle.addEventListener('click', function() {
            filterOptions.classList.toggle('active');
        });
        
        // إخفاء التصفية عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!filterToggle.contains(event.target) && !filterOptions.contains(event.target)) {
                filterOptions.classList.remove('active');
            }
        });
    }
}

// تهيئة المحتوى الرئيسي
function initContent() {
    // تحميل جميع البيانات (هي موجودة في loadContent في data.js)
    if (typeof window.gameData !== 'undefined') {
        loadContent();
    }
    
    // التحقق إذا كان هناك رابط في الـ URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        // إذا كان هناك رابط مباشر لقسم معين
        setTimeout(() => {
            goToSection(hash);
            
            // تحديث القائمة النشطة
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-category') === hash) {
                    link.classList.add('active');
                }
            });
        }, 100);
    } else {
        // إذا كان المستخدم في أعلى الصفحة، اجعل أول رابط نشط
        const firstNavItem = document.querySelector('.main-nav a');
        if (firstNavItem) {
            firstNavItem.classList.add('active');
        }
    }
    
    // مراقبة التمرير لتحديد القسم النشط
    window.addEventListener('scroll', function() {
        updateActiveSectionOnScroll();
    });
}

// تهيئة البحث
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

// تهيئة التنقل بين الأقسام
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة النشاط للرابط الحالي
            this.classList.add('active');
            
            // الحصول على القسم المستهدف
            const targetSection = this.getAttribute('data-category');
            
            // التمرير السلس إلى القسم
            goToSection(targetSection);
        });
    });
}

// تهيئة أزرار التنقل الإضافية
function initNavigationButtons() {
    const backToTopBtn = document.getElementById('backToTop');
    const quickBackToTopBtn = document.getElementById('quickBackToTop');
    const quickNavMobileBtn = document.getElementById('quickNavMobile');
    const closeMobileNavBtn = document.getElementById('closeMobileNav');
    const mobileQuickNav = document.getElementById('mobileQuickNav');
    
    // زر العودة للأعلى
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                if (quickBackToTopBtn) quickBackToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
                if (quickBackToTopBtn) quickBackToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // زر العودة السريع للقسم الأول
    if (quickBackToTopBtn) {
        quickBackToTopBtn.addEventListener('click', function() {
            goToFirstSection();
        });
    }
    
    // قائمة التنقل السريع للهاتف
    if (quickNavMobileBtn && mobileQuickNav) {
        quickNavMobileBtn.addEventListener('click', function() {
            mobileQuickNav.classList.add('active');
        });
        
        if (closeMobileNavBtn) {
            closeMobileNavBtn.addEventListener('click', function() {
                mobileQuickNav.classList.remove('active');
            });
        }
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (quickNavMobileBtn && mobileQuickNav && 
                !quickNavMobileBtn.contains(event.target) && 
                !mobileQuickNav.contains(event.target)) {
                mobileQuickNav.classList.remove('active');
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        if (mobileQuickNav) {
            mobileQuickNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileQuickNav.classList.remove('active');
                });
            });
        }
    }
}

// دالة للعودة للصفحة الرئيسية
function goToHomePage() {
    window.location.href = 'index.html';
}

// دالة للعودة للقسم الأول
function goToFirstSection() {
    const firstSection = document.getElementById('top-games');
    if (firstSection) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const offset = headerHeight + navHeight + 20;
        
        const targetPosition = firstSection.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // تحديث القائمة النشطة
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-category') === 'top-games') {
                link.classList.add('active');
            }
        });
    }
}

// دالة للانتقال لقسم معين
function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const offset = headerHeight + navHeight + 20;
        
        const targetPosition = section.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // تحديث القائمة النشطة
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-category') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // تحديث الـ URL
        history.pushState(null, null, `#${sectionId}`);
    }
}

// دالة لتحديد القسم النشط أثناء التمرير
function updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    const offset = headerHeight + navHeight + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    // تحديث القائمة النشطة
    if (currentSection) {
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-category') === currentSection) {
                link.classList.add('active');
            }
        });
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
    
    // عرض نتائج البحث في قسم جديد مؤقت
    const mainContent = document.querySelector('.main-content');
    
    // إنشاء قسم نتائج البحث
    const searchResultsSection = document.createElement('section');
    searchResultsSection.className = 'content-section active';
    searchResultsSection.id = 'search-results';
    
    let resultsHTML = `
        <h2 class="section-title">نتائج البحث عن: "${query}"</h2>
        <div class="search-results-info">
            <p>تم العثور على ${results.length} نتيجة</p>
            <button class="btn" id="backToAll">العودة لجميع الأقسام</button>
        </div>
        <div class="items-grid" id="searchResultsGrid">
    `;
    
    // إضافة نتائج البحث
    results.forEach(item => {
        const downloadsFormatted = formatNumber(item.downloads);
        const stars = getRatingStars(item.rating);
        
        resultsHTML += `
            <div class="item-card" data-id="${item.id}" data-category="${item.category}" data-subcategory="${item.subcategory}">
                <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/000635/ffffff?text=Error'">
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
    
    resultsHTML += `</div>`;
    searchResultsSection.innerHTML = resultsHTML;
    
    // إخفاء جميع الأقسام الأخرى
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // إضافة قسم نتائج البحث
    mainContent.appendChild(searchResultsSection);
    
    // إضافة حدث للزر الرجوع
    document.getElementById('backToAll').addEventListener('click', function() {
        // إظهار جميع الأقسام
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'block';
        });
        
        // إزالة قسم نتائج البحث
        searchResultsSection.remove();
        
        // التمرير للأعلى
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // تحديث القائمة النشطة
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.main-nav a:first-child').classList.add('active');
    });
    
    // إضافة أحداث لأزرار التحميل في نتائج البحث
    setTimeout(() => {
        searchResultsSection.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                const item = window.gameData.find(i => i.id === itemId);
                if (item) {
                    showDownloadModal(item);
                }
            });
        });
    }, 100);
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
        const targetLink = document.querySelector(`.main-nav a[data-category="${targetSection}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        goToSection(targetSection);
    }
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
        
        // محاكاة التحميل
        setTimeout(() => {
            let linksHTML = '<br><strong>روابط التحميل:</strong><br>';
            item.downloadLinks.forEach(link => {
                linksHTML += `<a href="${link.url}" style="color: #00a859; display: block; margin: 5px 0;">${link.name} (${link.size})</a>`;
            });
            message.innerHTML += linksHTML;
        }, 1000);
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

// جعل الدوال متاحة عالمياً لاستخدامها في data.js
window.initNavigation = initNavigation;
window.goToSection = goToSection;
window.filterByCategory = filterByCategory;
window.performSearch = performSearch;
window.showDownloadModal = showDownloadModal;
