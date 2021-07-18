import { useState } from 'react'
import {
    ClockIcon,
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
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
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import styles from '../../styles/Magazine.module.css'
import MetaLayout from '../../components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const cards = [
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    // More items...
]

export default function Magazine({ profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <MetaLayout title="Magazine" description="Magazine" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Magazines" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
                                                <img src="/img/test.png" className="rounded-lg" />
                                            </div>
                                            <div className="w-full self-center">
                                                <div className="text-sm">Zulie Rane in The Startup</div>
                                                <div className="font-bold mt-2 text-xl" >Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open</div>
                                                <div className="mt-2 text-sm" >I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can Write Anywhere, Anytime, About Anything.</div>
                                                <div className="mt-2 text-sm text-gray-400">May 25 . 5 min read</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                <div className="self-center font-medium text-base w-full">
                                                    <h2 className="text-xl ">Trending Magazines</h2>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-gray-100">
                                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            id="search_field"
                                                            name="search_field"
                                                            className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                            placeholder="Search Job Families"
                                                            type="search"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                            {cards.map((card) => (
                                                <div className="bg-white overflow-hidden flex relative">
                                                    <img className="m-2 rounded-2xl w-20 h-20" src={card.image} />
                                                    <div className="top-0 mt-4 mb-4">
                                                        <div className="text-sm">{card.subheading}</div>
                                                        <div className="mt-2 font-bold">{card.heading}</div>
                                                        <div className="mt-2 text-sm text-gray-400">{card.date} . {card.read}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <ul className={styles.topicGroup}>
                                                        <li key="all" className="float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer text-white bg-lblue duration-500">All</li>
                                                        <li key="general" className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-lblue">General</li>
                                                        <li key="parenting" className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-lblue">Parenting</li>
                                                        <li key="career" className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-lblue">Career</li>
                                                        <li key="trending_career" className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-lblue">Trending Career</li>
                                                    </ul>
                                                </div>
                                            </section>
                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Discover More Topics
                                                </h2>

                                                <h3 className="text-base mt-4">
                                                    Career Pools
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="dams">Data Analytics, Mathematics, & Statistics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="architecture">Architecture</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="afs">Armed Forces and Security</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="ll">Language & Linguistics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="more">More</li>
                                                </ul>

                                                <h3 className="text-base mt-4">
                                                    Career Fields
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="csa">Computer Science and Applications</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="s">Statisctics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="da">Data analysis</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="m">Mathematics</li>
                                                </ul>
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
            // console.log(networkErr);
        });
    return {
        props: { profile, token }
    }
}


