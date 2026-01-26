// ========== نظام الإدارة الكامل لـ SnoyDown ==========

// بيانات الأدمن (مخزنة محلياً)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'snoydown2024'
};

// متغيرات عامة
let gamesData = [];
let currentUser = null;

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
                currentUser = username;
                
                // الانتقال للوحة التحكم
                window.location.href = 'dashboard.html';
            } else {
                showAlert('❌ اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
            }
        });
    }
}

// التحقق من تسجيل الدخول
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    currentUser = localStorage.getItem('adminUsername');
    
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
            showConfirm('هل أنت متأكد من تسجيل الخروج؟', function() {
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminUsername');
                currentUser = null;
                window.location.href = 'index.html';
            });
        });
    }
}

// ========== إدارة الألعاب ==========

// تحميل البيانات
async function loadGamesData() {
    try {
        // محاولة تحميل من ملف محلي (في الحقيقي سيكون من سيرفر)
        let data = [];
        
        // 1. جرب تحميل من localStorage أولاً (للاختبار)
        const storedData = localStorage.getItem('snoydown_games');
        if (storedData) {
            data = JSON.parse(storedData);
        } else {
            // 2. جرب تحميل من ملف games.json
            const response = await fetch('../games.json');
            const jsonData = await response.json();
            data = jsonData.games || [];
            
            // حفظ في localStorage للاختبار
            localStorage.setItem('snoydown_games', JSON.stringify(data));
        }
        
        gamesData = data;
        
        // تحديث العداد
        updateGamesCount();
        
        // عرض الألعاب الأخيرة
        if (document.getElementById('recentGamesBody')) {
            displayRecentGames();
        }
        
        console.log(`✅ تم تحميل ${gamesData.length} لعبة`);
        return gamesData;
    } catch (error) {
        console.error('❌ خطأ في تحميل البيانات:', error);
        gamesData = [];
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
    
    // تحميلات اليوم (محاكاة)
    const todayDownloadsEl = document.getElementById('todayDownloads');
    if (todayDownloadsEl) {
        const today = new Date().getDate();
        const todayDownloads = gamesData.reduce((sum, game) => {
            const gameDate = game.addedDate ? new Date(game.addedDate).getDate() : 1;
            return gameDate === today ? sum + (game.downloads || 0) * 0.001 : sum;
        }, 0);
        todayDownloadsEl.textContent = formatNumber(todayDownloads);
    }
    
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
    
    if (recentGames.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <i class="fas fa-gamepad" style="font-size: 2rem; color: #666; margin-bottom: 10px;"></i>
                    <p>لا توجد ألعاب حتى الآن</p>
                    <a href="add-game.html" class="btn primary-btn">
                        <i class="fas fa-plus"></i> إضافة أول لعبة
                    </a>
                </td>
            </tr>
        `;
        return;
    }
    
    recentGames.forEach(game => {
        const row = document.createElement('tr');
        const date = game.addedDate || '2024-01-01';
        const formattedDate = new Date(date).toLocaleDateString('ar-EG');
        
        row.innerHTML = `
            <td>
                <img src="${game.image}" alt="${game.title}" class="game-thumb" 
                     onerror="this.src='https://via.placeholder.com/50x50/000635/ffffff?text=🎮'">
            </td>
            <td class="game-title-cell">
                <strong>${game.title}</strong>
                <br>
                <small>${game.description.substring(0, 50)}...</small>
            </td>
            <td>
                <span class="category-badge ${game.category}">${getCategoryName(game.category)}</span>
                ${game.subcategory ? `<br><small>${game.subcategory}</small>` : ''}
            </td>
            <td><span class="size-badge">${game.size}</span></td>
            <td><span class="downloads-badge">${formatNumber(game.downloads || 0)}</span></td>
            <td>${formattedDate}</td>
            <td class="actions-cell">
                <button class="action-btn edit-btn" data-id="${game.id}" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${game.id}" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="action-btn view-btn" data-id="${game.id}" title="معاينة">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // إضافة أحداث للأزرار
    addGamesTableEvents();
}

// إضافة أحداث لأزرار الجدول
function addGamesTableEvents() {
    // زر التعديل
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            window.location.href = `edit-game.html?id=${gameId}`;
        });
    });
    
    // زر الحذف
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            const game = gamesData.find(g => g.id === gameId);
            
            if (game) {
                showConfirm(`هل أنت متأكد من حذف "${game.title}"؟`, function() {
                    deleteGame(gameId);
                });
            }
        });
    });
    
    // زر المعاينة
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            const game = gamesData.find(g => g.id === gameId);
            
            if (game) {
                showGamePreview(game);
            }
        });
    });
}

