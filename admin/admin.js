// ========== نظام الإدارة ==========

// بيانات الأدمن (مخزنة محلياً)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'snoydown2024'
};

// فتح قاعدة البيانات
let gamesData = [];
let categories = [];

// ========== نظام المصادقة ==========
function initAuth() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === ADMIN_CREDENTIALS.username && 
                password === ADMIN_CREDENTIALS.password) {
                // حفظ حالة تسجيل الدخول
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username);
                
                // الانتقال للوحة التحكم
                window.location.href = 'dashboard.html';
            } else {
                alert('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }
}

// التحقق من تسجيل الدخول
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isLoggedIn && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return false;
    }
    
    return isLoggedIn;
}

// تسجيل الخروج
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminUsername');
                window.location.href = 'index.html';
            }
        });
    }
}

// ========== إدارة الألعاب ==========

// تحميل البيانات
async function loadGamesData() {
    try {
        const response = await fetch('../games.json');
        const data = await response.json();
        gamesData = data.games || [];
        
        // تحديث العداد
        updateGamesCount();
        
        // عرض الألعاب الأخيرة
        if (document.getElementById('recentGamesBody')) {
            displayRecentGames();
        }
        
        return gamesData;
    } catch (error) {
        console.error('❌ خطأ في تحميل البيانات:', error);
        return [];
    }
}

// تحديث عداد الألعاب
function updateGamesCount() {
    const gamesCount = document.getElementById('gamesCount');
    const totalGames = document.getElementById('totalGames');
    
    if (gamesCount) gamesCount.textContent = gamesData.length;
    if (totalGames) totalGames.textContent = gamesData.length;
    
    // حساب إجمالي التحميلات
    const totalDownloads = gamesData.reduce((sum, game) => sum + (game.downloads || 0), 0);
    const totalDownloadsEl = document.getElementById('totalDownloads');
    if (totalDownloadsEl) totalDownloadsEl.textContent = formatNumber(totalDownloads);
    
    // تحميلات اليوم (مثال)
    const todayDownloadsEl = document.getElementById('todayDownloads');
    if (todayDownloadsEl) todayDownloadsEl.textContent = formatNumber(Math.floor(totalDownloads * 0.01));
    
    // عدد التصنيفات
    const uniqueCats = [...new Set(gamesData.map(g => g.category))];
    const categoriesCountEl = document.getElementById('categoriesCount');
    if (categoriesCountEl) categoriesCountEl.textContent = uniqueCats.length;
}

