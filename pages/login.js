import Head from 'next/head'
import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../helpers/Constants'
import { SchemeSendOTP, SchemeVerifyOTP } from '../helpers/GraphQLSchemes'
import { queryGraph, mutateGraph } from '../helpers/GraphQLCaller'
import { useRouter } from 'next/router'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import ProgressBar from '../components/ProgressBar'
import PhoneNumberTab from '../components/login/PhoneNumberTab'
import OTPVerifyTab from '../components/login/OTPVerifyTab'
import DownloadLayout from '../components/DownloadLayout'
import useLocalStorage from '../helpers/useLocalStorage'
import MetaLayout from '../components/MetaLayout'

const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/auth",
    cache: new InMemoryCache(),
});

export default function Login() {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [successDialog, setSuccessDialog] = useState(false)
    const [errorDialog, setErrorDialog] = useState(false)
    const [signupDialog, setSignupDialog] = useState(false)
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [tab, setTab] = useState(1)

    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [mobile, setMobile] = useLocalStorage("mobile", "");

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (tab == 1) {
                setTimeLeft(0);
            } else
                if (timeLeft > 0)
                    setTimeLeft(timeLeft - 1);
        }, 1000);
    });

    const sendOTP = event => {
        event.preventDefault()
        var regex = /^[0]?[6789]\d{9}$/
        if (!regex.test(event.target.phone.value)) {
            setError('Invalid Phone Number')
            return false
        }
        setTimeLeft(0)
        setPhoneNumber(event.target.phone.value)
        setLoadingDialog(true)
        mutateGraph(client, { country_code: ('91'), mobile_number: event.target.phone.value }, SchemeSendOTP)
            .then((res) => {
                if (res.sendOtp) {
                    setLoadingDialog(false)
                    setTab(2)
                    setTimeLeft(30)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log(networkErr)
            });
    }

    const resendOTP = event => {
        event.preventDefault()
        setLoadingDialog(true)
        mutateGraph(client, { country_code: ('91'), mobile_number: phoneNumber }, SchemeSendOTP)
            .then((res) => {
                if (res.sendOtp) {
                    setLoadingDialog(false)
                    // setTab(2)
                    setTimeLeft(30)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log(networkErr)
            });
    }

    const verifyOTP = event => {
        event.preventDefault()
        const otp = event.target.one.value + event.target.two.value
            + event.target.three.value + event.target.four.value
            + event.target.five.value + event.target.six.value
        console.log({ country_code: ('91'), mobile_number: phoneNumber, otp: otp })
        setLoadingDialog(true)
        queryGraph(client, { country_code: ('91'), mobile_number: phoneNumber, otp: otp }, SchemeVerifyOTP)
            .then((res) => {
                console.log(res.otpVerification)
                setLoadingDialog(false)
                if (res.otpVerification.is_user_exist) {
                    setSuccessDialog(true)
                    setTimeout(() => {

                        setSuccessDialog(false)
                        router.push({
                            pathname: 'career_explorer',
                            query: { token: res.otpVerification.auth_token }
                        })
                    }, 2000);
                    setAuthToken(res.otpVerification.auth_token);
                } else {
                    setSignupDialog(true)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                setErrorDialog(true)
                console.log(networkErr);
            });
    }

    return (
        <>

            <MetaLayout title="Login" description="Login" />
            <div className="min-h-screen bg-white flex font-roboto" >
                <div className="hidden lg:block relative w-0 flex-1 leftloginbg overflow-hidden" style={{ background: '#21AAED' }}>

                    <div className="mx-auto w-full h-1/4" >
                        <div className="mt-8 ml-auto mr-auto w-min flex">
                            <img src="img/logoWhite.png" alt="Lifology" width="48px" className="ml-auto mr-auto" />
                            <span className="self-center text-white font-bold pl-4 text-xl tracking-widest">LIFOLOGY</span>
                        </div>
                        <p className="text-center text-white text-xl mt-8" >Building the world's best Super Parent Community</p>
                    </div>
                    <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >

                        {
                            tab === 1 ?
                                <img className="absolute glsignimg h-3/4" src="img/login-left-view.png" alt="" /> :
                                <img className="absolute glsignimg h-3/4" src="img/otp-left-view.png" alt="" />
                        }
                    </div>

                </div>

                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen">

                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center text-center">{tab === 1 ? 'Welcome to Lifology' : 'Enter Code Sent To On Your Mobile Number'}</h2>
                            <p className="mt-2 text-sm text-gray-600 text-center">
                                {tab === 1 ? <span>The World's leading career guidance platform</span> : <span>We sent it to the number +91 {phoneNumber}</span>}
                            </p>
                        </div>

                        <div className="mt-8">
                            {
                                tab === 1 ?
                                    <PhoneNumberTab submit={sendOTP} error={error} setError={(error) => {
                                        setError(error)
                                    }} /> :
                                    <OTPVerifyTab verifyOTP={verifyOTP} resendOTP={resendOTP} timeLeft={timeLeft} selectTab={
                                        () => {
                                            setTimeLeft(0)
                                            setTab(1)
                                        }} />

                            }

                            <div>
                                <div className="mt-6 relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or Login with</span>
                                    </div>
                                </div>
                                <div className="mt-0">
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <div>
                                            <a
                                                href="#"
                                                className="w-full rounded-full border border-gray-200 bg-gray-100 inline-flex px-4 py-2 justify-center text-gray-400 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white duration-500"
                                            // className={styles.socialMediaButton}
                                            >
                                                <span className="sr-only">Sign in with Facebook</span>
                                                <svg className="w-4 h-4 self-center" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <p className="ml-4" >Facebook</p>
                                            </a>
                                        </div>

                                        <div>
                                            <a
                                                href="#"
                                                className="w-full rounded-full border border-gray-200 bg-gray-100 inline-flex px-4 py-2 justify-center text-gray-400 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white duration-500"
                                            >
                                                <span className="sr-only">Sign in with Twitter</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 640 640" className="self-center w-4 h-4" >
                                                    <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z" />
                                                </svg>
                                                <p className="ml-4" >Google</p>
                                            </a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <DownloadLayout />

                </div>
            </div>

            <Transition.Root show={loadingDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={loadingDialog} onClose={setLoadingDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="w-min inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6">

                                <div className="sm:flex sm:items-start m-4">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {/* <Step /> */}
                                        <ProgressBar />
                                    </div>
                                    <button className="h-0 w-0 overflow-hidden" />

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={successDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={successDialog} onClose={setSuccessDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Login successful
                                        </Dialog.Title>
                                        <button className="h-0 w-0 overflow-hidden" />
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={errorDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={errorDialog} onClose={setErrorDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Login Failed
                                        </Dialog.Title>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="rounded-full inline-flex justify-center w-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                        onClick={() => {
                                            setErrorDialog(false)
                                            setTab(1)
                                        }}
                                    >
                                        Go To Login
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={signupDialog} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={signupDialog}
                    onClose={setSignupDialog}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Login Failed
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Phone Number Does Not Exists
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="rounded-full w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => {
                                            setSignupDialog(false)
                                            setMobile(phoneNumber)
                                            router.push({
                                                pathname: 'sign_up_step_1',
                                            })
                                        }}
                                    >
                                        Signup
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => {
                                            setSignupDialog(false)
                                            setTab(1)
                                            setTimeLeft(0)
                                        }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}

// export async function getStaticProps({ params }) {
//     const req = await fetch('http://localhost:3000/api/hello');
//     const data = await req.json();
//     return {
//         props: { r: data }
//     }
// }
//getServerSideProps, getStaticPaths