// حذف لعبة
function deleteGame(gameId) {
    const index = gamesData.findIndex(g => g.id === gameId);
    
    if (index !== -1) {
        gamesData.splice(index, 1);
        
        // حفظ التغييرات
        saveGamesData();
        
        // تحديث العرض
        displayRecentGames();
        updateGamesCount();
        
        showAlert('✅ تم حذف اللعبة بنجاح', 'success');
    }
}

// حفظ البيانات
function saveGamesData() {
    try {
        localStorage.setItem('snoydown_games', JSON.stringify(gamesData));
        
        // في بيئة حقيقية، هنا سيتم إرسال لسيرفر
        console.log('💾 تم حفظ البيانات محلياً');
        return true;
    } catch (error) {
        console.error('❌ خطأ في حفظ البيانات:', error);
        return false;
    }
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
                         onerror="this.parentElement.innerHTML='<p style=\"color:red;padding:20px;\">❌ تعذر تحميل الصورة</p>';">
                    <p style="word-break: break-all; font-size: 12px; margin-top: 5px;">${this.value}</p>
                `;
            } else {
                imagePreview.innerHTML = '<p>معاينة الصورة ستظهر هنا</p>';
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
                <input type="text" class="link-name" placeholder="اسم الرابط (مثال: التحميل المباشر)" required>
                <input type="url" class="link-url" placeholder="https://example.com/download" required>
                <input type="text" class="link-size" placeholder="الحجم (مثال: 95 GB)" required>
                <button type="button" class="remove-link-btn"><i class="fas fa-times"></i></button>
            `;
            
            linksContainer.appendChild(newRow);
            
            // إضافة حدث لحذف الصف
            newRow.querySelector('.remove-link-btn').addEventListener('click', function() {
                if (linksContainer.children.length > 1) {
                    this.parentElement.remove();
                } else {
                    showAlert('❌ يجب أن يكون هناك رابط تحميل واحد على الأقل', 'error');
                }
            });
        });
        
        // إضافة حدث للحذف للرابط الأول
        const firstRemoveBtn = linksContainer.querySelector('.remove-link-btn');
        if (firstRemoveBtn) {
            firstRemoveBtn.addEventListener('click', function() {
                showAlert('❌ يجب أن يكون هناك رابط تحميل واحد على الأقل', 'error');
            });
        }
    }
    
    // إضافة صور إضافية
    const addScreenshotBtn = document.getElementById('addScreenshotBtn');
    const screenshotsContainer = document.getElementById('screenshotsContainer');
    
    if (addScreenshotBtn && screenshotsContainer) {
        addScreenshotBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'url';
            input.className = 'screenshot-input';
            input.placeholder = 'https://example.com/screenshot.jpg';
            
            screenshotsContainer.appendChild(input);
        });
    }
    
    // معاينة التقييم
    const ratingInput = document.getElementById('gameRating');
    const ratingStars = document.getElementById('ratingStars');
    const ratingValue = document.getElementById('ratingValue');
    
    if (ratingInput && ratingStars && ratingValue) {
        ratingInput.addEventListener('input', function() {
            const rating = parseFloat(this.value) || 0;
            const clampedRating = Math.min(5, Math.max(0, rating));
            this.value = clampedRating.toFixed(1);
            
            ratingValue.textContent = clampedRating.toFixed(1);
            
            // تحديث النجوم
            let stars = '';
            const fullStars = Math.floor(clampedRating);
            const halfStar = clampedRating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) stars += '⭐';
            if (halfStar) stars += '⭐';
            
            ratingStars.textContent = stars;
        });
        
        // تشغيل الحدث الأولي
        ratingInput.dispatchEvent(new Event('input'));
    }
    
    // زر المعاينة
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    
    if (previewBtn && previewModal) {
        previewBtn.addEventListener('click', function() {
            if (!validateGameForm()) {
                showAlert('❌ يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
                return;
            }
            
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
    
    // تغيير النوع يغير التصنيف
    const gameType = document.getElementById('gameType');
    const gameCategory = document.getElementById('gameCategory');
    
    if (gameType && gameCategory) {
        gameType.addEventListener('change', function() {
            const type = this.value;
            let defaultCategory = '';
            
            switch(type) {
                case 'game': defaultCategory = 'pc-games'; break;
                case 'program': defaultCategory = 'programs'; break;
                case 'app': defaultCategory = 'apps'; break;
                case 'apk': defaultCategory = 'apk'; break;
                case 'ps': defaultCategory = 'ps-games'; break;
            }
            
            if (defaultCategory) {
                gameCategory.value = defaultCategory;
            }
        });
    }
    
    // إرسال النموذج
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateGameForm()) {
            showAlert('❌ يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
            return;
        }
        
        const gameData = getFormData();
        
        // التحقق إذا كان المعرف موجود مسبقاً
        const existingGame = gamesData.find(g => g.id === gameData.id);
        if (existingGame) {
            showAlert('❌ هذا المعرف مستخدم مسبقاً، يرجى اختيار معرف آخر', 'error');
            document.getElementById('gameId').focus();
            return;
        }
        
        try {
            // إضافة للبيانات المحلية
            gamesData.unshift(gameData);
            
            // حفظ البيانات
            saveGamesData();
            
            showAlert('✅ تم إضافة اللعبة بنجاح!', 'success');
            
            // الانتقال للوحة التحكم أو إعادة تعيين النموذج
            setTimeout(() => {
                if (confirm('هل تريد إضافة لعبة أخرى؟')) {
                    form.reset();
                    // إعادة تعيين معاينة الصورة
                    if (imagePreview) imagePreview.innerHTML = '<p>معاينة الصورة ستظهر هنا</p>';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1000);
            
        } catch (error) {
            console.error('❌ خطأ في حفظ اللعبة:', error);
            showAlert('❌ حدث خطأ أثناء حفظ اللعبة', 'error');
        }
    });
}

// التحقق من صحة النموذج
function validateGameForm() {
    const requiredFields = [
        'gameTitle', 'gameId', 'gameDescription', 'gameCategory',
        'gameType', 'gameSize', 'gameImage'
    ];
    
    // التحقق من الحقول المطلوبة
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            field?.focus();
            return false;
        }
    }
    
    // التحقق من صحة المعرف
    const gameId = document.getElementById('gameId').value;
    if (!/^[a-z0-9_]+$/.test(gameId)) {
        showAlert('❌ المعرف يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام و _ فقط', 'error');
        document.getElementById('gameId').focus();
        return false;
    }
    
    // التحقق من روابط التحميل
    const hasValidDownloadLinks = Array.from(document.querySelectorAll('.download-link-row')).some(row => {
        const name = row.querySelector('.link-name').value;
        const url = row.querySelector('.link-url').value;
        const size = row.querySelector('.link-size').value;
        return name && url && size;
    });
    
    if (!hasValidDownloadLinks) {
        showAlert('❌ يجب إضافة رابط تحميل واحد على الأقل بشكل صحيح', 'error');
        return false;
    }
    
    // التحقق من رابط الصورة
    const imageUrl = document.getElementById('gameImage').value;
    if (!isValidUrl(imageUrl)) {
        showAlert('❌ رابط الصورة غير صالح', 'error');
        return false;
    }
    
    return true;
}

// الحصول على بيانات النموذج
function getFormData() {
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
        if (input.value.trim()) screenshots.push(input.value.trim());
    });
    
    // إنشاء معرف فريد إذا لم يدخل المستخدم
    let gameId = document.getElementById('gameId').value.trim();
    if (!gameId) {
        gameId = document.getElementById('gameTitle').value
            .toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');
    }
    
    // الحصول على المواصفات
    let specs = {};
    try {
        const specsText = document.getElementById('gameSpecs').value.trim();
        if (specsText) {
            specs = JSON.parse(specsText);
        }
    } catch (e) {
        // تجاهل الخطأ، سنترك المواصفات فارغة
    }
    
    return {
        id: gameId,
        title: document.getElementById('gameTitle').value.trim(),
        description: document.getElementById('gameDescription').value.trim(),
        category: document.getElementById('gameCategory').value,
        subcategory: document.getElementById('gameSubcategory').value.trim() || '',
        type: document.getElementById('gameType').value,
        downloads: parseInt(document.getElementById('gameDownloads').value) || 0,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        size: document.getElementById('gameSize').value.trim(),
        image: document.getElementById('gameImage').value.trim(),
        screenshots: screenshots.length > 0 ? screenshots : [],
        specs: specs,
        downloadLinks: downloadLinks,
        featured: document.getElementById('featuredGame')?.checked || false,
        trending: document.getElementById('trendingGame')?.checked || false,
        addedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString()
    };
}

