import axios from "axios";
import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInput(message: string): Promise<string> {
  return new Promise((resolve) => {
    readlineInterface.question(message, (answer) => {
      resolve(answer);
    });
  });
}

function displayData(data: any) {
  console.log(`Title: ${data.tumblelog.title}`);
  console.log(`Description: ${data.tumblelog.description}`);
  console.log(`Name: ${data.tumblelog.name}`);
  console.log(`Number of Posts: ${data["posts-total"]}`);
}

async function getApiData(
  tumblrName: string,
  start: string,
  numberOfPosts: string
) {
  // Get the posts from tumblr API
  const data = await axios.get(
    `https://${tumblrName}.tumblr.com/api/read/json?type=photo&num=${numberOfPosts}&start=${start}`
  );
  return data;
}

function parseApiData(response: any) {
  return JSON.parse(
    response.data
      .replace(/^var tumblr_api_read = /, "") // Remove the "var tumblr_api_read = " prefix from the response data to get valid JSON
      .trim()
      .slice(0, -1)
  );
}

function getPhotoUrls(posts: { [key: string]: any }[]) {
  const photoUrls = posts
    .map((post) => post["photo-url-1280"]) // Extract the 1280px resolution photo URL from each post
    .filter((url) => url !== undefined);
  return photoUrls;
}

async function main() {
  try {
    const tumblrName = await getInput("Enter the Tumblr blog name: ");
    const range = await getInput("Enter the range (start-end): ");

    // Destructure the range to get start and end
    const [start, end] = range.split("-").map(Number);
    if (!start || !end || start < 1 || end < start) {
      console.error(
        "Invalid range provided. Please use the format: start-end (e.g., 1-5)"
      );
      return;
    }

    const numberOfPosts = end - start + 1;

    const response = await getApiData(
      tumblrName,
      start.toString(),
      numberOfPosts.toString()
    );
    const data = parseApiData(response);
    displayData(data);
    console.log(getPhotoUrls(data.posts));
  } catch (error) {
    console.error(error);
  } finally {
    readlineInterface.close();
  }
}

main();
