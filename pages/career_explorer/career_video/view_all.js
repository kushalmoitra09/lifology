import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon,
    SortAscendingIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition, RadioGroup } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import YoutubeDialog from '../../../components/dialog/YoutubeDialog'
import { SchemeGetViewAllVideos } from '../../../helpers/GraphQLSchemes'


const pageItemCount = 32
export default function CareerVideoViewAll({ profile, cId, videos, videosCount, page }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)


    const pages = [
        {
            name: 'Career Explorer',
            href: '/career_explorer/',
            current: false
        },
        {
            name: 'Career Videos',
            href: '/career_explorer/career_video',
            current: false
        },
        {
            name: "View All",
            href: '#',
            current: true
        }
    ]

    const totalPages = Math.ceil(videosCount / pageItemCount)

    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;

    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Videos" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />

                                    <div className="px-4 pb-4">
                                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                                {
                                                    videos.map((video) => (
                                                        <Link href={'/career_explorer/career_video/' + video.id} key={video.id}>
                                                            <a>
                                                                <div className="group relative shadow rounded hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                                                    <div>
                                                                        <img className=" rounded-t group-hover:filter-none duration-500  w-full h-32 object-cover" src={video.thumbnail} />
                                                                        <div className="flex-1 flex items-center justify-between truncate">
                                                                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                                <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                                                    {video.title}
                                                                                </div>
                                                                                <div className="text-gray-500 mt-2 w-full overflow-hidden">{video.description}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </a>
                                                        </Link>

                                                    ))
                                                }
                                            </div>
                                            <nav
                                                className="bg-white flex items-center justify-between border-t border-gray-200 mt-4"
                                                aria-label="Pagination"
                                            >
                                                <div className="hidden sm:block mt-4">
                                                    <p className="text-sm text-gray-700">
                                                        Showing <span className="font-medium">{(page - 1) * pageItemCount + 1}</span> to <span className="font-medium">{((page - 1) * pageItemCount + 32) > videosCount ? videosCount : ((page - 1) * pageItemCount + 32)}</span> of{' '}
                                                        <span className="font-medium">{videosCount}</span> results
                                                    </p>
                                                </div>
                                                <div className="flex-1 flex justify-between sm:justify-end mt-4">
                                                    {
                                                        previousPage >= 1 ? <Link href={{
                                                            pathname: '/career_explorer/career_video/view_all',
                                                            query: {
                                                                cId: cId,
                                                                page: previousPage,
                                                            }
                                                        }}>
                                                            <a
                                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                            >
                                                                Previous
                                                            </a>
                                                        </Link> : <></>
                                                    }
                                                    {
                                                        nextPage <= totalPages ? <Link href={{
                                                            pathname: '/career_explorer/career_video/view_all',
                                                            query: {
                                                                cId: cId,
                                                                page: nextPage,
                                                            }
                                                        }}>
                                                            <a
                                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                            >
                                                                Next
                                                            </a>
                                                        </Link> : <></>
                                                    }

                                                </div>
                                            </nav>

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
    const { page = 1, cId = "" } = context.query
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const videosData = await queryGraph(videosClient, { category_id: parseInt(cId), page: parseInt(page), limit: parseInt(pageItemCount) }, SchemeGetViewAllVideos)
        .then((res) => {
            return res.webVideosViewAll
        }).catch((networkErr) => {
            return {
                videos: [],
                count: 0
            }
        })
    const videos = videosData.videos
    const videosCount = videosData.count
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
        props: { profile, cId, videos, videosCount, page, }
    }
}


