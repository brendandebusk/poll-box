export async function putData(objectID, objectVotes) {
  const formattedData = JSON.stringify({
    option_votes: objectVotes,
  });

  const fetchOptions = {
    method: "PUT",
    headers: {
      "x-apikey": "6427828b39cf552ef728bf4b",
      "Content-Type" : "application/json"
    },
    body: formattedData,
    redirect: "follow"
  };

  console.log("posting data to database");

  await fetch(
    `https://ignpoll-a34d.restdb.io/rest/polloptions/${objectID}`,
    fetchOptions
  );
}
