import { Fragment, useState, useEffect } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessment, SchemeGetMIOReport } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import { Listbox, Transition, Dialog } from '@headlessui/react'

import styles from '/styles/Report.module.css'
import Expand from 'react-expand-animated';

import "react-multi-carousel/lib/styles.css";

import { Bar, Line, Pie } from 'react-chartjs-2';
import Breadcrumbs from '../../../../components/Breadcrumbs'
import { SchemeGetMIOSCReport, SchemeGetSummaryDetails } from '../../../../helpers/GraphQLSchemes'
import cookies from 'next-cookies'

export default function MIOReport({ profile, assessment, report, summaryDetails }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openOD, setOpenOD] = useState(true)
    const [openSCR, setOpenSCR] = useState(false)

    const [openKinesthetic, setOpenKinesthetic] = useState(false)
    const [openNaturalistic, setOpenNaturalistic] = useState(false)
    const [openInterpersonal, setOpenInterpersonal] = useState(false)
    const [openIntrapersonal, setOpenIntrapersonal] = useState(false)
    const [openLogical, setOpenLogical] = useState(false)
    const [openVisual, setOpenVisual] = useState(false)
    const [openRhythmic, setOpenRhythmic] = useState(false)
    const [openLinguistic, setOpenLinguistic] = useState(false)

    const [openB, setOpenB] = useState({
        kinesthetic: false,
        naturalistic: false,
        interpersonal: false,
        intrapersonal: false,
        logical: true,
        visual: false,
        rhythmic: false,
        linguistic: false
    })

    const chartData = {
        labels: ['Kinesthetic', 'Naturalistic', 'Interpersonal', 'Intrapersonal', 'Logical', 'Visual', 'Rhythmic', 'Linguistical'],
        datasets: [
            {
                label: '',
                data: [
                    summaryDetails.kinesthetic,
                    summaryDetails.naturalistic,
                    summaryDetails.interpersonal,
                    summaryDetails.intrapersonal,
                    summaryDetails.logical,
                    summaryDetails.visual,
                    summaryDetails.rhythmic,
                    summaryDetails.linguistic
                ],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(54, 162, 235)',
                ]
            }
        ]
    }
    const index = 4;

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
            <MetaLayout title="MIO Assement Reports" description="MIO Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MIO Report" />

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
                                                    <p className="font-medium">Assesment/MIO Assesment</p>

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

                                                <div className="bg-white rounded-md shadow mt-4 p-4">
                                                    <Bar
                                                        data={chartData}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Largest Cities In City',
                                                                fontSize: 25
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div className="bg-white rounded-md shadow mt-4 p-4">

                                                    <div
                                                        onClick={(event) => {
                                                            setOpenOD(true)
                                                            setOpenSCR(false)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openOD ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded  hover:shadow-lg pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openOD ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Orientation Details</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openOD ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                            setOpenOD(false)
                                                            setOpenSCR(true)
                                                        }}
                                                        className={
                                                            classNames(
                                                                openSCR ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                                "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                            )
                                                        }
                                                    >
                                                        <span className=
                                                            {
                                                                classNames(openSCR ? 'text-white' : '',
                                                                    "font-medium block truncate")
                                                            }
                                                        >Spread of Characteristics Reports</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                            <div className={
                                                                classNames(
                                                                    openSCR ? 'bg-white text-lgreen' : 'bg-black text-white',
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
                                                openOD ? <div className="bg-white rounded-md shadow h-auto p-4">


                                                    <div onClick={(event) => {
                                                        setOpenKinesthetic(!openKinesthetic)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Kinesthetic
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'kinesthetic').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'kinesthetic').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openKinesthetic
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'kinesthetic').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>


                                                    <div onClick={(event) => {
                                                        setOpenNaturalistic(!openNaturalistic)

                                                        setOpenKinesthetic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">

                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Naturalistic
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'naturalistic').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'naturalistic').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <Expand open={
                                                        openNaturalistic
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'naturalistic').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>


                                                    <div onClick={(event) => {
                                                        setOpenInterpersonal(!openInterpersonal)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Interpersonal
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'interpersonal').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'interpersonal').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openInterpersonal
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'interpersonal').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>


                                                    <div onClick={(event) => {
                                                        setOpenIntrapersonal(!openIntrapersonal)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Intrapersonal
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'intrapersonal').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'intrapersonal').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openIntrapersonal
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'intrapersonal').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>

                                                    <div onClick={(event) => {
                                                        setOpenLogical(!openLogical)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Logical
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'logical').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'logical').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openLogical
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'logical').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>

                                                    <div onClick={(event) => {
                                                        setOpenVisual(!openVisual)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenRhythmic(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Visual
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'visual').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'visual').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openVisual
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'visual').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>

                                                    <div onClick={(event) => {
                                                        setOpenRhythmic(!openRhythmic)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenLinguistic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Rhythmic
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'rhythmic').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'rhythmic').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <Expand open={
                                                        openRhythmic
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'rhythmic').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>

                                                    <div onClick={(event) => {
                                                        setOpenLinguistic(!openLinguistic)
                                                        setOpenKinesthetic(false)
                                                        setOpenNaturalistic(false)
                                                        setOpenInterpersonal(false)
                                                        setOpenIntrapersonal(false)
                                                        setOpenLogical(false)
                                                        setOpenVisual(false)
                                                        setOpenRhythmic(false)
                                                    }} className="cursor-pointer mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="sm:flex">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4" style={{ minWidth: '20%' }}>
                                                                Linguistical
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-full relative self-center">
                                                                    <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                        <div style={{ width: report.orientation_details.find(x => x.title == 'linguistic').percentage + '%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 text-xs text-center" style={{ minWidth: '15%' }}>{
                                                                    report.orientation_details.find(x => x.title == 'linguistic').percentage
                                                                }%</div>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Expand open={
                                                        openLinguistic
                                                    }>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            {
                                                                report.orientation_details.find(x => x.title == 'linguistic').content.map((c) => {
                                                                    return <li>{c}</li>
                                                                })
                                                            }

                                                        </ul>
                                                    </Expand>


                                                </div>
                                                    : <></>
                                            }
                                            {
                                                openSCR ?
                                                    <div className="bg-white rounded-md shadow h-auto px-4 pt-4 pb-px">
                                                        {
                                                            report.spread_characteristics.expert.map((e) => (
                                                                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2 shadow p-4 mb-4">
                                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                        <div className="text-sm font-medium ">{e.key}</div>
                                                                        <div className="text-xs mt-2 text-justify">{e.info}</div>
                                                                    </div>
                                                                    <div className="flex w-full self-center">
                                                                        <div className="w-1/4 h-4 rounded-l-full self-center" style={{ background: '#29B6FF' }}></div>
                                                                        <div className="w-1/4 h-4 self-center" style={{ background: '#FF6600' }}></div>
                                                                        <div className="w-1/4 h-4 self-center" style={{ background: '#FFD500' }}></div>
                                                                        <div className="w-1/4 ">
                                                                            <svg
                                                                                className="w-4 ml-auto mr-auto"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    id="path"
                                                                                    d="M 0 0 L 24 0 L 12 24 Z"
                                                                                    fill="#000000" />
                                                                            </svg>
                                                                            <div className="h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                                            <div className="text-xs font-bold text-center">Expert</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        {
                                                            report.spread_characteristics.advanced.map((e) => (
                                                                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2 shadow p-4 mb-4">
                                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                        <div className="text-sm font-medium ">{e.key}</div>
                                                                        <div className="text-xs mt-2 text-justify">{e.info}</div>
                                                                    </div>
                                                                    <div className="flex w-full self-center">
                                                                        <div className="w-1/4 h-4 rounded-l-full self-center" style={{ background: '#29B6FF' }}></div>
                                                                        <div className="w-1/4 h-4 self-center" style={{ background: '#FF6600' }}></div>
                                                                        <div className="w-1/4 self-center">
                                                                            <svg
                                                                                className="w-4 ml-auto mr-auto"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    id="path"
                                                                                    d="M 0 0 L 24 0 L 12 24 Z"
                                                                                    fill="#000000" />
                                                                            </svg>
                                                                            <div className="h-4" style={{ background: '#FFD500' }}></div>
                                                                            <div className="text-xs font-bold text-center">Advanced</div>
                                                                        </div>
                                                                        <div className="w-1/4 h-4 rounded-r-full self-center" style={{ background: '#40B248' }}></div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        {
                                                            report.spread_characteristics.learner.map((e) => (
                                                                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2 shadow p-4 mb-4">
                                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                        <div className="text-sm font-medium ">{e.key}</div>
                                                                        <div className="text-xs mt-2 text-justify">{e.info}</div>
                                                                    </div>
                                                                    <div className="flex w-full self-center">
                                                                        <div className="w-1/4 h-4 rounded-l-full self-center" style={{ background: '#29B6FF' }}></div>
                                                                        <div className="w-1/4 self-center">
                                                                            <svg
                                                                                className="w-4 ml-auto mr-auto"
                                                                                viewBox="0 0 24 24">
                                                                                <path
                                                                                    id="path"
                                                                                    d="M 0 0 L 24 0 L 12 24 Z"
                                                                                    fill="#000000" />
                                                                            </svg>
                                                                            <div className="h-4" style={{ background: '#FF6600' }}></div>
                                                                            <div className="text-xs font-bold text-center">Learner</div>
                                                                        </div>
                                                                        <div className="w-1/4 h-4 self-center" style={{ background: '#FFD500' }}></div>
                                                                        <div className="w-1/4 h-4 rounded-r-full self-center" style={{ background: '#40B248' }}></div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        {
                                                            report.spread_characteristics.novice.map((e) => (
                                                                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2 shadow p-4">
                                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                        <div className="text-sm font-medium ">{e.key}</div>
                                                                        <div className="text-xs mt-2">{e.info}</div>
                                                                    </div>
                                                                    <div className="flex w-full self-center">
                                                                        <div className="w-1/4 h-4 rounded-l-full" style={{ background: '#29B6FF' }}></div>
                                                                        <div className="w-1/4 h-4" style={{ background: '#FF6600' }}></div>
                                                                        <div className="w-1/4 h-4" style={{ background: '#FFD500' }}></div>
                                                                        <div className="w-1/4 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div> : <></>
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
    function getOdListValue(title) {
        switch (title) {
            case 'kinesthetic':
                return openB.kinesthetic
            case 'naturalistic':
                return openB.naturalistic
            case 'interpersonal':
                return openB.interpersonal
            case 'intrapersonal':
                return openB.intrapersonal
            case 'logical':
                return openB.logical
            case 'visual':
                return openB.visual
            case 'rhythmic':
                return openB.rhythmic
            case 'linguistic':
                return openB.linguistic
        }
    }
    function toggleListValue(title) {
        switch (title) {
            case 'kinesthetic':
                openB.kinesthetic = !openB.kinesthetic
                break
            case 'naturalistic':
                openB.naturalistic = !openB.naturalistic
                break
            case 'interpersonal':
                openB.interpersonal = !openB.interpersonal
                break
            case 'intrapersonal':
                openB.intrapersonal = !openB.intrapersonal
                break
            case 'logical':
                openB.logical = !openB.logical
                break
            case 'visual':
                openB.visual = !openB.visual
                break
            case 'rhythmic':
                openB.rhythmic = !openB.rhythmic
                break
            case 'linguistic':
                openB.linguistic = !openB.linguistic
                break
        }
        setOpenB(openB)
        console.log(openB)
    }
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

    const report = await queryGraph(careerClient, {}, SchemeGetMIOReport)
        .then((res) => {
            return res.intelligenceOrientation
        }).catch((networkErr) => {
            return {};
        })
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


