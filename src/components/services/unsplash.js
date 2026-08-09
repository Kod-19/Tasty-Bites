const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function searchFoodImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await response.json();

  return data.results;
}