export async function getData() {
  console.log("getting initial data");

  const fetchOptions = {
    method: "GET",
    async: true,
    crossDomain: true,
    cache: "no-store",
    headers: {
    },
  };

  try {
    const dataFetch = await fetch(
      "[URL]",
      fetchOptions
    );

    if (!dataFetch.ok) {
      throw new Error(`Error: ${dataFetch.status}`);
    }

    const dataFetchJson = await dataFetch.json();
    const questions = dataFetchJson.questions;
    const options = dataFetchJson.options;

    return { questions, options }

  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error}`);
  }
}
