import React, { useState } from "react";
import Nav from "../../components/ui/nav/Nav";
import { Button } from "../../components/ui/button";
import { FaPlus } from "react-icons/fa6";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetOverlay,
    SheetPortal,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import EmptyLottie from "../../components/ui/lottieComponents/Empty.lottie";
import AuthGuard from "../../components/guard/Auth.Guard";
import FormTool from "./tool/Form.tool";
import DataTableTool from "./tool/DataTable.tool";
import { useGetQuery } from "../../store/service/endpoints/contact.endpoint";
import toast from "react-hot-toast";


const HomePage = () => {
    const { data, isLoading, isError, isSuccess } = useGetQuery();
    const [editData, setEditData] = useState({ edit: false, data: null });

    const handleEdit = (id) => {
        const apiData = data?.contacts?.data;
        const finder = apiData.find((i) => i.id === id);
        setEditData({ edit: true, data: finder });
    }

    const handleClose = () => {
        setEditData({ edit: false, data: null })
    }
    
    return (
        <AuthGuard>
            <Sheet>
                <div className=" w-screen h-screen bg-[#FCFCFD] px-5">
                    <Nav />
                    <div className=" lg:px-52 mx-auto">
                        <div className="flex justify-end">
                            <SheetTrigger>
                                <Button className=" bg-basic space-x-2 mt-5 hover:bg-blue-400">
                                    <FaPlus />
                                    <p>Create Contact</p>
                                </Button>
                            </SheetTrigger>
                        </div>

                        {data?.contacts?.data?.length > 0 ? (
                            <DataTableTool handleEdit={handleEdit} apiData={data?.contacts?.data} />
                        ) : (
                            <div className=" border bg-white h-[500px] w-full mt-5 rounded flex flex-col justify-center items-center">
                                <div className=" mx-auto">
                                    <EmptyLottie />
                                </div>
                                <p className=" items-center text-lg text-gray-500 font-semibold tracking-widest">
                                    There is no List...
                                </p>
                            </div>
                        )}
                    </div>
                    <SheetContent onClose={handleClose} onOverlayClick={handleClose}>
                        <SheetHeader>
                            <SheetTitle className=" tracking-wide text-xl font-bold">
                                Contact Information
                            </SheetTitle>
                        </SheetHeader>
                        <FormTool editData={editData} handleClose={handleClose} />
                        {/* <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save Changes</Button>
                            </SheetClose>
                        </SheetFooter> */}
                    </SheetContent>
                </div>
            </Sheet>
        </AuthGuard>
    );
};

export default HomePage;
