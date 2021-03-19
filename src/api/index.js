const API_URL = new URL('https://wordsapiv1.p.rapidapi.com')
const headers = {
  'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.VUE_APP_API_KEY
}

export async function findWords (pattern) {
  API_URL.pathname = 'words/'
  API_URL.search = new URLSearchParams({
    limit: 10,
    hasDetails: 'definitions',
    letterPattern: `^${pattern}`
  }).toString()

  const data = await fetch(API_URL, { headers })
  if (data.status !== 200) return []

  const { results } = await data.json()
  return results.data
}

export async function wordParams (_word) {
  API_URL.pathname = `words/${_word}`
  const data = await fetch(API_URL, { headers })
  if (data.status !== 200) return []

  const { word, results, pronunciation, syllables } = await data.json()

  return {
    word,
    results,
    ...syllables && { syllables: syllables.list },
    ...pronunciation && { pronunciation: pronunciation.all }
  }
}
