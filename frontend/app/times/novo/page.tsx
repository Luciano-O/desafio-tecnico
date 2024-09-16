'use client'
import React, { useState } from 'react'
import defaultUser from '../../../src/assets/defaultUser.jpg'
import Header from '../../../src/components/ui/header'
import { CameraIcon, ChevronLeft, Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { api } from '../../../src/lib/axios'

export default function NewTeam() {
  const [ image, setImage ] = useState<string>('')
  const [ file, setFile ] = useState<null | File>(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ name, setName ] = useState<string>('')

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()

    formData.append('name', name)
    if(file) formData.append('file', file)

    api.post('teams', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Sucesso',
          text: 'Time cadastrado com sucesso'
        })
        .then(() => {
          router.push('/times')
        })
      })
      .catch(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Erro!',
          text: 'Não conseguimos cadastrar o time, tente novamente mais tarde.'
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
          Inserir Time
        </h1>
        <form
          className='w-full rounded-md border gap-4 bg-white flex flex-col items-center p-4'
          onSubmit={handleSubmit}
        >
          <div
            className='w-32 h-w-32 relative'
          >
            <Image 
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
          <input 
            type="text" 
            className='w-full focus:outline-none border rounded p-2 border-gray-800'
            placeholder='Nome'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
        </form>
      </main>
    </>
    
  )
}