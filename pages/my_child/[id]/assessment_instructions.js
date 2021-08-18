import Link from 'next/link'
import { useState, useEffect } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeCareerPools } from '/helpers/GraphQLSchemes'
import VideoDialog from '/components/dialog/VideoDialog'
import { SchemeCareerFields } from '/helpers/GraphQLSchemes'
import styles from '/styles/Mti.module.css'
import { SchemeGetAssessment } from '../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'
import cookies from 'next-cookies'

export default function MTIAssessment({ profile, assessment }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openVideo, setOpenVideo] = useState(false)

    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: 'Instructions', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="Assesment / MTI Assesment" description={"Assesment / " + assessment.title + " Assesment"} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={"Instructions"} />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg px-8 py-4">
                                                <div className="font-bold text-xl" >Assesment / {assessment.title} Assesment</div>

                                                <div className="mt-4 text-sm text-justify leading-loose">
                                                    {assessment.description}
                                                </div>

                                                <div className="font-bold text-xl mt-2" >Instruction</div>

                                                <ul className={styles.group}>
                                                    <li className="text-sm">This Assesment comprises of 16 statements</li>
                                                    <li className="text-sm">Each statement has 4 choices</li>
                                                    <li className="text-sm">Arrange the choices based on your preference with respect to given scale</li>
                                                    <li className="text-sm">Move the choices using either drag and drop or up down the buttons in the right side of the choices</li>
                                                    <li className="text-sm">The Scale contains four parameters
                                                        <ul className={styles.subgroup}  >
                                                            <li className="text-sm">Most like me</li>
                                                            <li className="text-sm">Tends to be like me</li>
                                                            <li className="text-sm">Tends to be less like me</li>
                                                            <li className="text-sm">Least like me</li>
                                                        </ul>
                                                    </li>
                                                    <li className="text-sm">Remember there are no right or wrong answer. these are just your Prefrences to the given statement</li>
                                                </ul>

                                                <Link
                                                    href={"/my_child/" + assessment.id + "/assessment"}>
                                                    <a
                                                        className="w-max mt-4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-indigo-700 focus:outline-none">
                                                        Start Assesment
                                                    </a>
                                                </Link>
                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Instruction Video
                                                </h2>
                                                <div className="relative">
                                                    <img className=" rounded mt-2" src="/img/test.png" />
                                                    <a href="#" onClick={(event) => { setOpenVideo(true) }}>
                                                        <svg
                                                            className="absolute h-12 w-12 top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 hover:h-14 hover:w-14  duration-500"
                                                            viewBox="0 0 24 24"
                                                            id="vector">
                                                            <path
                                                                id="path"
                                                                d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z"
                                                                fill="#ffc107"
                                                                strokeWidth="1" />
                                                            <path
                                                                id="path_1"
                                                                d="M 9.5 14.67 L 9.5 9.33 C 9.5 8.54 10.38 8.06 11.04 8.49 L 15.19 11.16 C 15.8 11.55 15.8 12.45 15.19 12.84 L 11.04 15.51 C 10.38 15.94 9.5 15.46 9.5 14.67 Z"
                                                                fill="#ffffff" />
                                                        </svg>
                                                    </a>

                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div >

            <VideoDialog showDialog={openVideo} setShowDialog={setOpenVideo} url="http:" />
        </>
    )
}

const getColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return "#" + randomColor
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
    const assessment = await queryGraph(assessmentClient, { id: parseInt(context.params.id) }, SchemeGetAssessment)
        .then((res) => {
            return res.assessmentDetails
        }).catch((networkErr) => {
            return {}
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
        });
    return {
        props: { profile, assessment, token }
    }
}


