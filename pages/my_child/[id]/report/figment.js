import { Fragment, useState, useEffect } from 'react'
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

import { Listbox, Transition, Dialog } from '@headlessui/react'

import "react-multi-carousel/lib/styles.css";

import classNames from '/helpers/classNames'
import { SchemeGetFigmentReport } from '../../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import cookies from 'next-cookies'

export default function GreenZone({ profile, report }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openGreen, setGreenOpen] = useState(false)
    const [openBlue, setBlueOpen] = useState(false)
    const [openOrange, setOrangeOpen] = useState(false)
    const [openPurple, setPurpleOpen] = useState(false)

    const [index, setIndex] = useState(1)
    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: 'Figment Report', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="Figment Report" description="Figment Report" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Fitment Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-gray-50 rounded-md shadow h-30 p-4" style={{ height: "fit-content" }}>
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

                                                    <a onClick={
                                                        (event) => setIndex(1)
                                                    }>
                                                        <div className={
                                                            classNames("group relative w-full rounded-md shadow pl-3 pr-10 py-2 text-left cursor-pointer outline-none focus:outline-none sm:text-sm hover:shadow-lg duration-500 hover:bg-lgreen",
                                                                index == 1 ? 'bg-lgreen' : '')
                                                        }>
                                                            <span className={
                                                                classNames("font-medium block truncate group-hover:text-white duration-500",
                                                                    index == 1 ? 'text-white' : '')
                                                            }>Green Zone</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                <div className={
                                                                    classNames("p-1 rounded-full  duration-500", index == 1 ? 'bg-white text-lgreen' : 'bg-black text-white group-hover:bg-white group-hover:text-lgreen')
                                                                }>
                                                                    <svg className={
                                                                        classNames("h-4 w-4", index == 1 ? 'rotate-90' : '')
                                                                    } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                    </svg>

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </a>


                                                    <a onClick={
                                                        (event) => setIndex(2)
                                                    }>
                                                        <div className={
                                                            classNames("group relative w-full rounded-md shadow pl-3 pr-10 py-2  mt-4 text-left cursor-pointer outline-none focus:outline-none sm:text-sm hover:shadow-lg duration-500 hover:bg-lgreen",
                                                                index == 2 ? 'bg-lgreen' : '')
                                                        }>
                                                            <span className={
                                                                classNames("font-medium block truncate group-hover:text-white duration-500",
                                                                    index == 2 ? 'text-white' : '')
                                                            }>Blue Zone</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                <div className={
                                                                    classNames("p-1 rounded-full  duration-500", index == 2 ? 'bg-white text-lgreen' : 'bg-black text-white group-hover:bg-white group-hover:text-lgreen')
                                                                }>
                                                                    <svg className={
                                                                        classNames("h-4 w-4", index == 2 ? 'rotate-90' : '')
                                                                    } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                    </svg>

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </a>

                                                    <a onClick={
                                                        (event) => setIndex(3)
                                                    }>
                                                        <div className={
                                                            classNames("group relative w-full rounded-md shadow pl-3 pr-10 py-2  mt-4 text-left cursor-pointer outline-none focus:outline-none sm:text-sm hover:shadow-lg duration-500 hover:bg-lgreen",
                                                                index == 3 ? 'bg-lgreen' : '')
                                                        }>
                                                            <span className={
                                                                classNames("font-medium block truncate group-hover:text-white duration-500",
                                                                    index == 3 ? 'text-white' : '')
                                                            }>Orange Zone</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                <a href="orange_zone">
                                                                    <div className={
                                                                        classNames("p-1 rounded-full  duration-500", index == 3 ? 'bg-white text-lgreen' : 'bg-black text-white group-hover:bg-white group-hover:text-lgreen')
                                                                    }>
                                                                        <svg className={
                                                                            classNames("h-4 w-4", index == 3 ? 'rotate-90' : '')
                                                                        } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                        </svg>

                                                                    </div>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </a>

                                                    <a onClick={
                                                        (event) => setIndex(4)
                                                    }>
                                                        <div className={
                                                            classNames("group relative w-full rounded-md shadow pl-3 pr-10 py-2  mt-4 text-left cursor-pointer outline-none focus:outline-none sm:text-sm hover:shadow-lg duration-500 hover:bg-lgreen",
                                                                index == 4 ? 'bg-lgreen' : '')
                                                        }>
                                                            <span className={
                                                                classNames("font-medium block truncate group-hover:text-white duration-500",
                                                                    index == 4 ? 'text-white' : '')
                                                            }>Purple Zone</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                                <a href="purple_zone">
                                                                    <div className={
                                                                        classNames("p-1 rounded-full  duration-500", index == 4 ? 'bg-white text-lgreen' : 'bg-black text-white group-hover:bg-white group-hover:text-lgreen')
                                                                    }>
                                                                        <svg className={
                                                                            classNames("h-4 w-4", index == 4 ? 'rotate-90' : '')
                                                                        } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                        </svg>

                                                                    </div>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </a>


                                                </div>

                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-2">
                                            {
                                                index == 1 ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    {
                                                        report.green_zone.length > 0 ?
                                                            report.green_zone.map((r) => {
                                                                return <div className="text-white rounded-md mb-4 pb-4" style={{ background: "#5EB570" }}>
                                                                    <p className="p-4">
                                                                        <span className="text-medium text-blue-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 text-sm">{r.percentage}%</span>{r.career}
                                                                    </p>
                                                                    <p className="text-sm pl-4 pb-2">Personality Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-900">
                                                                            <div style={{ width: r.personality_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm pl-4 pb-2">Orientation Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-800">
                                                                            <div style={{ width: r.orientation_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }) :
                                                            <div className="text-white rounded-md p-4" style={{ background: "#5EB570" }}>
                                                                <div className="font-bold text-xl text-center">No Career Here!</div>
                                                                <div className="text-sm mt-4 text-center">Check Other Zones For Your Figment</div>
                                                            </div>
                                                    }

                                                </div> : ''
                                            }
                                            {
                                                index == 2 ? <div className="bg-white rounded-md shadow h-auto p-4">

                                                    {
                                                        report.blue_zone.length > 0 ?
                                                            report.blue_zone.map((r) => {
                                                                return <div className="text-white rounded-md mb-4 pb-4" style={{ background: "#61B9FF" }}>
                                                                    <p className="p-4">
                                                                        <span className="text-medium text-blue-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 text-sm">{r.percentage}%</span>{r.career}
                                                                    </p>
                                                                    <p className="text-sm pl-4 pb-2">Personality Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-800">
                                                                            <div style={{ width: r.personality_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm pl-4 pb-2">Orientation Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-800">
                                                                            <div style={{ width: r.orientation_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }) :
                                                            <div className="text-white rounded-md p-4" style={{ background: "#61B9FF" }}>
                                                                <div className="font-bold text-xl text-center">No Career Here!</div>
                                                                <div className="text-sm mt-4 text-center">Check Other Zones For Your Figment</div>
                                                            </div>
                                                    }

                                                </div> : ''
                                            }
                                            {
                                                index == 3 ? <div className="bg-white rounded-md shadow h-auto p-4">
                                                    {
                                                        report.orange_zone.length > 0 ?
                                                            report.orange_zone.map((r) => {
                                                                return <div className="text-white rounded-md mb-4 pb-4" style={{ background: "#ED872F" }}>
                                                                    <p className="p-4">
                                                                        <span className="text-medium text-blue-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 text-sm">{r.percentage}%</span>{r.career}
                                                                    </p>
                                                                    <p className="text-sm pl-4 pb-2">Personality Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-900">
                                                                            <div style={{ width: r.personality_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm pl-4 pb-2">Orientation Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-green-900">
                                                                            <div style={{ width: r.orientation_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }) : <div className="text-white rounded-md p-4" style={{ background: "#ED872F" }}>
                                                                <div className="font-bold text-xl text-center">No Career Here!</div>
                                                                <div className="text-sm mt-4 text-center">Check Other Zones For Your Figment</div>
                                                            </div>
                                                    }

                                                </div> : ''
                                            }
                                            {
                                                index == 4 ? <div className="bg-white rounded-md shadow h-auto p-4">
                                                    {
                                                        report.purple_zone.length > 0 ?
                                                            report.purple_zone.map((r) => {
                                                                return <div className="text-white rounded-md mb-4 pb-4" style={{ background: "#9F2DC3" }}>
                                                                    <p className="p-4">
                                                                        <span className="text-medium text-blue-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 text-sm">{r.percentage}%</span>{r.career}
                                                                    </p>
                                                                    <p className="text-sm pl-4 pb-2">Personality Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-900">
                                                                            <div style={{ width: r.personality_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm pl-4 pb-2">Orientation Match</p>
                                                                    <div className="relative ml-4 mr-4">
                                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-green-900">
                                                                            <div style={{ width: r.orientation_match + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }) : <div className="text-white rounded-md p-4" style={{ background: "#9F2DC3" }}>
                                                                <div className="font-bold text-xl text-center">No Career Here!</div>
                                                                <div className="text-sm mt-4 text-center">Check Other Zones For Your Figment</div>
                                                            </div>
                                                    }


                                                </div> : ''
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
    const report = await queryGraph(careerClient, {}, SchemeGetFigmentReport)
        .then((res) => {
            return res.careerFitment
        }).catch((networkErr) => {
            return {};
        });

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
        props: { profile, report, token }
    }
}


