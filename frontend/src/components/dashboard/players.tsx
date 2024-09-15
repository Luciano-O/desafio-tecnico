'use client'
import React, { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { Loader } from 'lucide-react'
import Link from 'next/link'

type Player = {
  age: number,
  image: string,
  name: string,
  id: number,
  team: {
    id: number,
    name: string,
    image: string
  }
}

export default function Players() {
  const [ players, setPlayers ] = useState<null | Player[]>(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const bringPlayers = () => {
    setIsLoading(true)
    api.get('/players')
    .then(({ data }) => {
      setPlayers(data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    bringPlayers()
  }, [])
  
  return(
    <div
      className={`flex flex-col gap-4 w-full ${!isLoading && 'overflow-x-auto'} py-3`}
    >
      <h1
        className='font-semibold'
      >
        Jogadores
      </h1>
      <div
        className={`flex gap-3 ${isLoading && 'justify-center items-center'}`}
      >
        {
          isLoading ?
          <Loader 
            className='w-20 h-20 animate-spin'
          /> :
          players &&
          players.map((item) => {
            return (
              <Link
                className='shadow-default flex gap-5 items-center py-4 min-w-64 h-28 px-4 rounded-md bg-white'
                href={`/player/${item.id}`}
                key={item.id}
              >
                <img
                  className='rounded-full w-14 h-14'
                  src={item.image}
                  alt={'Player ' + item.name + ' image'}
                  width={56}
                  height={56}
                />
                <div
                  className='flex flex-col justify-around h-full'
                >
                  <p
                    className='font-semibold'
                  >
                    {item.name.replace('"', '').replace('"', '')}
                  </p>
                  <p
                    className='font-light'
                  >
                    idade: {item.age}
                  </p>
                  <img 
                    src={item.team.image}
                    alt={'Team ' + item.team.name + ' image'}
                    className='rounded-full w-6 h-6'
                    width={18}
                    height={18}
                  />
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}