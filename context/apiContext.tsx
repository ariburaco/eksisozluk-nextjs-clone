import router from "next/router";
import { createContext, useContext, useState } from "react";
import { EntriesResult, Entry, Topic } from "../@types";

export interface IApiContext {
    topics: Topic[];
    currentTopicCategory: string,
    entries: Entry[];
    clearEntries: () => void;
    getTodaysTopics: () => void;
    getGundemTopics: () => void;
    getDebeTopics: () => void;
    getEntries: (topic: string, day: string) => void;
    getSingleEntry: (entryId: string) => void;
    getNextPage: (topic: string, day: string, page: number) => void;
    setCurrentPage: (page: number) => void;
    currentPage: number;
    totalPages: number;
    topicTitle: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}


export const ApiContext = createContext<IApiContext>({
    topics: [],
    entries: [],
    clearEntries: () => { },
    currentTopicCategory: "",
    getTodaysTopics: () => { },
    getGundemTopics: () => { },
    getSingleEntry: () => { },
    getDebeTopics: () => { },
    getNextPage: () => { },
    getEntries: () => { },
    setCurrentPage: () => { },
    currentPage: 1,
    totalPages: 1,
    topicTitle: "",
    loading: false,
    setLoading: () => { }

});


export const ApiProvider: React.FC = ({ children }) => {
    const [todaysTopics, setTodaysTopics] = useState<Topic[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [topicTitle, setTopicTitle] = useState('getiriliyor...');
    const [currentTopicCategory, setCurrentTopicCategory] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const clearEntries = () => {
        setEntries([]);
    }

    const getEntriesOnPageLoad = (_topic: string, _day: string) => {

        //setTopicLink(_topic);
        setEntries([]);
        setCurrentPage(1);
        setLoading(true);
        try {
            if (_topic === undefined) return;
            fetch(`/api/topics/${_topic}?day=${_day}`, {
                method: 'GET'
            }).then(res => res.json()).catch(err => console.log(err))
                .then(res => {
                    if (res == null) {
                        setLoading(false);
                        return;
                    }
                    const data = res as EntriesResult;
                    if (data && data.entries) {
                        setTotalPages(data.pages);
                        setEntries(data.entries);
                        setTopicTitle(data.entries[0].topic.title);
                        setLoading(false);
                    } else {
                        setTotalPages(1);
                        setEntries([]);
                        setTopicTitle("not found");
                        setLoading(false);
                    }
                });
        } catch (error) {
            router.push('/');
        }
    }


    const getNextPage = (_topic: string, _day: string, _page: number) => {

        try {
            if (_topic === undefined) return;
            setLoading(true);
            fetch(`/api/topics/${_topic}?day=${_day}&p=${_page.toString()}`, {
                method: 'GET'
            }).then(res => res.json())
                .then(res => {
                    const data = res as EntriesResult;
                    if (data && data.entries) {
                        setEntries([...entries, ...data.entries]);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                });

        } catch (error) {
            router.push('/');
        }
    }


    const getSingleEntry = (entryNumber: string) => {

        //setTopicLink(_topic);

        setEntries([]);
        setCurrentPage(1);
        setLoading(true);
        try {
            if (entryNumber === undefined) return;

            fetch(`/api/entry/${entryNumber}`, {
                method: 'GET'
            }).then(res => {
                if (res.status === 404) {
                    setTotalPages(0);
                    setEntries([]);
                    setTopicTitle(`#${entryNumber} getirelemedi`);
                    setLoading(false);
                    return;
                } else {
                    return res.json();
                }
            }).then(res => {

                const data = res as EntriesResult;
                if (data && data.entries) {

                    setTotalPages(data.pages);
                    setEntries(data.entries);
                    setTopicTitle(data.entries[0].topic.title);
                    setLoading(false);
                }
            }).catch(err => console.log(err));

        } catch (error) {
            console.log("error");

        }
    }

    const fetchTodaysTopic = () => {
        try {

            setLoading(true);
            fetch('/api/todays', {
                method: 'GET'
            }).then(res => res.json()).then(res => {
                setTodaysTopics(res as Topic[]);
                setLoading(false);
                setCurrentTopicCategory('todays');
            });

        } catch (error) {

        }
    }


    const fetchGundemTopic = () => {
        try {
            //setTopics([]);
            setLoading(true);
            fetch('/api/gundem', {
                method: 'GET'
            }).then(res => res.json()).then(res => {
                setTodaysTopics(res as Topic[]);
                setLoading(false);
                setCurrentTopicCategory('gundem');
            });

        } catch (error) {

        }
    }

    const fetchDebeTopic = () => {
        try {
            //setTopics([]);
            setLoading(true);
            fetch('/api/debe', {
                method: 'GET'
            }).then(res => res.json()).then(res => {
                setTodaysTopics(res as Topic[]);
                setLoading(false);
                setCurrentTopicCategory('debe');
            });

        } catch (error) {

        }
    }


    return (
        <ApiContext.Provider value={
            {
                topics: todaysTopics,
                entries: entries,
                getTodaysTopics: fetchTodaysTopic,
                getGundemTopics: fetchGundemTopic,
                getDebeTopics: fetchDebeTopic,
                getEntries: getEntriesOnPageLoad,
                getSingleEntry: getSingleEntry,
                getNextPage: getNextPage,
                setCurrentPage: setCurrentPage,
                currentPage: currentPage,
                totalPages: totalPages,
                topicTitle: topicTitle,
                loading: loading,
                setLoading: setLoading,
                currentTopicCategory: currentTopicCategory,
                clearEntries: clearEntries,

            }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);
