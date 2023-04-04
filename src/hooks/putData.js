export async function putData(objectID, objectVotes) {
  const formattedData = JSON.stringify({
    option_votes: objectVotes,
  });

   //highly recommended that you use a backend to manage calling your poll database

  const fetchOptions = {
    method: "PUT",
    headers: {
      "x-apikey": "[API KEY HERE]",
      "Content-Type" : "application/json"
    },
    body: formattedData,
    redirect: "follow"
  };

  console.log("posting data to database");

  await fetch(
    `[URL/${objectID}]`,
    fetchOptions
  );
}
