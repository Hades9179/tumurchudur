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

// ===== Нэмэлт: Унших сэдэв (reading) ба шалгалт үүсгэх =====
function loadReadings() {
    const raw = localStorage.getItem('readings');
    return raw ? JSON.parse(raw) : [];
}

function saveReadings(list) {
    localStorage.setItem('readings', JSON.stringify(list));
}

// Энгийн гол санаа гаргах — эхний өгүүлбэр эсвэл гол үгсээр
function generateMainIdea(text) {
    if (!text) return '';
    // 1) Анхны өгүүлбэрийг болгох
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
    const first = sentences[0] ? sentences[0].trim() : '';
    // 2) Түгээмэл үгс (stopwords хасагдсан) дээр тулгуурлах
    const stop = new Set(['ба','нь','нь.','болон','гэж','ямар','гэх мэт','түүний','дараа','гэснээр','дээш','доош']);
    const words = text.toLowerCase().replace(/[^а-яёөүіґ\s]/gi, ' ').split(/\s+/).filter(w => w && !stop.has(w));
    const freq = {};
    words.forEach(w => freq[w] = (freq[w]||0)+1);
    const top = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]).join(', ');
    return first || (top ? 'Гол санаа: ' + top : '');
}

function generateTestForReading(reading) {
    // simple short-answer test: main idea + 2 supporting details
    const main = generateMainIdea(reading.text);
    const details = (reading.text || '').split(/\n/).filter(l=>l.trim()).slice(0,3);
    return {
        id: 'test_' + Date.now(),
        readingId: reading.id,
        questions: [
            { id: 'q_main', type: 'short', prompt: 'Текстийн гол санаа юу вэ?', expected: main },
            { id: 'q_d1', type: 'short', prompt: 'Тусламж үзүүлсэн нэг санаа бичнэ үү', expected: details[0] || '' },
            { id: 'q_d2', type: 'short', prompt: 'Өөр нэг дэмжих санаа бичнэ үү', expected: details[1] || '' }
        ]
    };
}

function addNewReadingFromAdmin() {
    const title = (document.getElementById('readingTitleInput')||{}).value || '';
    const text = (document.getElementById('readingTextInput')||{}).value || '';
    if (!title || !text) { alert('Гарчиг болон текст оруулна уу'); return; }
    const readings = loadReadings();
    const reading = { id: 'r_' + Date.now(), title, text, createdAt: new Date().toISOString() };
    readings.unshift(reading);
    saveReadings(readings);
    // мөн тест үүсгэж хадгална
    const test = generateTestForReading(reading);
    const tests = loadReadingTests();
    tests.unshift(test);
    saveReadingTests(tests);
    document.getElementById('readingTitleInput').value = '';
    document.getElementById('readingTextInput').value = '';
    loadReadingsTable();
    alert('Унших сэдэв болон шалгалт амжилттай бий боллоо');
}

