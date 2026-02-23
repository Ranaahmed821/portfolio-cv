// ========== Mouse-follow cursor (glow + dot) ==========
(function () {
    var glow = document.getElementById('cursor-glow');
    var dot = document.getElementById('cursor-dot');
    if (!glow || !dot) return;

    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hover effect on links, buttons, inputs
    var hoverTargets = 'a, button, input, textarea, .btn-neon, .btn-neon-outline, .btn-neon-link, .card-neon';
    document.querySelectorAll(hoverTargets).forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            glow.classList.add('hover');
            dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', function () {
            glow.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });
})();

// ========== Scroll-reveal with stagger and motion ==========
var observer = new IntersectionObserver(
    function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.section-card').forEach(function (section) {
    observer.observe(section);
});

// ========== Card hover: icon pulse ==========
document.querySelectorAll('.card-neon').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
        var icons = this.querySelectorAll('.neon-icon');
        icons.forEach(function (icon) { icon.classList.add('icon-pulse'); });
    });
    card.addEventListener('mouseleave', function () {
        var icons = this.querySelectorAll('.neon-icon');
        icons.forEach(function (icon) { icon.classList.remove('icon-pulse'); });
    });
});

// ========== Parallax: subtle move on mouse (hero area) ==========
(function () {
    var hero = document.querySelector('.hero-section');
    var wrap = hero && hero.querySelector('.hero-parallax-wrap');
    if (!wrap) return;
    hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var moveX = (x - 0.5) * 14;
        var moveY = (y - 0.5) * 14;
        wrap.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });
    hero.addEventListener('mouseleave', function () {
        wrap.style.transform = '';
    });
})();

// ========== Navbar link active state on scroll ==========
var sections = document.querySelectorAll('section[id]');
function setActiveNav() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
        var top = section.offsetTop - 100;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', setActiveNav);
setActiveNav();
