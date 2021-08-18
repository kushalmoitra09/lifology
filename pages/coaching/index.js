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
import { SchemeGetAvailablePackage, SchemeGetCoachesList, SchemeGetPackagesList } from '../../helpers/GraphQLSchemes'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function Coaching({ profile, coaches, packages }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [coachesSliderRef, coachesSlider] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 4,
            },
            "(min-width: 1200px)": {
                slidesPerView: 6,
            },
        },
    })

    const [packagesSliderRef, packagesSlider] = useKeenSlider({
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
    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="Services / Personal Coaching" description="Services / Personal Coaching" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Services / Personal Coaching" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />

                        <div className="mx-4 mt-4 p-4 shadow rounded bg-white">
                            <div className="sm:flex h-full w-full">
                                <div className="mb-4 mr-0 flex-shrink-0 sm:mb-0 ">
                                    <img src="/img/test.png" className="h-40 rounded ml-auto mr-auto" />
                                </div>
                                <div className="w-full self-center mr-9 p-4">
                                    <div className="font-bold text-xl" >Personal Coaching</div>
                                    <div className="mt-4 text-sm " >I’ve never been much of a “ritual” person when it comes to writing. If I need to, I can write anywhere, anytime, about anything. After all, if I were too precious about the conditions around writing, I wouldn’t have made much money from doing it</div>
                                </div>
                            </div>
                        </div>
                        <div className=" align-middle  overflow-x-auto  overflow-hidden sm:rounded-lg 0-4">

                            <div className="relative flex items-center">
                                <a
                                    onClick={(event) => {
                                        packagesSlider.prev()
                                    }}>
                                    <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                </a>
                                <a
                                    onClick={(event) => {
                                        packagesSlider.next()
                                    }}>
                                    <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>
                                <div className="navigation-wrapper w-full">
                                    <div ref={packagesSliderRef} className="mx-2 keen-slider">
                                        {
                                            packages.map((video) => (
                                                <div className="keen-slider__slide py-4 ">
                                                    <div className="group relative bg-white shadow mx-2 h-full rounded m-1 duration-500" style={{}}>
                                                        <div className="mb-12">
                                                            <img className="rounded-t duration-500 w-full h-32 object-cover ml-auto mr-auto" src={video.thumbnail} />
                                                            <div className="flex-1 flex items-center justify-between ">
                                                                <div className="flex-1 px-4 py-2 text-sm ">
                                                                    <div className="flex w-full mt-2">
                                                                        <div className="w-1/2 text-gray-900 font-medium">
                                                                            {video.title}
                                                                        </div>

                                                                        <div className="w-1/2 text-lblue font-medium text-right">
                                                                            ₹ {video.coaching_packages_prices[0].price}
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full h-px bg-lgrey-border mt-2 mb-2"></div>

                                                                    <div className="w-1/2 text-gray-900 font-medium">
                                                                        Services
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-justify" >
                                                                        {video.description}
                                                                    </div>


                                                                </div>
                                                            </div>

                                                        </div>


                                                        <div className="flex w-full px-4 absolute bottom-4">
                                                            <div className="w-1/2 text-center py-2 bg-lyellow rounded-full text-white mt-2 mr-2 text-xs">
                                                                Book Demo
                                                            </div>
                                                            <Link href={'/coaching/package/' + video.id}>
                                                                <a className="w-1/2 py-2 bg-lblue  rounded-full mt-2 ml-2 hover:scale-105 duration-200">
                                                                    <div className="text-center text-white text-xs">
                                                                        Purchase Now
                                                                    </div>
                                                                </a>
                                                            </Link>

                                                        </div>


                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mx-4 mb-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
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

                    </main>
                </div>


            </div >

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
    const skillsClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/skills",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const isAvailablePackages = await queryGraph(skillsClient, {}, SchemeGetAvailablePackage)
        .then((res) => {
            return res.isAvailablePackages
        }).catch((networkErr) => {
            return []
        });
    if (isAvailablePackages) {
        return {
            redirect: {
                permanent: false,
                destination: "/coaching/package"
            }
        }
    }
    const coaches = await queryGraph(skillsClient, {}, SchemeGetCoachesList)
        .then((res) => {
            return res.coaches
        }).catch((networkErr) => {
            return []
        });
    console.log(coaches)
    const packages = await queryGraph(skillsClient, {}, SchemeGetPackagesList)
        .then((res) => {
            return res.coachingPackages
        }).catch((networkErr) => {
            return []
        });
    console.log(packages)

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: { profile, token, coaches, packages }
    }
}