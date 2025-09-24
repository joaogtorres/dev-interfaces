document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (element) => {
    const path = element.getAttribute("data-component-path");
    if (path) {
      fetch(path)
        .then((response) => {
          if (!response.ok)
            throw new Error(`Componente não encontrado em: ${path}`);
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
        })
        .catch((error) => console.error("Erro ao carregar componente:", error));
    }
  };

  document.querySelectorAll("[data-component-path]").forEach(loadComponent);
});
