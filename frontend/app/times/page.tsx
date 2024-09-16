'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../src/components/ui/header'
import { ArrowDown, ChevronLeft, Loader, Pen, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { api } from '../../src/lib/axios'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { Team } from '../../src/components/dashboard/teams'

export default function Teams() {
  const router = useRouter()
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

  const handleDeleteTeam = (id: number) => {
    api.delete('/teams/' + id)
      .then(() => {
        Swal.fire({
          title: 'Time deletado com sucesso!'
        })

        bringTeams()
      })
      .catch(() => {
        Swal.fire({
          title: 'Erro!',
          text: 'Não é possível remover o time pois há jogadores vinculados a ele, remova os jogadores e tente novamente.'
        })
      })
  }

  const orderTable = (field: string, currentArr: any, secField ?: string) => {
    if(secField) {
      const finalArr = currentArr.sort((a: any, b: any) => b[field][secField] - a[field][secField])
      return setTeams(finalArr)
    }

    if(typeof currentArr[0][field] === 'string') {
      const finalArr = currentArr.sort((a: any, b: any) => b[field].localeCompare(a[field]))
     
      return setTeams(finalArr)
    }
    
    const finalArr = currentArr.sort((a: any, b: any) => b[field] - a[field])

    console.log(finalArr);
    
     
    setTeams(finalArr)
  }

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
        <div
          className='w-full flex items-center justify-between'
        >
          <h1
            className='text-xl font-semibold'
          >
            Times
          </h1>
          <Link
            className='bg-blue-500 text-white flex gap-1 py-1 px-3 rounded'
            href='/times/novo'
          >
            <Plus className='w-4' />
            Adicionar Time
          </Link>
        </div>
        {
          isLoading ?
          <Loader
            className='w-20 h-20 animate-spin mx-auto'
          /> :
          teams !== null && teams?.length < 1 ?
          <h1
            className='mx-auto text-lg font-semibold'
          >
            Não existe nenhum time cadastrado
          </h1> :
          <table
            className='w-full bg-white border'
          >
            <thead>
              <tr
              >
                <td
                  className='text-left font-medium py-2 border-b'
                >
                  <span
                    className='px-4'
                  >
                    Logo
                  </span>
                </td>
                <td
                  className='text-left font-medium py-2 border-b'
                >
                  <span
                    className='flex gap-1 items-center border-l-[2px] border-l-gray-300 px-4'
                  >
                    <ArrowDown 
                      className='w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer'
                      onClick={() => orderTable('id', teams ? teams : [])}
                    />
                    Id
                  </span>
                </td>
                <td
                  className='text-left font-medium py-2 border-b'
                >
                  <span
                    className='flex gap-1 items-center border-l-[2px] border-l-gray-300 px-4'
                  >
                    <ArrowDown 
                      className='w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer'
                      onClick={() => orderTable('name', teams ? teams : [])}
                    />
                    Nome
                  </span>
                </td>
                <td
                  className='text-left font-medium py-2 border-b'
                >
                  <span
                    className='flex gap-1 items-center border-l-[2px] border-l-gray-300 px-4'
                  >
                    <ArrowDown 
                      className='w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer'
                      onClick={() => orderTable('_count', teams ? teams : [], 'Player')}
                    />
                    Quantidade de jogadores
                  </span>
                </td>
                <td
                  className='text-center font-medium py-2 border-b'
                >
                  <span
                    className='border-l-[2px] border-l-gray-300 px-4'
                  >
                    Ações
                  </span>
                </td>
              </tr>
            </thead>
            <tbody>
              {
                teams?.map((item) => {
                  return(
                    <tr
                      key={item.id}
                    >
                      <td
                        className='px-5 py-2'
                      >
                        <img 
                          src={item.image}
                          className='w-14 h-14 rounded-full'
                        />
                      </td>
                      <td
                        className='px-5 py-2'
                      >
                        #{item.id}
                      </td>
                      <td
                        className='px-5 py-2'
                      >
                        {item.name}
                      </td>
                      <td
                        className='px-5 py-2'
                      >
                        {item._count.Player}
                      </td>
                      <td>
                        <div
                          className='w-full flex justify-center gap-3 text-gray-500'
                        >
                          <Pen 
                            className='w-4 h-4 hover:text-blue-500 cursor-pointer'
                            strokeWidth={2.5}
                            onClick={() => {
                              router.push('/times/' + item.id + '/editar')
                            }}
                          />
                          <Trash 
                            className='w-4 h-4 hover:text-blue-500 cursor-pointer'
                            strokeWidth={2.5}
                            onClick={() => {
                              Swal.fire({
                                title: 'Tem certeza?',
                                text: 'Remover o time é uma ação irreversível',
                                confirmButtonText: 'Sim',
                                showCloseButton: true,
                                showCancelButton: true,
                                cancelButtonText: 'Não',
                              })
                                .then((result) => {
                                  if(result.isConfirmed) {
                                    handleDeleteTeam(item.id)
                                  }
                                })
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
      </main>
    </>
  )
}