// ========== معاينة اللعبة ==========
function displayPreview(gameData) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;
    
    // توليد النجوم
    const fullStars = Math.floor(gameData.rating);
    const halfStar = gameData.rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    if (halfStar) stars += '⭐';
    
    previewContent.innerHTML = `
        <div class="preview-game">
            <div class="preview-header">
                <img src="${gameData.image}" alt="${gameData.title}" class="preview-image"
                     onerror="this.src='https://via.placeholder.com/300x200/000635/ffffff?text=🎮'">
                <div class="preview-info">
                    <h3>${gameData.title}</h3>
                    <p><strong>المعرف:</strong> <code>${gameData.id}</code></p>
                    <p><strong>النوع:</strong> ${getTypeName(gameData.type)}</p>
                    <p><strong>التصنيف:</strong> ${getCategoryName(gameData.category)}</p>
                    <p><strong>التقييم:</strong> ${stars} (${gameData.rating}/5)</p>
                    <p><strong>الحجم:</strong> ${gameData.size}</p>
                    <p><strong>التحميلات:</strong> ${formatNumber(gameData.downloads)}</p>
                </div>
            </div>
            
            <div class="preview-section">
                <h4><i class="fas fa-align-right"></i> الوصف:</h4>
                <p>${gameData.description}</p>
            </div>
            
            <div class="preview-section">
                <h4><i class="fas fa-download"></i> روابط التحميل (${gameData.downloadLinks.length}):</h4>
                <ul class="download-links-list">
                    ${gameData.downloadLinks.map(link => 
                        `<li>
                            <strong>${link.name}</strong> - ${link.size}
                            <br>
                            <small><a href="${link.url}" target="_blank">${truncateUrl(link.url, 50)}</a></small>
                        </li>`
                    ).join('')}
                </ul>
            </div>
            
            ${gameData.screenshots.length > 0 ? `
            <div class="preview-section">
                <h4><i class="fas fa-images"></i> الصور الإضافية (${gameData.screenshots.length}):</h4>
                <div class="screenshots-preview">
                    ${gameData.screenshots.map(url => 
                        `<img src="${url}" alt="screenshot" 
                              onerror="this.style.display='none'">`
                    ).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="preview-section">
                <h4><i class="fas fa-cogs"></i> المواصفات:</h4>
                ${Object.keys(gameData.specs).length > 0 ? 
                    `<pre>${JSON.stringify(gameData.specs, null, 2)}</pre>` :
                    '<p>لا توجد مواصفات محددة</p>'
                }
            </div>
            
            <div class="preview-section">
                <h4><i class="fas fa-tags"></i> الخيارات:</h4>
                <div class="options-grid">
                    <span class="option-badge ${gameData.featured ? 'active' : ''}">
                        ${gameData.featured ? '✅ مميزة' : '❌ غير مميزة'}
                    </span>
                    <span class="option-badge ${gameData.trending ? 'active' : ''}">
                        ${gameData.trending ? '✅ شائعة' : '❌ غير شائعة'}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// ========== تعديل لعبة ==========
function initEditGame() {
    // الحصول على معرف اللعبة من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (!gameId) {
        showAlert('❌ لم يتم تحديد لعبة للتعديل', 'error');
        setTimeout(() => window.location.href = 'dashboard.html', 2000);
        return;
    }
    
    // تحميل بيانات اللعبة
    loadGamesData().then(() => {
        const game = gamesData.find(g => g.id === gameId);
        
        if (!game) {
            showAlert('❌ اللعبة غير موجودة', 'error');
            setTimeout(() => window.location.href = 'dashboard.html', 2000);
            return;
        }
        
        // تعبئة النموذج ببيانات اللعبة
        fillEditForm(game);
        initEditForm(game);
    });
}

