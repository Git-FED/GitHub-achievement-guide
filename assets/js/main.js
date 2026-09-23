(() => {
  const body = document.body;
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('[data-menu]');
  const theme = document.querySelector('[data-theme]');
  const toast = document.querySelector('[data-toast]');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  const savedTheme = localStorage.getItem('github-guide-theme');
  if (savedTheme === 'dark') body.classList.add('dark');
  if (theme) {
    const updateThemeLabel = () => {
      theme.textContent = body.classList.contains('dark') ? '☼' : '☾';
      theme.setAttribute('aria-label', body.classList.contains('dark') ? 'Use light theme' : 'Use dark theme');
    };
    updateThemeLabel();
    theme.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem('github-guide-theme', body.classList.contains('dark') ? 'dark' : 'light');
      updateThemeLabel();
      showToast(body.classList.contains('dark') ? 'Dark theme on' : 'Light theme on');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const choices = document.querySelectorAll('[data-choice]');
  const choiceTitle = document.querySelector('[data-choice-title]');
  const choiceText = document.querySelector('[data-choice-text]');
  const choiceProgress = document.querySelector('[data-choice-progress]');
  const choiceData = {
    profile: ['Polish your profile', 'Add a clear bio, a profile README, and one small project. Make it easy for a new collaborator to understand what you are learning.', 25],
    workflow: ['Learn the workflow', 'Practice branches, commits, pull requests, and reviews in the sandbox before you touch a busy community repository.', 50],
    project: ['Find a welcoming project', 'Look for a contribution guide, issue templates, and maintainers who explain what good first contributions look like.', 75],
    contribute: ['Make your first contribution', 'Choose a small, useful change. Explain what you changed, test it, and respond kindly to review feedback.', 100]
  };
  choices.forEach((button) => button.addEventListener('click', () => {
    choices.forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    const item = choiceData[button.dataset.choice];
    if (item && choiceTitle && choiceText && choiceProgress) {
      choiceTitle.textContent = item[0]; choiceText.textContent = item[1]; choiceProgress.style.width = `${item[2]}%`;
      showToast(`${item[0]} selected`);
    }
  }));

  document.querySelectorAll('[data-filter]').forEach((filter) => filter.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const value = filter.dataset.filter;
    document.querySelectorAll('[data-category]').forEach((card) => {
      card.hidden = value !== 'all' && card.dataset.category !== value;
    });
  }));

  const progressKey = 'github-guide-checklist';
  const checklist = document.querySelectorAll('[data-check]');
  const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
  checklist.forEach((item) => {
    item.checked = Boolean(saved[item.dataset.check]);
    item.addEventListener('change', () => {
      saved[item.dataset.check] = item.checked;
      localStorage.setItem(progressKey, JSON.stringify(saved));
      showToast(item.checked ? 'Nice progress — saved locally' : 'Step unchecked');
    });
  });
})();

const resourceSearch = document.querySelector('#resource-search');
if (resourceSearch) {
  resourceSearch.addEventListener('input', () => {
    const query = resourceSearch.value.toLowerCase().trim();
    document.querySelectorAll('[data-resource]').forEach((resource) => {
      resource.hidden = query && !resource.textContent.toLowerCase().includes(query);
    });
  });
}
