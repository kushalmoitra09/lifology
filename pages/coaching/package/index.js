import { Fragment, useState, useEffect } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import {
    BookmarkIcon,
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
import { SchemeGetUniversity, SchemeAddBookmark, SchemeVideoStatus, SchemeGetUniversityBookmark, SchemeUpdateUniversityBookmark, SchemeAllUniversityCareerPools, SchemeUniversityCareerFields, SchemeGetPackageDetails, SchemeGetCoachesList } from '/helpers/GraphQLSchemes'
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
import { SchemeGetPurchasedPakage } from '../../../helpers/GraphQLSchemes'

export default function PurchasedPackage({ profile, token, purchasedPackage }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [loadingDialog, setLoadingDialog] = useState(false)

    const [openVideo, setOpenVideo] = useState(false)

    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: false
        },
        {
            name: 'Purchased Package', href: '#', current: true
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



    return (
        <>
            <MetaLayout title={purchasedPackage.coaching_packages.title + ' coaching'} description={purchasedPackage.coaching_packages.title + ' coaching'} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={purchasedPackage.coaching_packages.title + ' coaching'} />


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
                                                        <div className="font-bold text-xl">Package Details</div>
                                                    </div>

                                                </div>

                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                        <img className="object-contain rounded" src={purchasedPackage.coaching_packages.thumbnail} style={{ maxHeight: '12rem', maxWidth: '12rem' }} />
                                                    </div>
                                                    <div className="w-full self-center text-left">
                                                        <div className="font-bold text-base" >{purchasedPackage.coaching_packages.title}</div>
                                                        <div className="mt-2 text-sm text-justify" >{purchasedPackage.coaching_packages.description}</div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                                <div className="w-1/2 text-gray-900 font-medium">
                                                    Available Sessions
                                                </div>
                                                {
                                                    purchasedPackage.coaching_packages.coaching_package_session_titles.map(session => {
                                                        const [open, setOpen] = useState((session.coaching_package_sessions[0].session_status == 'Scheduled' ||
                                                            session.coaching_package_sessions[0].session_status == 'In progress' ||
                                                            session.coaching_package_sessions[0].session_status == 'Accepted' ||
                                                            session.coaching_package_sessions[0].session_status == 'Rescheduled'))
                                                        return (
                                                            <div>
                                                                <div
                                                                    onClick={(event) => {
                                                                        setOpen(!open)
                                                                    }}
                                                                    className="bg-white shadow cursor-pointer relative w-full rounded  hover:shadow-lg pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500 my-2"                                                                >
                                                                    <span className="font-medium block truncate">{session.title}</span>
                                                                    <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                        {
                                                                            session.coaching_package_sessions[0].session_status ?
                                                                                <div className="px-4 text-lgreen text-xs flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                                    </svg>
                                                                                    <div className="self-center">
                                                                                        Marked as {session.coaching_package_sessions[0].session_status}
                                                                                    </div>

                                                                                </div> : <></>
                                                                        }
                                                                        <div className="text-lblue flex">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 mr-2 self-center " viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                                                                            </svg>
                                                                            <div className="self-center text-xs ">1 Session</div>

                                                                        </div>
                                                                        <div className={
                                                                            classNames(open ? 'animate-expand rotate-180' : 'animate-collapse  ', "text-black p-1")
                                                                        }>
                                                                            {
                                                                                // <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                // </svg>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                                                </svg>
                                                                            }
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                                <Expand open={open}>
                                                                    <div className="text-sm ml-4">
                                                                        <div>{session.coaching_package_sessions[0].title}</div>
                                                                        <div>{session.coaching_package_sessions[0].description}</div>
                                                                        <div>{session.coaching_package_sessions[0].purpose}</div>
                                                                        <Link href={
                                                                            (session.coaching_package_sessions[0].session_status == 'Scheduled' ||
                                                                                session.coaching_package_sessions[0].session_status == 'In progress' ||
                                                                                session.coaching_package_sessions[0].session_status == 'Accepted' ||
                                                                                session.coaching_package_sessions[0].session_status == 'Rescheduled') ?
                                                                                "/coaching/session/" + session.coaching_package_sessions[0].id + "/book/" + session.coaching_package_sessions[0].appointment_id + "/view" :
                                                                                (session.coaching_package_sessions[0].session_status == 'Completed') ?
                                                                                    "/coaching/session/" + session.coaching_package_sessions[0].id + "/book" :
                                                                                    "/coaching/session/" + session.coaching_package_sessions[0].id + "/book"

                                                                        }>
                                                                            <a>
                                                                                <div className="py-2 px-4 my-4 bg-lblue text-white w-max rounded-full">
                                                                                    {
                                                                                        (session.coaching_package_sessions[0].session_status == 'Scheduled' ||
                                                                                            session.coaching_package_sessions[0].session_status == 'In progress' ||
                                                                                            session.coaching_package_sessions[0].session_status == 'Accepted' ||
                                                                                            session.coaching_package_sessions[0].session_status == 'Rescheduled') ? 'View Session' :
                                                                                            (session.coaching_package_sessions[0].session_status == 'Completed') ? 'Rate Session' : 'Book Session'
                                                                                    }
                                                                                </div>
                                                                            </a>
                                                                        </Link>


                                                                    </div>
                                                                </Expand>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                                <div className="w-1/2 text-gray-900 font-medium">
                                                    How It Works
                                                </div>
                                                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                                                    <div>
                                                        <img src="/img/hiw1.png" className="m-auto h-16 w-16 object-cover" />
                                                        <div className="mt-2 text-xs text-center font-medium">Complete The Assessment</div>
                                                    </div>
                                                    <div>
                                                        <img src="/img/hiw2.png" className="m-auto h-16 w-16 object-cover" />
                                                        <div className="mt-2 text-xs text-center font-medium">Purchase the coaching package</div>
                                                    </div>
                                                    <div>
                                                        <img src="/img/hiw3.png" className="m-auto h-16 w-16 object-cover" />
                                                        <div className="mt-2 text-xs text-center font-medium">Get matched with a right coach</div>
                                                    </div>
                                                    <div>
                                                        <img src="/img/hiw4.png" className="m-auto h-16 w-16 object-cover" />
                                                        <div className="mt-2 text-xs text-center font-medium">Take appointment</div>
                                                    </div>
                                                    <div>
                                                        <img src="/img/hiw5.png" className="m-auto h-16 w-16 object-cover" />
                                                        <div className="mt-2 text-xs text-center font-medium">Start coaching</div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Career Video
                                                </h2>
                                                <a href="#" onClick={(event) => { setOpenVideo(true) }}>
                                                    <div className="group relative shadow hover:shadow-xl hover:scale-105 active:scale-100 duration-500">
                                                        <img className="rounded mt-2 duration-500" src={purchasedPackage.coaching_packages.thumbnail} />
                                                        <svg
                                                            className="absolute h-12 w-12 top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 duration-500"
                                                            viewBox="0 0 24 24"
                                                            id="vector">
                                                            <path
                                                                id="path"
                                                                d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z"
                                                                fill="#ffc107"
                                                                strokeWidth="1" />
                                                            <path
                                                                id="path_1"
                                                                d="M 9.5 14.67 L 9.5 9.33 C 9.5 8.54 10.38 8.06 11.04 8.49 L 15.19 11.16 C 15.8 11.55 15.8 12.45 15.19 12.84 L 11.04 15.51 C 10.38 15.94 9.5 15.46 9.5 14.67 Z"
                                                                fill="#ffffff" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="text-lg font-medium text-gray-900">
                                                    Assigned Coach
                                                </div>
                                                <div className="sm:flex h-full w-full mt-4">
                                                    <div className="mr-0 flex-shrink-0 sm:mb-0 ">
                                                        <img src={purchasedPackage.coaching_packages.coach_details.profile_image} className="h-20 w-20 rounded-full ml-auto mr-auto object-cover" />
                                                    </div>
                                                    <div className="w-full self-center mr-9">
                                                        <div className="flex-1 px-4 py-2 text-sm truncate">
                                                            <div className=" w-full text-gray-900 font-medium">
                                                                {purchasedPackage.coaching_packages.coach_details.name}
                                                            </div>
                                                            <div className="text-gray-500 mt-1 w-full overflow-hidden text-xs">{purchasedPackage.coaching_packages.coach_details.coaching_category}</div>
                                                            <div className="flex w-min mt-1">
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
                                                </div>

                                                <div className="mt-4 w-full text-gray-900 text-sm text-justify">
                                                    {purchasedPackage.coaching_packages.coach_details.bio}
                                                </div>
                                                <div className="flex mt-4">
                                                    <Link href={"/coaching/coach/" + purchasedPackage.coaching_packages.coach_details.id}>
                                                        <a className=" w-1/2">
                                                            <div className="px-4 py-2 bg-lblue rounded-full text-center text-sm text-white mr-2">View Profile</div>
                                                        </a>
                                                    </Link>

                                                    <div className="px-4 py-2 w-1/2 text-center text-sm bg-lgrey-light rounded-full border border-lgrey-border ml-2">View Details</div>
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
        </>
    )
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
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
    console.log(purchasedPackage)
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
    return {
        props: { profile, token, purchasedPackage }
    }
}