function fillEditForm(game) {
    // تعبئة الحقول الأساسية
    document.getElementById('gameTitle').value = game.title;
    document.getElementById('gameId').value = game.id;
    document.getElementById('gameId').readOnly = true; // لا يمكن تغيير المعرف
    document.getElementById('gameDescription').value = game.description;
    document.getElementById('gameCategory').value = game.category;
    document.getElementById('gameSubcategory').value = game.subcategory || '';
    document.getElementById('gameType').value = game.type;
    document.getElementById('gameDownloads').value = game.downloads || 0;
    document.getElementById('gameRating').value = game.rating || 4.5;
    document.getElementById('gameSize').value = game.size;
    document.getElementById('gameImage').value = game.image;
    
    // تعبئة المواصفات
    if (game.specs && Object.keys(game.specs).length > 0) {
        document.getElementById('gameSpecs').value = JSON.stringify(game.specs, null, 2);
    }
    
    // تعبئة روابط التحميل
    const linksContainer = document.getElementById('downloadLinksContainer');
    linksContainer.innerHTML = '';
    
    if (game.downloadLinks && game.downloadLinks.length > 0) {
        game.downloadLinks.forEach((link, index) => {
            const row = document.createElement('div');
            row.className = 'download-link-row';
            row.innerHTML = `
                <input type="text" class="link-name" value="${link.name}" placeholder="اسم الرابط" required>
                <input type="url" class="link-url" value="${link.url}" placeholder="رابط التحميل" required>
                <input type="text" class="link-size" value="${link.size}" placeholder="الحجم" required>
                ${index === 0 ? '' : '<button type="button" class="remove-link-btn"><i class="fas fa-times"></i></button>'}
            `;
            linksContainer.appendChild(row);
        });
    } else {
        // رابط افتراضي
        const row = document.createElement('div');
        row.className = 'download-link-row';
        row.innerHTML = `
            <input type="text" class="link-name" placeholder="اسم الرابط" required>
            <input type="url" class="link-url" placeholder="رابط التحميل" required>
            <input type="text" class="link-size" placeholder="الحجم" required>
        `;
        linksContainer.appendChild(row);
    }
    
    // تعبئة الصور الإضافية
    const screenshotsContainer = document.getElementById('screenshotsContainer');
    screenshotsContainer.innerHTML = '';
    
    if (game.screenshots && game.screenshots.length > 0) {
        game.screenshots.forEach(url => {
            const input = document.createElement('input');
            input.type = 'url';
            input.className = 'screenshot-input';
            input.value = url;
            screenshotsContainer.appendChild(input);
        });
    }
    
    // تعبئة الخيارات
    document.getElementById('featuredGame').checked = game.featured || false;
    document.getElementById('trendingGame').checked = game.trending || false;
    document.getElementById('newGame').checked = game.new || false;
    
    // تحديث العنوان
    document.title = `تعديل ${game.title} - SnoyDown`;
    
    // تحديث معاينة الصورة
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview && game.image) {
        imagePreview.innerHTML = `
            <img src="${game.image}" alt="معاينة" 
                 onerror="this.parentElement.innerHTML='<p style=\"color:red;padding:20px;\">❌ تعذر تحميل الصورة</p>';">
            <p style="word-break: break-all; font-size: 12px; margin-top: 5px;">${game.image}</p>
        `;
    }
    
    // تحديث معاينة التقييم
    const ratingInput = document.getElementById('gameRating');
    if (ratingInput) {
        ratingInput.dispatchEvent(new Event('input'));
    }
}

