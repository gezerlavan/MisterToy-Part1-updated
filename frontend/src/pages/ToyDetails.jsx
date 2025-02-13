import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loader } from '../cmps/Loader'
import { ToyImg } from '../cmps/ToyImg'

import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import { Popup } from '../cmps/Popup'
import { Chat } from '../cmps/Chat'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener('keyup', handleIsOpen)
    return () => {
      window.removeEventListener('keyup', handleIsOpen)
    }
  }, [])

  useEffect(() => {
    loadToy()
  }, [toyId])

  function handleIsOpen({ key }) {
    if (key === 'Escape') setIsOpen(false)
  }

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
      {!!toy.labels?.length && (
        <p>Labels: <span>{toy.labels.join(' ,')}</span></p>
      )}
      <p className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? 'In stock' : 'Not in stock'}
      </p>
      <div>
        <Link className="btn" to="/toy">
          Back
        </Link>
        <button className='btn' onClick={()=>{setIsOpen(true)}}>Chat</button>
      </div>
      {isOpen && (
        <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        heading="Lets chat!"
        footing={<button className='btn' onClick={() => setIsOpen(false)}>Close</button>}
      >
        <Chat/>
      </Popup>
      )}
    </section>
  )
}
