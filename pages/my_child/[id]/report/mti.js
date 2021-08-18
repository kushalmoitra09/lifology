import { useState, useEffect } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import "react-multi-carousel/lib/styles.css";

import ReactCardCarousel from 'react-card-carousel';
import { SchemeGetAssessment, SchemeGetMTIReport, SchemeGetSummaryDetails } from '../../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import cookies from 'next-cookies'

export default function MTIReport({ profile, assessment, report, summaryDetails }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openLS, setOpenLS] = useState(true)
    const [openWMY, setOpenWMY] = useState(false)
    const [openDWTW, setOpenDWTW] = useState(false)

    var carouselLS;
    var carouselWMY;
    var carouselDWTW;

    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: assessment.title + ' Report', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="MTI Assement Reports" description="MTI Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MTI Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white rounded-md shadow h-30 p-4" style={{ height: "fit-content" }}>
                                                    <p className="font-medium">Assesment/MTI Assesment</p>
                                                    <div className="sm:flex mt-4">
                                                        {/* <div className="relative flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img className="w-24 h-24 rounded" src={assessment.dash_cards_image} />
                                                            <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div> */}
                                                        <div className="h-24 mr-4 rounded" style={{ backgroundImage: 'url("' + assessment.dash_cards_image + '")' }}>
                                                            {/* <img className="w-full h-24 rounded" src="https://cdn.lifology.com/m/dash/card_small_1.jpg" /> */}
                                                            <div className="p-4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div>
                                                        <div className="flex">
                                                            <div>
                                                                <div className="text-base font-medium">{assessment.reports.title}</div>
                                                                <div className="mt-1 text-xs font-normal text-justify">
                                                                    {assessment.reports.description}
                                                                </div>
                                                            </div>
                                                            <img className="ml-4 w-16 object-contain" src="/img/fitment.png" alt="fitment" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="shadow bg-white mt-4 p-4 grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#02C77D"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    stroke-width="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.FOLLOWER + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">FOLLOWER</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#FF2929"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    stroke-width="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.SUSTAINER + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">SUSTAINER</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#2D75F2"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    stroke-width="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.INFLUENCER + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">INFLUENCER</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#F8A11E"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    stroke-width="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.COMMANDER + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">COMMANDER</div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-md shadow mt-4 p-4">

                                                    <div
                                                        onClick={(event) => {
                                                            setOpenLS(true)
                                                            setOpenWMY(false)
                                                            setOpenDWTW(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openLS ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded  hover:shadow-lg  px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openLS ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Leadership Strength</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openLS ? 'bg-white text-lgreen' : 'bg-black text-white',
                                                                    "p-1 rounded-full"
                                                                )
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


                                                    <div
                                                        onClick={(event) => {
                                                            setOpenLS(false)
                                                            setOpenWMY(true)
                                                            setOpenDWTW(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openWMY ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openWMY ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >What Motivates You</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openWMY ? 'bg-white text-lgreen' : 'bg-black text-white',
                                                                    "p-1 rounded-full"
                                                                )
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

                                                    <div
                                                        onClick={(event) => {
                                                            setOpenLS(false)
                                                            setOpenWMY(false)
                                                            setOpenDWTW(true)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openDWTW ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openDWTW ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Dealing With The World</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openDWTW ? 'bg-white text-lgreen' : 'bg-black text-white',
                                                                    "p-1 rounded-full"
                                                                )
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


                                                </div>

                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-2">

                                            {
                                                openLS ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Leadership Strength</div>
                                                        <div className="text-sm mt-2">You demonstrate the leader in you considering these points</div>
                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "300px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselLS = Carousel}>
                                                            {report.leadership_strength.map((card) => (
                                                                <div style={{
                                                                    height: '100%',
                                                                    width: '250px',
                                                                    textAlign: 'center',
                                                                    background: '#FFF',
                                                                    border: '2px solid #EEEEEE',
                                                                    color: '#FFF',
                                                                    fontSize: '12px',
                                                                    textTransform: 'uppercase',
                                                                    borderRadius: '10px',
                                                                }}>
                                                                    <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                    <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                        {card.text}
                                                                    </div>
                                                                </div>
                                                            ))
                                                            }

                                                        </ReactCardCarousel>
                                                    </div>
                                                    <div className="flex ml-auto mr-auto w-min mt-4">
                                                        <a
                                                            onClick={(event) => {
                                                                carouselLS.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselLS.next()
                                                            }}>
                                                            <div className="ml-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>

                                                </div>
                                                    : <></>
                                            }
                                            {
                                                openWMY ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">What Motivates You</div>
                                                        <div className="text-sm mt-2">You demonstrate the leader in you considering these points</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "300px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselWMY = Carousel}>
                                                            {report.your_motivation.map((card) => (
                                                                <div style={{
                                                                    height: '100%',
                                                                    width: '250px',
                                                                    textAlign: 'center',
                                                                    background: '#FFF',
                                                                    border: '2px solid #EEEEEE',
                                                                    color: '#FFF',
                                                                    fontSize: '12px',
                                                                    textTransform: 'uppercase',
                                                                    borderRadius: '10px',
                                                                }}>
                                                                    <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                    <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                        {card.text}
                                                                    </div>
                                                                </div>
                                                            ))
                                                            }

                                                        </ReactCardCarousel>
                                                    </div>
                                                    <div className="flex ml-auto mr-auto w-min mt-4">
                                                        <a
                                                            onClick={(event) => {
                                                                carouselWMY.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselWMY.next()
                                                            }}>
                                                            <div className="ml-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>


                                                </div>
                                                    : <></>
                                            }

                                            {
                                                openDWTW ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Dealing with the world</div>
                                                        <div className="text-sm mt-2">You demonstrate the leader in you considering these points</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "300px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselDWTW = Carousel}>
                                                            {report.world_dealing.map((card) => (
                                                                <div style={{
                                                                    height: '100%',
                                                                    width: '250px',
                                                                    textAlign: 'center',
                                                                    background: '#FFF',
                                                                    border: '2px solid #EEEEEE',
                                                                    color: '#FFF',
                                                                    fontSize: '12px',
                                                                    textTransform: 'uppercase',
                                                                    borderRadius: '10px',
                                                                }}>
                                                                    <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                    <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                        {card.text}
                                                                    </div>
                                                                </div>
                                                            ))
                                                            }

                                                        </ReactCardCarousel>
                                                    </div>
                                                    <div className="flex ml-auto mr-auto w-min mt-4">
                                                        <a
                                                            onClick={(event) => {
                                                                carouselDWTWprev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselDWTW.next()
                                                            }}>
                                                            <div className="ml-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>

                                                </div>
                                                    : <></>
                                            }

                                        </section>
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
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/assessment",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const assessment = await queryGraph(careerClient, { id: parseInt(context.params.id) }, SchemeGetAssessment)
        .then((res) => {
            return res.assessmentDetails
        }).catch((networkErr) => {
            return {}
        })
    const report = await queryGraph(careerClient, {}, SchemeGetMTIReport)
        .then((res) => {
            return res.environmentalInteractions
        }).catch((networkErr) => {
            return {};
        });
    const summaryDetails = await queryGraph(careerClient, { id: parseInt(context.params.id) }, SchemeGetSummaryDetails)
        .then((res) => {
            return JSON.parse(res.assessmentDetails.summary_report)
        }).catch((networkErr) => {
            return {};
        })
    console.log(summaryDetails)
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: { profile, assessment, report, token, summaryDetails }
    }
}


