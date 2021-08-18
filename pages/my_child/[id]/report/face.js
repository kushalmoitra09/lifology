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
import { SchemeGetAssessment, SchemeGetFACEReport, SchemeGetFACEReport2, SchemeGetMTIReport, SchemeGetSummaryDetails } from '../../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import cookies from 'next-cookies'

export default function MTIReport({ profile, assessment, report, report2, summaryDetails }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openUY, setOpenUY] = useState(true)
    const [openIR, setOpenIR] = useState(false)
    const [openHOVY, setOpenHOVY] = useState(false)
    const [openDM, setOpenDM] = useState(false)
    const [openCS, setOpenCS] = useState(false)
    const [openCP, setOpenCP] = useState(false)
    const [openAW, setOpenAW] = useState(false)
    const [openR, setOpenR] = useState(false)

    var carouselUY
    var carouselIR
    var carouselHOVY
    var carouselDM
    var carouselCS
    var carouselCP
    var carouselAW
    var carouselR
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
            <MetaLayout title="FACE Assement Reports" description="FACE Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="FACE Report" />

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
                                                    <p className="font-medium">Assesment/FACE Assesment</p>
                                                    <div className="sm:flex mt-4">
                                                        {/* <div className="relative flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img className="w-24 h-24 rounded" src={assessment.dash_cards_image} />
                                                            <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div> */}
                                                        <div className="h-24 mr-4 rounded flex bg-no-repeat" style={{ backgroundImage: 'url("' + assessment.dash_cards_image + '")' }}>
                                                            {/* <img className="w-full h-24 rounded" src="https://cdn.lifology.com/m/dash/card_small_1.jpg" /> */}
                                                            <div className="p-4 min-w-6 text-white font-medium text-lg text-center">{assessment.title}</div>
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
                                                                    strokeWidth="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.FACT + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">FACT</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#FF2929"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    strokeWidth="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.ACTION + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">ACTION</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#2D75F2"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    strokeWidth="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.CONCEPT + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">CONCEPT</div>
                                                    </div>
                                                    <div>
                                                        <div className="relative">
                                                            <svg
                                                                fill="#F8A11E"
                                                                viewBox="0 0 105 91">
                                                                <path
                                                                    id="path"
                                                                    d="M 62 0 C 67.092 0 72.095 1.341 76.504 3.887 C 80.914 6.434 84.575 10.098 87.12 14.508 L 96.639 31.008 C 99.181 35.414 100.52 40.413 100.52 45.5 C 100.52 50.587 99.181 55.586 96.639 59.992 L 87.12 76.492 C 84.575 80.902 80.914 84.566 76.504 87.113 C 72.095 89.659 67.092 91 62 91 L 43 91 C 37.908 91 32.905 89.659 28.496 87.113 C 24.086 84.566 20.425 80.902 17.88 76.492 L 8.361 59.992 C 5.819 55.586 4.48 50.587 4.48 45.5 C 4.48 40.413 5.819 35.414 8.361 31.008 L 17.88 14.508 C 20.425 10.098 24.086 6.434 28.496 3.887 C 32.905 1.341 37.908 0 43 0 Z"
                                                                    strokeWidth="1" />
                                                            </svg>
                                                            <div className="text-base text-white absolute text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">{summaryDetails.EMOTION + "%"}</div>
                                                        </div>
                                                        <div className="mt-2 text-sm text-center">EMOTION</div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-md shadow mt-4 p-4">

                                                    <div
                                                        onClick={(event) => {
                                                            setOpenUY(true)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openUY ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded  hover:shadow-lg  px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openUY ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Understanding Yourself</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openUY ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(true)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openIR ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openIR ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Interpersonal Relationship</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openIR ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(true)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openHOVY ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openHOVY ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >How Others View You</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openHOVY ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(true)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openDM ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openDM ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Decision Making</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openDM ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(true)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openCS ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openCS ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Career Strength</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openCS ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(true)
                                                            setOpenAW(false)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openCP ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openCP ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Communication Pattern</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openCP ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(true)
                                                            setOpenR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openAW ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openAW ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Associated Weakness</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openAW ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenUY(false)
                                                            setOpenIR(false)
                                                            setOpenHOVY(false)
                                                            setOpenDM(false)
                                                            setOpenCS(false)
                                                            setOpenCP(false)
                                                            setOpenAW(false)
                                                            setOpenR(true)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openR ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openR ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Recommendation</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openR ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                openUY ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Understanding Yourself</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>
                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "400px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselUY = Carousel}>
                                                            {report.understanding_yourself.map((card) => (
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
                                                                carouselUY.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselUY.next()
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
                                                openIR ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Interpersonal Relationship</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

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
                                                            ref={Carousel => carouselIR = Carousel}>
                                                            {report.interpersonal_relation.map((card) => (
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
                                                                carouselIR.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselIR.next()
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
                                                openHOVY ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">How others View You</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "400px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselHOVY = Carousel}>
                                                            {report.others_view.map((card) => (
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
                                                                carouselHOVY.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselHOVY.next()
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
                                                openDM ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Decision Making</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "400px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselDM = Carousel}>
                                                            {report.decision_taking.map((card) => (
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
                                                                carouselDM.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselDM.next()
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
                                                openCS ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="relative w-full bg-white text-left outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Career Strength</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "400px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselCS = Carousel}>
                                                            {report2.career_strength.map((card) => (
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
                                                                    <div>
                                                                        <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                        <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                            {card.text}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex w-4/6 ml-auto mr-auto pb-4">
                                                                        <div className="h-3 w-1/5"  >
                                                                            <div className="h-full w-full rounded-l-full" style={{ background: '#D93F3F' }} />
                                                                            {
                                                                                card.score == 1 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="h-3 w-1/5"  >
                                                                            <div className="h-full w-full" style={{ background: '#F57F21' }} />
                                                                            {
                                                                                card.score == 2 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full" style={{ background: '#F7DC1B' }} />
                                                                            {
                                                                                card.score == 3 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full" style={{ background: '#6BBC44' }} />
                                                                            {
                                                                                card.score == 4 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full rounded-r-full" style={{ background: '#40B248' }} />
                                                                            {
                                                                                card.score == 5 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="h-4"></div>

                                                                </div>
                                                            ))
                                                            }

                                                        </ReactCardCarousel>
                                                    </div>
                                                    <div className="flex ml-auto mr-auto w-min mt-4">
                                                        <a
                                                            onClick={(event) => {
                                                                carouselCS.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselCS.next()
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
                                                openCP ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="text-base font-medium">Communication Pattern</div>
                                                        <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                    </div>
                                                    <div style={{
                                                        position: "relative",
                                                        height: "400px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flex: 1,
                                                        justifyContent: "center",
                                                        alignItems: "middle"
                                                    }}>
                                                        <ReactCardCarousel style={{ height: '200px' }}
                                                            ref={Carousel => carouselCP = Carousel}>
                                                            {report2.communication_pattern.map((card) => (
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
                                                                    <div>
                                                                        <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                        <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                            {card.text}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex w-4/6 ml-auto mr-auto pb-4">
                                                                        <div className="h-3 w-1/5"  >
                                                                            <div className="h-full w-full rounded-l-full" style={{ background: '#D93F3F' }} />
                                                                            {
                                                                                card.score == 1 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="h-3 w-1/5"  >
                                                                            <div className="h-full w-full" style={{ background: '#F57F21' }} />
                                                                            {
                                                                                card.score == 2 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full" style={{ background: '#F7DC1B' }} />
                                                                            {
                                                                                card.score == 3 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full" style={{ background: '#6BBC44' }} />
                                                                            {
                                                                                card.score == 4 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                        <div className="w-1/5 h-3">

                                                                            <div className="h-full w-full rounded-r-full" style={{ background: '#40B248' }} />
                                                                            {
                                                                                card.score == 5 ? <svg
                                                                                    className="w-2 ml-auto mr-auto"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 0 24 L 24 24 L 12 0 Z"
                                                                                        fill="#000000" />
                                                                                </svg> : <></>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="h-4"></div>

                                                                </div>
                                                            ))
                                                            }

                                                        </ReactCardCarousel>
                                                    </div>
                                                    <div className="flex ml-auto mr-auto w-min mt-4">
                                                        <a
                                                            onClick={(event) => {
                                                                carouselCP.prev()
                                                            }}>
                                                            <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                        <a
                                                            onClick={(event) => {
                                                                carouselCP.next()
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
                                                openAW ?
                                                    <>
                                                        <div className="bg-white rounded-md shadow h-auto p-4">

                                                            <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                                <div className="text-base font-medium">Associated Weekness</div>
                                                                <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                            </div>
                                                            <div style={{
                                                                position: "relative",
                                                                height: "400px",
                                                                width: "100%",
                                                                display: "flex",
                                                                flex: 1,
                                                                justifyContent: "center",
                                                                alignItems: "middle"
                                                            }}>
                                                                <ReactCardCarousel style={{ height: '200px' }}
                                                                    ref={Carousel => carouselAW = Carousel}>
                                                                    {report.associated_weakness.map((card) => (
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
                                                                        carouselAW.prev()
                                                                    }}>
                                                                    <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                        </svg>
                                                                    </div>
                                                                </a>
                                                                <a
                                                                    onClick={(event) => {
                                                                        carouselAW.next()
                                                                    }}>
                                                                    <div className="ml-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full flex items-center duration-500 -translate-y-2/4">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                        </svg>
                                                                    </div>
                                                                </a>
                                                            </div>

                                                        </div>
                                                        <div className="bg-white rounded-md shadow h-auto p-4 mt-4" style={{ background: '#4B11C7' }}>
                                                            <div className="text-white relative w-full text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                                <div className="text-base font-medium">Recommendations</div>
                                                                <div className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem. Massa vitae tortor condimentum lacinia. Sed blandit libero volutpat sed cras ornare arcu dui vivamus</div>

                                                            </div>
                                                        </div>
                                                    </> : <></>
                                            }

                                            {
                                                openR ?
                                                    <div className="bg-white rounded-md shadow h-auto p-4">

                                                        <div className="cursor-pointer relative w-full bg-white text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                            <div className="text-base font-medium">Recommendations</div>
                                                            <div className="text-sm mt-2">Here is the summary of you core behaviour</div>

                                                        </div>
                                                        <div style={{
                                                            position: "relative",
                                                            height: "400px",
                                                            width: "100%",
                                                            display: "flex",
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "middle"
                                                        }}>
                                                            <ReactCardCarousel style={{ height: '200px' }}
                                                                ref={Carousel => carouselR = Carousel}>
                                                                {report.recommendation.map((card) => (
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
                                                                    carouselR.prev()
                                                                }}>
                                                                <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                    </svg>
                                                                </div>
                                                            </a>
                                                            <a
                                                                onClick={(event) => {
                                                                    carouselR.next()
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
    const report = await queryGraph(careerClient, {}, SchemeGetFACEReport)
        .then((res) => {
            return res.coreBehaviour1
        }).catch((networkErr) => {
            return {};
        });
    const report2 = await queryGraph(careerClient, {}, SchemeGetFACEReport2)
        .then((res) => {
            return res.coreBehaviour2
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
        props: { profile, assessment, report, report2, token, summaryDetails }
    }
}


