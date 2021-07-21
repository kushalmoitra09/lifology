import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'



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

export default function CareerVideo({ videoCats, profile, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const [openFilter, setOpenFilter] = useState(false)

    const [headerPause, setHeaderPause] = useState(false)
    const timer = useRef()

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
    useEffect(() => {
        headerSliderRef.current.addEventListener("mouseover", () => {
            setHeaderPause(true)
        })
        headerSliderRef.current.addEventListener("mouseout", () => {
            setHeaderPause(false)
        })
    }, [headerSliderRef])
    useEffect(() => {
        timer.current = setInterval(() => {
            if (!headerPause && headerSlider) {
                headerSlider.next()
            }
        }, 2000)
        return () => {
            clearInterval(timer.current)
        }
    }, [headerPause, headerSlider])

    const [sliderRef1, slider1] = useKeenSlider({
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
    const [sliderRef2, slider2] = useKeenSlider({
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
    const [sliderRef3, slider3] = useKeenSlider({
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
    const [sliderRef4, slider4] = useKeenSlider({
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

    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career Videos" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">

                                    <div className="sm:flex sm:items-start sm:justify-between m-4">
                                        <div className="w-full rounded shadow h-full text-sm bg-white">
                                            <div className="flex left-4  right-24 focus-within:text-gray-600 ">
                                                <div className="p-3 items-center pointer-events-none" aria-hidden="true">
                                                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                </div>
                                                <input
                                                    id="search_field"
                                                    name="search_field"
                                                    className="block w-full h-full p-3 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                    placeholder="Search Any Videos"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0 sm:flex sm:items-center">
                                            <a onClick={(event) => {
                                                setOpenFilter(true)
                                            }}>
                                                <div
                                                    className="cursor-pointer inline-flex items-center p-3 border border-transparent shadow-sm font-medium rounded-md text-white bg-lblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <div>Filter</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>




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
                                                                        <div className="flex text-base font-bold text-white text-right items-center text-lyellow mt-4 float-right">
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

                                    <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-black mx-4 block text-base font-bold">
                                                {videoCats[0].name}
                                            </div>

                                            <div className="text-sm text-right text-indigo-700 mx-4 ">
                                                View All
                                            </div>
                                        </div>
                                        <div className="relative flex items-center">
                                            <a
                                                onClick={(event) => {
                                                    slider1.prev()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <a
                                                onClick={(event) => {
                                                    slider1.next()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <div className="navigation-wrapper w-full">
                                                <div ref={sliderRef1} className="keen-slider">
                                                    {videoCats[0].videos.map((card) => (
                                                        <div className="keen-slider__slide">
                                                            <Link href={{
                                                                pathname: '/career_explorer/career_video/' + card.id,
                                                                query: { token: token }
                                                            }} key={card.id}>
                                                                <a>
                                                                    <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                                                        <div>
                                                                            <img className=" rounded-t filter grayscale group-hover:filter-none duration-500" src={card.thumbnail} />
                                                                            {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                                            <div className="flex-1 flex items-center justify-between truncate">
                                                                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                    <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                                                        {card.title}
                                                                                    </div>
                                                                                    <div className="text-gray-500 mt-2 w-full overflow-hidden">{card.description}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <Menu as="div" className="absolute top-0 right-0 flex-shrink-0">
                                                                            {({ open }) => (
                                                                                <>
                                                                                    <Menu.Button className="inline-flex items-center justify-center text-white focus:outline-none hover:bg-white hover:bg-opacity-30 rounded-full p-2 duration-500">
                                                                                        <span className="sr-only">Open options</span>
                                                                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                                                                    </Menu.Button>
                                                                                    <Transition
                                                                                        show={open}
                                                                                        as={Fragment}
                                                                                        enter="transition ease-out duration-100"
                                                                                        enterFrom="transform opacity-0 scale-95"
                                                                                        enterTo="transform opacity-100 scale-100"
                                                                                        leave="transition ease-in duration-75"
                                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                                        leaveTo="transform opacity-0 scale-95"
                                                                                    >
                                                                                        <Menu.Items
                                                                                            static
                                                                                            className="z-10 mx-1 origin-top-right absolute right-8 top-4 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                                                        >
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            View
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Removed from pinned
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Share
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                        </Menu.Items>
                                                                                    </Transition>
                                                                                </>
                                                                            )}
                                                                        </Menu>
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

                                    <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-black mx-4 block text-base font-bold">
                                                {videoCats[1].name}
                                            </div>

                                            <div className="text-sm text-right text-indigo-700 mx-4 ">
                                                View All
                                            </div>
                                        </div>
                                        <div className="relative flex items-center">
                                            <a
                                                onClick={(event) => {
                                                    slider2.prev()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <a
                                                onClick={(event) => {
                                                    slider2.next()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <div className="navigation-wrapper w-full">
                                                <div ref={sliderRef2} className="keen-slider">
                                                    {videoCats[1].videos.map((card) => (
                                                        <div className="keen-slider__slide">
                                                            <Link href={{
                                                                pathname: '/career_explorer/career_video/' + card.id,
                                                                query: { token: token }
                                                            }} key={card.id}>
                                                                <a>
                                                                    <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                                                        <div>
                                                                            <img className=" rounded-t filter grayscale group-hover:filter-none duration-500" src={card.thumbnail} />
                                                                            {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                                            <div className="flex-1 flex items-center justify-between truncate">
                                                                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                    <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                                                        {card.title}
                                                                                    </div>
                                                                                    <div className="text-gray-500 mt-2 w-full overflow-hidden">{card.description}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <Menu as="div" className="absolute top-0 right-0 flex-shrink-0">
                                                                            {({ open }) => (
                                                                                <>
                                                                                    <Menu.Button className="inline-flex items-center justify-center text-white focus:outline-none hover:bg-white hover:bg-opacity-30 rounded-full p-2 duration-500">
                                                                                        <span className="sr-only">Open options</span>
                                                                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                                                                    </Menu.Button>
                                                                                    <Transition
                                                                                        show={open}
                                                                                        as={Fragment}
                                                                                        enter="transition ease-out duration-100"
                                                                                        enterFrom="transform opacity-0 scale-95"
                                                                                        enterTo="transform opacity-100 scale-100"
                                                                                        leave="transition ease-in duration-75"
                                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                                        leaveTo="transform opacity-0 scale-95"
                                                                                    >
                                                                                        <Menu.Items
                                                                                            static
                                                                                            className="z-10 mx-1 origin-top-right absolute right-8 top-4 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                                                        >
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            View
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Removed from pinned
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Share
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                        </Menu.Items>
                                                                                    </Transition>
                                                                                </>
                                                                            )}
                                                                        </Menu>
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

                                    <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-black mx-4 block text-base font-bold">
                                                {videoCats[2].name}
                                            </div>

                                            <div className="text-sm text-right text-indigo-700 mx-4 ">
                                                View All
                                            </div>
                                        </div>
                                        <div className="relative flex items-center">
                                            <a
                                                onClick={(event) => {
                                                    slider3.prev()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <a
                                                onClick={(event) => {
                                                    slider3.next()
                                                }}>
                                                <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <div className="navigation-wrapper w-full">
                                                <div ref={sliderRef3} className="keen-slider">
                                                    {videoCats[2].videos.map((card) => (
                                                        <div className="keen-slider__slide">
                                                            <Link href={{
                                                                pathname: '/career_explorer/career_video/' + card.id,
                                                                query: { token: token }
                                                            }} key={card.id}>
                                                                <a>
                                                                    <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                                                        <div>
                                                                            <img className=" rounded-t filter grayscale group-hover:filter-none duration-500" src={card.thumbnail} />
                                                                            {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                                            <div className="flex-1 flex items-center justify-between truncate">
                                                                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                    <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                                                        {card.title}
                                                                                    </div>
                                                                                    <div className="text-gray-500 mt-2 w-full overflow-hidden">{card.description}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <Menu as="div" className="absolute top-0 right-0 flex-shrink-0">
                                                                            {({ open }) => (
                                                                                <>
                                                                                    <Menu.Button className="inline-flex items-center justify-center text-white focus:outline-none hover:bg-white hover:bg-opacity-30 rounded-full p-2 duration-500">
                                                                                        <span className="sr-only">Open options</span>
                                                                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                                                                    </Menu.Button>
                                                                                    <Transition
                                                                                        show={open}
                                                                                        as={Fragment}
                                                                                        enter="transition ease-out duration-100"
                                                                                        enterFrom="transform opacity-0 scale-95"
                                                                                        enterTo="transform opacity-100 scale-100"
                                                                                        leave="transition ease-in duration-75"
                                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                                        leaveTo="transform opacity-0 scale-95"
                                                                                    >
                                                                                        <Menu.Items
                                                                                            static
                                                                                            className="z-10 mx-1 origin-top-right absolute right-8 top-4 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                                                        >
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            View
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                            <div className="py-1">
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Removed from pinned
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                                <Menu.Item>
                                                                                                    {({ active }) => (
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            className={classNames(
                                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                                'block px-4 py-2 text-sm'
                                                                                                            )}
                                                                                                        >
                                                                                                            Share
                                                                                                        </a>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            </div>
                                                                                        </Menu.Items>
                                                                                    </Transition>
                                                                                </>
                                                                            )}
                                                                        </Menu>
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
                            </div>


                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
            <Transition.Root show={openFilter} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={openFilter}
                    onClose={setOpenFilter}
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
                            <div className="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-gray-900 text-center">
                                            Filter
                                        </Dialog.Title>
                                        <div className="mt-2">


                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={() => setOpenFilter(false)}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={() => setOpenFilter(false)}
                                    >
                                        Apply
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

function CustomRightArrow({ handleClick }) {
    return (
        <button
            className="absolute right-0 bg-black rounded-full p-2"
            style={{ top: '31.5% !important' }}
            onClick={handleClick}>
            <ArrowRightIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </ button>
    );
}

function CustomLeftArrow({ handleClick }) {

    return (
        <button
            onClick={handleClick}
            aria-label="Go to previous slide"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
        />
    );
}

const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="carousel-button-group">
            <CustomLeftArrow
                handleClick={() => previous()}
            />
            <CustomRightArrow handleClick={() => next()} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { token } = context.query
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
    const videoCats = await queryGraph(videosClient, {}, SchemeGetVideos)
        .then((res) => {
            return res.videos
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
        props: { videoCats, profile, token }
    }
}


