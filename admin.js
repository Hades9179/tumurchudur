// ===== АДМИН ПАНЕЛ ФУНКЦҮҮД =====
let adminUsers = [];
let adminStories = [];
let adminTests = [];

// Админ өгөгдлийг ачаалах
function initializeAdmin() {
    adminUsers = JSON.parse(localStorage.getItem('users')) || [];
    adminStories = JSON.parse(localStorage.getItem('stories')) || [];
    adminTests = JSON.parse(localStorage.getItem('tests')) || [];
    
    loadUsersTable();
    loadStoriesTable();
    loadTestsTable();
    loadStatsTable();
}

// ===== ХЭРЭГЛЭГЧ УДИРДЛАГА =====
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    adminUsers.forEach((user, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.age}</td>
                <td>${user.storiesRead ? user.storiesRead.length : 0}</td>
                <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString('mn-MN') : '-'}</td>
                <td>
                    <button class="btn btn-secondary" onclick="deleteUser(${user.id})">Устгах</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function createNewUser() {
    const username = document.getElementById('newUsername').value;
    const age = document.getElementById('newAge').value;
    const password = document.getElementById('newPassword').value;

    if (!username || !age || !password) {
        alert('❌ Бүх талбарыг бөглөнө үү!');
        return;
    }

    if (adminUsers.find(u => u.username === username)) {
        alert('❌ Энэ хэрэглэгчийн нэр аль хэдийн бүртгүүлсэн!');
        return;
    }

    const newUser = {
        id: Date.now(),
        username: username,
        age: age,
        password: password,
        storiesRead: [],
        testsScores: [],
        createdAt: new Date().toISOString()
    };

    adminUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(adminUsers));

    document.getElementById('newUsername').value = '';
    document.getElementById('newAge').value = '';
    document.getElementById('newPassword').value = '';

    alert('✅ Шинэ хэрэглэгч амжилттай үүсгэлээ!');
    loadUsersTable();
}

function deleteUser(userId) {
    if (confirm('❓ Энэ хэрэглэгчийг устгах уу?')) {
        adminUsers = adminUsers.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(adminUsers));
        alert('✅ Хэрэглэгч устгагдлаа!');
        loadUsersTable();
    }
}

// ===== ТҮҮХҮҮД УДИРДЛАГА =====
function loadStoriesTable() {
    const tbody = document.getElementById('storiesTableBody');
    tbody.innerHTML = '';

    adminStories.forEach((story, index) => {
        const row = `
            <tr>
                <td>${story.title}</td>
                <td>${story.content.length} үг</td>
                <td>
                    <button class="btn btn-secondary" onclick="deleteStory(${story.id})">Устгах</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function addNewStory() {
    const title = document.getElementById('storyTitle').value;
    const emoji = document.getElementById('storyEmoji').value;
    const content = document.getElementById('storyContent').value;

    if (!title || !emoji || !content) {
        alert('❌ Бүх талбарыг бөглөнө үү!');
        return;
    }

    const newStory = {
        id: Date.now(),
        title: emoji + ' ' + title,
        description: title,
        content: content
    };

    adminStories.push(newStory);
    localStorage.setItem('stories', JSON.stringify(adminStories));

    document.getElementById('storyTitle').value = '';
    document.getElementById('storyEmoji').value = '';
    document.getElementById('storyContent').value = '';

    alert('✅ Шинэ түүх нэмэгдлээ!');
    loadStoriesTable();
}

function deleteStory(storyId) {
    if (confirm('❓ Энэ түүхийг устгах уу?')) {
        adminStories = adminStories.filter(s => s.id !== storyId);
        localStorage.setItem('stories', JSON.stringify(adminStories));
        alert('✅ Түүх устгагдлаа!');
        loadStoriesTable();
    }
}

// ===== СОРИЛТ УДИРДЛАГА =====
function loadTestsTable() {
    const tbody = document.getElementById('testsTableBody');
    tbody.innerHTML = '';

    adminTests.forEach((test, index) => {
        const storyName = getStoryName(test.story);
        const row = `
            <tr>
                <td>${test.title}</td>
                <td>${storyName}</td>
                <td>${test.question}</td>
                <td>
                    <button class="btn btn-secondary" onclick="deleteTest(${test.id})">Устгах</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function getStoryName(storyId) {
    const story = adminStories.find(s => s.id === parseInt(storyId));
    return story ? story.title : 'Үл мэдэгдэх';
}

function addNewTest() {
    const title = document.getElementById('testTitle').value;
    const story = document.getElementById('testStory').value;
    const question = document.getElementById('testQuestion').value;
    const answer = document.getElementById('testAnswer').value;

    if (!title || !story || !question || !answer) {
        alert('❌ Бүх талбарыг бөглөнө үү!');
        return;
    }

    const newTest = {
        id: Date.now(),
        title: title,
        story: story,
        question: question,
        answer: answer
    };

    adminTests.push(newTest);
    localStorage.setItem('tests', JSON.stringify(adminTests));

    document.getElementById('testTitle').value = '';
    document.getElementById('testStory').value = '';
    document.getElementById('testQuestion').value = '';
    document.getElementById('testAnswer').value = '';

    alert('✅ Шинэ сорилт нэмэгдлээ!');
    loadTestsTable();
}

function deleteTest(testId) {
    if (confirm('❓ Энэ сорилтыг устгах уу?')) {
        adminTests = adminTests.filter(t => t.id !== testId);
        localStorage.setItem('tests', JSON.stringify(adminTests));
        alert('✅ Сорилт устгагдлаа!');
        loadTestsTable();
    }
}

// ===== СТАТИСТИК =====
function loadStatsTable() {
    const tbody = document.getElementById('statsTableBody');
    tbody.innerHTML = '';

    adminUsers.forEach((user) => {
        if (user.username === 'admin') return; // Админ хүүхэлд орохгүй

        const totalStories = user.storiesRead ? user.storiesRead.length : 0;
        const testScores = user.testsScores ? user.testsScores.reduce((sum, t) => sum + t.score, 0) : 0;

        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${totalStories}</td>
                <td>${totalStories * 10}</td>
                <td>${testScores}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// ===== АДМИН ТАБ СОЛИХ =====
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + 'Content').classList.add('active');
    event.target.classList.add('active');
}

// Хуудас ачаалах үед функцийг дуудах
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});