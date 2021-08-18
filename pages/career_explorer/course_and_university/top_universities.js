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
import { SchemeGetTopUniversities } from '../../../helpers/GraphQLSchemes'

const headerSlide = [
    {
        id: 1,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },
    {
        id: 2,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },

    {
        id: 3,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    }
]

export default function CareerVideo({ profile, universities }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [selectedSort, setSelectedSort] = useState('')

    const [headerPause, setHeaderPause] = useState(false)
    const timer = useRef()
    const [openVideoDialog, setOpenVideoDialog] = useState(false)

    const [headerSliderRef, headerSlider] = useKeenSlider({
        initial: 0,
        loop: true,
        controls: true,
        duration: 1000,
        dragStart: () => {
            setHeaderPause(true)
        },
        dragEnd: () => {
            setHeaderPause(false)
        },
    })

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        { name: 'Top Universities', href: '#', current: true },
    ]

    return (
        <>

            <MetaLayout title="Top University" description="Top University" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Top University" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />


                                    <div className="relative flex items-center w-full">

                                        <a
                                            onClick={(event) => {
                                                headerSlider.prev()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a
                                            onClick={(event) => {
                                                headerSlider.next()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </a>

                                        <div className="navigation-wrapper w-full">
                                            <div ref={headerSliderRef} className="keen-slider">
                                                {headerSlide.map((card) => (
                                                    <div className="keen-slider__slide">
                                                        <div key={card.id} className="rounded bg-lblue shadow mx-4 my-px">
                                                            <div className="py-4 px-4 align-middle min-w-full overflow-x-auto  overflow-hidden">
                                                                <div className="sm:flex">
                                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                        <img src={card.image} className="rounded " />
                                                                    </div>
                                                                    <div className="self-center w-full mr-4">
                                                                        <h4 className="text-lg font-bold text-white text-right">{card.title}</h4>
                                                                        <div className="flex text-base font-bold text-white text-right items-center text-lyellow mt-4 float-right"
                                                                            onClick={(event) => {
                                                                                setOpenVideoDialog(true)
                                                                            }}>
                                                                            <svg
                                                                                className="w-6 h-6 mr-2"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 28 28"
                                                                                id="vector">
                                                                                <path
                                                                                    id="path"
                                                                                    d="M 14 26 C 10.819 26 7.764 24.735 5.515 22.485 C 3.265 20.236 2 17.181 2 14 C 2 10.819 3.265 7.764 5.515 5.515 C 7.764 3.265 10.819 2 14 2 C 17.181 2 20.236 3.265 22.485 5.515 C 24.735 7.764 26 10.819 26 14 C 26 17.181 24.735 20.236 22.485 22.485 C 20.236 24.735 17.181 26 14 26 Z M 12.346 9.7 C 12.249 9.636 12.132 9.608 12.017 9.624 C 11.901 9.639 11.795 9.696 11.719 9.783 C 11.642 9.871 11.6 9.984 11.6 10.1 L 11.6 17.9 C 11.6 18.016 11.642 18.129 11.719 18.217 C 11.795 18.304 11.901 18.361 12.017 18.376 C 12.132 18.392 12.249 18.364 12.346 18.3 L 18.2 14.4 C 18.288 14.341 18.355 14.255 18.389 14.155 C 18.423 14.054 18.423 13.946 18.389 13.845 C 18.355 13.745 18.288 13.659 18.2 13.6 L 12.345 9.7 Z"
                                                                                    fill="#ffc400"
                                                                                    strokeWidth="1" />
                                                                            </svg>

                                                                            Watch Video
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/career_explorer/course_and_university">
                                        <a className="self-end w-max">
                                            <div className="m-4 hover:text-lblue duration-500 text-right w-max">View All Universities</div>
                                        </a>
                                    </Link>

                                    {
                                        universities.map(u => {
                                            const [sliderRef, slider] = useKeenSlider({
                                                initial: 0,
                                                loop: false,
                                                controls: true,
                                                duration: 500,
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
                                            return (<div className="shadow rounded bg-white py-4 mx-4 mb-4">
                                                <div className="text-black mx-4 block text-base font-bold">
                                                    {u.title}
                                                </div>
                                                <div className="relative flex items-center">
                                                    <a
                                                        onClick={(event) => {
                                                            slider.prev()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <a
                                                        onClick={(event) => {
                                                            slider.next()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </a>

                                                    <div className="navigation-wrapper w-full">
                                                        <div ref={sliderRef} className="keen-slider">
                                                            {u.university.map((card) => (
                                                                <div className="keen-slider__slide self-center">
                                                                    <Link href={'/career_explorer/course_and_university/' + card.id}>
                                                                        <a>
                                                                            <div className="h-full bg-white overflow-hidden shadow rounded p-4 hover:shadow-xl duration-500">
                                                                                <img className="w-full ml-auto mr-auto h-32 object-contain" src={Constants.baseUrlImage + '/' + card.logo} />
                                                                                <div className="top-0 mt-4 text-center">
                                                                                    <div className="text-sm font-bold">{card.name}</div>
                                                                                    <div className="text-xs mt-2">{card.state ? card.state + ',' : ''} {card.country}</div>
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

                                            </div>)
                                        })
                                    }


                                    <div className="h-4"></div>
                                </div>
                            </div>


                        </div>

                    </main>
                </div>


            </div>
            <YoutubeDialog showDialog={openVideoDialog} setShowDialog={setOpenVideoDialog} />
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
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const universities = await queryGraph(videosClient, {}, SchemeGetTopUniversities)
        .then((res) => {
            return res.topUniversity
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
        props: { profile, universities }
    }
}


