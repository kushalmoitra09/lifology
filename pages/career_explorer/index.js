import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Breadcrumbs from '../../components/Breadcrumbs'

import cookies from 'next-cookies'
import { SchemeGetAssessments } from '/helpers/GraphQLSchemes'


export default function CareerExplorer({ profile, isTop }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const pages = [
        {
            name: 'Career Explorer', href: '#', current: true
        },
    ]

    const cards = [
        { name: 'Job Families & Career Fields', href: '/career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Course and University', href: isTop ? '/career_explorer/course_and_university/top_universities' : '/career_explorer/course_and_university', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Scholarship Program', href: '/career_explorer/scholarship', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Magazine', href: '/career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Career Videos', href: '/career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
    ]
    return (
        <>

            <MetaLayout title="Career Explorer" description="Career Explorer" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {cards.map((card) => (
                                                <div key={card.name} className="relative bg-white overflow-hidden shadow rounded-lg"
                                                    style={{ backgroundImage: 'url(\'/img/test.png\')', height: '200px', }}
                                                >

                                                    <div className="absolute h-full w-7/12 bg-gradient-to-r from-lblue via-lblue to-transparent"  >
                                                    </div>
                                                    <img src="/img/test.png" className="rounded-lg" />
                                                    <div className="absolute p-5 top-0">
                                                        <div className="text-white w-9/12 font-medium text-xl">{card.name}</div>
                                                    </div>
                                                    <div className="absolute p-5 bottom-0 right-0">
                                                        <Link
                                                            href={card.href}>
                                                            <a>
                                                                <div className="mt-4 w-min rounded-2xl text-white py-1 px-3 bg-lyellow">Explore</div>
                                                            </a>
                                                        </Link>

                                                    </div>
                                                </div>
                                            ))}
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
            return []
        })

    const isTop = (assessments.find(a => a.id == 1).total_questions <= 0 &&
        assessments.find(a => a.id == 4).total_questions <= 0 &&
        assessments.find(a => a.id == 2).total_questions <= 0)
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
        props: { profile, isTop }
    }
}

