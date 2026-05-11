// ===== ТҮҮХҮҮДИЙН ӨГӨГДӨЛ =====
const stories = {
    1: {
        title: "🐺 Ноён Чоно",
        text: `Давхар уул төнгөрсөн, санаан хориглогдсон цэвэр ойн сүүлт байлаа. Эндээ нэг ноён чоно суурьшиж байв. \n\nТэр чоно маш сайхан, маш ухаалаг байлаа. Өглө харанхуй харанхуй гүм, агнаж явдаг байв. Нэг өдөр баг нохойтой тулалдсан.\n\n"Яагаад чи миний ойг сүүлчихсэн?" гэж нэг нохой уранхай. \n\n"Өө, миний нутаг байхын учраас байна!" гэж ноён чоно хариуцав. \n\nТэгэхэд нохойчууд хэтэрхий сэтгэл татсан. Гэхдээ ноён чоно маш ухаалаг байсан тул дахин найрсаж чадсан. \n\nТэд бүгдэлмээр сайхан дөрвөн хоног суулгасан. Агнаж явдаг, нүдэнд хэвээлдэх, үл толих үгээр ярилцаа. \n\nИхэнхдээ ой дээр сайн нөхцөл үүсэх болсон. Ийнхүү ноён чоно, нохойчууд сайхан найрсаж амьдарч чадсан.`,
        audio: "story1.mp3"
    },
    2: {
        title: "🐢 Аварга Яст",
        text: `Нэг цагаан усан доор нэг аварга яст амьдардаг байлаа. Тэр яст маш эртний үе үеийн төрүүлэгч байлаа. \n\nТэр яст цагийн ухаанаар баялагын нөхцөлийг сайхан мэддэг байлаа. Нэг өдөр нэг залуу хүүхэл түүний орон суугдлыг олж хүрэв. \n\n"Аглай Яст аа, чи хэзээ ухаалаг болсон?" гэж түүнээс асуув. \n\n"Түүх, цаг хугацаа минь сургч," гэж Аварга Яст хариулав. \n\n"Тэгвэл нэг сургалт барих өгөгнө үү!" гэж хүүхэл нялх. \n\nТэгэхэд Аварга Яст санаатайгаар сум хийв. Түүнээс хүүхэл зүгээр л ухаалаг, тэвэл, цэцэглэн сэтгэлтэй болж чадсан. \n\nТэр хүүхэл өглө орж сарнахаас салам эхлүүлж мэргэжүүлчээр сурч авсан. Цаасан, мэргэн бичих чадвар нь гарчирж суллав.`,
        audio: "story2.mp3"
    },
    3: {
        title: "🌙 Сарны Үлгэр",
        text: `Нэг шөнийн цагт сар маш гүүрэлтэй байлаа. Тэр сар нэг охидтой ярилцав. \n\n"Сар аа, чи яагаад болгоомжтой гэлгэлэйж явдаг вэ?" гэж охид асуув. \n\n"Учир нь би хүн төрөлхтний өнөө орны баялаг," гэж сар хариуцав. \n\n"Ямар баялаг өнөө орной?" гэж охид сониулав. \n\n"Үзэл сүнслэг, дүн сэнслэг, сэтгэл, сургалт, амар сайн, ус тэнгиний сүнсэнэ" гэж сар сурталчилав. \n\nОхид сарны өгсөн сургалтыг хүлээн авч, сайн хүн болж чадсан. \n\nТэр охид эцэг эхийнхээ, ургалаа зүтгэл гүйцэтгэх болсон. Сарны үлгэр түүнээр баярлал болгохлоо байлаа.\n\nТэгэхээр шөнийн сар, цагаан гэрэл, сүүдэр нь хүн төрөлхтөнд яагүүлэг, сургалт өгдөг байна гэдэг түүхийн сургамж.`,
        audio: "story3.mp3"
    },
    4: {
        title: "⭐ Одны Түүх",
        text: `Эцэг нь нэгэ одны түүхийг өмөөнхөөр сургуулав. Эдгээр одны түүхүүд сүүрдэлтэй байлаа. \n\nНэг өлөг нэг нэвтэрхий од, нүдэнээ цэцэглэлгүй, гэрэлтэй байлаа. \n\n"Яагаад чи ийнхүү гэрэлтэй байдаг вэ, од аа?" гэж нэг од нь асуув. \n\n"Найзынх минь сайн сэтгэл нь манайг гэрэлтүүлдэг," гэж эхний од хариулав. \n\n"Найзынхтай сайн холбоот эсэх юм?" гэж нэгэнэ нэгэнээ ярилцав. \n\n"Баялаг шүү дээ," гэж эхний од сургалц сургуулав. \n\nТэгэхээр өглө харанхуй номнол ус буцалдад одны хүүхэлтэй цавуувч сайхан нэгдэлжээ. \n\nОдны түүх төгсөж, тэ��гэр оргиллов. Хүн төрөлхтөн сарны гэрэл, одны лэгээ, сэтгэл сээр баярлал авч ирэв. \n\nОдтой өнөө орон сайхан байж амьдарч чадсан гэсэн түүхэй.`,
        audio: "story4.mp3"
    }
};

