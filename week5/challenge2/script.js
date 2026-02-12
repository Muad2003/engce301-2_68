const paragraphs = document.querySelectorAll("#main p");

paragraphs.forEach((p) => {
    if (p.textContent.includes("Llamas and Chickens!")) {
        p.style.color = "red";
    }
});