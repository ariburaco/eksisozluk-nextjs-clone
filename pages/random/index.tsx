import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Entry } from '../../@types';
import Entrie from '../../components/entry';
import { useApiContext } from '../../context/apiContext';


const RandomEntry: NextPage = () => {
    const { entries, getSingleEntry, topicTitle, clearEntries } = useApiContext();
    const [randomEntryNumber, setRandomEntryNumber] = useState(Math.floor(50000000 * Math.random()));

    useEffect(() => {
        clearEntries();
        getSingleEntry(randomEntryNumber.toString());
    }, [randomEntryNumber]);

    return (
        <>
            <Head>
                <title>{topicTitle == null ? "ekşisözlük - not found" : topicTitle}</title>
            </Head>

            <div className='w-full top-32 fixed z-50'>
                <div className='bg-gradient-to-b from-eksi-100 to-eksi-200  flex items-center justify-center  py-2 container mx-auto drop-shadow-md  rounded-b-xl '>
                    <h1 className='text-lime-600 drop-shadow-sm font-bold transition-all md:text-3xl text-sm'>{topicTitle} </h1>
                </div>
            </div>
            <div className="mt-44 container mx-auto p-2">
                <div className='m-2'>
                    {
                        entries !== null ?
                            entries && entries.map((entry: Entry, index: number) => {
                                return (
                                    <Entrie key={index} entry={entry} />
                                );
                            })
                            : (
                                <h1 className='text-center'>#{randomEntryNumber} entry not found</h1>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default RandomEntry