// ===== ЛОКАЛ СТОРАЖ УДИРДЛАГА =====
class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
    }

    loadUsers() {
        const saved = localStorage.getItem('users');
        return saved ? JSON.parse(saved) : [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    loadCurrentUser() {
        const saved = localStorage.getItem('currentUser');
        return saved ? JSON.parse(saved) : null;
    }

    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    }

    register(username, age, password) {
        if (this.users.find(u => u.username === username)) {
            return { success: false, message: "Энэ нэр аль хэдийнэ ашиглагдсан байна" };
        }

        const user = {
            id: Date.now(),
            username,
            age: parseInt(age),
            password,
            createdAt: new Date().toISOString(),
            readingProgress: [],
            stats: { storiesRead: 0, totalReadTime: 0 }
        };

        this.users.push(user);
        this.saveUsers();
        return { success: true, message: "Амжилттай бүртгүүлсэн" };
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (!user) {
            return { success: false, message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу" };
        }

        this.currentUser = user;
        this.saveCurrentUser();
        return { success: true, message: "Амжилттай нэвтэрлээ" };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isAdmin() {
        return this.currentUser && this.currentUser.username === 'admin';
    }

    addStoryProgress(storyId) {
        if (this.currentUser) {
            if (!this.currentUser.readingProgress.includes(storyId)) {
                this.currentUser.readingProgress.push(storyId);
            }
            this.currentUser.stats.storiesRead = this.currentUser.readingProgress.length;
            this.saveCurrentUser();
            this.users = this.users.map(u => u.id === this.currentUser.id ? this.currentUser : u);
            this.saveUsers();
        }
    }
}

// ===== АУДИО МЕНЕДЖЕР =====
class AudioManager {
    constructor() {
        this.isPlaying = false;
    }

    playNarration(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'mn-MN';
            utterance.rate = 0.9;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
            this.isPlaying = true;
        }
    }

    stop() {
        window.speechSynthesis.cancel();
        this.isPlaying = false;
    }
}

// ===== КУРСОР АНИМАЦ МЕНЕДЖЕР =====
class CursorAnimator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;
        this.y = 20;
        this.speed = 2;
        this.isAnimating = false;
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 50;
    }

    animateCursor(text) {
        this.isAnimating = true;
        const textWidth = this.ctx.measureText(text).width;
        const maxX = this.canvas.width - 20;

        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Цэнхэр курсор зурах
            this.ctx.fillStyle = '#0099ff';
            this.ctx.fillRect(this.x, this.y, 3, 25);
            
            // Текст зурах
            this.ctx.fillStyle = '#333';
            this.ctx.font = '14px Arial';
            const displayText = text.substring(0, Math.floor(this.x / 5));
            this.ctx.fillText(displayText, 10, 35);

            if (this.x < maxX) {
                this.x += this.speed;
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
            }
        };

        animate();
    }

    reset() {
        this.x = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// ===== ГЛОБАЛ ХУВЬСАГЧ =====
const userManager = new UserManager();
let audioManager = new AudioManager();
let cursorAnimator = null;
let currentFontSize = 16;
let selectedStoryId = null;

// ===== ИНИЦИАЛИЗАЦ =====
document.addEventListener('DOMContentLoaded', () => {
    setupInitialState();
    setupEventListeners();
});

function setupInitialState() {
    if (userManager.currentUser) {
        showReadingPage();
    } else {
        showHomePage();
    }
    // render stories and leaderboard
    if (window.renderStoriesList) renderStoriesList();
    if (window.renderLeaderboard) renderLeaderboard();
}

function setupEventListeners() {
    // Логаут товч
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userManager.logout();
            showHomePage();
        });
    }
}

