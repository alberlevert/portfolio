document.addEventListener("DOMContentLoaded", () => {
  // 1) Hide broken images and show placeholders
  document.querySelectorAll(".thumb img").forEach((img) => {
    const thumb = img.closest(".thumb");

    function makePlaceholder() {
      img.style.display = "none";
      if (thumb) thumb.classList.add("no-img");
    }

    img.addEventListener("error", makePlaceholder);
    if (!img.getAttribute("src")) makePlaceholder();
  });

  // 2) Lightbox (works on any page that has #lightbox)
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose");

  if (!lb || !lbImg || !lbClose) return;

  document.querySelectorAll("[data-full]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      lbImg.src = card.getAttribute("data-full");
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    });
  });

  function closeLb() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  }

  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });
});
