export async function getData() {
  console.log("getting initial data");

  const fetchOptions = {
    method: "GET",
    async: true,
    crossDomain: true,
    cache: "no-store",
    headers: {
      "x-apikey": "6427828b39cf552ef728bf4b",
      "Content-Type" : "application/json"
    }
  };

  try {
  const pollQuestionsFetch = await fetch(
    "https://ignpoll-a34d.restdb.io/rest/pollquestions",
    fetchOptions
  );

  if (!pollQuestionsFetch.ok) {
    throw new Error(`Error: ${pollQuestionsFetch.status}`)
  }

  const pollQuestionsResponse = await pollQuestionsFetch.json();

  const pollOptionsFetch = await fetch(
    "https://ignpoll-a34d.restdb.io/rest/polloptions",
    fetchOptions
  );
  const pollOptionsResponse = await pollOptionsFetch.json();

  return { pollQuestionsResponse, pollOptionsResponse };
  } catch (error) {
    console.log(error)
  }
}
