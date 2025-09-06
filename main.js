// main.js
const API_KEY = "gyDGjqKsupKZviZagqkA4UYfokVX0xNV";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("q");
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");

// Handle search form submit
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  statusEl.textContent = `Searching for "${query}"...`;
  grid.innerHTML = "";

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&limit=12&rating=g`;

    // Debugging logs
    console.log("URL:", url);

    const response = await fetch(url);
    console.log("Response OK?", response.ok);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    console.log("Result object:", result);

    if (!result.data || result.data.length === 0) {
      statusEl.textContent = `No results for "${query}".`;
      return;
    }

    statusEl.textContent = `Found ${result.data.length} result(s) for "${query}".`;

    result.data.forEach((gif) => {
      const tpl = document.getElementById("gifCard").content.cloneNode(true);

      const link = tpl.querySelector(".card-link");
      const img = tpl.querySelector(".card-img");
      const title = tpl.querySelector(".card-title");

      link.href = gif.url;
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title || "gif";
      title.textContent = gif.title || "Untitled";

      grid.appendChild(tpl);
    });
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error fetching GIFs. Please try again later.";
  }
});