import { DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, Drawer } from "@chakra-ui/react";
import { GrRefresh } from "react-icons/gr";
import SideBar from "./sidebar";

interface DrawerSideBarProps {
    onClose: () => void;
    onOpen: () => void;
    selectTopicType: () => void;
    isOpen: boolean;
    title: string
}

const DrawerSideBar = ({ onClose, isOpen, onOpen, selectTopicType, title }: DrawerSideBarProps) => {

    return (
        <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='sm'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader className="shadow-lg">
                    <div className='flex justify-center mx-2  gap-2 items-center'>
                        <h2 className='text-2xl font-bold text-lime-600'>
                            {title}
                        </h2>
                        <GrRefresh className='hover:cursor-pointer active:rotate-180 transition-all' size={24} onClick={() => selectTopicType()} />
                        <DrawerCloseButton className="mt-2" />
                    </div>

                </DrawerHeader>
                <DrawerBody>
                    <SideBar closeDrawer={() => onClose()} selectTopicType={() => selectTopicType()} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerSideBar;