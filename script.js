document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-navigation");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }));
  }

  const projectTiles = document.querySelectorAll(".project-tile");
  const modal = document.querySelector("#project-modal");
  if (!projectTiles.length || !modal) return;

  const projects = [
    {
      name: "Edificio Prado",
      category: "Uso mixto comercio-vivienda",
      area: "Por definir",
      description: "Proyecto de uso mixto que integra comercio en el primer nivel con vivienda en los niveles superiores. La propuesta busca organizar los accesos, la circulación y la relación entre los distintos usos dentro de una composición arquitectónica contemporánea.",
      images: ["assets/PRADO_IMAGENPRINCIPAL.png","assets/PRADO_INT1.png","assets/PRADO_INT2.png","assets/PRADO_INT3.png"]
    },
    {
      name: "Casa C",
      category: "Vivienda",
      area: "Por definir",
      description: "Propuesta residencial concebida para responder a las necesidades cotidianas del usuario mediante una distribución funcional, una adecuada entrada de luz y una materialidad contemporánea que refuerza la identidad del proyecto.",
      images: ["assets/CASAC_IMAGENPRINCIPAL.png","assets/CASAC_ENTRADA.png","assets/CASAC_SALA.png","assets/CASAC_FACH.png"]
    },
    {
      name: "Ramsey",
      category: "Remodelación de vivienda",
      area: "Por definir",
      description: "Intervención de vivienda orientada a actualizar los espacios existentes, mejorar su funcionalidad y construir una nueva expresión arquitectónica mediante una selección coherente de materiales, iluminación y detalles.",
      images: ["assets/RAMSEY_1.png","assets/RAMSEY_2.png","assets/RAMSEY_3.png"]
    }
  ];

  const modalTitle = document.querySelector("#modal-title");
  const modalCategory = document.querySelector("#modal-category");
  const modalArea = document.querySelector("#modal-area");
  const modalDescription = document.querySelector("#modal-description");
  const modalPlan = document.querySelector("#modal-plan-image");
  const renderImages = [document.querySelector("#render-1"), document.querySelector("#render-2"), document.querySelector("#render-3")];
  const closeButton = document.querySelector("#modal-close");
  const prevButton = document.querySelector("#modal-prev");
  const nextButton = document.querySelector("#modal-next");
  const counter = document.querySelector("#modal-counter");
  let currentProject = 0;

  function showProject(index) {
    currentProject = (index + projects.length) % projects.length;
    const project = projects[currentProject];
    modalTitle.textContent = project.name;
    modalCategory.textContent = project.category;
    modalArea.textContent = project.area;
    modalDescription.textContent = project.description;
    modalPlan.src = project.images[0];
    modalPlan.alt = `Imagen principal de ${project.name}`;
    renderImages.forEach((image, i) => {
      const imagePath = project.images[i + 1];
      if (imagePath) {
        image.src = imagePath;
        image.alt = `Vista ${i + 1} de ${project.name}`;
        image.hidden = false;
        image.style.display = "";
      } else {
        image.removeAttribute("src");
        image.alt = "";
        image.hidden = true;
        image.style.display = "none";
      }
    });
    counter.textContent = `${String(currentProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  }

  function openModal(index) {
    showProject(index);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Delegación de eventos para que la apertura funcione de forma consistente en desktop y móvil.
  const frame = document.querySelector(".projects-frame");
  if (frame) {
    frame.addEventListener("click", event => {
      const tile = event.target.closest(".project-tile");
      if (!tile || !frame.contains(tile)) return;
      event.preventDefault();
      openModal(Number(tile.dataset.project));
    }, true);
  }

  closeButton.addEventListener("click", closeModal);
  prevButton.addEventListener("click", () => showProject(currentProject - 1));
  nextButton.addEventListener("click", () => showProject(currentProject + 1));

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") showProject(currentProject - 1);
    if (event.key === "ArrowRight") showProject(currentProject + 1);
  });
});