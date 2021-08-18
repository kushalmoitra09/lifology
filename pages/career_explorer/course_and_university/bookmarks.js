import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon,
    BookmarkIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetWatchLaterVideos, SchemeGetProfile, SchemeRemoveWatchLater } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'
import { mutateGraph } from '../../../helpers/GraphQLCaller'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import { SchemeGetUniversityBookmarkList, SchemeUpdateUniversityBookmark } from '../../../helpers/GraphQLSchemes'
import LoadingDialog from '../../../components/dialog/LoadingDialog'



export default function Bookmarks({ token, profile, bookmarks }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [universities, setUniversities] = useState(bookmarks)
    const [loadingDialog, setLoadingDialog] = useState(false)


    const removeBookmark = (id) => {
        setLoadingDialog(true)

        const careerClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/career",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        mutateGraph(careerClient, {
            college_id: parseInt(id)
        }, SchemeUpdateUniversityBookmark)
            .then((res) => {
                setLoadingDialog(false)
                console.log(res.universityBookmark)
                const newList = universities.filter((u) => u.id != id)
                setUniversities(newList)

            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log('Error')
            })
    }
    return (
        <>
            <MetaLayout title="Bookmark" description="Bookmark" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Bookmark" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <div className="grid grid-cols-1 m-5 p-5 rounded shadow gap-4 bg-white">

                            {
                                universities.map(university => {
                                    return (

                                        <div
                                            className={
                                                classNames(
                                                    false ? 'bg-lgreen shadow-lg' : 'bg-white shadow',
                                                    "cursor-pointer relative w-full rounded mt-4 hover:shadow-lg pr-10 text-left cursor-default outline-none focus:outline-none sm:text-sm duration-500"
                                                )
                                            }
                                        >
                                            <Link href={'/career_explorer/course_and_university/' + university.id}>
                                                <a>
                                                    <div className="flex">
                                                        <div className="flex-shrink-0 m-4 self-center">
                                                            <img className="object-contain " src={Constants.baseUrlImage + '/' + university.logo} style={{ maxHeight: '12rem', maxWidth: '12rem' }} />
                                                        </div>
                                                        <span className="font-medium block truncate text-lg self-center">{university.name}</span>
                                                    </div>

                                                </a>
                                            </Link>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 ">
                                                <div className="hover:scale-110 p-1 rounded-full duration-500"
                                                    onClick={(event) => removeBookmark(university.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </main>
                </div>
            </div>
            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
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
    const bookmarkClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/my-lifology",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const bookmarks = await queryGraph(bookmarkClient, {}, SchemeGetUniversityBookmarkList)
        .then((res) => {
            return res.universities
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
        props: { token, profile, bookmarks }
    }
}