function initEditForm(originalGame) {
    const form = document.getElementById('addGameForm');
    if (!form) return;
    
    // تغيير عنوان النموذج
    const formTitle = form.querySelector('legend') || form.querySelector('h1');
    if (formTitle) {
        formTitle.innerHTML = `<i class="fas fa-edit"></i> تعديل لعبة: ${originalGame.title}`;
    }
    
    // تغيير زر الحفظ
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-save"></i> حفظ التعديلات';
    }
    
    // إضافة زر الحذف
    const formActions = form.querySelector('.form-actions');
    if (formActions) {
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> حذف اللعبة';
        deleteBtn.style.background = '#dc3545';
        
        deleteBtn.addEventListener('click', function() {
            showConfirm(`هل أنت متأكد من حذف "${originalGame.title}"؟ هذا الإجراء لا يمكن التراجع عنه.`, function() {
                deleteGame(originalGame.id);
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            });
        });
        
        formActions.appendChild(deleteBtn);
    }
    
    // إرسال النموذج (تعديل)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateGameForm()) {
            showAlert('❌ يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
            return;
        }
        
        const updatedGame = getFormData();
        
        // تحديث البيانات
        const index = gamesData.findIndex(g => g.id === originalGame.id);
        if (index !== -1) {
            // حفظ بعض البيانات القديمة
            updatedGame.downloads = gamesData[index].downloads;
            updatedGame.addedDate = gamesData[index].addedDate;
            updatedGame.lastUpdated = new Date().toISOString();
            
            gamesData[index] = updatedGame;
            
            // حفظ البيانات
            saveGamesData();
            
            showAlert('✅ تم تحديث اللعبة بنجاح!', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });
}

