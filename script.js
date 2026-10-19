// Schimbarea paginilor/tab-urilor
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById('page-' + pageId).classList.add('active');
    
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Derulează la începutul paginii
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Comutator de Temă (Light / Dark)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Interogare GitHub API
async function fetchProfile() {
    const username = document.getElementById('usernameInput').value.trim();
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const profileResult = document.getElementById('profileResult');

    if (!username) return;

    loading.style.display = 'block';
    error.style.display = 'none';
    profileResult.style.display = 'none';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();

        document.getElementById('userAvatar').src = data.avatar_url;
        document.getElementById('userName').textContent = data.name || data.login;
        document.getElementById('userBio').textContent = data.bio || 'Acest utilizator nu are o descriere publică.';
        document.getElementById('userLink').href = data.html_url;
        document.getElementById('userRepos').textContent = data.public_repos;
        document.getElementById('userFollowers').textContent = data.followers;
        document.getElementById('userFollowing').textContent = data.following;

        loading.style.display = 'none';
        profileResult.style.display = 'block';
    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}