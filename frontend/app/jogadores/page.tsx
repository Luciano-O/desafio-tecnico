'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../src/components/ui/header'
import { ArrowDown, ChevronLeft, Loader, Pen, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { api } from '../../src/lib/axios'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { Player } from '../../src/components/dashboard/players'

export default function Players() {
  const router = useRouter()
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

  const handleDeletePLayer = (id: number) => {
    api.delete('/players/' + id)
      .then(() => {
        Swal.fire({
          title: 'Jogador deletado com sucesso!'
        })

        bringPlayers()
      })
      .catch(() => {
        Swal.fire({
          title: 'Erro!',
          text: 'Não conseguimos deletar o jogador, tente novamente mais tarde.'
        })
      })
  }

  const orderTable = (field: string, currentArr: Player[], secField ?: string) => {
    if(secField) {
      const finalArr = currentArr.sort((a, b) => b[field][secField] - a[field][secField])
      return setPlayers(finalArr)
    }

    if(typeof currentArr[0][field] === 'string') {
      const finalArr = currentArr.sort((a, b) => b[field].localeCompare(a[field]))
     
      return setPlayers(finalArr)
    }
    
    const finalArr = currentArr.sort((a, b) => b[field] - a[field])

    console.log(finalArr);
    
     
    setPlayers(finalArr)
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
            Jogadores
          </h1>
          <Link
            className='bg-blue-500 text-white flex gap-1 py-1 px-3 rounded'
            href='/jogadores/novo'
          >
            <Plus className='w-4' />
            Adicionar Jogador
          </Link>
        </div>
        {
          isLoading ?
          <Loader
            className='w-20 h-20 animate-spin mx-auto'
          /> :
          players !== null && players?.length < 1 ?
          <h1
            className='mx-auto text-lg font-semibold'
          >
            Não existe nenhum jogador cadastrado
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
                      onClick={() => orderTable('id', players ? players : [])}
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
                      onClick={() => orderTable('name', players ? players : [])}
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
                      onClick={() => orderTable('team', players ? players : [], 'name')}
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
                players?.map((item) => {
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
                        <div
                          className='flex gap-2 items-center'
                        >
                          <img 
                            src={item.team.image}
                            className='w-14 h-14 rounded-full'
                          />
                          {item.team.name}
                        </div>
                      </td>
                      <td>
                        <div
                          className='w-full flex justify-center gap-3 text-gray-500'
                        >
                          <Pen 
                            className='w-4 h-4 hover:text-blue-500 cursor-pointer'
                            strokeWidth={2.5}
                            onClick={() => {
                              router.push('/jogadores/' + item.id + '/editar')
                            }}
                          />
                          <Trash 
                            className='w-4 h-4 hover:text-blue-500 cursor-pointer'
                            strokeWidth={2.5}
                            onClick={() => {
                              Swal.fire({
                                title: 'Tem certeza?',
                                text: 'Remover o jogador é uma ação irreversível',
                                confirmButtonText: 'Sim',
                                showCloseButton: true,
                                showCancelButton: true,
                                cancelButtonText: 'Não',
                              })
                                .then((result) => {
                                  if(result.isConfirmed) {
                                    handleDeletePLayer(item.id)
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