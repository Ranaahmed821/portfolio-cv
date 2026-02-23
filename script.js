// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Contact form: submit via Formspree and show status (emails go to your Formspree inbox → your email)
(function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('form-submit-btn');
    if (!form || !status) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const action = form.getAttribute('action');
        if (action.includes('YOUR_FORMSPREE_ID')) {
            status.textContent = 'Please email me directly at ranmory342@gmail.com for now.';
            status.classList.add('text-warning');
            console.warn('Portfolio form: Replace YOUR_FORMSPREE_ID in the form action with your Formspree ID from https://formspree.io');
            return;
        }
        status.textContent = 'Sending...';
        status.classList.remove('text-success', 'text-danger', 'text-warning');

        const formData = new FormData(form);
        fetch(action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        })
            .then(function (r) {
                if (r.ok) {
                    status.textContent = 'Message sent! I\'ll reply soon.';
                    status.classList.add('text-success');
                    form.reset();
                } else {
                    status.textContent = 'Something went wrong. Try again or email me directly.';
                    status.classList.add('text-danger');
                }
            })
            .catch(function () {
                status.textContent = 'Network error. Try again or email me directly.';
                status.classList.add('text-danger');
            });
    });
})();
