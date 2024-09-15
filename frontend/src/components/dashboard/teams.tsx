'use client'
import React, { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { Loader } from 'lucide-react'
import Link from 'next/link'

export type Team = {
  name: string,
  id: number,
  image: string,
  Player: {
    name: string,
    id: number,
    age: number,
    image: string
  }[],
  _count: {
    Player: number
  }
}

export default function Teams() {
  const [ teams, setTeams ] = useState<null | Team[]>(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const bringTeams = () => {
    setIsLoading(true)
    api.get('/teams')
      .then(({ data }) => {
        setTeams(data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    bringTeams()
  }, [])

  return(
    <div
      className={`flex flex-col gap-4 w-full ${!isLoading && 'overflow-x-auto'} py-3`}
    >
      <h1
        className='font-semibold'
      >
        Times
      </h1>
      <div
        className={`flex gap-3 ${isLoading && 'justify-center items-center'}`}
      >
        {
          isLoading ?
          <Loader
            className='w-20 h-20 animate-spin'
          /> :
          teams &&
          teams.map((item) => {
            return (
              <Link
                className='shadow-default flex gap-5 items-center py-4 w-64 h-28 px-4 rounded-md bg-white'
                href={`/team/${item.id}`}
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
                  className='flex flex-col justify-center gap-1 h-full'
                >
                  <p
                    className='font-semibold'
                  >
                    {item.name}
                  </p>
                  <p
                    className='font-light'
                  >
                    {item._count.Player} jogadores
                  </p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}