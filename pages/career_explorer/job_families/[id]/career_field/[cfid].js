import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
    BookmarkIcon
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeCareerPools, SchemeCareerFields, SchemeGetProfile, SchemeGetUniversities, SchemeGetArticleData } from '/helpers/GraphQLSchemes'
import VideoDialog from '/components/dialog/VideoDialog'
import styles from '/styles/CareerField.module.css'

import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Expand from 'react-expand-animated';
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import { useRouter } from 'next/router'
import cookies from 'next-cookies'
import YoutubeDialog from '../../../../../components/dialog/YoutubeDialog'

export default function CareerFields({ profile, jobFamily, careerField, universities, dashboard }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [openVideo, setOpenVideo] = useState(false)

    const [openStudyTopic, setOpenStudyTopic] = useState(false)
    const [openSkillRequired, setOpenSkillRequired] = useState(false)
    const [openEmpAreas, setOpenEmpAreas] = useState(false)

    const [universitySliderRef, universitySlider] = useKeenSlider({
        initial: 0,
        loop: true,
        controls: true,
        duration: 500,
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })

    const [articleSliderRef, articleSlider] = useKeenSlider({
        initial: 0,
        loop: false,
        controls: true,
        duration: 500,
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })
    const [videoSliderRef, videoSlider] = useKeenSlider({
        initial: 0,
        loop: false,
        controls: true,
        duration: 500,
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })

    const [pause, setPause] = useState(false)
    const timer = useRef()

    useEffect(() => {
        if (universities.length > 0) {
            universitySliderRef.current.addEventListener("mouseover", () => {
                setPause(true)
            })
            universitySliderRef.current.addEventListener("mouseout", () => {
                setPause(false)
            })
        }

    }, [universitySliderRef])
    useEffect(() => {
        timer.current = setInterval(() => {
            if (!pause && universitySlider) {
                universitySlider.next()
            }
        }, 1000)
        return () => {
            clearInterval(timer.current)
        }
    }, [pause, universitySlider])

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        {
            name: 'Job Families & Career Fields', href: '/career_explorer/job_families', current: false
        },
        {
            name: jobFamily.name, href: '/career_explorer/job_families/' + jobFamily.id, current: false
        },
        {
            name: careerField.name, href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title={jobFamily.name} description={jobFamily.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={careerField.name} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />
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

                                                        <div className="flex">
                                                            <div className="py-2 font-bold text-xl w-2/4" >{careerField.name}</div>

                                                            <div className="relative w-2/4">
                                                                <div className="absolute text-sm py-2 flex items-center right-0">
                                                                    <BookmarkIcon className="w-5 h-5 mr-2" />
                                                                    Add to bookmark
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 text-sm text-justify" >{careerField.description}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                universities.length > 0 ?
                                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white">

                                                        <div className="mx-4 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">

                                                            <h2 className="text-lg font-medium text-gray-900">
                                                                Universities
                                                            </h2>
                                                            <Link href={{
                                                                pathname: '/career_explorer/course_and_university',
                                                            }}>
                                                                <a>
                                                                    <div className="text-lblue text-right text-base">View All</div>
                                                                </a>
                                                            </Link>


                                                        </div>
                                                        <div className="navigation-wrapper w-full">
                                                            <div ref={universitySliderRef} className="keen-slider">
                                                                {universities.map((card) => (
                                                                    <div className="keen-slider__slide self-center">
                                                                        <Link href={{
                                                                            pathname: '/career_explorer/course_and_university/' + card.id,
                                                                        }}>
                                                                            <a>
                                                                                <div className="rounded bg-gray shadow p-3 mx-2 m-4 hover:shadow-lg hover:scale-105 duration-500">
                                                                                    <img className="ml-auto mr-auto h-32 object-contain" src={Constants.baseUrlImage + card.logo} />
                                                                                </div>
                                                                            </a>
                                                                        </Link>

                                                                    </div>
                                                                ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <></>
                                            }



                                            {/* <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white">

                                                <h2 className="text-lg font-medium text-gray-900 m-4 ">
                                                    Recommended Articles
                                                </h2>
                                                <div className="navigation-wrapper w-full mb-4">
                                                    <div ref={articleSliderRef} className="keen-slider">
                                                        {dashboard.magazines.map((card) => (
                                                            <div className="keen-slider__slide self-center">
                                                                <div className="px-2">
                                                                    <img className="ml-auto mr-auto rounded" src={card.thumbnail} />
                                                                </div>
                                                                <h2 className="text-sm font-medium text-gray-900 px-2 mt-2 h-10 overflow-hidden" >
                                                                    {card.title}
                                                                </h2>
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white">

                                                <h2 className="text-lg font-medium text-gray-900 mx-4 mt-4">
                                                    Recommended Videos
                                                </h2>
                                                <div className="navigation-wrapper w-full mb-4">
                                                    <div ref={videoSliderRef} className="keen-slider">
                                                        {dashboard.videos.map((card) => (
                                                            <Link
                                                                href={{
                                                                    pathname: '/career_explorer/career_video/' + card.id
                                                                }}
                                                            >
                                                                <a className="keen-slider__slide self-center">
                                                                    <div className="px-2">
                                                                        <img className="ml-auto mr-auto rounded" src={card.thumbnail} />
                                                                    </div>
                                                                    <h2 className="text-sm font-medium text-gray-900 px-2 mt-2 h-10 overflow-hidden" >
                                                                        {card.title}
                                                                    </h2>
                                                                </a>
                                                            </Link>

                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
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
                                            <div className="mt-4 bg-white p-4 shadow sm:rounded-lg">

                                                <a
                                                    href="#"
                                                    onClick={(event) => {
                                                        setOpenStudyTopic(!openStudyTopic)
                                                    }}>
                                                    <div className="group relative w-full  rounded pl-3 pr-10 py-2 text-left cursor-pointer outline-none focus:outline-none sm:text-sm shadow hover:shadow-lg active:shadow duration-500" >
                                                        <span className="block truncate text-base font-medium text-gray-900">Topics of Study</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none duration-500">
                                                            <svg className={classNames(openStudyTopic ? 'transform  -rotate-180' : '', "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>

                                                <Expand open={openStudyTopic}>
                                                    <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                        {
                                                            careerField.topics.map((t) => {
                                                                return (
                                                                    <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-gray-500 hover:bg-opacity-100 hover:text-white duration-500"} key={t.name}>
                                                                        <div className={"self-center p-1 rounded-full h-6 w-6 bg-gray-500"} >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </div>
                                                                        <span className="self-center ml-2 mr-2 text-xs text-justify">{t.name}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </Expand>

                                                <a
                                                    href="#"
                                                    onClick={(event) => {
                                                        setOpenSkillRequired(!openSkillRequired)
                                                    }}>
                                                    <div className="relative w-full mt-4 rounded pl-3 pr-10 py-2 text-left cursor-pointer outline-none focus:outline-none sm:text-sm shadow hover:shadow-lg active:shadow duration-500" >
                                                        <span className="block truncate text-base font-medium text-gray-900">Skills Required</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <svg className={classNames(openSkillRequired ? 'transform  -rotate-180' : '', "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>

                                                <Expand open={openSkillRequired}>
                                                    <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                        {
                                                            careerField.skills.map((s) => (
                                                                <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-gray-500 hover:bg-opacity-100 hover:text-white duration-500"} key={s.name}>
                                                                    <div className={"self-center p-1 rounded-full h-6 w-6 bg-gray-500"} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="self-center ml-2 mr-2 text-xs text-justify">{s.name}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Expand>

                                                <a
                                                    href="#"
                                                    onClick={(event) => {
                                                        setOpenEmpAreas(!openEmpAreas)
                                                    }}>
                                                    <div className="relative w-full mt-4 rounded pl-3 pr-10 py-2 text-left cursor-pointer outline-none focus:outline-none sm:text-sm shadow hover:shadow-lg active:shadow duration-500" >
                                                        <span className="block truncate text-base font-medium text-gray-900">Employment Areas</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <svg className={classNames(openEmpAreas ? 'transform  -rotate-180' : '', "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </a>

                                                <Expand open={openEmpAreas}>
                                                    <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                        {
                                                            careerField.employment_areas.map((e) => (
                                                                <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-gray-500 hover:bg-opacity-100 hover:text-white duration-500"} key={e.name}>
                                                                    <div className={"self-center p-1 rounded-full h-6 w-6 bg-gray-500"} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="self-center ml-2 mr-2 text-xs text-justify">{e.name}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </Expand>
                                            </div>
                                            <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="text-lg font-medium text-gray-900 text-center">
                                                    Get in Touch
                                                </div>
                                                <div className="mt-2 text-base font-medium text-gray-900 text-center">
                                                    Book a Free Call with Advisor
                                                </div>
                                                <div
                                                    className="w-max ml-auto mr-auto mt-4 py-2 px-4 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                                    Connect with an Agent
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
            <YoutubeDialog showDialog={openVideo} setShowDialog={setOpenVideo} url={careerField.video} />
        </>
    )
}

const getColor = () => {
    const colors = ['blue', 'green', 'yellow', 'gray', 'indigo']
    var color = colors[Math.floor(Math.random() * colors.length)]
    return 'gray'
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
    const dashboardClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/dashboard",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const dashboard = await queryGraph(dashboardClient, {}, SchemeGetArticleData)
        .then((res) => {
            return res.article_video
        }).catch((networkErr) => {
            return {}
        })
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
        })
    const jobFamily = datas.filter(x => x.id == context.params.id)[0]

    const careerFields = await queryGraph(careerClient, { pool_id: parseInt(context.params.id) }, SchemeCareerFields)
        .then((res) => {
            return res.careerFields
        }).catch((networkErr) => {
            return {}
        })
    const careerField = careerFields.filter(x => x.id == context.params.cfid)[0]

    const universitiesRaw = await queryGraph(careerClient, { pool_id: parseInt(context.params.id), field_id: parseInt(context.params.cfid) }, SchemeGetUniversities)
        .then((res) => {
            console.log(res.allUniversity)
            return res.allUniversity
        }).catch((networkErr) => {
            console.log(networkErr)
            return [{
                university: []
            }]
        })
    const universities = universitiesRaw[0] != null ? universitiesRaw[0].university != null ? universitiesRaw[0].university : [] : []

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
        props: { profile, jobFamily, careerField, universities, dashboard }
    }
}


