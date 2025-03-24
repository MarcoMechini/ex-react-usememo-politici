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
    console.log(positionFilter);
  }

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
    const politiciFiltrati = politici.filter(p =>
      (positionFilter !== '') ? p.position === positionFilter : p.position
        &&
        (p.name.toLowerCase().includes(UInput.toLowerCase()) ||
          p.biography.toLowerCase().includes(UInput.toLowerCase()))
    )
    return politiciFiltrati
  }, [politici, UInput, positionFilter])



  //to do fare un array di position da mettere dentro il select
  const politicPositionArr = useMemo(() => {
    const posizioni = []
    politici.map(el => {
      if (!posizioni.includes(el.position)) {
        posizioni.push(el.position)
      }
    })
    return posizioni
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
