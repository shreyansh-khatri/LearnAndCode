const axios = require("axios");
const readline = require("readline");

const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchCoordinates(placeName: string): Promise<void> {
  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    placeName
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "GeocodingApp/1.0 (shreyanshkhatri8@gmail.com)",
      },
    });

    const results = response.data;

    if (!Array.isArray(results) || results.length === 0) {
      console.log("No coordinates found for the specified location.");
      return;
    }

    const { lat, lon } = results[0];
    console.log(`Coordinates for "${placeName}":`);
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lon}`);
  } catch (error: any) {
    console.error("Failed to fetch coordinates:", error.message);
  }
}

inputInterface.question("Enter a location: ", async (placeName: string) => {
  if (placeName.trim() === "") {
    console.log("Please enter a valid place name.");
  } else {
    await fetchCoordinates(placeName);
  }
  inputInterface.close();
});
