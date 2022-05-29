import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Entry } from '../../@types';
import Entrie from '../../components/entry';
import { useApiContext } from '../../context/apiContext';
import Head from 'next/head';


const Entry: NextPage = () => {
    const router = useRouter();
    const { entry } = router.query as { entry: string };
    const { entries, getSingleEntry, topicTitle, clearEntries } = useApiContext();

    useEffect(() => {

        clearEntries();
        getSingleEntry(entry);
    }, [entry]);

    return (
        <>
            <Head>
                <title>{topicTitle == undefined ? "ekşisözlük" : topicTitle}</title>
            </Head>

            <div className='w-full top-32 fixed z-50'>
                <div className='bg-gradient-to-b from-eksi-100 to-eksi-200  flex items-center justify-center  py-2 container mx-auto drop-shadow-md  rounded-b-xl '>
                    <h1 className='text-lime-600 drop-shadow-sm font-bold transition-all md:text-3xl text-sm'>{topicTitle} </h1>
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
                </div>
            </div>
        </>
    )
}

export default Entry


