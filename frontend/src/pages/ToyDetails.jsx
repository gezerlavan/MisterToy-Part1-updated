import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loader } from '../cmps/Loader'
import { ToyImg } from '../cmps/ToyImg'

import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(toy => setToy(toy))
      .catch(err => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })
  }

  if (!toy) return <Loader />

  return (
    <section className="toy-details">
      <ToyImg toyName={toy.name} />
      <p>Toy name: <span>{toy.name}</span></p>
      <p>Toy price: <span>${toy.price}</span></p>
      {!!toy.labels.length && <p>Labels: <span>{toy.labels.join(' ,')}</span></p>}
      <p className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? 'In stock' : 'Not in stock'}
      </p>
      <Link className="btn" to="/toy">Back</Link>
    </section>
  )
}
