const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const description = document.createElement("p");
      description.className = "repository-description";
      description.textContent = repository.description;

      const date = document.createElement("time");
      date.className = "repository-date";
      date.dateTime = repository.starredAt;
      date.textContent = `Starred ${repository.starredAt}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }

    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories.";
    console.error("Failed to load repository data:", error);
  }
}

loadRepositories();
