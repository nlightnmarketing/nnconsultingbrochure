(function () {
    var _u = 'sreenath.manickom';
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
        { label: 'Consulting & Training', href: '/training/' },
        { label: 'Decks & Docs', href: '/decks-and-documents/' },
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

    document.documentElement.classList.add('js');

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function whenVisible(els, cb) {
        if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < els.length; i++) cb(els[i]);
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    cb(e.target);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        for (var j = 0; j < els.length; j++) io.observe(els[j]);
    }

    function revealVisuals() {
        whenVisible(document.querySelectorAll('.viz'), function (el) {
            el.classList.add('in-view');
        });
    }

    function countUp() {
        if (reduceMotion) return;
        whenVisible(document.querySelectorAll('[data-count]'), function (el) {
            var target = parseInt(el.getAttribute('data-count'), 10);
            var start = null;
            var dur = 1400;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / dur, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased).toLocaleString('en-US');
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var headerEl = document.getElementById('site-header');
        var footerEl = document.getElementById('site-footer');

        if (headerEl) headerEl.outerHTML = buildHeader();
        if (footerEl) footerEl.outerHTML = buildFooter();

        hydratePlaceholders();
        revealVisuals();
        countUp();

        var toggle = document.querySelector('.nav-toggle');
        var links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                links.classList.toggle('open');
            });
        }

        var sourceUrl = document.referrer;
        window.myScriptData = {
            botId: 'dba4a2f5852144cfa9421e6b774d0187',
            API_BASE_URL: 'https://api.fridayi.com',
            SOURCE_URL: sourceUrl
        };

        (function (w, d, s, f, js, fjs) {
            js = d.createElement(s);
            fjs = d.getElementsByTagName(s)[0];
            js.async = 1;
            js.src = f;
            js.id = 'myWidgetScript';
            fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'https://api.fridayi.com/api/v2' + '/popupbot/js-sales'));
    });
})();
