import Link from 'next/link'
import { useState } from 'react'
import {
    ThumbUpIcon,
    ThumbDownIcon,
    ClockIcon,
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'
import MetaLayout from '../../../components/MetaLayout'

import "react-multi-carousel/lib/styles.css";
import { SchemeGetRecommendedVideos, SchemeGetVideo } from '../../../helpers/GraphQLSchemes'

function getVideoId(url) {
    var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
    var match = url.match(regExp);
    if (match) {
        return match[2]
    }
    return ''
}
export default function CareerVideoDetail({ profile, video, recommended, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")


    return (
        <>

            <MetaLayout title={video.title} description={video.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career Videos / Career Videos Details" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <div className="relative h-0" style={{ paddingBottom: '56.25%', paddingTop: '0px' }}>
                                                        <iframe title="vimeo-player" src={"https://player.vimeo.com/video/" + getVideoId(video.video)} className="absolute rounded-lg top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen>

                                                        </iframe>
                                                    </div>

                                                    <div className="sm:flex mt-4">
                                                        <div className="font-bold mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            {video.title}
                                                        </div>
                                                        <div className="self-center flex ml-auto text-xs">
                                                            <div className="flex">
                                                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                                </svg>
                                                                Like
                                                            </div>
                                                            <div className="flex">
                                                                <svg className="h-4 w-4 mr-2 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                                                </svg>
                                                                Dislike
                                                            </div>
                                                            <div className="flex">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Watch Later
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-px bg-gray-200 my-4"></div>
                                                    <div>
                                                        <div className="font-bold mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            Description
                                                        </div>
                                                        <div className="mt-2 mb-4 text-sm text-justify flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            {video.description}
                                                        </div>
                                                    </div>
                                                </div>


                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4" style={{ height: '100vh', overflow: 'auto' }} >
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Recommended Videos
                                                </h2>
                                                {recommended.map((r) => (
                                                    <Link
                                                        href={{
                                                            pathname: '/career_explorer/career_video/' + r.id,
                                                            query: { token: token }
                                                        }}>
                                                        <a>
                                                            <div className="flex my-4">
                                                                <div className="mr-4 mt-2 flex-shrink-0 self-start">
                                                                    <img className="w-20 rounded object-cover" src={r.thumbnail} />
                                                                </div>
                                                                <div className="self-center">
                                                                    <h4 className="text-sm font-bold">{r.title}</h4>
                                                                    <p className="mt-1 text-xs">
                                                                        {r.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                ))}
                                            </div>
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
    const { token } = context.query
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const videoClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const video = await queryGraph(videoClient, { id: parseInt(context.params.id) }, SchemeGetVideo)
        .then((res) => {
            return res.videoDetails
        }).catch((networkErr) => {
            return {};
        })
    const recommended = await queryGraph(videoClient, {}, SchemeGetRecommendedVideos)
        .then((res) => {
            return res.recommendedVideo
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
        props: { profile, video, recommended, token }
    }
}


