import DownloadLayout from '../components/DownloadLayout';
import { useRouter } from 'next/router'
import useLocalStorage from '../helpers/useLocalStorage';
import Step from '../components/Step';
import MetaLayout from '../components/MetaLayout'
import { useState } from 'react'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SignUpStep1() {
    const [parentName, setParentName] = useLocalStorage("parentName", "");
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "");
    const [parentNameError, setParentNameError] = useState("")
    const [parentEmailError, setParentEmailError] = useState("")
    const router = useRouter()
    const submit = event => {
        event.preventDefault()
        var valid = true
        if (event.target.name.value == "") {
            setParentNameError("Parent Name Can Not Be Empty")
            valid = false
        }
        if (event.target.email.value == "") {
            setParentEmailError("Parent Email Can Not Be Empty")
            valid = false
        } else {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!event.target.email.value.match(pattern)) {
                setParentEmailError("Parent Email Not Valid")
                valid = false
            }
        }
        if (valid) {
            setParentName(event.target.name.value);
            setParentEmail(event.target.email.value);
            router.push({
                pathname: 'sign_up_step_2',
            });
        }


    }

    return (
        <>

            <MetaLayout title="Sign Up" description="Sign Up" />
            <div className="min-h-screen bg-white flex font-roboto" >
                <div className="hidden lg:block relative w-0 flex-1 leftloginbg overflow-hidden" style={{ background: '#21AAED' }}>

                    <div className="mx-auto w-full h-1/4" >
                        <div className="mt-8 ml-auto mr-auto flex w-max">
                            <img src="img/logoWhite.png" alt="Lifology" width="48px" height="48px" />
                            <span className="self-center text-white font-medium pl-4 text-xl tracking-widest">LIFOLOGY</span>
                        </div>
                        <p className="text-center text-white text-xl mt-8" >Building the world's best Super Parent Community</p>
                    </div>
                    <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >
                        <img className="absolute glsignimg h-3/4" src="img/signup-left-view.png" alt="" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-xl font-bold text-gray-900 text-align-center text-center">Complete your profile</h2>

                            <Step index="1" />
                        </div>

                        <div className="mt-8">


                            <div className="mt-6">

                                <div>
                                    <h2 className="mt-4 font-semibold text-gray-900 text-align-center text-base">1. Parent's Detail</h2>
                                    <p className="mt-2 text-sm text-gray-600 text-sm">
                                        Please enter the following details
                                    </p>
                                </div>

                                <form onSubmit={submit} className="mt-4">
                                    <div>
                                        <div>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input
                                                    onFocus={(event) => {
                                                        setParentNameError("")
                                                    }}
                                                    id="name"
                                                    name="name"
                                                    type="name"
                                                    autoComplete="name"
                                                    placeholder="Your Full Name"
                                                    defaultValue={parentName}
                                                    className={
                                                        classNames(
                                                            parentNameError == "" ? "border-gray-200 focus:border-indigo-700" : "border-red-700",
                                                            "rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                                        )
                                                    }
                                                />
                                                {
                                                    parentNameError == "" ?
                                                        <></> :
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                }
                                            </div>
                                            {
                                                parentNameError == "" ?
                                                    <></> :
                                                    <p className="ml-2 mr-2 mt-2 text-sm text-red-600" id="email-error">
                                                        {parentNameError}
                                                    </p>
                                            }

                                        </div>

                                        <div>
                                            <div className="mt-4 relative rounded-md shadow-sm">
                                                <input
                                                    onFocus={(event) => {
                                                        setParentEmailError("")
                                                    }}
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Email address"
                                                    defaultValue={parentEmail}
                                                    className={
                                                        classNames(
                                                            parentEmailError == "" ? "border-gray-200 focus:border-indigo-700" : "border-red-700",
                                                            "rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                                        )
                                                    }
                                                />
                                                {
                                                    parentEmailError == "" ?
                                                        <></> :
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                }
                                            </div>
                                            {
                                                parentEmailError == "" ?
                                                    <></> :
                                                    <p className="ml-2 mr-2 mt-2 text-sm text-red-600" id="email-error">
                                                        {parentEmailError}
                                                    </p>
                                            }

                                        </div>

                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <DownloadLayout />

                </div>
            </div>
        </>
    )
}