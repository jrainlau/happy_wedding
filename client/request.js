const DOMAIN = 'https://kingheyolanda.vercel.app/api'

export default async function postApi(url, body) {
  const myHeaders = new Headers();
  myHeaders.append("authorization", "happyWedding");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow'
  };

  return await fetch(`${DOMAIN}${url}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error =>error);
}