// ========== دوال مساعدة ==========

function formatNumber(num) {
    if (typeof num !== 'number') num = parseInt(num) || 0;
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function getCategoryName(category) {
    const categories = {
        'pc-games': 'ألعاب PC',
        'mobile-games': 'ألعاب جوال',
        'programs': 'البرامج',
        'apps': 'التطبيقات',
        'apk': 'APK محمي',
        'ps-games': 'ألعاب PlayStation'
    };
    return categories[category] || category;
}

function getTypeName(type) {
    const types = {
        'game': 'لعبة',
        'program': 'برنامج',
        'app': 'تطبيق',
        'apk': 'APK محمي',
        'ps': 'PlayStation'
    };
    return types[type] || type;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function truncateUrl(url, maxLength) {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
}

function showAlert(message, type = 'info') {
    // إزالة أي تنبيهات سابقة
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();
    
    // إنشاء التنبيه
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // إضافة حدث الإغلاق
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.remove();
    });
    
    // إزالة تلقائية بعد 5 ثواني
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function showConfirm(message, callback) {
    // إزالة أي تأكيدات سابقة
    const existingConfirm = document.querySelector('.custom-confirm');
    if (existingConfirm) existingConfirm.remove();
    
    // إنشاء نافذة التأكيد
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'custom-confirm';
    confirmDiv.innerHTML = `
        <div class="confirm-content">
            <div class="confirm-message">${message}</div>
            <div class="confirm-buttons">
                <button class="confirm-btn confirm-yes">نعم</button>
                <button class="confirm-btn confirm-no">لا</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmDiv);
    
    // أحداث الأزرار
    confirmDiv.querySelector('.confirm-yes').addEventListener('click', () => {
        confirmDiv.remove();
        callback();
    });
    
    confirmDiv.querySelector('.confirm-no').addEventListener('click', () => {
        confirmDiv.remove();
    });
}

function showGamePreview(game) {
    const previewModal = document.createElement('div');
    previewModal.className = 'modal';
    previewModal.style.display = 'block';
    
    previewModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3><i class="fas fa-eye"></i> معاينة: ${game.title}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                ${generateGamePreviewHTML(game)}
            </div>
            <div class="modal-footer">
                <a href="../game.html?id=${game.id}" target="_blank" class="btn primary-btn">
                    <i class="fas fa-external-link-alt"></i> فتح في الموقع
                </a>
                <button class="btn secondary-btn close-modal">إغلاق</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(previewModal);
    
    // إضافة أحداث الإغلاق
    previewModal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            previewModal.remove();
        });
    });
    
    // إغلاق بالنقر خارج النافذة
    previewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

function generateGamePreviewHTML(game) {
    const stars = '⭐'.repeat(Math.floor(game.rating)) + 
                 (game.rating % 1 >= 0.5 ? '⭐' : '');
    
    return `
        <div class="game-preview">
            <div class="preview-header">
                <img src="${game.image}" alt="${game.title}" 
                     onerror="this.src='https://via.placeholder.com/300x200/000635/ffffff?text=🎮'">
                <div class="preview-info">
                    <h3>${game.title}</h3>
                    <p><strong>التصنيف:</strong> ${getCategoryName(game.category)}</p>
                    <p><strong>النوع:</strong> ${getTypeName(game.type)}</p>
                    <p><strong>الحجم:</strong> ${game.size}</p>
                    <p><strong>التقييم:</strong> ${stars} (${game.rating}/5)</p>
                    <p><strong>التحميلات:</strong> ${formatNumber(game.downloads)}</p>
                </div>
            </div>
            
            <div class="preview-section">
                <h4>الوصف:</h4>
                <p>${game.description}</p>
            </div>
            
            <div class="preview-section">
                <h4>روابط التحميل (${game.downloadLinks.length}):</h4>
                <ul>
                    ${game.downloadLinks.map(link => 
                        `<li><strong>${link.name}</strong> - ${link.size}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
    `;
}

// ========== تهيئة النظام ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 نظام إدارة SnoyDown يبدأ التحميل...');
    
    // 1. التحقق من المصادقة (لجميع الصفحات ما عدا صفحة الدخول)
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage !== 'index.html' && currentPage !== '') {
        if (!checkAuth()) return;
    }
    
    // 2. تهيئة النظام حسب الصفحة
    switch(currentPage) {
        case 'index.html':
        case '':
            initAuth();
            break;
            
        case 'dashboard.html':
            initLogout();
            loadGamesData();
            initDashboard();
            break;
            
        case 'add-game.html':
            loadGamesData().then(() => initAddGameForm());
            break;
            
        case 'edit-game.html':
            loadGamesData().then(() => initEditGame());
            break;
    }
    
    // 3. تهيئة الأحداث العامة
    initGeneralEvents();
    
    console.log('✅ نظام الإدارة جاهز');
});

