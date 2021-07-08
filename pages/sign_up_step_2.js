import { useRouter } from 'next/router'
import styles from '../styles/Signup.module.css'
import DownloadLayout from '../components/DownloadLayout';
import useLocalStorage from '../helpers/useLocalStorage';
import Step from '../components/Step';
import MetaLayout from '../components/MetaLayout';
import { useState } from 'react'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function SignUpStep2() {
    const [parentName, setParentName] = useLocalStorage("parentName", "")
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "")
    const [childName, setChildName] = useLocalStorage("childName", "")
    const [childGender, setChildGender] = useLocalStorage("childGender", "")
    const [childNameError, setChildNameError] = useState("")
    const [childGenderError, setChildGenderError] = useState("")
    const router = useRouter()

    const submit = event => {
        event.preventDefault()
        var valid = true
        if (event.target.name.value == "") {
            setChildNameError("Child Name Can Not Be Empty")
            valid = false
        }
        if (event.target.gender.value == "") {
            setChildGenderError("Please Select Child's Gender")
            valid = false
        }
        if (valid) {
            setChildName(event.target.name.value)
            setChildGender(event.target.gender.value)
            router.push({
                pathname: 'sign_up_step_3',
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

                            <Step index="2" />
                        </div>

                        <div className="mt-8">


                            <div className="mt-6">

                                <div>
                                    <h2 className="mt-4 font-semibold text-gray-900 text-align-center text-base">2. Child Detail</h2>
                                    <p className="mt-2 text-gray-600 text-sm">
                                        Please enter the following details
                                    </p>
                                </div>

                                <form onSubmit={submit} className="mt-4">
                                    <div>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                onFocus={(event) => {
                                                    setChildNameError("")
                                                }}
                                                id="name"
                                                name="name"
                                                type="name"
                                                autoComplete="name"
                                                placeholder="Child Full Name"
                                                defaultValue={childName}
                                                className={
                                                    classNames(
                                                        childNameError == "" ? "border-gray-200 focus:border-indigo-700" : "border-red-700",
                                                        "rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                                    )
                                                }
                                            />
                                            {
                                                childNameError == "" ?
                                                    <></> :
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                    </div>
                                            }
                                        </div>
                                        {
                                            childNameError == "" ?
                                                <></> :
                                                <p className="ml-2 mr-2 mt-2 text-sm text-red-600" id="email-error">
                                                    {childNameError}
                                                </p>
                                        }

                                    </div>

                                    <div>
                                        <h2 className="mt-4 font-semibold text-gray-900 text-align-center text-base">Gender</h2>
                                        <div>
                                            <label htmlFor="male" className={styles.radioField}>
                                                <input type="radio" id="male" name="gender" tabIndex="1" value="Male" onClick={(event) => setChildGenderError("")} />
                                                <span>Male</span>
                                            </label>
                                            <label htmlFor="female" className={styles.radioField}>
                                                <input type="radio" id="female" name="gender" tabIndex="2" value="Female" onClick={(event) => setChildGenderError("")} />
                                                <span>Female</span>
                                            </label>
                                            <label htmlFor="other" className={styles.radioField}>
                                                <input type="radio" id="other" name="gender" tabIndex="3" value="Other" onClick={(event) => setChildGenderError("")} />
                                                <span>Other</span>
                                            </label>
                                        </div>
                                        {
                                            childGenderError == "" ?
                                                <></> :
                                                <p className="ml-2 mr-2 text-sm text-red-600" id="email-error">
                                                    {childGenderError}
                                                </p>
                                        }
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2 mt-4" >

                                        <button
                                            onClick={() => {
                                                router.push({
                                                    pathname: 'sign_up_step_1',
                                                });
                                            }}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-indigo-700 cursor-pointer duration-500">
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
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