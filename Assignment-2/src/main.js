import './style.css';
const btn = document.getElementById("getBrewery");
const out = document.getElementById("output");
const beer = document.getElementById("beer");

btn.addEventListener("click", async () =>  {
  beer.classList.remove('spin');
  void beer.offsetWidth;
  beer.classList.add('spin');
});

btn.addEventListener("click", getRandomBrewery);

async function getRandomBrewery() {
  out.textContent = "Loading…";
  try {
    const res = await fetch("https://api.openbrewerydb.org/v1/breweries/random", {
      headers: { "accept": "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const b = Array.isArray(data) ? data[0] : data;

    if (!b) { out.textContent = "No brewery returned."; return; }

    const phone = formatPhone(b.phone);
    out.textContent =
`Name: ${b.name ?? "Unknown"}
Type: ${b.brewery_type ?? "—"}
Location: ${[b.city, b.state, b.country].filter(Boolean).join(", ") || "—"}
Phone: ${phone}
Website: ${b.website_url ?? "—"}`;
  } catch (err) {
    out.textContent = `Failed to fetch: ${err.message}`;
  }
}

function formatPhone(p) {
  if (!p) return "—";
  const d = String(p).replace(/\D/g, "");
  return d.length === 10 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : p;
}