function initDashboard() {
    // عرض قائمة كاملة للألعاب عند النقر على الزر
    const gamesListBtn = document.getElementById('gamesListBtn');
    const allGamesModal = document.getElementById('allGamesModal');
    
    if (gamesListBtn && allGamesModal) {
        gamesListBtn.addEventListener('click', function() {
            showAllGamesModal();
        });
    }
    
    // إضافة أحداث للأزرار السريعة
    document.getElementById('addGameBtn')?.addEventListener('click', () => {
        window.location.href = 'add-game.html';
    });
    
    document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
    document.getElementById('backupBtn')?.addEventListener('click', createBackup);
    document.getElementById('clearCacheBtn')?.addEventListener('click', clearCache);
}

function showAllGamesModal() {
    const modal = document.getElementById('allGamesModal');
    if (!modal) return;
    
    const gamesList = document.getElementById('allGamesList');
    const searchInput = document.getElementById('searchGames');
    const filterSelect = document.getElementById('filterCategory');
    
    if (!gamesList) return;
    
    // تعبئة القائمة
    gamesList.innerHTML = '';
    
    gamesData.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-list-item';
        gameItem.innerHTML = `
            <img src="${game.image}" alt="${game.title}" 
                 onerror="this.src='https://via.placeholder.com/50x50/000635/ffffff?text=🎮'">
            <div class="game-list-info">
                <h4>${game.title}</h4>
                <p>${getCategoryName(game.category)} • ${game.size} • ${formatNumber(game.downloads)} تحميل</p>
            </div>
            <div class="game-list-actions">
                <a href="edit-game.html?id=${game.id}" class="action-btn" title="تعديل">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="../game.html?id=${game.id}" target="_blank" class="action-btn" title="عرض">
                    <i class="fas fa-eye"></i>
                </a>
            </div>
        `;
        gamesList.appendChild(gameItem);
    });
    
    // تصفية البحث
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = gamesList.querySelectorAll('.game-list-item');
            
            items.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                const matches = title.includes(searchTerm) || description.includes(searchTerm);
                item.style.display = matches ? 'flex' : 'none';
            });
        });
    }
    
    // تصفية حسب التصنيف
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const category = this.value;
            const items = gamesList.querySelectorAll('.game-list-item');
            
            items.forEach(item => {
                const gameCategory = item.dataset.category;
                const matches = category === 'all' || gameCategory === category;
                item.style.display = matches ? 'flex' : 'none';
            });
        });
    }
    
    // إضافة أحداث الإغلاق
    modal.querySelector('.close-modal')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // إغلاق بالنقر خارج النافذة
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    // عرض النافذة
    modal.style.display = 'block';
}

