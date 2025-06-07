document.addEventListener("DOMContentLoaded", () => {
    // 1. Email obfuscation
    const user = "todd.espy";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;
    const emailLink = `<a href="mailto:${email}">${email}</a>`;
    const emailSpan = document.getElementById("email");
    if (emailSpan) emailSpan.innerHTML = emailLink;

    // 2. Optional sidebar injection (only if using <div id="sidebar-container"></div>)
    const container = document.getElementById("sidebar-container");
    if (container) {
        fetch("./sidebar.html")
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => console.error("Sidebar load failed:", err));
    }

    // 3. Plotly chart rendering
    const chartEl = document.getElementById("training-time-chart");

    if (chartEl && typeof Plotly !== "undefined") {
        Plotly.newPlot("training-time-chart", [
            {
                name: "Feature Selection",
                x: ["Ensemble (GPU)", "LSTM-only (GPU)", "XGBoost (GPU)"],
                y: [5.925, 5.83075, 5.7759],
                type: "bar",
                marker: { color: "rgb(102,194,165)" },
                hovertemplate: "Feature Selection: %{y:.2f} s<br>Model+Device: %{x}<extra></extra>"
            },
            {
                name: "Training",
                x: ["Ensemble (GPU)", "LSTM-only (GPU)", "XGBoost (GPU)"],
                y: [255.0801, 200.41175, 0.1998],
                type: "bar",
                marker: { color: "rgb(252,141,98)" },
                hovertemplate: "Training: %{y:.2f} s<br>Model+Device: %{x}<extra></extra>"
            },
            {
                name: "Optimization",
                x: ["Ensemble (GPU)", "LSTM-only (GPU)", "XGBoost (GPU)"],
                y: [0.0, 0.0, 12.8526],
                type: "bar",
                marker: { color: "rgb(141,160,203)" },
                hovertemplate: "Optimization: %{y:.2f} s<br>Model+Device: %{x}<extra></extra>"
            }
        ], {
            barmode: "stack",
            title: "Total Time Breakdown by Model Type and Device",
            xaxis: { title: "Model Type + Device" },
            yaxis: { title: "Time (seconds)" },
            legend: { title: { text: "Stage" } },
            hovermode: "x unified",
            template: "plotly_white"
        }, { responsive: true });

        // Ensure resizing when chart becomes visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Plotly.Plots.resize(chartEl);
                    observer.disconnect();
                }
            });
        });
        observer.observe(chartEl);
    }
});
