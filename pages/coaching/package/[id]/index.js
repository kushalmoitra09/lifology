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

export default function ServiceDetails({ profile, token, coachPackage, coaches }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [loadingDialog, setLoadingDialog] = useState(false)

    const [openVideo, setOpenVideo] = useState(false)

    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: false
        },
        {
            name: coachPackage.title, href: '#', current: true
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
            <MetaLayout title={coachPackage.title + ' coaching'} description={coachPackage.title + ' coaching'} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={coachPackage.title + ' coaching'} />


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
                                                    <div className="w-full self-center text-left flex">
                                                        <div className="px-4 ml-auto text-center py-2 bg-lyellow rounded-full text-white mr-2 text-xs">
                                                            Book Demo
                                                        </div>
                                                        <Link href={'/coaching/package/' + coachPackage.id + '/payment'}>
                                                            <a className="px-4 py-2 bg-lblue  rounded-full ml-2 hover:scale-105 duration-200">
                                                                <div className="text-center text-white text-xs">
                                                                    Purchase Now
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 self-center">
                                                        <img className="object-contain rounded" src={coachPackage.thumbnail} style={{ maxHeight: '12rem', maxWidth: '12rem' }} />
                                                    </div>
                                                    <div className="w-full self-center text-left">
                                                        <div className="font-bold text-base" >{coachPackage.title}</div>
                                                        <div className="mt-2 text-sm text-justify" >{coachPackage.description}</div>
                                                        <div className="mt-2 text-sm text-lblue" >₹ {coachPackage.coaching_packages_prices[0].price}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                                <div className="w-1/2 text-gray-900 font-medium">
                                                    What you will get
                                                </div>
                                                {
                                                    coachPackage.coaching_package_session_titles.map(session => {
                                                        const [open, setOpen] = useState(false)
                                                        return (
                                                            <div>
                                                                <div
                                                                    onClick={(event) => {
                                                                        setOpen(!open)
                                                                    }}
                                                                    className="bg-white shadow cursor-pointer relative w-full rounded  hover:shadow-lg pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500 my-2"                                                                >
                                                                    <span className="font-medium block truncate">{session.title}</span>
                                                                    <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                        <div className="text-lblue">1 Session</div>
                                                                        <div className={
                                                                            classNames(open ? 'rotate-90' : '', "text-black p-1")
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
                                                                <Expand open={open}>
                                                                    <div className="text-sm ml-4">
                                                                        <div>{session.coaching_package_sessions[0].title}</div>
                                                                        <div>{session.coaching_package_sessions[0].description}</div>
                                                                        <div>{session.coaching_package_sessions[0].purpose}</div>
                                                                    </div>
                                                                </Expand>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="my-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="text-black mx-4 block text-base font-bold">
                                                        Our Coaches
                                                    </div>
                                                    <Link href="/coaching/coach/list">
                                                        <a>
                                                            <div className="text-sm text-right text-indigo-700 mx-4 ">
                                                                View All
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className="relative flex items-center">
                                                    <a
                                                        onClick={(event) => {
                                                            coachesSlider.prev()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-200" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <a
                                                        onClick={(event) => {
                                                            coachesSlider.next()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-200" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <div className="navigation-wrapper w-full">
                                                        <div ref={coachesSliderRef} className="keen-slider">
                                                            {
                                                                coaches.map((coach) => (
                                                                    <div className="keen-slider__slide">
                                                                        <Link href={'/coaching/coach/' + coach.id} key={coach.id}>
                                                                            <a>
                                                                                <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500 pt-4" style={{}}>
                                                                                    <div>
                                                                                        <img className="rounded-full duration-500 w-full h-24 w-24 object-cover ml-auto mr-auto" src={coach.profile_image} />
                                                                                        {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                                                        <div className="flex-1 flex items-center justify-between truncate">
                                                                                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                                <div className="mt-2 w-full text-gray-900 font-medium text-center">
                                                                                                    {coach.name}
                                                                                                </div>
                                                                                                <div className="text-gray-500 mt-1 w-full overflow-hidden text-center text-xs">{coach.coaching_category}</div>
                                                                                                <div className="flex w-min ml-auto mr-auto mt-1 mb-2">
                                                                                                    <div className={coach.rating >= 1 ? 'text-lyellow' : 'text-gray-400'}>

                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                    <div className={coach.rating >= 2 ? 'text-lyellow' : 'text-gray-400'}>

                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                    <div className={coach.rating >= 3 ? 'text-lyellow' : 'text-gray-400'}>

                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                    <div className={coach.rating >= 4 ? 'text-lyellow' : 'text-gray-400'}>

                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                    <div className={coach.rating >= 5 ? 'text-lyellow' : 'text-gray-400'}>

                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                        </svg>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </Link>

                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
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
                                                        <img className="rounded mt-2 duration-500" src={coachPackage.thumbnail} />
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
                                                <div className="text-lg font-medium text-gray-900 text-center">
                                                    Get in Touch
                                                </div>
                                                <div className="mt-2 text-base font-medium text-gray-900 text-center">
                                                    Book a Free Call with Advisor
                                                </div>
                                                <div
                                                    className="w-max ml-auto mr-auto mt-4 py-2 px-4 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                                    Connect with an Agent
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

            <YoutubeDialog showDialog={openVideo} setShowDialog={setOpenVideo} url={coachPackage.video} />
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
    const coachPackage = await queryGraph(coachClient, { id: parseInt(context.params.id) }, SchemeGetPackageDetails)
        .then((res) => {
            return res.coachingPackageDetails
        }).catch((networkErr) => {
            console.log(networkErr)
            return [];
        })
    const coaches = await queryGraph(coachClient, {}, SchemeGetCoachesList)
        .then((res) => {
            return res.coaches
        }).catch((networkErr) => {
            return []
        });
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
        props: { profile, token, coachPackage, coaches }
    }
}


