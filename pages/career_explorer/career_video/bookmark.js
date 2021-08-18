import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon
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



export default function CareerVideo({ token, profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [watchLaterVideo, setWatchLaterVideo] = useState([])

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const getWatchLaterVideos = () => {

        mutateGraph(client,
            {

            }, SchemeGetWatchLaterVideos)
            .then((res) => {
                setWatchLaterVideo(res);
                console.log("remove watch later api", res);
            }).catch((networkErr) => {

                console.log(networkErr)
            });

    }

    useEffect(() => {
        getWatchLaterVideos();
    }, [])

    const removeVideo = (id) => {
        mutateGraph(client,
            {
                video_id: Number(id)
            }, SchemeRemoveWatchLater)
            .then((res) => {
                // setVideoStatus(res.checkVideoStatus);
                console.log("remove watch later api", res);
            }).catch((networkErr) => {

                console.log(networkErr)
            });

        getWatchLaterVideos();
    }

    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career Videos / Watch Later" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <div class="grid grid-cols-1 m-5 p-5 rounded shadow gap-4 bg-white">
                            <p className="text-xl font-medium">Watch Later Videos</p>

                            {watchLaterVideo.videosWatchLater != undefined &&
                                watchLaterVideo.videosWatchLater.map((video, index) => (
                                    <div className="flex">
                                        <Link href={'/career_explorer/career_video/' + video.id}>
                                            <div className="flex my-4 cursor-pointer " >
                                                <div className="mr-4 mt-2 flex-shrink-0 self-start">
                                                    <img className="w-36 rounded object-cover" src={video.thumbnail} />
                                                </div>
                                                <div className="self-center">
                                                    <h4 className="text-sm font-bold">{video.title} </h4>
                                                    <p className="mt-1 w-96 text-xs text-justify" >
                                                        {video.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <span className="text-blue-500 ml-2 ml-auto cursor-pointer" onClick={() => removeVideo(video.id)}>Remove</span>
                                    </div>
                                ))
                            }

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
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const watchLaterVideo = await queryGraph(videosClient, {}, SchemeGetWatchLaterVideos)
        .then((res) => {
            return res
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
        props: { token, profile }
    }
}


