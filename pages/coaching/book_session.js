import { Fragment, useState, useEffect } from 'react'
import { Listbox, Dialog, Transition, RadioGroup } from '@headlessui/react'
import {
    BookmarkIcon,
    CheckIcon,
    ExclamationIcon,
    SelectorIcon
} from '@heroicons/react/outline'
import {
    SearchIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeGetPurchasedPakage, SchemeGetUniversity, SchemeAddBookmark, SchemeVideoStatus, SchemeGetUniversityBookmark, SchemeUpdateUniversityBookmark, SchemeAllUniversityCareerPools, SchemeUniversityCareerFields, SchemeGetPackageDetails, SchemeGetCoachesList } from '/helpers/GraphQLSchemes'
import { mutateGraph } from '/helpers/GraphQLCaller'
import Breadcrumbs from '/components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import LoadingDialog from '/components/dialog/LoadingDialog'
import NotificationLayout from '/components/NotificationLayout'
import classNames from '/helpers/classNames'

import Expand from 'react-expand-animated'
import YoutubeDialog from '/components/dialog/YoutubeDialog'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Calendar from 'react-calendar'
import { SchemeBookAppointment } from '../../helpers/GraphQLSchemes'
// import 'react-calendar/dist/Calendar.css';


export default function BookSession({ profile, token, purchasedPackage, session }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [loadingDialog, setLoadingDialog] = useState(false)

    const [openVideo, setOpenVideo] = useState(false)

    const [date, setDate] = useState(new Date())

    const pages = [
        {
            name: 'Booking', href: '#', current: true
        },
    ]

    const [coachesSliderRef, coachesSlider] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })
    const timeArray = [
        {
            id: 0,
            start: '10:00',
            end: '11:00',
            time: '10:00 - 11:00'
        },
        {
            id: 1,
            start: '11:00',
            end: '12:00',
            time: '11:00 - 12:00'
        },
        {
            id: 2,
            start: '12:00',
            end: '13:00',
            time: '12:00 - 13:00'
        },
        {
            id: 3,
            start: '13:00',
            end: '14:00',
            time: '13:00 - 14:00'
        },
        {
            id: 4,
            start: '14:00',
            end: '15:00',
            time: '14:00 - 15:00'
        },
        {
            id: 5,
            start: '15:00',
            end: '16:00',
            time: '15:00 - 16:00'
        },
        {
            id: 6,
            start: '16:00',
            end: '17:00',
            time: '16:00 - 17:00'
        },
        {
            id: 7,
            start: '17:00',
            end: '18:00',
            time: '17:00 - 18:00'
        },
        {
            id: 8,
            start: '18:00',
            end: '19:00',
            time: '18:00 - 19:00'
        }
    ]

    const [selectedTime, setSelectedTime] = useState(0)
    const [openSession, setOpenSession] = useState(false)


    const [successDialog, setSuccessDialog] = useState(false)
    const [successDialogString, setSuccessDialogString] = useState('')
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogString, setErrorDialogString] = useState('')

    const bookSession = (event) => {
        console.log(date + ' ' + timeArray[selectedTime].start)
        const coachClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/skills",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        mutateGraph(coachClient, {
            coach_id: parseInt(purchasedPackage.coaching_packages.coach_details.id),
            session_id: parseInt(session.coaching_package_sessions[0].id),
            appointment_date: date,
            start_time: timeArray[selectedTime].start,
            end_time: timeArray[selectedTime].end,
            duration: 60
        }, SchemeBookAppointment).then((res) => {
            console.log(res)
            setSuccessDialogString('Session Booked Successfully')
            setSuccessDialog(true)
        }).catch((networkErr) => {
            console.log(networkErr)
            setErrorDialogString('Failed To Book Session')
            setErrorDialog(true)
        })
    }
    return (
        <>
            <MetaLayout title='Book Session' description='Book Session' />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title='Book Session' />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-4">

                                                <div className="sm:flex h-full w-full mb-4 ">
                                                    <div className="flex-shrink-0 sm:mb-0 sm:mr-4 self-center">
                                                        <div className="font-bold text-xl">Coach Details</div>
                                                    </div>
                                                </div>

                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 self-center">
                                                        <img className="object-contain rounded-full w-24 h-24 object-cover" src={purchasedPackage.coaching_packages.coach_details.profile_image} />
                                                    </div>
                                                    <div className="w-full self-center text-left">
                                                        <div className="w-full text-gray-900 font-medium text-base">
                                                            {purchasedPackage.coaching_packages.coach_details.name}
                                                        </div>
                                                        <div className="text-gray-500 mt-1 w-full overflow-hidden text-sm">{purchasedPackage.coaching_packages.coach_details.coaching_category}</div>
                                                        <div className="flex w-min mt-1 mb-2">
                                                            <div className={purchasedPackage.coaching_packages.coach_details.rating >= 1 ? 'text-lyellow' : 'text-gray-400'}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>
                                                            <div className={purchasedPackage.coaching_packages.coach_details.rating >= 2 ? 'text-lyellow' : 'text-gray-400'}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>
                                                            <div className={purchasedPackage.coaching_packages.coach_details.rating >= 3 ? 'text-lyellow' : 'text-gray-400'}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>
                                                            <div className={purchasedPackage.coaching_packages.coach_details.rating >= 4 ? 'text-lyellow' : 'text-gray-400'}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>
                                                            <div className={purchasedPackage.coaching_packages.coach_details.rating >= 5 ? 'text-lyellow' : 'text-gray-400'}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 w-1/2 text-gray-900 font-medium">
                                                    What Will Be Covered
                                                </div>

                                                {
                                                    session ?
                                                        <div>
                                                            <div
                                                                onClick={(event) => {
                                                                    setOpenSession(!openSession)
                                                                }}
                                                                className="bg-white shadow cursor-pointer relative w-full rounded  hover:shadow-lg pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500 my-2"                                                                >
                                                                <span className="font-medium block truncate">{session.title}</span>
                                                                <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                    <div className="text-lblue">1 Session</div>
                                                                    <div className={
                                                                        classNames(openSession ? 'rotate-90' : '', "text-black p-1")
                                                                    }
                                                                    >
                                                                        {
                                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        }
                                                                    </div>
                                                                </span>
                                                            </div>
                                                            <Expand open={openSession}>
                                                                <div className="text-sm ml-4">
                                                                    <div>{session.coaching_package_sessions[0].title}</div>
                                                                    <div>{session.coaching_package_sessions[0].description}</div>
                                                                    <div>{session.coaching_package_sessions[0].purpose}</div>
                                                                </div>
                                                            </Expand>
                                                        </div>
                                                        :
                                                        <></>

                                                }
                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">


                                            <div className=" bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="text-base font-medium text-gray-900">
                                                    Choose Your Slot
                                                </div>
                                                <Calendar
                                                    onChange={setDate}
                                                    value={date}
                                                />
                                                <div className="mt-4 text-base font-medium text-gray-900 mb-4">
                                                    Select Time
                                                </div>
                                                <RadioGroup value={selectedTime} onChange={setSelectedTime}>
                                                    <RadioGroup.Label className="sr-only"> Select Time</RadioGroup.Label>
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                        {
                                                            timeArray.map((option, index) => {
                                                                const checkedC = 'bg-lgreen'
                                                                const uncheckedC = 'hover:bg-lgreen' + ' bg-white hover:text-white'
                                                                return <RadioGroup.Option
                                                                    key={option.id}
                                                                    value={option.id}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {({ checked }) => (
                                                                        <>
                                                                            <div className={
                                                                                classNames(
                                                                                    checked ?
                                                                                        checkedC + '  shadow-xl text-white' :
                                                                                        uncheckedC + ' shadow text-gray-900',
                                                                                    "w-full h-full items-center px-2 py-2 rounded-full  hover:shadow-xl duration-500"
                                                                                )
                                                                            }>
                                                                                <div className="text-base z-50">
                                                                                    <RadioGroup.Label as="div" className="font-medium text-center text-xs select-none">
                                                                                        {option.start + ' - ' + option.end}
                                                                                    </RadioGroup.Label>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </RadioGroup.Option>
                                                            })
                                                        }
                                                    </div>

                                                </RadioGroup>

                                                <div
                                                    onClick={bookSession}
                                                    className="select-none mt-4 w-max px-4 py-2 bg-lblue text-white rounded-full ml-auto text-sm cursor-pointer">
                                                    Book Session
                                                </div>

                                            </div>

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>


            </div>

            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />

            <YoutubeDialog showDialog={openVideo} setShowDialog={setOpenVideo} url={purchasedPackage.coaching_packages.video} />

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
    const { id } = context.query
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
    })
    const purchasedPackage = await queryGraph(coachClient, {}, SchemeGetPurchasedPakage)
        .then((res) => {
            return res.purchasedPackages[0]
        }).catch((networkErr) => {
            console.log(networkErr)
            return {};
        })
    // console.log(purchasedPackage)
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })
    const session = purchasedPackage.coaching_packages.coaching_package_session_titles.find((s) => s.coaching_package_sessions[0].id == id)
    return {
        props: { profile, token, purchasedPackage, session }
    }
}


