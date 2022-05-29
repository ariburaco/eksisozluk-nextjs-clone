import Link from 'next/link';
import { useEffect } from 'react';
import { Topic } from '../@types';
import { useApiContext } from '../context/apiContext';


interface SideBarProps {
  closeDrawer: () => void;
  selectTopicType: () => void;
}

const SideBar = (props: SideBarProps) => {
  const { topics, currentTopicCategory } = useApiContext();

  useEffect(() => {
    props.selectTopicType();
  }, []);

  return (

    <div className='mb-12'>
      <ul className='flex flex-col gap-y-4'>
        {topics.map((entry: Topic, index: number) => {
          return (
            <li key={index} className='flex flex-row justify-between'>

              {
                currentTopicCategory === "todays" || currentTopicCategory === "gundem" ? (
                  <Link href={`/topics${(entry.link)}`} >
                    <a onClick={props.closeDrawer} className='font-medium text-sm w-full py-1 transition-all hover:text-lime-500 hover:cursor-pointer'>
                      {entry.title}</a>
                  </Link>
                ) : (
                  <Link href={`${(entry.link)}`} >
                    <a onClick={props.closeDrawer} className='font-medium text-sm w-full py-1 transition-all hover:text-lime-500 hover:cursor-pointer'>
                      {entry.title}</a>
                  </Link>
                )
              }
              <span className='text-sm text-eksi-800 py-1'>{entry.entryCount}</span>
            </li>
          )
        })}
      </ul>
    </div>

  );
}

export default SideBar;
