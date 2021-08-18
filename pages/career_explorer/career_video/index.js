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

export default function CareerVideo({ videoCats, profile, order, q }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openFilter, setOpenFilter] = useState(false)

    const [openVideoDialog, setOpenVideoDialog] = useState(false)

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

    const [sliderRef1, slider1] = useKeenSlider({
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
    const [sliderRef5, slider5] = useKeenSlider({
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

    const [selectedSort, setSelectedSort] = useState((order != null && order != "") ? order : '')

    useEffect(() => {
        setSelectedSort(order)
    }, [])

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        { name: 'Career Videos', href: '#', current: true },
    ]

    const [searchText, setSearchText] = useState(q);

    const clearFilter = (event) => {
        setSelectedSort('')
        const queryParam = {}
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
        setOpenFilter(false)
    }
    const applyFilter = (event) => {
        const q = {}
        if (selectedSort != null && selectedSort != "")
            q.order = selectedSort
        if (searchText != null && searchText != "")
            q.q = searchText
        console.log(q)
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: q,
            }
        )
        setOpenFilter(false)
    }
    const search = (event) => {
        const queryParam = {}
        if (selectedSort != null && selectedSort != "")
            queryParam.order = selectedSort
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        console.log(queryParam)
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
    }
    const clearQuery = (event) => {
        setSearchText("")
        const queryParam = {}
        if (selectedSort != null && selectedSort != "")
            queryParam.order = selectedSort
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
    }
    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Videos" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />

                                    <div className="sm:flex h-full w-full">
                                        <div className="w-full h-8">
                                            <label htmlFor="search_field" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative w-full text-gray-400 ">
                                                <div className="flex absolute rounded bg-white left-4 shadow right-28 focus-within:text-gray-600 ">
                                                    <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        id="search_field"
                                                        name="search_field"
                                                        className="self-center block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent mr-10"
                                                        placeholder="Search Video"
                                                        value={searchText}
                                                        onSubmit={search}
                                                        onChange={(e) => setSearchText(e.target.value)}

                                                    />
                                                    <button className="flex p-2 w-max absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                        onClick={search}>
                                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <button className="flex p-2 w-20 absolute right-4 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                    onClick={(event) => {
                                                        setOpenFilter(true)
                                                    }}>
                                                    <div>Filter</div>
                                                    <img className="ml-2" src="/img/filter-icon.png" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        q != null && q != "" ?
                                            <div className="mx-4">
                                                <div
                                                    className=" relative w-full mt-4 px-4 text-left sm:text-sm"
                                                >
                                                    <span className="font-medium block truncate">Search Results for "{q}"</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                        <div onClick={clearQuery}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>

                                            </div> : <></>
                                    }




                                    {/* <div className="relative flex items-center w-full mt-4">

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
                                    </div> */}
                                    {
                                        videoCats.map((videoCat, index) => {
                                            // const [sliderRef, slider] = useKeenSlider({
                                            //     breakpoints: {
                                            //         "(min-width: 464px)": {
                                            //             slidesPerView: 1,
                                            //         },
                                            //         "(min-width: 768px)": {
                                            //             slidesPerView: 2,
                                            //         },
                                            //         "(min-width: 1200px)": {
                                            //             slidesPerView: 4,
                                            //         },
                                            //     },
                                            // })
                                            const sliderRef = index == 0 ? sliderRef1 : index == 1 ? sliderRef2 : index == 2 ? sliderRef3 : index == 3 ? sliderRef4 : sliderRef5
                                            const slider = index == 0 ? slider1 : index == 1 ? slider2 : index == 2 ? slider3 : index == 3 ? slider4 : slider5
                                            return (
                                                <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="text-black mx-4 block text-base font-bold">
                                                            {videoCat.name}
                                                        </div>
                                                        <Link href={{
                                                            pathname: '/career_explorer/career_video/view_all',
                                                            query: { cId: videoCat.id },
                                                        }}>
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
                                                                {
                                                                    videoCat.videos.map((video) => (
                                                                        <div className="keen-slider__slide">
                                                                            <Link href={'/career_explorer/career_video/' + video.id} key={video.id}>
                                                                                <a>
                                                                                    <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                                                                        <div>
                                                                                            <img className="rounded-t group-hover:filter-none duration-500 w-full h-32 object-cover" src={video.thumbnail} />
                                                                                            {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                                                            <div className="flex-1 flex items-center justify-between truncate">
                                                                                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                                    <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                                                                        {video.title}
                                                                                                    </div>
                                                                                                    <div className="text-gray-500 mt-2 w-full overflow-hidden">{video.description}</div>
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
                                            )
                                        })
                                    }

                                    <div className="h-4"></div>
                                </div>
                            </div>


                        </div>

                    </main>
                </div>


            </div>
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
                                            Sort
                                        </Dialog.Title>
                                        <div className="mt-2">

                                            <div
                                                onClick={(e) => { setSelectedSort('NEW_TO_OLD') }}
                                                className={classNames(
                                                    selectedSort == 'NEW_TO_OLD' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'NEW_TO_OLD' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'NEW_TO_OLD' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        New To Old
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('OLD_TO_NEW') }}
                                                className={classNames(
                                                    selectedSort == 'OLD_TO_NEW' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'OLD_TO_NEW' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'OLD_TO_NEW' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        Old To New
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('MOST_VIEWED') }}
                                                className={classNames(
                                                    selectedSort == 'MOST_VIEWED' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'MOST_VIEWED' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'MOST_VIEWED' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        Most Viewed
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={clearFilter}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={applyFilter}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <YoutubeDialog showDialog={openVideoDialog} setShowDialog={setOpenVideoDialog} />
        </>
    )
}


export async function getServerSideProps(context) {
    const { token } = cookies(context)
    const { order = "", q = "" } = context.query
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
    const params = {}
    if (order != "")
        params.order = order
    if (q != "")
        params.search_keyword = q
    const videoCats = await queryGraph(videosClient, params, SchemeGetVideos)
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
        props: { videoCats, profile, order, q }
    }
}


