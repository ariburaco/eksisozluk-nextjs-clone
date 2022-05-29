import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import { Entry } from "../@types";
import { animations } from "../animations/animation";

export interface EntryPropos {
    entry: Entry
}

const Entrie = ({ entry }: EntryPropos) => {
    const [animation] = useState(animations[0]);
    return (
        <div className="app-wrap">
            <LazyMotion features={domAnimation}>
                <AnimatePresence exitBeforeEnter>
                    <m.div
                        key={router.route.concat(animation.name)}
                        className="page-wrap"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animation.variants}
                        transition={animation.transition}>
                        <>
                            <div className='my-8 drop-shadow-lg'>
                                <div className='fixed top-[-16px] right-0'>
                                    <div className='h-8 w-8 bg-lime-600 p-1 rounded-full flex justify-center items-center drop-shadow-lg'>
                                        <span className='text-eksi-100 font-bold text-xs'>{entry.favoriteCount}</span>
                                    </div>
                                </div>
                                <div className='bg-eksi-200 rounded-t-2xl p-4 border-b-2 border-b-eksi-600 text-sm md:text-base'
                                    dangerouslySetInnerHTML={{ __html: entry.content }}>
                                </div>

                                <div className='flex justify-between items-center bg-eksi-200 rounded-b-2xl p-4'>
                                    <div className='font-normal text-xs md:text-sm'>
                                        <span>{entry.date}</span>
                                        <a href="#" className=''>
                                            <h2 className='text-left font-semibold text-xs md:text-sm'>{entry.author.authorName}</h2>
                                        </a>
                                    </div>
                                    <Image className='rounded-full w-8 h-8' src={entry.author.authorAvatarLink} width={32} height={32} />
                                </div>
                            </div>
                        </>
                    </m.div>
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
}

export default Entrie;