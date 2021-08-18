import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import { mutateGraph, queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeEditProfile, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import ProgressBar from '/components/ProgressBar'
import { Fragment } from 'react'
import MetaLayout from '/components/MetaLayout'
import cookies from 'next-cookies'
import { SchemeGetCoachesList, SchemeGetPackagesList, SchemeGetPackageDetails } from '/helpers/GraphQLSchemes'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '/components/Breadcrumbs'
import LoadingDialog from '../../../../components/dialog/LoadingDialog'
import { SchemeCreateOrder } from '../../../../helpers/GraphQLSchemes'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import Head from 'next/head'

export default function Payment({ profile, token, coachPackage }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [appliedCoupon, setAppliedCoupon] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)
    const [successDialog, setSuccessDialog] = useState(false)
    const [successDialogString, setSuccessDialogString] = useState('')
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogString, setErrorDialogString] = useState('')
    // const [order, setOrder] = useState({})

    const validateCoupon = (event) => {
        event.preventDefault()
        setLoadingDialog(true)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ coupon_code: event.target.coupon.value, item_id: parseInt(coachPackage.id), item_type: 'COACHING_PACKAGE' })
        }
        console.log(requestOptions)
        fetch(Constants.baseUrl + '/api/validate-coupon-code', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoadingDialog(false)
                console.log(data);
                if (data.status == 200) {
                    var minDiscount = data.result[0].min_discount
                    var maxDiscount = data.result[0].max_discount
                    var percentage = data.result[0].percentage_discount
                    var tempDiscount = coachPackage.coaching_packages_prices[0].price * percentage / 100
                    setDiscountAmount(tempDiscount > maxDiscount ? maxDiscount : tempDiscount < minDiscount ? minDiscount : tempDiscount)
                    setAppliedCoupon(data.result[0].code)
                    setSuccessDialogString('Coupon Added Successfully')
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                    }, 1000)
                } else {
                }
                event.target.coupon.value = ""
            });
    }

    const createOrder = (event) => {
        const apolloClient = new ApolloClient({
            uri: Constants.baseUrl + "/razorpay/payment",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const params = {
            item_id: parseInt(coachPackage.id),
            currency: 'INR',
            order_type: 'COACHING_PACKAGE',
        }
        if (appliedCoupon != "") {
            params.coupon_code = appliedCoupon
        }
        mutateGraph(
            apolloClient,
            params,
            SchemeCreateOrder
        ).then((res) => {
            console.log(res)
            makePayment(res.createOrder)
        }).catch((networkErr) => {
            console.log('error' + networkErr);
        })
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function makePayment(order) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        console.log(order.id)
        var options = {
            description: 'Buy ' + coachPackage.title + ' Package',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: Constants.RAZOR_PAY_KEY,
            amount: (coachPackage.coaching_packages_prices[0].price - discountAmount) * 100,
            name: 'Lifology',
            order_id: order.id,
            prefill: {
                email: profile.email,
                contact: profile.mobile_number,
                name: profile.name
            },
            handler: async function (response) {
                setSuccessDialogString('Payment Completed Successfully')
                setSuccessDialog(true)
                setTimeout(() => {
                    setSuccessDialog(false)
                    router.push({
                        pathname: '/coaching/package',
                    })
                }, 1000)
            },
            theme: { color: '#53a20e' }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.on('payment.failed', (response) => {
            console.log('Error')
            setErrorDialogString('Failed To Complete Payment')
            setErrorDialog(true)
        })
        paymentObject.open()
    }

    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: false
        },
        {
            name: coachPackage.title, href: '/coaching/package/' + coachPackage.id, current: false
        },
        {
            name: 'Payment', href: '#', current: true
        },
    ]
    return (
        <>
            {/* <MetaLayout title="Payment" description="Payment" >
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </MetaLayout>  */}
            <head>
                <title>Payment</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>

            </head>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Payment" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />

                        <div className="mx-4 mt-4 p-4 shadow rounded bg-white">
                            <div className="sm:flex h-full w-full">
                                <div className="mb-4 mr-0 flex-shrink-0 sm:mb-0 ">
                                    <img src={coachPackage.thumbnail} className="h-40 rounded ml-auto mr-auto" />
                                </div>
                                <div className="w-full self-center mr-9 px-4">
                                    <div className="font-bold text-xl" >{coachPackage.title}</div>
                                    <div className="mt-4 text-sm " >{coachPackage.description}</div>

                                </div>
                            </div>
                            <div className="mt-4 h-px bg-gray-400 w-full"></div>
                            <div>
                                <div className="mt-4 font-medium text-base" >Apply Coupon Code</div>
                                <form onSubmit={validateCoupon} className="mt-2 sm:flex sm:items-start sm:justify-between">
                                    <div className="max-w-xl text-sm text-gray-500 w-full">
                                        <input
                                            id="coupon"
                                            name="coupon"
                                            type="text"
                                            autoComplete="text"
                                            placeholder="Enter Coupon"
                                            className="border-gray-200 focus:border-indigo-700 rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                        />
                                    </div>
                                    <div className="w-1/2 mt-5 sm:mt-0 sm:ml-4 sm:flex-shrink-0 sm:flex sm:items-center">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-8 py-2 border border-transparent shadow-sm font-medium rounded-full text-white bg-lgreen hover:bg-lgreen-light focus:outline-none sm:text-sm"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </form>
                                {appliedCoupon != "" ?
                                    <div className="flex mt-4">
                                        <div onClick={(event) => {
                                            setDiscountAmount(0)
                                            setAppliedCoupon('')
                                        }} className="cursor-pointer mt-5 sm:mt-0 sm:ml-4 sm:flex-shrink-0 sm:flex sm:items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <div className="mx-4 max-w-xl text-sm text-gray-500 w-full self-center">
                                            <div className="font-medium text-sm" >Applied Coupon: <span className="text-lblue">{appliedCoupon}</span></div>
                                        </div>


                                    </div> : <></>}
                            </div>
                            <div className="mt-4 h-px bg-gray-400 w-full"></div>
                            <div className="mt-4 ml-4">
                                <div className="font-medium text-sm" >Package Amount: <span className="text-lblue">Rs {coachPackage.coaching_packages_prices[0].price}</span></div>
                                {
                                    discountAmount > 0 ? <div className="mt-2 font-medium text-sm" >Discount Amount: <span className="text-lblue">Rs {discountAmount}</span></div> : <></>
                                }
                                <div className="mt-2 font-medium text-sm" >Total Amount: <span className="text-lblue ">Rs {coachPackage.coaching_packages_prices[0].price - discountAmount}</span></div>

                            </div>
                            <div className="mt-4 h-px bg-gray-400 w-full"></div>
                            <div className="flex mt-4 ">
                                <button
                                    onClick={createOrder}
                                    type="button"
                                    className="inline-flex items-center px-8 py-2 border border-transparent shadow-sm font-medium rounded-full text-white bg-lblue hover:bg-lblue-light focus:outline-none sm:text-sm duration-500"
                                >
                                    Proceed To Pay
                                </button>
                                <button
                                    onClick={(event) => {
                                        router.back()
                                    }}
                                    type="button"
                                    className="ml-4 inline-flex items-center px-8 py-2 border border-lgrey-border shadow-sm font-medium rounded-full bg-lgrey hover:bg-lgrey-border focus:outline-none sm:text-sm duration-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </main>
                </div>


            </div >
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
                                        <button className="absolute h-0 w-0 overflow-hidden" />
                                    </div>
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
    const { token } = cookies(context)
    console.log(token)
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const coachClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/skills",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const coachPackage = await queryGraph(coachClient, { id: parseInt(context.params.id) }, SchemeGetPackageDetails)
        .then((res) => {
            return res.coachingPackageDetails
        }).catch((networkErr) => {
            console.log(networkErr)
            return [];
        })
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: { profile, token, coachPackage }
    }
}