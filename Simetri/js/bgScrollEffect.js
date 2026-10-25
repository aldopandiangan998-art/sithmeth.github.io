const overlay = document.getElementById("bg-overlay");
const backToTop = document.getElementById("backToTop");
const MAX_OPACITY = 0.80;

function updateScrollEffects() {
    if (overlay) {
        const progress = Math.min(window.scrollY / (window.innerHeight * 2), 1);
        overlay.style.opacity = progress * MAX_OPACITY;
    }

    if (backToTop) {
        if (window.scrollY > 350) {
            backToTop.classList.remove("opacity-0", "pointer-events-none");
            backToTop.classList.add("opacity-100");
        } else {
            backToTop.classList.add("opacity-0", "pointer-events-none");
            backToTop.classList.remove("opacity-100");
        }
    }
}

window.addEventListener("scroll", updateScrollEffects, {passive: true});
window.addEventListener("resize",  updateScrollEffects);
updateScrollEffects();

// Scroll reveal observer for .reveal elements
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((el) => {
        revealObserver.observe(el);
    });
} else {
    document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("revealed");
    });
}


