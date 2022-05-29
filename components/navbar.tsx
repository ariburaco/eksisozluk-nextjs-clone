import { useDisclosure } from "@chakra-ui/react";
import DrawerSideBar from "./drawer";


interface INavbarProps {
    title: string;
    action: () => void;
}

const Navbar = ({ title, action }: INavbarProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <DrawerSideBar onClose={onClose} onOpen={onOpen} isOpen={isOpen} selectTopicType={action} title={title} />
            <li className='text-center align-middle font-bold items-center flex-grow hover:text-lime-500  hover:border-b-8 hover:border-b-lime-500 block px-4 transition-all'>
                <a className='block h-full cursor-pointer' onClick={onOpen}>{title}</a>
            </li>
        </>

    );

}

export default Navbar;