// ===== ҮНДСЭН ФУНКЦҮҮД =====
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const age = document.getElementById('registerAge').value;
    const password = document.getElementById('registerPassword').value;

    const result = userManager.register(username, age, password);
    alert(result.message);

    if (result.success) {
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerAge').value = '';
        document.getElementById('registerPassword').value = '';
        switchTab('login');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const result = userManager.login(username, password);
    alert(result.message);

    if (result.success) {
        showReadingPage();
    }
}

function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('readingPage').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('adminLink').style.display = 'none';
}

function showReadingPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('readingPage').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-block';
    
    if (userManager.isAdmin()) {
        document.getElementById('adminLink').style.display = 'inline-block';
    }

    document.getElementById('userName').textContent = `Сайн байна уу, ${userManager.currentUser.username}!`;
    // update points badge if exists
    if (userManager.currentUser && document.getElementById('pointsBadge')) {
        const points = userManager.currentUser.points || 0;
        document.getElementById('pointsBadge').textContent = `🔵 ${points}`;
        document.getElementById('pointsBadge').style.display = 'inline-block';
    }
}

function selectStory(storyId) {
    selectedStoryId = storyId;
    const story = stories[storyId];
    
    document.getElementById('storyTitle').textContent = story.title;
    document.getElementById('textContent').textContent = story.text;
    document.querySelector('.stories-list').style.display = 'none';
    document.getElementById('storyContent').style.display = 'block';

    const storyImageWrap = document.getElementById('storyImageWrap');
    const storyImage = document.getElementById('storyImage');
    if (story.image) {
        storyImage.src = story.image;
        storyImageWrap.style.display = 'block';
    } else {
        storyImageWrap.style.display = 'none';
    }

    if (!cursorAnimator) {
        cursorAnimator = new CursorAnimator('cursorCanvas');
    }

    cursorAnimator.reset();
    userManager.addStoryProgress(storyId);
    
    // Уншлагын аниматор эхлүүлэх
    setTimeout(() => {
        cursorAnimator.animateCursor(story.text.substring(0, 100));
    }, 500);
    
    // awarding points for reading
    if (userManager.currentUser) {
        userManager.currentUser.points = (userManager.currentUser.points || 0) + 10;
        userManager.saveCurrentUser();
        userManager.saveUsers();
        if (document.getElementById('pointsBadge')) document.getElementById('pointsBadge').textContent = `🔵 ${userManager.currentUser.points}`;
        if (window.renderLeaderboard) window.renderLeaderboard();
    }
}

function goBackToStories() {
    document.querySelector('.stories-list').style.display = 'grid';
    document.getElementById('storyContent').style.display = 'none';
    audioManager.stop();
    if (cursorAnimator) {
        cursorAnimator.reset();
    }
}

function toggleAudio() {
    if (selectedStoryId) {
        const story = stories[selectedStoryId];
        if (audioManager.isPlaying) {
            audioManager.stop();
        } else {
            audioManager.playNarration(story.text);
        }
    }
}

function changeFontSize(direction) {
    if (direction === 'increase') {
        currentFontSize += 2;
    } else {
        currentFontSize = Math.max(12, currentFontSize - 2);
    }
    document.getElementById('textContent').style.fontSize = currentFontSize + 'px';
}
