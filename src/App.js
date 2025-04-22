import React, { useState, useEffect } from "react";

const wineries = {
  "2025 Wine Company": [
    { name: "2024 Sauvignon Blanc", price: 28.0 },
    { name: "2024 Rose", price: 25.0 },
    { name: "2021 Malbec", price: 42.0 },
    { name: "2021 Syrah", price: 45.0 },
  ],
  "Alveare Winery": [
    { name: "2023 Puddle Jumper", price: 29.0 },
    { name: "2020 Cabernet Franc", price: 43.0 },
    { name: "2019 Beekeeper's Reserve", price: 47.0 },
  ],
  "Cave B": [
    { name: "2023 Cavewoman White Wine", price: 27.0 },
    { name: "2023 Dry Rose", price: 32.0 },
    { name: "2020 Caveman Red", price: 29.0 },
    { name: "2021 Syrah", price: 44.0 },
  ],
  "Celaeno Winery": [
    { name: "2024 Chardonnay", price: 20.0 },
    { name: "2019 'Both Barrels' Syrah", price: 39.0 },
    { name: "2019 Malbec", price: 39.0 },
  ],
  "Chateau NoElle": [
    { name: "2023 'Grace' Viognier", price: 17.0 },
    { name: "2020 'Magdalene' Merlot", price: 36.0 },
    { name: "2020 'Ascension' Malbec", price: 36.0 },
  ],
  "Drum Roll Wines": [
    { name: "Drum Roll White", price: 18.0 },
    { name: "Drum Roll Red", price: 22.0 },
    { name: "Seurat Syrah", price: 24.0 },
    { name: "Pinot Renoir", price: 28.0 },
  ],
  "Fortuity Cellars": [
    { name: "2023 Beton", price: 30.0 },
    { name: "2021 The Fifty Fifty", price: 35.0 },
    { name: "2022 Grenache", price: 45.0 },
  ],
  "Isenhower": [
    { name: "2023 Tudor Vineyard Pinot Gris", price: 25.0 },
    { name: "2020 Wild Thyme Red Blend", price: 45.0 },
  ],
  "Market Vineyards": [
    { name: "2024 Liquidity (Viognier/Rouss)", price: 20.0 },
    { name: "2020 Arbitage (Cab Sauv)", price: 40.0 },
    { name: "2020 Basis Points (Red Blend)", price: 45.0 },
  ],
  "Tsillan Cellars": [
    { name: "2023 Estate Riesling", price: 28.0 },
    { name: "2023 Bocciolo Di Rosa", price: 28.0 },
    { name: "2022 Estate Cabernet Franc", price: 48.0 },
  ],
  "Sky River Mead": [
    { name: "Sky River Strawberry Mead", price: 25.0 },
    { name: "Sky River Blackberry Honeywine", price: 24.0 },
  ],
  "Copperworks Distilling": [
    { name: "Maltsmith American Single Malt Whiskey", price: 49.99 },
    { name: "Farmsmith Amer Single Malt Whiskey", price: 69.99 },
    { name: "Peatsmith Amer Single Malt Whiskey", price: 79.99 },
    { name: "Plum Gin", price: 44.95 },
  ],
  "Duvall Distillery": [
    { name: "Limoncello", price: 18.9 },
    { name: "Orangecello", price: 18.9 },
    { name: "Sweet Tea", price: 18.9 },
    { name: "American Starka Vodka", price: 28.54 },
  ],
  "Heritage Distilling": [
    { name: "Lavendar Vodka", price: 17.0 },
    { name: "Florescense Grapefruit Pomelo Vodka", price: 22.25 },
    { name: "Cocoa Bomb Whiskey", price: 24.0 },
    { name: "Special Operations Salute - War Dogs", price: 76.5 },
  ],
  "Lodgepole Distilling": [
    { name: "Lodgepole Yuzu Infused Gin", price: 34.99 },
    { name: "Arboretum Dry Gin", price: 35.99 },
  ],
};

