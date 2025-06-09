// Sample data
const topics = [
    {
        id: 1,
        title: "The Future of AI in Creative Industries",
        preview: "Exploring how artificial intelligence is revolutionizing design, music, and visual arts. What opportunities and challenges lie ahead?",
        author: { name: "Sarah Chen", avatar: "SC" },
        time: "2 hours ago",
        replies: 127,
        likes: 89,
        views: 1542,
        tags: ["AI", "Design", "Creative"],
        category: "Technology",
        isHot: true,
        participants: ["JD", "MB", "KL", "RT", "AS"]
    },
    {
        id: 2,
        title: "Building Sustainable Habits That Actually Stick",
        preview: "After failing countless times, I finally cracked the code to habit formation. Here's my science-backed approach that works.",
        author: { name: "Mike Rodriguez", avatar: "MR" },
        time: "5 hours ago",
        replies: 94,
        likes: 156,
        views: 2103,
        tags: ["Health", "Productivity", "Self-Improvement"],
        category: "Health & Wellness",
        isNew: true,
        participants: ["LP", "QW", "ER", "TY"]
    },
    {
        id: 3,
        title: "Why Remote Work Culture is Broken (And How to Fix It)",
        preview: "Three years into remote work, we're seeing the cracks. Communication breakdowns, isolation, and productivity theater are real issues.",
        author: { name: "Lisa Park", avatar: "LP" },
        time: "1 day ago",
        replies: 203,
        likes: 78,
        views: 3456,
        tags: ["Remote Work", "Business", "Culture"],
        category: "Business",
        isHot: true,
        participants: ["UI", "OP", "AS", "DF", "GH", "JK"]
    },
    {
        id: 4,
        title: "My Journey from Burnout to Building a 7-Figure SaaS",
        preview: "Two years ago, I was completely burned out working 80-hour weeks. Today, I run a profitable SaaS with a 4-day work week.",
        author: { name: "David Kim", avatar: "DK" },
        time: "3 days ago",
        replies: 145,
        likes: 234,
        views: 4521,
        tags: ["Startup", "SaaS", "Entrepreneurship"],
        category: "Business",
        participants: ["ZX", "CV", "BN", "MQ"]
    },
    {
        id: 5,
        title: "The Art of Minimalist Photography in Urban Environments",
        preview: "Street photography doesn't have to be chaotic. Discover techniques for finding calm, composed shots in busy cityscapes.",
        author: { name: "Elena Vasquez", avatar: "EV" },
        time: "1 week ago",
        replies: 67,
        likes: 112,
        views: 1876,
        tags: ["Photography", "Art", "Urban"],
        category: "Art & Design",
        participants: ["WE", "RT", "YU"]
    },
    {
        id: 6,
        title: "Learning Advanced React Patterns: A Deep Dive",
        preview: "Compound components, render props, and custom hooks - mastering these patterns will level up your React development skills.",
        author: { name: "Alex Thompson", avatar: "AT" },
        time: "4 days ago",
        replies: 89,
        likes: 167,
        views: 2234,
        tags: ["React", "JavaScript", "Web Development"],
        category: "Technology",
        isNew: true,
        participants: ["IO", "PL", "QA", "SW", "DE"]
    }
];

let displayedTopics = [...topics];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderTopics(displayedTopics);
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setActiveButton('.filter-btn', e.target);
        });
    });

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setActiveButton('.sort-btn', e.target);
            sortTopics(e.target.dataset.sort);
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTopics(e.target.value);
    });

    // Tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const tagText = e.target.textContent.replace('#', '');
            document.getElementById('searchInput').value = tagText;
            searchTopics(tagText);
        });
    });

    // Categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const category = e.target.querySelector('span').textContent;
            filterByCategory(category);
        });
    });
}

// Helper functions
function setActiveButton(selector, activeBtn) {
    document.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

function searchTopics(searchTerm) {
    const filtered = topics.filter(topic => 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    renderTopics(filtered);
}

function sortTopics(sortType) {
    let sorted = [...displayedTopics];
    
    switch(sortType) {
        case 'discussed':
            sorted.sort((a, b) => b.replies - a.replies);
            break;
        case 'liked':
            sorted.sort((a, b) => b.likes - a.likes);
            break;
        case 'recent':
            sorted.sort((a, b) => a.id - b.id);
            break;
        case 'new':
            sorted.sort((a, b) => b.id - a.id);
            break;
    }
    
    renderTopics(sorted);
}

function filterByCategory(category) {
    const filtered = topics.filter(topic => topic.category === category);
    renderTopics(filtered);
}

// Render topics
function renderTopics(topicsToRender) {
    const grid = document.getElementById('topicsGrid');
    grid.innerHTML = '';

    topicsToRender.forEach((topic, index) => {
        const card = createTopicCard(topic);
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('loading');
        grid.appendChild(card);
    });
    
    displayedTopics = topicsToRender;
}

function createTopicCard(topic) {
    const card = document.createElement('div');
    card.className = 'topic-card';
    
    const badges = [];
    if (topic.isHot) badges.push('<span class="badge hot">🔥 Hot</span>');
    if (topic.isNew) badges.push('<span class="badge new">✨ New</span>');

    const participantAvatars = topic.participants.slice(0, 4)
        .map(p => `<div class="participant-avatar">${p}</div>`).join('');

    const moreParticipants = topic.participants.length > 4 ? 
        `<span class="participant-count">+${topic.participants.length - 4} more</span>` : '';

    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="topic-title">${topic.title}</h3>
            </div>
            <div class="topic-badges">
                ${badges.join('')}
            </div>
        </div>
        
        <p class="topic-preview">${topic.preview}</p>
        
        <div class="card-meta">
            <div class="author-info">
                <div class="avatar">${topic.author.avatar}</div>
                <div class="author-details">
                    <div class="author-name">${topic.author.name}</div>
                    <div class="post-time">${topic.time}</div>
                </div>
            </div>
        </div>

        <div class="participants">
            <div class="participant-avatars">
                ${participantAvatars}
            </div>
            ${moreParticipants}
        </div>
        
        <div class="card-stats">
            <div class="stat">
                <span class="stat-icon">💬</span>
                <span>${topic.replies} replies</span>
            </div>
            <div class="stat">
                <span class="stat-icon">❤️</span>
                <span>${topic.likes} likes</span>
            </div>
            <div class="stat">
                <span class="stat-icon">👁️</span>
                <span>${topic.views} views</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        console.log(`Clicked on topic: ${topic.title}`);
    });

    return card;
}


document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('popularThemeToggle');
  const isLight = localStorage.getItem('theme') === 'light';
  document.body.classList.toggle('light', isLight);
  document.body.classList.toggle('dark', !isLight);
  themeToggle.checked = isLight;

  themeToggle.addEventListener('change', () => {
    const light = themeToggle.checked;
    document.body.classList.toggle('light', light);
    document.body.classList.toggle('dark', !light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  });

  renderTopics(topics);
  setupEventListeners();
});