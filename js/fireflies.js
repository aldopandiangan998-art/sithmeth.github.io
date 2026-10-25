// Fireflies Particle Effect for Zelda / Fantasy Forest Atmosphere
(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "firefliesCanvas";
    canvas.className = "fixed inset-0 pointer-events-none -z-10";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const PARTICLE_COUNT = 32;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 1,
            color: Math.random() > 0.35 ? "243, 182, 65" : "185, 235, 120", // Warm gold / forest spirit green
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: -Math.random() * 0.45 - 0.15, // Floating gently upward
            alpha: Math.random() * 0.7 + 0.1,
            pulseSpeed: Math.random() * 0.015 + 0.008,
            pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;

            // Subtle pulsing glow
            p.alpha += p.pulseSpeed * p.pulseDir;
            if (p.alpha >= 0.85) {
                p.alpha = 0.85;
                p.pulseDir = -1;
            } else if (p.alpha <= 0.1) {
                p.alpha = 0.1;
                p.pulseDir = 1;
            }

            // Wrap edges
            if (p.y < -15) p.y = height + 15;
            if (p.x < -15) p.x = width + 15;
            if (p.x > width + 15) p.x = -15;

            // Draw particle with glow
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${p.color}, 0.9)`;
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();
