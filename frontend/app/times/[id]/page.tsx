'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../src/components/ui/header'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Loader } from 'lucide-react'
import { api } from '../../../src/lib/axios'
import { Team } from '../../../src/components/dashboard/teams'
import Link from 'next/link'

export default function TeamDetails() {
  const params = useParams<{ id: string }>()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ team, setTeam ] = useState<Team | null>(null)
  const router = useRouter()

  const bringData = () => {
    setIsLoading(true)
    
    api.get('/team/' + params?.id)
      .then(({ data }) => {
        setTeam(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    bringData()
  }, [])
  
  return (
    <>
      <Header />
      <main
        className='w-full flex flex-col gap-5 pr-6 pt-14 pl-24'
      >
        <p 
          className='text-gray-600 hover:text-blue-500 flex items-center gap-1  cursor-pointer'
          onClick={() => router.back()}
        >
          <ChevronLeft
            className='w-4'
          />
          Voltar
        </p>
        {
          isLoading ?
          <Loader
            className='w-20 h-20 animate-spin mx-auto'
          /> :
          <>
            <div
              className='w-full shadow-default rounded-md bg-white flex gap-10 px-10 py-5 items-center'
            >
              <img 
                src={team?.image}
                alt="Foto do time"
                className='w-52 h-52 rounded-full'
              />
              <h2
                className='text-2xl font-medium'
              >
                {team?.name}
              </h2>
            </div>
            <div
              className='w-full flex flex-col gap-3 px-2'
            >
              <p
                className='font-semibold text-lg'
              >
                Jogadores
              </p>
              <div
                className='flex w-full flex-wrap gap-3 justify-around'
              >
                { 
                  team?.Player.map((item) => {
                    return (
                      <Link
                        className='shadow-default flex gap-5 items-center py-4 w-64 h-28 px-4 rounded-md bg-white'
                        href={`/jogadores/${item.id}`}
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
                            Idade: {item.age}
                          </p>
                        </div>
                      </Link>
                            )
                  })
                }
              </div>
            </div>
          </>
        }
      </main>
    </>
  )
}