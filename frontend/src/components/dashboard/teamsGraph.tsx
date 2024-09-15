'use client'
import React, { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { Loader } from 'lucide-react'
import { Team } from './teams'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default function TeamsGraph() {
  const [ graphData, setGraphData ] = useState<null | { name: string, type: 'column', data: number[], stack: number, color: string}>(null)
  const [ teams, setTeams ] = useState<null | string[]>(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const bringGraphData = () => {
    setIsLoading(true)
    api.get('/teams')
      .then(({ data }) => {
        const finalData = data.map((item: Team) => {
          return {
            name: item.name,
            type: 'column',
            data: [item._count.Player],
            stack: item.id,
            color: '#78D2E4'
          }
        })

        const teamNames = data.map((item: Team) => item.name)

        setTeams(teamNames)
        setGraphData(finalData)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    bringGraphData()
  }, [])

  return (
    <div
      className={`flex flex-col gap-4 w-full py-3 pr-4`}
    >
      <h1
        className='font-semibold'
      >
        Jogadores por time
      </h1>
      <div
        className='w-full max-w-full'
      > 
        {
          isLoading ?
          <Loader
            className='w-20 h-20 animate-spin'
          /> :
          <>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                credits: {
                  enabled: false
                },
                title: {
                  text: ''
                },
                xAxis: {
                  visible: true,
                  categories: teams,
                  min: 0
                },
                legend: {
                  enabled: false,
                },
                series: graphData
              }}
            />
            <div
              className='flex gap-2 w-full justify-center items-center bg-white'
            >
              <div 
                className='w-10 h-3 rounded-sm bg-[#78D2E4]'
              />
              Quantidade de jogadores
            </div>
          </>
        }
      </div>
    </div>
  )
}