function App() {
  const [ratings, setRatings] = useState(() => JSON.parse(localStorage.getItem("ratings")) || {});
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || {});

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [ratings, notes]);

  const handleRating = (wine, value) => {
    setRatings({ ...ratings, [wine]: ratings[wine] === value ? 0 : value });
  };

  const handleNoteChange = (wine, text) => {
    setNotes({ ...notes, [wine]: text });
  };

  const reset = () => {
    setRatings({});
    setNotes({});
    localStorage.clear();
  };

  const getWinePrice = (wineName) => {
    for (const wines of Object.values(wineries)) {
      for (const wine of wines) {
        if (wine.name === wineName) return wine.price;
      }
    }
    return 0;
  };

  const wishlistItems = Object.entries(ratings)
    .filter(([_, v]) => v === 1)
    .map(([wine]) => wine);

  const totalCost = wishlistItems.reduce((sum, wine) => sum + getWinePrice(wine), 0);

  return (
    <div style={{
      padding: 20,
      fontFamily: "sans-serif",
      maxWidth: 800,
      margin: "0 auto",
      backgroundImage: "url('https://i.imgur.com/B1TUi7Z.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <img
        src="https://i.imgur.com/nygJ5tq.jpg"
        alt="Grape Escape Logo"
        style={{ maxWidth: "100%", height: "auto", marginBottom: 20, display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
      <h1 style={{ textAlign: "center", color: "#800080" }}>Grape Escape</h1>
      <p style={{ textAlign: "center", marginBottom: 20, color: "#800080" }}>
        Welcome to the Grape Escape! We're hoping this app will help with your tasting notes and taking home all of your favorite bottles! Please note taxes will be added to hard liquor sales, but enjoy tax free wine purchases!
      </p>
      {Object.entries(wineries).map(([winery, wines]) => (
        <details key={winery} style={{ marginBottom: 10, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 4 }}>
          <summary style={{ fontWeight: "bold", color: "#800080" }}>{winery}</summary>
          <ul>
            {wines.map(({ name, price }) => (
              <li key={name} style={{ marginBottom: 15 }}>
                <div style={{ color: "#000" }}>
                  {name} - ${price.toFixed(2)}{
                    winery.toLowerCase().includes("distill")
                      ? " (plus tax)"
                      : ""
                  }
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
                  <button
                    onClick={() => handleRating(name, 1)}
                    style={{
                      fontSize: "1.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      filter: ratings[name] === 1 ? "none" : "grayscale(100%)",
                    }}
                  >👍</button>
                  <button
                    onClick={() => handleRating(name, -1)}
                    style={{
                      fontSize: "1.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      filter: ratings[name] === -1 ? "none" : "grayscale(100%)",
                    }}
                  >👎</button>
                </div>
                <textarea
                  placeholder="Tasting notes..."
                  value={notes[name] || ""}
                  onChange={(e) => handleNoteChange(name, e.target.value)}
                  style={{ width: "100%", marginTop: 5 }}
                />
              </li>
            ))}
          </ul>
        </details>
      ))}
      <div style={{ marginTop: 40, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: 4, padding: 10 }}>
        <h2 style={{ color: "#800080" }}>Wishlist (Thumbs Up)</h2>
        <ul>
          {wishlistItems.map((wine) => {
            const winery = Object.entries(wineries).find(([w, list]) => list.some(item => item.name === wine))?.[0] || "";
            return (
              <li key={wine} style={{ color: "#000" }}>
                {wine} ({winery}) - ${getWinePrice(wine).toFixed(2)}
              </li>
            );
          })}
        </ul>
        <p style={{ fontWeight: "bold", color: "#800080" }}>
          Total Cost: ${totalCost.toFixed(2)}
        </p>
        <p style={{ color: "#800080", fontSize: "0.9rem", marginTop: 5 }}>
          *Total cost excludes tax on liquor.
        </p>
      </div>
      <button onClick={reset} style={{ marginTop: 20, padding: "10px 20px", backgroundColor: "#800080", color: "#fff", border: "none", borderRadius: 4 }}>
        Reset All
      </button>
    </div>
  );
}

export default App;
