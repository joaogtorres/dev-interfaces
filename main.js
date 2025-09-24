document.addEventListener("DOMContentLoaded", () => {
  const isSubPage = window.location.pathname.includes("/pages/");

  const loadComponent = async (element) => {
    const path = element.getAttribute("data-component-path");
    if (path) {
      try {
        const response = await fetch(path);
        if (!response.ok)
          throw new Error(`Componente não encontrado em: ${path}`);
        const data = await response.text();
        element.innerHTML = data;

        if (isSubPage) {
          const links = element.querySelectorAll("a");
          const images = element.querySelectorAll("img");

          links.forEach((link) => {
            const originalHref = link.getAttribute("href");
            if (
              originalHref &&
              !originalHref.startsWith("http") &&
              !originalHref.startsWith("#")
            ) {
              if (originalHref.startsWith("pages/")) {
                link.setAttribute(
                  "href",
                  originalHref.substring("pages/".length)
                );
              } else {
                link.setAttribute("href", `../${originalHref}`);
              }
            }
          });

          images.forEach((img) => {
            const originalSrc = img.getAttribute("src");
            if (originalSrc && !originalSrc.startsWith("http")) {
              img.setAttribute("src", `../${originalSrc}`);
            }
          });
        }
      } catch (error) {
        console.error("Erro ao carregar componente:", error);
      }
    }
  };

  document.querySelectorAll("[data-component-path]").forEach(loadComponent);
});
