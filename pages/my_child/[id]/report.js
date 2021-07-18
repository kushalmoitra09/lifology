import { Fragment, useState } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
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

import { Listbox, Transition, Dialog } from '@headlessui/react'

import styles from '/styles/Report.module.css'
import Expand from 'react-expand-animated';

import "react-multi-carousel/lib/styles.css";

import { Bar, Line, Pie } from 'react-chartjs-2';


export default function PurpleZone({ profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")


    const [openOD, setOpenOD] = useState(true)
    const [openSCR, setOpenSCR] = useState(false)
    const [openVisual, setOpenVisual] = useState(false)

    const chartData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                label: 'Population',
                data: [
                    100,
                    80,
                    60,
                    50,
                    20,
                    0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ]
    }
    const index = 4;
    return (
        <>
            <MetaLayout title="Report" description="Report" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="My Child / MIO Assesment" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white rounded-md shadow h-30 p-4" style={{ height: "fit-content" }}>
                                                    <p className="font-medium">Assesment/MTI Assesment</p>
                                                    <div className="flex mt-2">
                                                        <div className="bg-black w-20 rounded-md">
                                                            <p className="text-white p-2 px-2">CAREER FITMENT</p>
                                                        </div>
                                                        <div className="ml-4 mr-4 font-medium">Career Fitment
                                                            <div className="text-xs font-normal">Do you think your child has mastery over their immediate environment</div>
                                                        </div>
                                                        <img src="/img/fitment.png" alt="fitment" width="75px" height="40px" />
                                                        {/* <div className="bg-yellow-400 w-20"><p className="text-white p-2">Image</p> </div> */}
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
                                                        setOpenVisual(!openVisual)
                                                    }} className="cursor-pointer relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Visual</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <Expand open={openVisual}>
                                                        <ul className={styles.group} style={{ fontSize: '14px', marginTop: '16px', textAlign: 'justify', lineHeight: '20px' }}>
                                                            <li >
                                                                You seem to be extremely good at interpreting visual images, pictorial representations & expressions
                                                            </li>
                                                            <li >
                                                                You seem to be extremely good at interpreting visual images, pictorial representations & expressions
                                                            </li>
                                                        </ul>
                                                    </Expand>


                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Kinesthetic</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Kinesthetic</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Logical</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Intrapersonal</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Linguistic</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 relative w-full bg-white shadow hover:shadow-lg rounded px-4 py-2 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500">
                                                        <div className="flex">
                                                            <div className="w-1/3">Naturalistic</div>
                                                            <div className="w-2/3 relative self-center">
                                                                <div className="overflow-hidden h-2 text-xs flex rounded" style={{ background: '#F3F3F3' }}>
                                                                    <div style={{ width: '30%', background: '#02C77D' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-2">90%</div>

                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                </div>
                                                    : <></>
                                            }
                                            {
                                                openSCR ?
                                                    <div className="bg-white rounded-md shadow h-auto p-4">
                                                        <div className="sm:flex shadow p-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Visualization Ability</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Creative</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Reasoning Skills</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Analytical</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Methodical</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Word Power</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Language Processing</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Co-Operating</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Working Relationships</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:flex shadow p-4 mt-4">
                                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                <div className="text-sm font-medium ">Energetic</div>
                                                                <div className="text-xs mt-2">Do you think your child has mastery over.</div>
                                                            </div>
                                                            <div className="flex w-full self-center">
                                                                <div className="w-1/5 h-4 rounded-l-full" style={{ background: '#26F1DC' }}></div>
                                                                <div className="w-1/5 h-4 " style={{ background: '#29B6FF' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FF6600' }}></div>
                                                                <div className="w-1/5 h-4" style={{ background: '#FFD500' }}></div>
                                                                <div className="w-1/5 h-4 rounded-r-full" style={{ background: '#40B248' }}></div>
                                                            </div>
                                                        </div>
                                                    </div> : <></>
                                            }

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
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
    const { token } = context.query;
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

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
        props: { profile, token }
    }
}


