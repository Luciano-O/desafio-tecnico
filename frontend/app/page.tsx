import Header from '../src/components/ui/header';
import Kpi from '../src/components/dashboard/kpi'

export default function Home() {
  return (
    <>
      <Header />
      <main 
        className='w-full flex flex-col gap-5 pr-6 pt-14 pl-24'
      >
        <Kpi />
      </main>
    </>
  );
}
