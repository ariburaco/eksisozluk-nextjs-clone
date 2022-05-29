import Link from 'next/link';
import { useApiContext } from '../context/apiContext';
import Navbar from './navbar';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';



const Header = () => {
  const { getTodaysTopics, getGundemTopics, getDebeTopics } = useApiContext();
  const router = useRouter();

  const reloadRandomPage = () => {
    if (router.pathname === "/random") {
      router.reload();
    } else {
      router.push('/random');
    }
  }

  return (
    <div>
      <header className='h-32 w-full fixed top-0 left-0 right-0  bg-eksi-100 z-50 my-0 border-t-lime-500 border-t-4 border-b-2 border-b-gray-300'>
        <div className='container mx-auto pt-4 px-2 items-center'>
          <div className='flex flex-row gap-4 justify-between items-center'>
            <div className=''>
              <Link href={'/'}>
                <a>
                  <Image src={'https://ekstat.com/img/new-design/eksisozluk_logo.svg'} height={40} width={300} />
                </a>
              </Link>
            </div>

            <div className='sm:basis-1/2 basis-3/5'>
              <div className='flex'>
                <input className='border-[1px] focus:outline-0 border-lime-500 text-sm font-semibold bg-slate-200  w-full py-2 px-2 rounded-l-md' type='text' placeholder='ara' />
                <button className='rounded-r-md bg-lime-500 px-1 '>
                  <AiOutlineSearch size={32} className='text-eksi-100 block' />
                </button>
              </div>
            </div>
          </div>
          <nav className='mt-4 '>
            <ul className='flex h-12'>
              <Navbar title='bugün' action={() => getTodaysTopics()} />
              <Navbar title='gündem' action={() => getGundemTopics()} />
              <Navbar title='debe' action={() => getDebeTopics()} />
              <li className='text-center align-middle font-bold items-center flex-grow hover:text-lime-500  hover:border-b-8 hover:border-b-lime-500 block px-4 transition-all'>
                <div className='block h-full cursor-pointer' onClick={reloadRandomPage}>rastgele</div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;