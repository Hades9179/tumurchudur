// ===== БҮТЭЭГДЭХ ТҮҮХҮҮД =====
const defaultStories = [
    {
        id: 1,
        title: "🐺 Ноён Чоно",
        description: "Зэврэг нь агнаж явдаг түүх",
        content: "Нэг удаа, өргөн бүрийн хоорондо, ухаалаг одруулаа Ноён Чоно өндөрт хөхөрч байв. Тэр өдөр нар гүнийлгэж буй үерийн цаг байв. Ноён Чоно манайг хайж байтал, жижиг туулайг олов. Түүний гөтгөлөн сэвэг нүүрээ хэргэж авав. Туулай аяга авч, гүлгэнээр урьж байв. Ноён Чоно сэтгэлээ сүргээд, туулайг ашиглан нөхөрийг агнав. Түүний ухаан нь түүнийг аявдалд хэргүүлсэн юм."
    },
    {
        id: 2,
        title: "🐢 Аварга Яст",
        description: "Цаг хугацааны ухаалаг түүх",
        content: "Нэг удаа, цилий дор, аварга яст амьдарч байв. Түүний кабол гэхэ нь 100 жил байсан. Тэр олон жил сэтгэлээр сурч, ухаан авч байв. Нэг өдөр, хүүхэлүүд түүнийг олж, түүний ухаан сүсэглэв. Яст тэдэнд хэлэв: 'Цаг хугацаа үнэтэй зүйл. Түүнийг сайн ашигла.' Хүүхэлүүд ухаарч, ажилдаа буцав."
    },
    {
        id: 3,
        title: "🌙 Сарны Үлгэр",
        description: "Шөнийн сонирхолтой үлгэр",
        content: "Нэг шөнө, сар тэнгэрээс буүрч, дэлхийд харагдав. Сарны туяа бүх газар гэрэлтүүлэв. Сар хэлэв: 'Би шөнийн цагийн гэрэл. Би танд сэтгэлийн амар, өмнөх сөн сэтгэж өгөх үүрэг байна.' Шөнө ирсэн үед, сар сайнаар ажиллав, бүгдийг гэрэлтүүлэв."
    },
    {
        id: 4,
        title: "⭐ Одны Түүх",
        description: "Небийн баяр баясгалан",
        content: "Нэг удаа, одод нэг нь бусдаас илүү гүлгэнээр гялалзаж байв. Одны нэг нь хэлэв: 'Чи яагаа илүү ч гүлгэнээр гялалзаж байна вэ?' Ойн од хариулав: 'Би сайхан оноосуулан, сонирхолтой байдлаараа гүлгэнээр гялалзаж байна.' Бүх од нь ойны одыг сонсож, нэгэндээ дүүжилсэн."
    }
];

// ===== ЕРӨНХИЙ ФУНКЦҮҮД =====
let currentUser = null;
let allUsers = [];
let allStories = [];

// Хуудас ачаалах
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    checkUserSession();
    initializeDefaultData();
});

// Өгөгдлийг хадгалалтаас ачаалах
function loadDataFromStorage() {
    allUsers = JSON.parse(localStorage.getItem('users')) || [];
    allStories = JSON.parse(localStorage.getItem('stories')) || defaultStories;
    localStorage.setItem('stories', JSON.stringify(allStories));
}

// Анхны өгөгдлийг инициализе хийх
function initializeDefaultData() {
    if (allStories.length === 0) {
        localStorage.setItem('stories', JSON.stringify(defaultStories));
        allStories = defaultStories;
    }
}

// Хэрэглэгчийн сеанс шалгах
function checkUserSession() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showReadingPage();
    }
}

// ===== АУТ-ИН СИСТЕМ =====
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const age = document.getElementById('registerAge').value;
    const password = document.getElementById('registerPassword').value;

    if (allUsers.find(u => u.username === username)) {
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

    allUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(allUsers));

    alert('✅ Бүртгүүлэх амжилттай! Одоо нэвтэрнэ үү.');
    
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerAge').value = '';
    document.getElementById('registerPassword').value = '';
    
    switchTab('login');
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = allUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showReadingPage();
    } else {
        alert('❌ Хэрэглэгчийн нэр эсвэл нууц үг буруу!');
    }
}

function logout() {
    if (confirm('Гарах уу?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

// ===== УНШЛАГЫН ФУНКЦҮҮД =====
function showReadingPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('readingPage').style.display = 'block';
    document.getElementById('userName').textContent = `${currentUser.username} (${currentUser.age} нас)`;
    document.getElementById('logoutBtn').style.display = 'inline-block';
    document.getElementById('adminLink').style.display = currentUser.username === 'admin' ? 'inline-block' : 'none';
}

function selectStory(storyId) {
    const story = allStories.find(s => s.id === storyId);
    if (story) {
        document.getElementById('storyTitle').textContent = story.title;
        document.getElementById('textContent').textContent = story.content;
        document.getElementById('storyContent').style.display = 'block';
        
        // Уншсан түүхнүүдэд нэмэх
        if (!currentUser.storiesRead.includes(storyId)) {
            currentUser.storiesRead.push(storyId);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        // Курсор инициализе хийх
        initializeCursor();
    }
}

function goBackToStories() {
    document.getElementById('storyContent').style.display = 'none';
    document.getElementById('storyTitle').textContent = 'Түүх сонгоно уу';
}

// ===== АУДИО ФУНКЦҮҮД =====
let isAudioPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');

function toggleAudio() {
    const textContent = document.getElementById('textContent').textContent;
    
    if (isAudioPlaying) {
        audioPlayer.pause();
        isAudioPlaying = false;
        return;
    }
    
    isAudioPlaying = true;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textContent);
        utterance.lang = 'mn-MN';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = () => {
            isAudioPlaying = false;
        };
        
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    } else {
        alert('❌ Таны браузер аудио функцыг поддерж хийхгүй байна.');
        isAudioPlaying = false;
    }
}

// ===== ФОНТ ӨӨРЧЛӨХ =====
let currentFontSize = 16;

function changeFontSize(direction) {
    const textContent = document.getElementById('textContent');
    
    if (direction === 'increase') {
        currentFontSize += 2;
    } else if (direction === 'decrease') {
        currentFontSize = Math.max(12, currentFontSize - 2);
    }
    
    textContent.style.fontSize = currentFontSize + 'px';
}

// ===== CANVAS КУРСОР ФУНКЦҮҮД =====
let canvasAnimationId = null;

function initializeCursor() {
    const canvas = document.getElementById('cursorCanvas');
    const textContent = document.getElementById('textContent');
    
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 60;
    
    const ctx = canvas.getContext('2d');
    let progress = 0;
    const maxProgress = 100;
    
    function animateCursor() {
        if (isAudioPlaying) {
            progress = Math.min(progress + 0.5, maxProgress);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Фон
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Явц баар
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, (canvas.width * progress) / maxProgress, canvas.height);
        
        // Цэнхэр курсор
        const cursorX = (canvas.width * progress) / maxProgress;
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(cursorX, canvas.height / 2, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Текст
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(progress)}%`, canvas.width / 2, canvas.height - 10);
        
        canvasAnimationId = requestAnimationFrame(animateCursor);
    }
    
    if (canvasAnimationId) {
        cancelAnimationFrame(canvasAnimationId);
    }
    
    animateCursor();
}