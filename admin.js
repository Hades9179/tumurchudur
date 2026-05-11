// Admin JS — Хэрэглэгч, Түүх удирдлага (Local-only режим)
// Энэ файл нь admin.html-д хэрэглэгдэнэ. Түүхийг localStorage-д хадгалж, зураг болон мэдээллийг base64 хэлбэрээр хадгална.

// ===== ХЭРЭГЛЭГЧ МЕНЕЖМЕНТ =====
function loadUsers() {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function createNewUser() {
    const username = document.getElementById('newUsername').value.trim();
    const age = parseInt(document.getElementById('newAge').value, 10);
    const password = document.getElementById('newPassword').value;

    if (!username || !age || !password) {
        alert('Бүх талбарыг бөглөнө үү');
        return;
    }

    const users = loadUsers();
    if (users.find(u => u.username === username)) {
        alert('Энэ нэр аль хэдийнэ ашиглагдсан байна');
        return;
    }

    const user = { id: Date.now(), username, age, password, createdAt: new Date().toISOString(), points: 0 };
    users.push(user);
    saveUsers(users);
    document.getElementById('newUsername').value = '';
    document.getElementById('newAge').value = '';
    document.getElementById('newPassword').value = '';
    loadUsersTable();
    alert('Хэрэглэгч амжилттай үүслээ');
}

function loadUsersTable() {
    const users = loadUsers();
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    users.forEach((u, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${u.username}</td>
            <td>${u.age || ''}</td>
            <td>${u.createdAt ? new Date(u.createdAt).toLocaleString() : ''}</td>
            <td>${u.points || 0}</td>
            <td><button class="btn" onclick="removeUser(${u.id})">Устгах</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function removeUser(userId) {
    if (!confirm('Энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?')) return;
    let users = loadUsers();
    users = users.filter(u => u.id !== userId);
    saveUsers(users);
    loadUsersTable();
}

// ===== ТҮҮХ МЕНЕЖМЕНТ (LocalStorage дээр) =====
function loadStoredStories() {
    const raw = localStorage.getItem('customStories');
    return raw ? JSON.parse(raw) : [];
}

function saveStoredStories(list) {
    localStorage.setItem('customStories', JSON.stringify(list));
}

function loadStoriesTable() {
    const table = document.getElementById('storiesTableBody');
    if (!table) return;
    const stored = loadStoredStories();
    table.innerHTML = '';
    stored.forEach((s, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${escapeHtml(s.title)}</td>
            <td>${(s.text || '').substring(0, 80).replace(/\n/g, ' ')}...</td>
            <td>${s.image ? '<span>📷</span>' : ''}</td>
            <td><button class="btn" onclick="deleteStoredStory('${s.id}')">Устгах</button></td>
        `;
        table.appendChild(tr);
    });
}

function deleteStoredStory(id) {
    if (!confirm('Энэ түүхийг устгахдаа итгэлтэй байна уу?')) return;
    let list = loadStoredStories();
    list = list.filter(s => s.id !== id);
    saveStoredStories(list);
    loadStoriesTable();
    if (window.renderStoriesList) window.renderStoriesList();
}

// ===== TLS (File -> Base64) функц =====
function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

async function addNewStoryFromAdmin() {
    const title = document.getElementById('storyTitleInput').value.trim();
    const text = document.getElementById('storyTextInput').value.trim();
    const imageFile = document.getElementById('storyImageInput').files[0];

    if (!title || !text) {
        alert('Түүхийн гарчиг болон текст заавал шаардлагатай');
        return;
    }

    let imageData = null;
    if (imageFile) {
        // size check: 1.5MB max
        const maxBytes = 1.5 * 1024 * 1024;
        if (imageFile.size > maxBytes) {
            alert('Зураг ихтэй байна (хамгийн их 1.5MB).');
            return;
        }
        try {
            imageData = await fileToDataUrl(imageFile);
        } catch (e) {
            console.error(e);
            alert('Зургыг уншиж чадсангүй');
            return;
        }
    }

    const newStory = {
        id: 'cs_' + Date.now(),
        title,
        text,
        image: imageData,
        createdAt: new Date().toISOString()
    };

    const list = loadStoredStories();
    list.unshift(newStory);
    saveStoredStories(list);

    // цэвэрлэх
    document.getElementById('storyTitleInput').value = '';
    document.getElementById('storyTextInput').value = '';
    document.getElementById('storyImageInput').value = '';

    loadStoriesTable();
    if (window.renderStoriesList) window.renderStoriesList();
    alert('Түүх амжилттай нэмэгдлээ');
}

// ===== UI Tab шилжүүлэх =====
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(el => el.classList.remove('active'));
    const btn = document.querySelector(`.admin-tab-btn[onclick="switchAdminTab('${tab}')"]`);
    if (btn) btn.classList.add('active');
    const content = document.getElementById(tab + 'Content');
    if (content) content.classList.add('active');
}

// ===== Бутэнэ эхлүүлэх =====
document.addEventListener('DOMContentLoaded', () => {
    // users table
    loadUsersTable();
    // stories table
    loadStoriesTable();

    // hook admin buttons if present
    const createUserBtn = document.querySelector('#usersContent .btn-primary');
    if (createUserBtn) createUserBtn.addEventListener('click', createNewUser);

    const addStoryBtn = document.getElementById('addStoryBtn');
    if (addStoryBtn) addStoryBtn.addEventListener('click', addNewStoryFromAdmin);
});

// ===== Туслах функцууд =====
function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, function (c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
}
