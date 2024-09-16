import Link from 'next/link';
import { User, Users, LayoutDashboard } from 'lucide-react';

export default function Header() {
  return (
    <header
      className='fixed w-screen bg-blue-600 font-semibold px-6 py-2 text-xl text-white'
    >
      FutLovers
      <nav
        className='fixed left-6 top-16 flex flex-col gap-2 items-center'
      >
        <Link
          href={'/'}
          className='group relative'
        >
          <LayoutDashboard 
            className='text-gray-600 w-6 hover:text-blue-600'
          />
          <div
            className='absolute left-full top-1/2 hidden group-hover:block text-gray-200 text-xs bg-slate-500 rounded-md p-2 min-w-16'
          >
            Ir para o dashboard
          </div>
        </Link>
        <Link
          href={'/jogadores'}
          className='group relative'
        >
          <User 
            className='text-gray-600 w-6 hover:text-blue-600'
          />
          <div
            className='absolute left-full top-1/2 hidden group-hover:block text-gray-200 text-xs bg-slate-500 rounded-md p-2 min-w-16'
          >
            Ir para a tela de jogadores
          </div>
        </Link>
        <Link
          href={'/times'}
          className='group relative'
        >
          <Users
            className='text-gray-600 w-6 hover:text-blue-600'
          />
          <div
            className='absolute left-full top-1/2 hidden group-hover:block text-gray-200 text-xs bg-slate-500 rounded-md p-2 min-w-16'
          >
            Ir para a tela de times
          </div>
        </Link>
      </nav>
    </header>
  )
}