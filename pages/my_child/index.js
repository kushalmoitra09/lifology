import Link from 'next/link'
import { useState } from 'react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import { SchemeGetAssessments } from '/helpers/GraphQLSchemes'

const cards = [
    { title: 'Face', subtitle: 'Core Behaviour', href: '#', bg: '/img/my_child/face.png' },
    { title: 'MIO', subtitle: 'Intelligence Orientation', href: '#', bg: '/img/my_child/mio.png' },
    { title: 'MTI', subtitle: 'Environmental Interaction', href: '/my_child/mti_assessment', bg: '/img/my_child/mti.png' },
    { title: 'VAK', subtitle: 'Learning Style', href: '#', bg: '/img/my_child/vak.png' },
    { title: 'Care', subtitle: 'Learning Preferences', href: '#', bg: '/img/my_child/care.png' },
    { title: 'GRIT', subtitle: 'Passion & Perseverence', href: '#', bg: '/img/my_child/grit.png' },
    { title: 'Competancy', subtitle: '21st Century Skills', href: '#', bg: '/img/my_child/competancy.png' },
    // More items...
]

export default function MyChild({ profile, assessments, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    return (
        <>
            <MetaLayout title="My Child" description="My Child" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="2" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="My Child" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">
                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="font-bold text-xl" >Assesment</div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 lg:grid-cols-5 mt-4">
                                            {/* Card */}
                                            {assessments.map((card) => (
                                                <Link
                                                    href={{
                                                        pathname: "/my_child/" + card.id + "/assessment_instructions",
                                                        query: { token: token }
                                                    }}>
                                                    <a>
                                                        <div key={card.name} className="group relative bg-white overflow-hidden shadow hover:shadow-xl hover:scale-105 active:scale-100 active:shadow-sm rounded bg-cover duration-500 "
                                                            style={{ height: '200px', }}
                                                        >
                                                            <img src={card.dash_cards_image} className="rounded w-full object-cover group-hover:scale-150 group-hover:rotate-12 group-active:rotate-0 group-active:scale-100 duration-500" style={{ height: '200px' }} />
                                                            <div className="absolute p-4 top-0 w-full">
                                                                <div className="text-white w-9/12 font-medium text-xl ">{card.title}</div>
                                                                <div className="text-white w-9/12 text-sm mt-2">{card.subtitle}</div>
                                                                <div className="mt-4 w-0 h-0.5 rounded bg-white group-hover:w-3/4 duration-500"></div>
                                                            </div>
                                                            <div className="flex absolute bottom-4 right-4 scale-0 group-hover:scale-100 duration-500 translate-x-full group-hover:translate-x-0">
                                                                <div className="self-center font-medium text-lg text-white">View Report</div>
                                                                <svg className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))}
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
        </>
    )
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
    const assessmentClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/assessment",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const assessments = await queryGraph(assessmentClient, {}, SchemeGetAssessments)
        .then((res) => {
            return res.assessments
        }).catch((networkErr) => {
            return {}
        })
    console.log(assessments)
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
            return {}
        })
    return {
        props: { profile, assessments, token }
    }
}