function loadReadingsTable() {
    const tbody = document.getElementById('readingsTableBody');
    if (!tbody) return;
    const list = loadReadings();
    tbody.innerHTML = '';
    list.forEach((r,i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${escapeHtml(r.title)}</td>
            <td>${(r.text||'').substring(0,80).replace(/\n/g,' ')}...</td>
            <td>${r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</td>
            <td>
              <button class="btn" onclick="deleteReading('${r.id}')">Устгах</button>
              <button class="btn" onclick="viewReading('${r.id}')">Харах</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteReading(id) {
    if (!confirm('Энэ унших сэдвийг устгах уу?')) return;
    let l = loadReadings(); l = l.filter(x=>x.id !== id); saveReadings(l);
    // мөн тестүүдийг устгана
    let tests = loadReadingTests(); tests = tests.filter(t=>t.readingId !== id); saveReadingTests(tests);
    loadReadingsTable();
}

function viewReading(id) {
    const list = loadReadings();
    const r = list.find(x=>x.id===id); if (!r) return alert('Сэдэв олдсонгүй');
    // нээх шинэ цонх эсвэл modal-д харуулах хялбар арга
    const w = window.open('', '_blank');
    w.document.write(`<h2>${escapeHtml(r.title)}</h2><pre>${escapeHtml(r.text)}</pre>`);
}

// ===== Шалгалтын өгөгдөл хадгалах =====
function loadReadingTests() { const raw = localStorage.getItem('readingTests'); return raw?JSON.parse(raw):[]; }
function saveReadingTests(list) { localStorage.setItem('readingTests', JSON.stringify(list)); }

// ===== Оюутны хариулт, багшийн оноо =====
function loadSubmissions() { const raw = localStorage.getItem('readingSubmissions'); return raw?JSON.parse(raw):[]; }
function saveSubmissions(list) { localStorage.setItem('readingSubmissions', JSON.stringify(list)); }

// Оюутан шалгалт өгөх үед дуу бичиж, бичсэн транскрипцыг авах
function startSpeechRecognition(expectedText, onResult, onError) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { onError && onError('Browser does not support SpeechRecognition'); return; }
    const rec = new SpeechRecognition();
    rec.lang = 'mn-MN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        onResult && onResult(transcript);
    };
    rec.onerror = (ev) => { onError && onError(ev.error || 'recognition_error'); };
    rec.start();
    return rec; // so caller can stop() if needed
}

function computeReadSimilarity(expected, actual) {
    if (!expected || !actual) return 0;
    const norm = s => s.toLowerCase().replace(/[^а-яёөүіґ\s]/gi,'').split(/\s+/).filter(Boolean);
    const eWords = norm(expected);
    const aWords = norm(actual);
    const setE = new Set(eWords);
    let match = 0;
    aWords.forEach(w => { if (setE.has(w)) match++; });
    const score = Math.round((match / Math.max(eWords.length,1)) * 100);
    return score; // percent
}

// Оюутан уншиж оношлоод хадгалах функц (frontend-д ашиглана)
function submitReadingPerformance(studentId, readingId, transcript, answers) {
    const subs = loadSubmissions();
    const entry = {
        id: 'sub_' + Date.now(),
        studentId: studentId || 'anonymous',
        readingId,
        transcript,
        answers: answers || {},
        createdAt: new Date().toISOString(),
        score: null,
        teacherFeedback: null
    };
    subs.unshift(entry);
    saveSubmissions(subs);
    return entry;
}

function loadSubmissionsTable() {
    const tbody = document.getElementById('submissionsTableBody');
    if (!tbody) return;
    const subs = loadSubmissions();
    tbody.innerHTML = '';
    subs.forEach((s,i)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${s.studentId}</td>
            <td>${s.readingId}</td>
            <td>${s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}</td>
            <td>${s.score===null? '—' : s.score}</td>
            <td>
              <button class="btn" onclick="viewSubmission('${s.id}')">Харах</button>
              <button class="btn" onclick="gradeSubmissionPrompt('${s.id}')">Оноо өгөх</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewSubmission(id) {
    const subs = loadSubmissions(); const s = subs.find(x=>x.id===id); if (!s) return alert('Оноо олдсонгүй');
    const r = loadReadings().find(x=>x.id===s.readingId) || {};
    const w = window.open('', '_blank');
    w.document.write(`<h3>Оюутан: ${escapeHtml(s.studentId)}</h3><h4>Сэдэв: ${escapeHtml(r.title||s.readingId)}</h4><p>Текст: <pre>${escapeHtml(r.text||'')}</pre></p><p>Транскрипт: <pre>${escapeHtml(s.transcript||'')}</pre></p><p>Оноо: ${s.score===null?'—':s.score}</p><p>Багшийн санал: ${escapeHtml(s.teacherFeedback||'')}</p>`);
}

function gradeSubmissionPrompt(id) {
    const score = prompt('Оноо (0-100) оруулна уу:');
    if (score === null) return;
    const sc = parseInt(score,10);
    if (isNaN(sc) || sc < 0 || sc > 100) return alert('Зөв оноо оруулна уу');
    const feedback = prompt('Багшийн сэтгэгдэл (заавал биш):') || '';
    const subs = loadSubmissions();
    const s = subs.find(x=>x.id===id); if (!s) return alert('Оноо олдсонгүй');
    s.score = sc; s.teacherFeedback = feedback; saveSubmissions(subs);
    loadSubmissionsTable();
    alert('Оноо хадгалагдлаа');
}

// ===== Студент талын тусгай функцууд: Уншиж, дуу бичиж, шалгах =====
// Энэ функцыг student-side-ийн JS-д ашиглана
function assessStudentReading(studentId, readingId, onComplete, config) {
    const r = loadReadings().find(x=>x.id===readingId);
    if (!r) return onComplete && onComplete({ error: 'reading_not_found' });
    // start speech recognition
    startSpeechRecognition(r.text, (transcript) => {
        const similarity = computeReadSimilarity(r.text, transcript);
        // хэрвээ similarity > threshold бол PASS
        const threshold = (config && config.threshold) || 65;
        const passed = similarity >= threshold;
        const submission = submitReadingPerformance(studentId, readingId, transcript, {});
        submission.autoScore = similarity; // авто үнэлгээ
        submission.passed = passed;
        saveSubmissions(loadSubmissions());
        onComplete && onComplete({ passed, similarity, submission });
    }, (err)=>{
        onComplete && onComplete({ error: err });
    });
}

// admin initialization дээр шинэ таблицуудыг ачааллах
(function adminInitExtras() {
    document.addEventListener('DOMContentLoaded', ()=>{
        // readings
        loadReadingsTable();
        // reading tests - not listed in UI yet but saved
        // submissions
        loadSubmissionsTable();

        const addReadingBtn = document.getElementById('addReadingBtn');
        if (addReadingBtn) addReadingBtn.addEventListener('click', addNewReadingFromAdmin);
    });
})();
