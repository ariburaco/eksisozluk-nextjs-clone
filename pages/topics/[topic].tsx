import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Entry } from '../../@types';
import Entrie from '../../components/entry';
import { useApiContext } from '../../context/apiContext';
import Head from 'next/head';

const Topic: NextPage = () => {
    const router = useRouter()
    const { topic, day } = router.query as { topic: string, day: string };
    const { entries, getEntries, totalPages, topicTitle, getNextPage, currentPage, setCurrentPage, loading, clearEntries } = useApiContext();

    useEffect(() => {
        clearEntries();
        getEntries(topic, day);
    }, [topic]);

    useEffect(() => {
        getNextPage(topic, day, currentPage);
    }, [currentPage]);

    return (
        <>
            <Head>
                <title>{topicTitle}</title>
            </Head>
            <div className='w-full top-32 fixed z-50'>
                <div className='bg-gradient-to-b from-eksi-100 to-eksi-200  flex items-center justify-center  py-2 container mx-auto drop-shadow-md  rounded-b-xl '>
                    <h1 className='text-lime-600 drop-shadow-sm font-bold transition-all md:text-3xl text-sm'>{topicTitle} </h1>
                    <span className='text-gray-500 font-semibold transition-all md:text-sm text-xs ml-2'>({currentPage} / {totalPages})</span>
                </div>
            </div>
            <div className="mt-44 container mx-auto p-2">
                <div className='m-2'>
                    {
                        entries && entries.map((entry: Entry, index: number) => {
                            return (
                                <Entrie key={index} entry={entry} />
                            );
                        })
                    }
                    {
                        currentPage < totalPages &&
                        (
                            <button onClick={() => setCurrentPage(currentPage + 1)} className='w-full px-6 py-3 rounded-lg bg-lime-600 hover:bg-lime-700 text-eksi-200 font-bold'>
                                {loading ? 'yükleniyor...' : 'daha fazla'}
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Topic




