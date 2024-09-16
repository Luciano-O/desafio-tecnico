'use client'
import React, { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { Loader } from 'lucide-react'

export default function Kpi() {
  const [ fullInfo, setFullInfo ] = useState<null | { averageAge: number, teamTotal: number, playerTotal: number}>(null)
  
  const bringKpiInfo = () => {
    api.get('/kpi')
      .then(({ data }) => {
        setFullInfo(data)
      })
      .catch(() => {
      })
  }

  useEffect(() => {
    bringKpiInfo()
  }, [])
  
  return (
    <div
      className='flex gap-3'
    >
      <div
        className='flex flex-col min-w-64 h-32 bg-white rounded-md shadow-default p-5 justify-around'
      >
        {
          !fullInfo ?
          <Loader 
            className='w-20 h-20 animate-spin self-center'
          /> :
          <>
            <span
              className='text-6xl font-semibold'
            >
              {fullInfo.teamTotal}
            </span>
            <span
              className='font-light'
            >
              Times
            </span>
          </>
        }
      </div>
      <div
        className='flex flex-col min-w-64 h-32 bg-white rounded-md shadow-default p-5 justify-around'
      >
        {
          !fullInfo ?
          <Loader 
            className='w-20 h-20 animate-spin'
          /> :
          <>
            <span
              className='text-6xl font-semibold'
            >
              {fullInfo.playerTotal}
            </span>
            <span
              className='font-light'
            >
              Jogadores
            </span>
          </>
        }
      </div>
      <div
        className='flex flex-col min-w-64 h-32 bg-white rounded-md shadow-default p-5 justify-around'
      >
        {
          !fullInfo ?
          <Loader 
            className='w-20 h-20 animate-spin'
          /> :
          <>
            <span
              className='text-6xl font-semibold'
            >
              {fullInfo.averageAge}
            </span>
            <span
              className='font-light'
            >
              Idade media dos jogadores
            </span>
          </>
        }
      </div>
    </div>
  )  
}