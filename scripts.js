// Email obfuscation
window.addEventListener("DOMContentLoaded", function () {
    const user = "todd.espy";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;
    const emailLink = `<a href="mailto:${email}">${email}</a>`;
    document.getElementById("email").innerHTML = emailLink;
});
