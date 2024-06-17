import React, { useEffect } from 'react';
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from 'formik';
import { Button } from '../../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { SheetClose } from '../../../components/ui/sheet';
import { useCreateMutation } from '../../../store/service/endpoints/contact.endpoint';

const FormTool = () => {
    const initialValue = {
        name: "",
        email: "",
        phone: "",
        address: "",
    }

    const [fun, { data, isError, isLoading }] = useCreateMutation();


    const validationSchema = yup.object({
        name: yup
            .string()
            .required("name field is required")
            .min(3, "name must be 3 length"),
        email: yup
            .string()
            .email("that should be email format")
            .required("email field is required"),
        phone: yup
            .string()
            .min(9, "that should be valid phone number")
            .max(11, "that should be valid phone number")
            .required("phone field is required"),
        address: yup.string().required("address is required"),
    });

    const handleSubmit = (value) => {
        fun(value);
    }

    useEffect(() => {

    }, [data, isError, isLoading]);
    
    return (
        <div className=' h-full'>
            <Formik validateOnBlur={false}
                validateOnChange={false}
                validationSchema={validationSchema}
                initialValues={initialValue}
                onSubmit={handleSubmit}>

                {({ handleBlur, handleChange, values, isSubmitting }) => (
                    <>
                        <Form className=' flex flex-col gap-4 h-full justify-between pb-10 mt-2'>
                            <div className=' space-y-3'>
                                <div className=' flex flex-col'>
                                    <label htmlFor="name" className=' font-medium'>Name</label>
                                    <input className='border-2 border-black rounded-xl p-2 mt-2' onBlur={handleBlur} value={values.name} onChange={handleChange} type="text" name="name" id="name" />
                                    <ErrorMessage className='text-danger text-sm mt-1' component={"p"} name="name" />
                                </div>

                                <div className=' flex flex-col'>
                                    <label htmlFor="email" className=' font-medium'>Email</label>
                                    <input className='border-2 border-black rounded-xl p-2 mt-2' onBlur={handleBlur} value={values.email} onChange={handleChange} type="email" name="email" id="email" />
                                    <ErrorMessage className='text-danger text-sm mt-1' component={"p"} name="email" />
                                </div>

                                <div className=' flex flex-col'>
                                    <label htmlFor="name" className=' font-medium'>Phone</label>
                                    <input className='border-2 border-black rounded-xl p-2 mt-2' onBlur={handleBlur} value={values.phone} onChange={handleChange} type="phone" name="phone" id="phone" />
                                    <ErrorMessage className='text-danger text-sm mt-1' component={"p"} name="phone" />
                                </div>

                                <div className=' flex flex-col'>
                                    <label htmlFor="name" className=' font-medium'>Address</label>
                                    <input className='border-2 border-black rounded-xl p-2 mt-2' onBlur={handleBlur} value={values.address} onChange={handleChange} type="address" name="address" id="address" />
                                    <ErrorMessage className='text-danger text-sm mt-1' component={"p"} name="address" />
                                </div>
                            </div>

                            <div className=' flex gap-3 mt-30'>
                                <SheetClose className='w-full '>
                                    <Button variant="outline"
                                        disabled={isSubmitting} type="button" className="w-full text-basic border-basic">
                                        Cancel
                                    </Button>
                                </SheetClose>

                                <Button
                                    disabled={isSubmitting} type="submit" className="w-full bg-basic border-basic" >
                                    Create
                                    {isSubmitting && (
                                        <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                                    )}
                                </Button >
                            </div>

                        </Form>
                    </>
                )

                }

            </Formik>
        </div>
    )
}

export default FormTool