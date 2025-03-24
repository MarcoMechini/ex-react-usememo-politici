import React, { useEffect, useMemo, useState } from 'react'

const PoliticianCard = React.memo(({ pol }) => {

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
  const [positionFilter, setPositionFilter] = useState('')

  const handleInputchange = (e) => {
    setPositionFilter(e.target.value)
  }

  async function getPolitici() {
    try {
      const fetchPolitici = await fetch(`https://www.freetestapi.com/api/v1/politicians`).then(obj => obj.json())
      setPolitici(fetchPolitici);
    } catch (error) {
      console.error('ERRORE', error.message);
    }
  }

  const filteredPolitici = useMemo(() => {
    const politiciFiltrati = politici.filter(p => {
      const isInName = p.name.toLowerCase().includes(UInput.toLowerCase())
      const isInBio = p.biography.toLowerCase().includes(UInput.toLowerCase())
      const selectPosition = (positionFilter !== '') ? p.position === positionFilter : p.position
      return selectPosition && (isInName || isInBio)
    }
    )
    return politiciFiltrati
  }, [politici, UInput, positionFilter])



  //to do fare un array di position da mettere dentro il select
  const politicPositionArr = useMemo(() => {
    return politici.reduce((acc, el) => {
      if (!acc.includes(el.position)) {
        return [...acc, el.position]
      }
      return acc
    }, [])
  }, [politici])

  useEffect(() => {
    getPolitici()
  }, [])



  return (
    <>
      <input
        type="text"
        value={UInput}
        onChange={(e) => setUInput(e.target.value)} />
      <select name="position" id="position"
        onChange={handleInputchange}
      >
        <option key={0} value=''>Tutti</option>
        {politicPositionArr && politicPositionArr.map((el, index) =>
          <option key={index} value={el}>{el}</option>)
        }

      </select>
      <ul>
        {filteredPolitici.map(p => (
          <PoliticianCard key={p.id} pol={p} />
        ))}
      </ul>
    </>
  )
}

export default App
