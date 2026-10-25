function initMobileNav() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburgerIcon = document.getElementById("iconHamburger");
    const closeIcon = document.getElementById("iconClose");

    if (!hamburgerBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.remove("translate-x-full");
        mobileMenu.classList.add("translate-x-0");

        if (hamburgerIcon) hamburgerIcon.classList.add("hidden");
        if (closeIcon) closeIcon.classList.remove("hidden");

        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");

        if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
        if (closeIcon) closeIcon.classList.add("hidden");

        document.body.style.overflow = "";
    }

    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains("translate-x-0");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when any navigation link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Close menu when Escape key is pressed
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("translate-x-0")) {
            closeMenu();
        }
    });

    // Reset overflow when window resized to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains("translate-x-0")) {
            closeMenu();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
    initMobileNav();
}