document.addEventListener("DOMContentLoaded", () => {
  const basePath = "/dev-interfaces/";

  const loadComponent = (element) => {
    const path = element.getAttribute("data-component-path");

    if (!path) return;

    fetch(path)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Componente não encontrado em: ${path}`);
        return response.text();
      })
      .then((data) => {
        element.innerHTML = data;

        element.querySelectorAll("a").forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          if (href.startsWith("http") || href.startsWith("#")) return;
          const cleanHref = href.replace(/^\/+/, "");
          link.setAttribute("href", basePath + cleanHref);
        });

        element.querySelectorAll("img, video, source").forEach((media) => {
          const src = media.getAttribute("src");
          if (!src) return;
          if (src.startsWith("http")) return;
          const cleanSrc = src.replace(/^\/+/, "");
          media.setAttribute("src", basePath + cleanSrc);
        });

        element.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          if (href.startsWith("http")) return;
          const cleanHref = href.replace(/^\/+/, "");
          link.setAttribute("href", basePath + cleanHref);
        });
      })
      .catch((error) => console.error("Erro ao carregar componente:", error));
  };

  document.querySelectorAll("[data-component-path]").forEach(loadComponent);
});
