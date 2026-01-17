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
    // تعيين القسم الأول كنشط
    const firstNavItem = document.querySelector('.main-nav a');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
        const category = firstNavItem.getAttribute('data-category');
        showSection(category);
    }
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
            
            // إظهار القسم المناسب
            const category = this.getAttribute('data-category');
            showSection(category);
        });
    });
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
    const topGamesGrid = document.getElementById('topGamesGrid');
    if (topGamesGrid) {
        fillGrid('topGamesGrid', results.slice(0, 8));
    }
    
    showSection('top-games');
    
    // تحديث القائمة النشطة
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    const topGamesLink = document.querySelector('.main-nav a[data-category="top-games"]');
    if (topGamesLink) {
        topGamesLink.classList.add('active');
    }
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
        
        showSection(targetSection);
    }
}

// جعل الدوال متاحة عالمياً لاستخدامها في data.js
window.initNavigation = initNavigation;
window.showSection = showSection;
window.filterByCategory = filterByCategory;
window.performSearch = performSearch;
