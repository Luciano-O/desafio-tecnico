'use client'
import React, { useEffect, useState } from 'react'
import defaultUser from '../../../../src/assets/defaultUser.jpg'
import Header from '../../../../src/components/ui/header'
import { CameraIcon, ChevronLeft, Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'
import { api } from '../../../../src/lib/axios'
import { Team } from '../../../../src/components/dashboard/teams'

export default function EditTeam() {
  const [ image, setImage ] = useState<string>('')
  const [ file, setFile ] = useState<null | File>(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isAllLoading, setIsAllLoading ] = useState(false)
  const [ name, setName ] = useState<string>('')
  const [ age, setAge ] = useState<string>('')
  const [ teams, setTeams ] = useState<Team[]>([])
  const [ selectedTeam, setSelectedTeam ] = useState('0')

  const params = useParams<{ id: string }>()

  const router = useRouter()

  const bringTeams = () => {
    api.get('/teams')
      .then(({ data }) => setTeams(data))
  }

  useEffect(() => {
    bringTeams()
  }, [])

  const bringPlayer = () => {
    setIsAllLoading(true)
    api.get('/player/' + params.id)
      .then(({ data }) => {
        setName(data.name)
        setImage(data.image)
        setAge(data.age)
        setSelectedTeam(data.team.id)
        setIsAllLoading(false)
      })
  }

  useEffect(() => {
    bringPlayer()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()

    formData.append('name', name)
    formData.append('age', Number(age))
    formData.append('teamId', selectedTeam)
    if(file) formData.append('file', file)

    api.put('players/' + params.id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Sucesso',
          text: 'Jogador editado com sucesso'
        })
        .then(() => {
          router.push('/jogadores')
        })
      })
      .catch(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Erro!',
          text: 'Não conseguimos editar o jogador, tente novamente mais tarde.'
        })
      })
  }

  return (
    <>
      <Header />
      <main
        className='w-[60%] mx-auto flex flex-col gap-5 pr-6 pt-14'
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
        <h1>
          Editar jogador
        </h1>
        <form
          className='w-full rounded-md border gap-4 bg-white flex flex-col items-center p-4'
          onSubmit={handleSubmit}
        >
          {
            isAllLoading ?
            <Loader2 className='w-10 h-10 animate-spin text-gray-600'/> :
            <>
              <div
                className='w-32 h-w-32 relative'
              >
                <img 
                  src={image ? image : defaultUser}
                  alt=''
                  className='w-full h-full rounded-full'
                  width={128}
                  height={128}
                />
                <label
                  className='absolute flex justify-center items-center cursor-pointer w-10 h-10 bg-blue-500 right-0 bottom-0 rounded-full text-white'
                >
                  <CameraIcon 
                    className='w-6 h-6'
                  />
                  <input 
                    type="file" 
                    className='hidden'
                    accept="image/*"
                    onChange={({ target }) => {
                      if(target.files) {
                        if(target.files[0].size > 3145728) {
                          Swal.fire({
                            title: 'Arquivo muito grande!'
                          })

                          return
                        }
                        setFile(target.files[0])
                        setImage(URL.createObjectURL(target.files[0] && target.files[0]))
                      }
                    }}
                  />
                </label>
              </div>
              <p
                className='text-gray-500 text-center'
              >
                Permitido: *.jpeg, *.jpg, *.png, *.gif
                <br />
                Tamanho máximo de 3 MB
              </p>
              <div
                className='w-full flex gap-4'
              >
                <input 
                  type="text" 
                  className='flex-1 focus:outline-none border rounded p-2 border-gray-800'
                  placeholder='Nome'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                <input 
                  type="number" 
                  className='flex-1 focus:outline-none border rounded p-2 border-gray-800'
                  placeholder='Idade'
                  min={1}
                  value={age}
                  onChange={({ target }) => setAge(target.value)}
                />
              </div>
              <select
                className='w-full focus:outline-none border rounded p-2 border-gray-800'
                value={selectedTeam}
                onChange={({ target }) => setSelectedTeam(target.value)}
              >
                <option value="0">Times</option>
                {
                  teams.map((item) => {
                    return (
                      <option 
                        value={item.id}
                        key={item.id}
                      >
                        {item.name}
                      </option>
                    )
                  })
                }
              </select>
              <button
                className='self-end bg-blue-500 text-white text-base rounded-md px-4 py-2 shadow-default'
                type='submit'
              >
                {
                  isLoading ?
                  <Loader2 
                    className='animate-spin w-6 h-6'
                  /> :
                  'SALVAR'
                }
              </button>  
            </>  
          }
        </form>
      </main>
    </>
  )
}