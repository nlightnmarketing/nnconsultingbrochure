(function () {
    var _u = 'info';
    var _d = 'nlightn.in';
    var _ph = ['+91', '97312', '96263'];
    function _email() { return _u + '@' + _d; }
    function _phone() { return _ph.join(' '); }
    function _phoneHref() { return 'te' + 'l:' + _ph.join(''); }
    function _waHref() { return 'https://wa' + '.me/91' + _ph[1] + _ph[2]; }
    function _mailto(subject) {
        var href = 'mai' + 'lto:' + _email();
        if (subject) href += '?subject=' + encodeURIComponent(subject);
        return href;
    }

    var NAV_ITEMS = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about/' },
        { label: 'Services', href: '/services/' },
        { label: 'Work', href: '/work/' },
        { label: 'Training', href: '/training/' },
        { label: 'Reach Out', href: '/reach-out/' }
    ];

    function isActive(href) {
        var path = window.location.pathname.replace(/index\.html$/, '');
        if (!path.endsWith('/')) path += '/';
        if (href === '/') return path === '/';
        return path.startsWith(href);
    }

    function buildHeader() {
        var linksHTML = NAV_ITEMS.map(function (item) {
            var cls = isActive(item.href) ? ' class="active"' : '';
            return '<li><a href="' + item.href + '"' + cls + '>' + item.label + '</a></li>';
        }).join('');

        return '<nav class="site-nav">' +
            '<div class="nav-inner">' +
                '<a href="/" class="nav-logo">NLightN</a>' +
                '<button class="nav-toggle" aria-label="Toggle menu">' +
                    '<span></span><span></span><span></span>' +
                '</button>' +
                '<ul class="nav-links">' + linksHTML + '</ul>' +
            '</div>' +
        '</nav>';
    }

    function buildFooter() {
        var year = new Date().getFullYear();
        return '<footer class="site-footer">' +
            '<div class="footer-inner">' +
                '<span>&copy; ' + year + ' NLightN Consulting</span>' +
                '<div class="footer-links">' +
                    '<a href="' + _mailto() + '">Email</a>' +
                    '<a href="https://www.linkedin.com/company/nlightn-consulting" target="_blank" rel="noopener">LinkedIn</a>' +
                '</div>' +
            '</div>' +
        '</footer>';
    }

    function hydratePlaceholders() {
        var emailEls = document.querySelectorAll('[data-email]');
        for (var i = 0; i < emailEls.length; i++) {
            var el = emailEls[i];
            var subject = el.getAttribute('data-email-subject') || '';
            if (el.tagName === 'A') {
                el.href = _mailto(subject);
                if (el.hasAttribute('data-email-text')) el.textContent = _email();
            } else {
                el.textContent = _email();
            }
        }
        var phoneEls = document.querySelectorAll('[data-phone]');
        for (var j = 0; j < phoneEls.length; j++) {
            var pe = phoneEls[j];
            if (pe.tagName === 'A') {
                pe.href = pe.hasAttribute('data-whatsapp') ? _waHref() : _phoneHref();
                if (pe.hasAttribute('data-phone-text')) pe.textContent = _phone();
            } else {
                pe.textContent = _phone();
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var headerEl = document.getElementById('site-header');
        var footerEl = document.getElementById('site-footer');

        if (headerEl) headerEl.outerHTML = buildHeader();
        if (footerEl) footerEl.outerHTML = buildFooter();

        hydratePlaceholders();

        var toggle = document.querySelector('.nav-toggle');
        var links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                links.classList.toggle('open');
            });
        }
    });
})();
