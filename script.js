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
            
