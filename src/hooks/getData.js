export async function getData() {
  console.log("getting initial data");

  //highly recommended that you use a backend to manage calling your poll database

  const fetchOptions = {
    method: "GET",
    async: true,
    crossDomain: true,
    cache: "no-store",
    headers: {
      "x-apikey": "[API KEY HERE]",
      "Content-Type" : "application/json"
    }
  };

  try {
  const pollQuestionsFetch = await fetch(
    "[URL HERE]",
    fetchOptions
  );

  if (!pollQuestionsFetch.ok) {
    throw new Error(`Error: ${pollQuestionsFetch.status}`)
  }

  const pollQuestionsResponse = await pollQuestionsFetch.json();

  const pollOptionsFetch = await fetch(
    "[URL HERE]",
    fetchOptions
  );
  const pollOptionsResponse = await pollOptionsFetch.json();

  return { pollQuestionsResponse, pollOptionsResponse };
  } catch (error) {
    console.log(error)
  }
}
