import Link from 'next/link'
import { useState } from 'react'
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
import VideoDialog from '../../../../components/dialog/VideoDialog'
import { SchemeCareerFields } from '../../../../helpers/GraphQLSchemes'


export default function JobFamily({ profile, jobFamily, careerFields, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const [openVideo, setOpenVideo] = useState(false)

    return (
        <>
            <MetaLayout title={jobFamily.name} description={jobFamily.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={"Career Explorer / Course & University / " + jobFamily.name} authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 self-center">
                                                        <img className="object-contain rounded" src={jobFamily.image} style={{ maxHeight: '14rem', maxWidth: '14rem' }} />
                                                    </div>
                                                    <div className="w-full self-center text-left">
                                                        <div className="font-bold text-xl mt-12" >{jobFamily.name}</div>
                                                        <div className="mt-2 text-sm text-justify" >{jobFamily.one_liner}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 text-sm text-justify">
                                                    {jobFamily.description}
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">

                                                <h2 className="text-lg font-medium text-gray-900">
                                                    Career Fields
                                                </h2>
                                                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                                                    {careerFields.map((cf) => (
                                                        <Link
                                                            href={{
                                                                pathname: '/career_explorer/job_families/' + jobFamily.id + '/career_field/' + cf.id,
                                                                query: { token: token }
                                                            }}>
                                                            <a>
                                                                <div className="group relative rounded shadow p-4 hover:shadow-xl active:shadow-sm duration-500 h-40" style={{ background: getColor() }}>
                                                                    <img src="/img/logoWhite.png" className="absolute h-5 w-5 right-4 " />
                                                                    <div className="text-white text-opacity-20 text-7xl font-bold select-none group-hover:text-opacity-100 duration-500">{cf.name.charAt(0)}</div>
                                                                    <div className="absolute bottom-4 mr-12">
                                                                        <div className="text-sm text-white w-full font-medium" >{cf.name}</div>
                                                                        <div className="mt-2 w-4 h-0.5 rounded bg-white group-hover:w-full duration-500" ></div>
                                                                    </div>
                                                                    <svg className="absolute h-5 w-5 bottom-4 right-4 " fill="none" viewBox="0 0 24 24" stroke="white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                    </svg>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">

                                            <div className=" bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    University Video
                                                </h2>
                                                <a href="#" onClick={(event) => { setOpenVideo(true) }}>
                                                    <div className="group relative shadow hover:shadow-xl hover:scale-105 active:scale-100 duration-500">
                                                        <img className="rounded mt-2 duration-500" src={jobFamily.thumbnail} />
                                                        <svg
                                                            className="absolute h-12 w-12 top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 duration-500"
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
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Your Fitment
                                                </h2>
                                                <div className="flex mt-4">
                                                    <div className="relative w-12 h-12 bg-lgreen rounded-full text-center">
                                                        <span className="text-white font-bold text-base absolute top-2/4 transform -translate-x-1/2 -translate-y-1/2">{jobFamily.percentage}%</span>
                                                    </div>
                                                    <div className="self-center ml-4 text-sm">
                                                        Your Fitment
                                                    </div>
                                                </div>
                                                <div className="flex mt-4 text-sm font-medium text-gray-900">
                                                    <div className="w-2/4">Personality Match</div>
                                                    <div className="w-2/4 text-right">{jobFamily.personality_match}%</div>
                                                </div>
                                                <div className="mt-2 h-2 w-full rounded-full" style={{ background: '#F3F3F3' }}>
                                                    <div className="h-2 rounded-full bg-lblue" style={{ width: jobFamily.personality_match + '%' }}>

                                                    </div>
                                                </div>
                                                <div className="flex mt-4 text-sm font-medium text-gray-900">
                                                    <div className="w-2/4">Orientation Match</div>
                                                    <div className="w-2/4 text-right">{jobFamily.orientation_match}%</div>
                                                </div>
                                                <div className="mt-2 h-2 w-full rounded-full" style={{ background: '#F3F3F3' }}>
                                                    <div className="h-2 rounded-full bg-lyellow" style={{ width: jobFamily.orientation_match + '%' }}>

                                                    </div>
                                                </div>
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

            <VideoDialog showDialog={openVideo} setShowDialog={setOpenVideo} url={jobFamily.video} />
        </>
    )
}

const getColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return "#" + randomColor
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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const datas = await queryGraph(careerClient, {}, SchemeCareerPools)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return {}
        });
    const jobFamily = datas.filter(x => x.id == context.params.id)[0];
    const careerFields = await queryGraph(careerClient, { pool_id: parseInt(context.params.id) }, SchemeCareerFields)
        .then((res) => {
            return res.careerFields
        }).catch((networkErr) => {
            return {}
        });
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
        props: { profile, jobFamily, careerFields, token }
    }
}


