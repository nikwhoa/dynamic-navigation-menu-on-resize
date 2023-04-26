'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.navigation__item');
    const popoverMenu = document.querySelector('.actionList__actions');

    const hideNavItems = (navItems, numberOfNavItemsToShow, popoverMenu) => {
        popoverMenu.innerHTML = '';

        navItems.forEach((item) => {
            item.classList.remove('navigation__item--hidden');
        });

        const popoverNavItem = document.querySelector('.navigation__item.popover');

        if (numberOfNavItemsToShow >= navItems.length) {
            popoverNavItem.classList.add('navigation__item--hidden');
        } else {
            popoverNavItem.classList.remove('navigation__item--hidden');

            for (let i = numberOfNavItemsToShow; i < navItems.length; i++) {
                if (!navItems[i].classList.contains('popover')) {
                    navItems[i].classList.add('navigation__item--hidden');
                    popoverMenu.innerHTML += `<li role="presentation">
                      <button type="button" class="actionList__item" role="menuitem">
                          <span class="actionList__text">${
                              navItems[i].querySelector('.navigation__link')
                                  .innerText
                          }</span>
                      </button>
                  </li>`;
                }
            }
        }
    };

    const navItemWidth = 50;
    const minWindowWidth = 320;

    function calculateNumberOfNavItems() {
        const windowWidth = window.innerWidth;

        if (windowWidth < minWindowWidth) {
            return 1;
        }

        const availableWidth = windowWidth - minWindowWidth;
        const numberOfItems = Math.floor(availableWidth / navItemWidth);

        return numberOfItems;
    }

    const numberOfNavItemsToShow = calculateNumberOfNavItems();
    console.log('Window width:', window.innerWidth);
    console.log('Number of navigation items to show:', numberOfNavItemsToShow);
    console.log('Navigation items:', navItems);
    console.log('Popover menu:', popoverMenu);

    hideNavItems(navItems, numberOfNavItemsToShow, popoverMenu);

    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    }

    window.addEventListener(
        'resize',
        debounce(() => {
            const updatedNumberOfNavItemsToShow = calculateNumberOfNavItems();
            console.log('Updated number of navigation items to show:', updatedNumberOfNavItemsToShow);

            hideNavItems(navItems, updatedNumberOfNavItemsToShow, popoverMenu);
        }, 200)
    );
});