// عرض الألعاب الأخيرة
function displayRecentGames() {
    const tbody = document.getElementById('recentGamesBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // أخذ آخر 10 ألعاب
    const recentGames = [...gamesData]
        .sort((a, b) => new Date(b.addedDate || '2024-01-01') - new Date(a.addedDate || '2024-01-01'))
        .slice(0, 10);
    
    recentGames.forEach(game => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <img src="${game.image}" alt="${game.title}" class="game-thumb" 
                     onerror="this.src='https://via.placeholder.com/50x50/333/fff?text=🎮'">
            </td>
            <td>
                <strong>${game.title}</strong>
                <br>
                <small>${game.description.substring(0, 50)}...</small>
            </td>
            <td>
                <span class="category-badge">${getCategoryName(game.category)}</span>
                ${game.subcategory ? `<br><small>${game.subcategory}</small>` : ''}
            </td>
            <td>${game.size}</td>
            <td>${formatNumber(game.downloads || 0)}</td>
            <td>${game.addedDate || '2024-01-01'}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${game.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${game.id}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="action-btn view-btn" data-id="${game.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// ========== إضافة لعبة جديدة ==========
function initAddGameForm() {
    const form = document.getElementById('addGameForm');
    if (!form) return;
    
    // معاينة الصورة
    const imageInput = document.getElementById('gameImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (imageInput && imagePreview) {
        imageInput.addEventListener('input', function() {
            if (this.value) {
                imagePreview.innerHTML = `
                    <img src="${this.value}" alt="معاينة" 
                         onerror="this.parentElement.innerHTML='<p>❌ تعذر تحميل الصورة</p>';">
                    <p>${this.value}</p>
                `;
            }
        });
    }
    
    // إضافة رابط تحميل جديد
    const addLinkBtn = document.getElementById('addLinkBtn');
    const linksContainer = document.getElementById('downloadLinksContainer');
    
    if (addLinkBtn && linksContainer) {
        addLinkBtn.addEventListener('click', function() {
            const newRow = document.createElement('div');
            newRow.className = 'download-link-row';
            newRow.innerHTML = `
                <input type="text" class="link-name" placeholder="اسم الرابط" required>
                <input type="url" class="link-url" placeholder="رابط التحميل" required>
                <input type="text" class="link-size" placeholder="الحجم" required>
                <button type="button" class="remove-link-btn"><i class="fas fa-times"></i></button>
            `;
            
            linksContainer.appendChild(newRow);
            
            // إضافة حدث لحذف الصف
            newRow.querySelector('.remove-link-btn').addEventListener('click', function() {
                if (linksContainer.children.length > 1) {
                    this.parentElement.remove();
                } else {
                    alert('❌ يجب أن يكون هناك رابط تحميل واحد على الأقل');
                }
            });
        });
        
        // إضافة حدث للحذف للرابط الأول
        linksContainer.querySelector('.remove-link-btn').addEventListener('click', function() {
            alert('❌ يجب أن يكون هناك رابط تحميل واحد على الأقل');
        });
    }
    
    // معاينة التقييم
    const ratingInput = document.getElementById('gameRating');
    const ratingStars = document.getElementById('ratingStars');
    const ratingValue = document.getElementById('ratingValue');
    
    if (ratingInput && ratingStars && ratingValue) {
        ratingInput.addEventListener('input', function() {
            const rating = parseFloat(this.value) || 0;
            ratingValue.textContent = rating.toFixed(1);
            
            // تحديث النجوم
            let stars = '';
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) stars += '⭐';
            if (halfStar) stars += '⭐';
            
            ratingStars.textContent = stars;
        });
    }
    
    // زر المعاينة
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    
    if (previewBtn && previewModal) {
        previewBtn.addEventListener('click', function() {
            if (!validateForm()) return;
            
            const gameData = getFormData();
            displayPreview(gameData);
            previewModal.style.display = 'block';
        });
        
        // إغلاق النافذة
        previewModal.querySelector('.close-modal').addEventListener('click', function() {
            previewModal.style.display = 'none';
        });
        
        // إغلاق بالنقر خارج النافذة
        window.addEventListener('click', function(e) {
            if (e.target === previewModal) {
                previewModal.style.display = 'none';
            }
        });
    }
    
    // إرسال النموذج
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('❌ يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        const gameData = getFormData();
        
        try {
            // إضافة للبيانات المحلية
            gamesData.unshift(gameData);
            
            // حفظ في ملف JSON (في الواقع سيكون طلب لسيرفر)
            await saveGameToJSON(gameData);
            
            alert('✅ تم إضافة اللعبة بنجاح!');
            
            // الانتقال للوحة التحكم أو إعادة تعيين النموذج
            if (confirm('هل تريد إضافة لعبة أخرى؟')) {
                form.reset();
                // إعادة تعيين معاينة الصورة
                if (imagePreview) imagePreview.innerHTML = '<p>معاينة الصورة ستظهر هنا</p>';
            } else {
                window.location.href = 'dashboard.html';
            }
            
        } catch (error) {
            console.error('❌ خطأ في حفظ اللعبة:', error);
            alert('❌ حدث خطأ أثناء حفظ اللعبة');
        }
    });
}

// الحصول على بيانات النموذج
function getFormData() {
    const form = document.getElementById('addGameForm');
    if (!form) return null;
    
    // جمع روابط التحميل
    const downloadLinks = [];
    document.querySelectorAll('.download-link-row').forEach(row => {
        const name = row.querySelector('.link-name').value;
        const url = row.querySelector('.link-url').value;
        const size = row.querySelector('.link-size').value;
        
        if (name && url && size) {
            downloadLinks.push({ name, url, size });
        }
    });
    
    // جمع الصور الإضافية
    const screenshots = [];
    document.querySelectorAll('.screenshot-input').forEach(input => {
        if (input.value) screenshots.push(input.value);
    });
    
    // إنشاء معرف فريد إذا لم يدخل المستخدم
    let gameId = document.getElementById('gameId').value;
    if (!gameId) {
        gameId = document.getElementById('gameTitle').value
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_');
    }
    
    return {
        id: gameId,
        title: document.getElementById('gameTitle').value,
        description: document.getElementById('gameDescription').value,
        category: document.getElementById('gameCategory').value,
        subcategory: document.getElementById('gameSubcategory').value || '',
        type: document.getElementById('gameType').value,
        downloads: parseInt(document.getElementById('gameDownloads').value) || 0,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        size: document.getElementById('gameSize').value,
        image: document.getElementById('gameImage').value,
        screenshots: screenshots.length > 0 ? screenshots : [
            document.getElementById('gameImage').value
        ],
        specs: parseSpecs(document.getElementById('gameSpecs').value),
        downloadLinks: downloadLinks,
        featured: document.getElementById('featuredGame').checked,
        trending: document.getElementById('trendingGame').checked,
        addedDate: new Date().toISOString().split('T')[0]
    };
}

// التحقق من صحة النموذج
function validateForm() {
    const requiredFields = [
        'gameTitle', 'gameId', 'gameDescription', 'gameCategory',
        'gameType', 'gameSize', 'gameImage'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            field?.focus();
            return false;
        }
    }
    
    // التحقق من روابط التحميل
    const hasDownloadLinks = document.querySelectorAll('.download-link-row').length > 0;
    if (!hasDownloadLinks) {
        alert('❌ يجب إضافة رابط تحميل واحد على الأقل');
        return false;
    }
    
    return true;
}

// حفظ اللعبة في JSON
async function saveGameToJSON(gameData) {
    // في بيئة حقيقية، هذا سيكون طلب AJAX لسيرفر
    // هنا سنحفظ في localStorage كبديل مؤقت
    
    // تحميل البيانات الحالية
    let allGames = [];
    try {
        const stored = localStorage.getItem('snoydown_games');
        if (stored) {
            allGames = JSON.parse(stored);
        }
    } catch (e) {
        console.error('خطأ في تحميل البيانات:', e);
    }
    
    // إضافة اللعبة الجديدة
    allGames.unshift(gameData);
    
    // حفظ في localStorage
    localStorage.setItem('snoydown_games', JSON.stringify(allGames));
    
    // تحديث المتغير العام
    gamesData = allGames;
    
    return Promise.resolve();
}

// عرض المعاينة
function displayPreview(gameData) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;
    
    const stars = '⭐'.repeat(Math.floor(gameData.rating)) + 
                 (gameData.rating % 1 >= 0.5 ? '⭐' : '');
    
    previewContent.innerHTML = `
        <div class="preview-game">
            <div class="preview-header">
                <img src="${gameData.image}" alt="${gameData.title}" class="preview
