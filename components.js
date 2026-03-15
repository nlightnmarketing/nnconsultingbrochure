(function () {
    var NAV_ITEMS = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services/' },
        { label: 'Work', href: '/work/' },
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
                    '<a href="mailto:sreekanth@nlightnconsulting.com">Email</a>' +
                    '<a href="https://www.linkedin.com/company/nlightn-consulting" target="_blank" rel="noopener">LinkedIn</a>' +
                '</div>' +
            '</div>' +
        '</footer>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        var headerEl = document.getElementById('site-header');
        var footerEl = document.getElementById('site-footer');

        if (headerEl) headerEl.outerHTML = buildHeader();
        if (footerEl) footerEl.outerHTML = buildFooter();

        var toggle = document.querySelector('.nav-toggle');
        var links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                links.classList.toggle('open');
            });
        }
    });
})();
