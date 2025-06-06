// Email obfuscation
window.addEventListener("DOMContentLoaded", function () {
    const user = "todd.espy";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;
    const emailLink = `<a href="mailto:${email}">${email}</a>`;
    const emailSpan = document.getElementById("email");
    if (emailSpan) emailSpan.innerHTML = emailLink;
});

// Sidebar injection
window.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("sidebar-container");
    if (container) {
        fetch("./sidebar.html")
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => console.error("Sidebar load failed:", err));
    }
});
