import React, { useEffect, useMemo, useState } from 'react'

const PoliticianCard = React.memo(({ pol }) => {
  console.log(pol.name);

  return (
    <>
      <div>{pol.name}</div>
      <img src={pol.image} alt={pol.name} />
      <div>{pol.position}</div>
      <p>{pol.biography}</p>
    </>
  )
})

function App() {

  const [politici, setPolitici] = useState([])
  const [UInput, setUInput] = useState('')

  async function getPolitici() {
    try {
      console.log('chiamata API');
      const fetchPolitici = await fetch(`https://www.freetestapi.com/api/v1/politicians`).then(obj => obj.json())
      setPolitici(fetchPolitici);
    } catch (error) {
      console.error('ERRORE', error.message);
    }
  }

  const filteredPolitici = useMemo(() => {

    // || p.biography.toLowerCase().includes(UInput.toLowerCase())
    return politici.filter(p => p.name.toLowerCase().includes(UInput.toLowerCase()))
  }, [politici, UInput])

  useEffect(() => {
    getPolitici()
  }, [])



  return (
    <>
      <input
        type="text"
        value={UInput}
        onChange={(e) => setUInput(e.target.value)} />
      <ul>
        {filteredPolitici.map(p => (
          <PoliticianCard key={p.id} pol={p} />
        ))}
      </ul>
    </>
  )
}

export default App
