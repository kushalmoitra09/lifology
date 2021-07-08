import Link from 'next/link'
import { useState } from 'react'
import {
    ClockIcon,
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
    BookmarkIcon
} from '@heroicons/react/outline'
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SchemeCareerPools, SchemeGetUniversity } from '/helpers/GraphQLSchemes'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function JobFamilyAccount({ profile, jobFamily, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
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
                                                        <div className="font-bold text-xl mt-12" >Accounting</div>
                                                        <div className="mt-2 text-sm text-justify" >{jobFamily.one_liner}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">

                                                <h2 className="text-lg font-medium text-gray-900">
                                                    Career Fields
                                                </h2>
                                                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                                                    <Link
                                                        href={{
                                                            pathname: jobFamily.id + '/accounting',
                                                            query: { token: token }
                                                        }}>
                                                        <a>
                                                            <div className="relative rounded shadow p-4 hover:shadow-xl duration-500 h-40" style={{ background: '#FF7A66' }}>
                                                                <img src="/img/logoWhite.png" className="absolute h-5 w-5 right-4 " />
                                                                <div className="text-white text-opacity-20 text-7xl font-bold">A</div>
                                                                <div className="absolute bottom-4">
                                                                    <div className="text-sm text-white w-full font-medium" >Accounting</div>
                                                                    <div className="mt-2 w-8 h-px rounded bg-white"></div>
                                                                </div>
                                                                <svg className="absolute h-5 w-5 bottom-4 right-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                    <div className="relative rounded shadow p-4  hover:shadow-xl duration-500 h-40" style={{ background: '#9366FF' }}>
                                                        <img src="/img/logoWhite.png" className="absolute h-5 w-5 right-4 " />
                                                        <div className="text-white text-opacity-20 text-7xl font-bold">B</div>
                                                        <div className="absolute bottom-4">
                                                            <div className="text-sm text-white w-full font-medium" >Banking</div>
                                                            <div className="mt-2 w-8 h-px rounded bg-white"></div>
                                                        </div>
                                                        <svg className="absolute h-5 w-5 bottom-4 right-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative rounded shadow p-4  hover:shadow-xl duration-500 h-40" style={{ background: '#6ED96E' }}>
                                                        <img src="/img/logoWhite.png" className="absolute h-5 w-5 right-4 " />
                                                        <div className="text-white text-opacity-20 text-7xl font-bold">C</div>
                                                        <div className="absolute bottom-4">
                                                            <div className="text-sm text-white w-full font-medium" >CA</div>
                                                            <div className="mt-2 w-8 h-px rounded bg-white"></div>
                                                        </div>
                                                        <svg className="absolute h-5 w-5 bottom-4 right-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative rounded shadow p-4  hover:shadow-xl duration-500 h-40" style={{ background: '#66BDFF' }}>
                                                        <img src="/img/logoWhite.png" className="absolute h-5 w-5 right-4 " />
                                                        <div className="text-white text-opacity-20 text-7xl font-bold">F</div>
                                                        <div className="absolute bottom-4">
                                                            <div className="text-sm text-white w-full font-medium" >Finance</div>
                                                            <div className="mt-2 w-8 h-px rounded bg-white"></div>
                                                        </div>
                                                        <svg className="absolute h-5 w-5 bottom-4 right-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    University Video
                                                </h2>
                                                <img className="rounded mt-2" src={jobFamily.thumbnail} />
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
            // console.log(networkErr);
        });
    return {
        props: { profile, jobFamily, token }
    }
}


