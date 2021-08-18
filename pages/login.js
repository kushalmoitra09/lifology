import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../helpers/Constants'
import { SchemeSendOTP, SchemeVerifyOTP } from '../helpers/GraphQLSchemes'
import { queryGraph, mutateGraph } from '../helpers/GraphQLCaller'
import { useRouter } from 'next/router'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import PhoneNumberTab from '../components/login/PhoneNumberTab'
import OTPVerifyTab from '../components/login/OTPVerifyTab'
import DownloadLayout from '../components/DownloadLayout'
import useLocalStorage from '../helpers/useLocalStorage'
import MetaLayout from '../components/MetaLayout'
import LoadingDialog from '../components/dialog/LoadingDialog'
import NextNprogress from 'nextjs-progressbar';

const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/auth",
    cache: new InMemoryCache(),
});

export default function Login({ cs }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [successDialog, setSuccessDialog] = useState(false)
    const [successDialogString, setSuccessDialogString] = useState('Login Successful')
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogString, setErrorDialogString] = useState('Login Failed')
    const [signupDialog, setSignupDialog] = useState(false)
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [tab, setTab] = useState(1)

    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const [mobile, setMobile] = useLocalStorage("mobile", "");

    const [timeLeft, setTimeLeft] = useState(0);

    const [selectedCountry, setSelectedCountry] = useState(cs[104])
    useEffect(() => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }, [])
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
                    setTimeLeft(15)
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
                    setTimeLeft(15)
                    setSuccessDialogString('OTP Sent Successful')
                    setSuccessDialog(true)
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
                    setSuccessDialogString('Login Successful')
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                        document.cookie = 'token=' + res.otpVerification.auth_token + ';expires=3600;'
                        router.push({
                            pathname: 'career_explorer',
                        })
                    }, 1000)
                    setAuthToken(res.otpVerification.auth_token);
                } else {
                    setSignupDialog(true)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                setErrorDialog(true)
                setErrorDialogString(networkErr)
                console.log(networkErr)
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
                            <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center text-center">{tab === 1 ? 'Let’s get started' : 'Verify Your Mobile Number'}</h2>
                            <p className="mt-2 text-xs text-gray-600 text-center">
                                {tab === 1 ? <span>The World's leading career guidance platform</span> : timeLeft == 0 ? <span></span> : <span>We have sent a 6-digit OTP to +91 {phoneNumber}. Enter it below.</span>}
                            </p>
                        </div>

                        <div className="mt-8">
                            {
                                tab === 1 ?
                                    <PhoneNumberTab submit={sendOTP} error={error} setError={(error) => {
                                        setError(error)
                                    }} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countries={cs} /> :
                                    <OTPVerifyTab verifyOTP={verifyOTP} resendOTP={resendOTP} timeLeft={timeLeft} selectTab={
                                        () => {
                                            setTimeLeft(0)
                                            setTab(1)
                                        }} />

                            }


                        </div>
                    </div>

                    <DownloadLayout />

                </div>
            </div>

            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />

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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {successDialogString}
                                        </Dialog.Title>
                                        <button className="absolute h-0 w-0 overflow-hidden" />
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
                                            {errorDialogString}
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
export async function getServerSideProps(context) {
    const cs = await fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => (data));
    return {
        props: { cs }
    }
}