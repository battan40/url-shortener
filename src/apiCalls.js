export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())

}

export const postUrls = (newUrl) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUrl),
  }
  return fetch('http://localhost:3001/api/v1/urls', init)
         .then(response => {
           if(response.ok) {
             return response.json()
           }
         })
        .catch(err => 'Looks like the trouble is on us.  Please try back later.')
}