function exportData() {
    const dataStr = JSON.stringify(gamesData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `snoydown-games-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showAlert('✅ تم تصدير البيانات بنجاح', 'success');
}

function createBackup() {
    const backupData = {
        games: gamesData,
        timestamp: new Date().toISOString(),
        totalGames: gamesData.length,
        totalDownloads: gamesData.reduce((sum, game) => sum + (game.downloads || 0), 0)
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const backupName = `snoydown-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', backupName);
    linkElement.click();
    
    showAlert('✅ تم إنشاء نسخة احتياطية', 'success');
}

function clearCache() {
    localStorage.removeItem('snoydown_games');
    gamesData = [];
    
    // إعادة تحميل البيانات الأصلية
    setTimeout(() => {
        loadGamesData();
        showAlert('✅ تم مسح الكاش وإعادة تحميل البيانات', 'success');
    }, 1000);
}

function initGeneralEvents() {
    // القائمة الجانبية للأدمن
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // إضافة ستايلات للتنبيهات
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            left: 20px;
            max-width: 500px;
            margin: 0 auto;
            z-index: 9999;
            animation: slideInDown 0.3s ease;
        }
        
        .custom-alert.success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
        }
        
        .custom-alert.error {
            background: linear-gradient(135deg, #f44336, #d32f2f);
            color: white;
        }
        
        .custom-alert.info {
            background: linear-gradient(135deg, #2196F3, #1976D2);
            color: white;
        }
        
        .alert-content {
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .alert-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .custom-confirm {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .confirm-content {
            background: #1a1a2e;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .confirm-message {
            font-size: 1.2rem;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .confirm-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .confirm-btn {
            padding: 10px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
        }
        
        .confirm-yes {
            background: #dc3545;
            color: white;
        }
        
        .confirm-no {
            background: #6c757d;
            color: white;
        }
        
        @keyframes slideInDown {
            from {
                transform: translateY(-100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}
