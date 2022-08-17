import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['hamburger', 'mobile_menu', 'menu_list'];

    toggle(e) {
        const mobileMenuClassList = this.mobile_menuTarget.classList;

        if (mobileMenuClassList.contains('hidden')) {
            mobileMenuClassList.remove('hidden');
            const menuLinksMobile = this.mobile_menuTarget.getElementsByTagName('a');
            this.handleActiveLink(menuLinksMobile, true);
        } else {
            mobileMenuClassList.add('hidden');
        }
    }

    handleLinkStyle(menuLink, isMobile) {
        menuLink.classList.add('font-bold');

        if (isMobile) menuLink.classList.add('text-red-700');
    }

    handleActiveLink(menuLinks, isMobile = false) {
        const breadcrumbs = document.getElementById('breadcrumbs');
        const pathname = window.location.pathname;
        const is_teacher_dashboard = window.location.pathname.includes('teacher');
        const is_manager_dashboard = window.location.pathname.includes('manager');

        Array.from(menuLinks).forEach(menuLink => {
            if (is_teacher_dashboard || is_manager_dashboard) {
                const href_last_word = menuLink.href.split('/').pop();
                if (pathname.includes(href_last_word)) {
                    menuLink.classList.add('font-bold', 'border-blue-600', 'hover:text-blue-600');
                } else {
                    menuLink.classList.add('border-transparent');
                }

                return;
            }

            if (!breadcrumbs) {
                const href_last_word = menuLink.href.split('/').pop();
                if (pathname.includes(href_last_word)) {
                    this.handleLinkStyle(menuLink, isMobile);
                }

                return;
            }

            Array.from(breadcrumbs.children).forEach(breadcrumb => {
                if (breadcrumb.href === menuLink.href || breadcrumbs.baseURI === menuLink.href) {
                    this.handleLinkStyle(menuLink, isMobile);
                }
            });
        });
    }

    connect() {
        const menuLinks = this.menu_listTarget.getElementsByTagName('a');
        this.handleActiveLink(menuLinks);
    }
}
