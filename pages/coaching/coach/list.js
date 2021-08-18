import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon,
    SortAscendingIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition, RadioGroup } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import YoutubeDialog from '../../../components/dialog/YoutubeDialog'
import { SchemeGetCoachesList, SchemeGetViewAllVideos } from '../../../helpers/GraphQLSchemes'


const pageItemCount = 32
export default function CoachList({ profile, coaches }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [searchText, setSearchText] = useState('')

    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: false
        },
        {
            name: 'Coach List',
            href: '/career_explorer/career_video',
            current: true
        },
    ]


    return (
        <>

            <MetaLayout title="Coach List" description="Coach List" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="6" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Coach List" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />

                                    <div className="px-4 pb-4">
                                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                            <div className="sm:flex h-full w-full">
                                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8" >
                                                    <div className="self-center font-medium text-base w-full">
                                                        <h2 className="text-xl ">Coach Listings</h2>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 ">
                                                        <div className="flex absolute rounded bg-lgrey left-4  right-24 focus-within:text-gray-600 ">
                                                            <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                id="search_field"
                                                                name="search_field"
                                                                className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent mr-10"
                                                                placeholder="Search Coaches"
                                                                // type="search"
                                                                value={searchText}
                                                                onChange={(e) => setSearchText(e.target.value)}

                                                            />
                                                        </div>
                                                        <button className="flex p-2 w-20 absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                            onClick={(event) => {
                                                            }}>
                                                            <div>Filter</div>
                                                            <img className="ml-2" src="/img/filter-icon.png" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                                {
                                                    coaches
                                                        .filter((val) => {
                                                            if (searchText.trim() === "") {
                                                                return val;
                                                            }
                                                            if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
                                                                return val;
                                                            }
                                                            return "";
                                                        })
                                                        .map((coach) => (
                                                            <Link href={'/coaching/coach/' + coach.id} key={coach.id}>
                                                                <a>
                                                                    <div className="group relative shadow  rounded m-1 hover:shadow-xl hover:scale-105 duration-500 pt-4" style={{}}>
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


                                                        ))
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </main>
                </div>


            </div>
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
    })
    const coaches = await queryGraph(skillsClient, {}, SchemeGetCoachesList)
        .then((res) => {
            return res.coaches
        }).catch((networkErr) => {
            return []
        })
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
        props: { profile, coaches, }
    }
}


