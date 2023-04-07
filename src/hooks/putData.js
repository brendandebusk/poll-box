export async function putData(objectID, objectVotes) {
  const data = {
    objectID: objectID,
    objectVotes: objectVotes,
  };
  const formattedData = JSON.stringify(data);

  const fetchOptions = {
    method: "PUT",
    async: true,
    crossDomain: true,
    cache: "no-store",
    headers: {
    },
    body: formattedData
  };

  console.log("posting data to database");

  const response = await fetch(
    `[URL]`,
    fetchOptions
  );

  if (!response.ok) {
    console.log(response.status)
  }
}
