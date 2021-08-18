import { useState, useEffect } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessment, SchemeGetMIOReport } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import "react-multi-carousel/lib/styles.css";

import { PieChart } from 'react-minimal-pie-chart';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import ReactCardCarousel from 'react-card-carousel';
import { SchemeGetLSReport } from '../../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import cookies from 'next-cookies'

export default function VAKReport({ profile, assessment, report }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        loop: true,
        controls: true,
        duration: 500,
        slidesPerView: 1,
    })

    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: assessment.title + ' Report', href: '#', current: true
        },
    ]
    var carousel;
    return (
        <>
            <MetaLayout title="Learning Accelerator Report" description="Learning Accelerator Report" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Learning Accelerator Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white rounded-md shadow h-30 p-4" style={{ height: "fit-content" }}>
                                                    <p className="font-medium">Assesment/Learning Accelerator Report</p>

                                                    <div className="sm:flex mt-4">
                                                        {/* <div className="relative flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img className="w-24 h-24 rounded" src="https://cdn.lifology.com/m/dash/card_small_1.jpg" />
                                                            <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div> */}

                                                        <div className="h-24 mr-4 rounded" style={{ backgroundImage: 'url("https://cdn.lifology.com/m/dash/card_small_1.jpg")' }}>
                                                            {/* <img className="w-full h-24 rounded" src="https://cdn.lifology.com/m/dash/card_small_1.jpg" /> */}
                                                            <div className="p-4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div>
                                                        <div className="flex">
                                                            <div>
                                                                <div className="text-base font-medium">{assessment.reports.title}</div>
                                                                <div className="mt-1 text-xs font-normal text-justify">
                                                                    {assessment.reports.description}
                                                                </div>
                                                            </div>
                                                            <img className="ml-4 w-16 object-contain" src="/img/fitment.png" alt="fitment" />
                                                        </div>
                                                    </div>
                                                </div>



                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-2">
                                            <div className="bg-white rounded-md shadow h-auto">
                                                <div className="text-base font-medium p-4">Reports</div>

                                                {/* <div ref={sliderRef} className="keen-slider">
                                                    {reports.map((card) => (
                                                        <div className="keen-slider__slide">
                                                            <div className="shadow group relative mx-16 my-4 rounded m-1 duration-500" style={{}}>
                                                                <div>
                                                                    <img className="rounded-t ml-auto mr-auto" src={card.image} />
                                                                    <div className="mt-2 pb-4 w-full text-gray-900 font-medium text-center">
                                                                        {card.text}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    ))
                                                    }
                                                </div> */}
                                                <div style={{
                                                    position: "relative",
                                                    height: "400px",
                                                    width: "100%",
                                                    display: "flex",
                                                    flex: 1,
                                                    justifyContent: "center",
                                                    alignItems: "middle"
                                                }}>
                                                    <ReactCardCarousel style={{ height: '200px' }}
                                                        ref={Carousel => carousel = Carousel}>
                                                        {report.content.map((card) => (
                                                            <div style={{
                                                                height: '100%',
                                                                width: '250px',
                                                                textAlign: 'center',
                                                                background: '#FFF',
                                                                border: '2px solid #EEEEEE',
                                                                color: '#FFF',
                                                                fontSize: '12px',
                                                                textTransform: 'uppercase',
                                                                borderRadius: '10px',
                                                            }}>
                                                                <img className="rounded-t ml-auto mr-auto w-32 pt-8" src={card.image} />
                                                                <div className="mt-4 p-4 w-full text-gray-900 font-medium text-sm text-center">
                                                                    {card.text}
                                                                </div>
                                                            </div>
                                                        ))
                                                        }

                                                    </ReactCardCarousel>
                                                </div>
                                                <div className="flex ml-auto mr-auto w-min mt-4">
                                                    <a
                                                        onClick={(event) => {
                                                            carousel.prev()
                                                        }}>
                                                        <div className="mr-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full  flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <a
                                                        onClick={(event) => {
                                                            carousel.next()
                                                        }}>
                                                        <div className="ml-2 cursor-pointer group w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
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


        </>
    )
}

// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/assessment",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const assessment = await queryGraph(careerClient, { id: parseInt(context.params.id) }, SchemeGetAssessment)
        .then((res) => {
            return res.assessmentDetails
        }).catch((networkErr) => {
            return {}
        })
    const report = await queryGraph(careerClient, {}, SchemeGetLSReport)
        .then((res) => {
            return res.learningSuggestions
        }).catch((networkErr) => {
            return {};
        });

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
        props: { profile, assessment, report, token }
    }
}


