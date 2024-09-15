import Header from '../src/components/ui/header';
import Kpi from '../src/components/dashboard/kpi'
import Players from '../src/components/dashboard/players'
import Teams from '../src/components/dashboard/teams'
import TeamsGraph from '../src/components/dashboard/teamsGraph'

export default function Home() {
  return (
    <>
      <Header />
      <main 
        className='w-full flex flex-col gap-5 pr-6 pt-14 pl-24'
      >
        <Kpi />
        <Players />
        <Teams />
        <TeamsGraph />
      </main>
    </>
  );
}
