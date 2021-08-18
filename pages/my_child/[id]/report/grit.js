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
import { SchemeGetGRITReport } from '../../../../helpers/GraphQLSchemes'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import cookies from 'next-cookies'

export default function CareReport({ profile, assessment, report }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: assessment.title + ' Report', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="GRIT Assement Reports" description="GRIT Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="GRIT Report" />

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
                                                    <p className="font-medium">Assesment/GRIT Assesment</p>

                                                    <div className="sm:flex mt-4">
                                                        {/* <div className="relative flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img className="w-24 h-24 rounded" src={assessment.dash_cards_image} />
                                                            <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white font-medium text-lg">{assessment.title}</div>
                                                        </div> */}
                                                        <div className="h-24 mr-4 rounded" style={{ backgroundImage: 'url("' + assessment.dash_cards_image + '")' }}>
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

                                                <div className="bg-white rounded-md shadow mt-4 px-24 py-4">
                                                    {/* <Doughnut data={data} /> */}
                                                    <PieChart
                                                        style={{
                                                            fontFamily:
                                                                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                                                            fontSize: '8px',
                                                        }}
                                                        radius={PieChart.defaultProps.radius}
                                                        lineWidth={50}
                                                        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                                                        animate
                                                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                                                        labelPosition={70}
                                                        labelStyle={{
                                                            fill: '#fff',
                                                            opacity: 0.75,
                                                            pointerEvents: 'none',
                                                            fontSize: '6px',
                                                        }}
                                                        data={[
                                                            { title: 'Seeing', value: 31, color: 'purple' },
                                                            { title: 'Hearing', value: 33.3, color: 'blue' },
                                                            { title: 'Doing', value: 35.6, color: 'orange' },
                                                        ]}
                                                    />
                                                    <div className="flex text-sm items-center w-max ml-auto mr-auto mt-4">
                                                        <div className="w-4 h-4" style={{ background: 'purple' }}></div>
                                                        <div className="pl-2 pr-4">Seeing</div>
                                                        <div className="w-4 h-4" style={{ background: 'blue' }}></div>
                                                        <div className="pl-2 pr-4">Hearing</div>
                                                        <div className="w-4 h-4" style={{ background: 'orange' }}></div>
                                                        <div className="pl-2">Doing</div>
                                                    </div>
                                                </div>

                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-2">
                                            <div className="bg-white rounded-md shadow h-auto">
                                                <div className="text-base font-medium p-4">Reports</div>

                                                <img src="/img/mti_report_wmy.png" className="ml-auto mr-auto mt-4" />
                                                <div className="text-sm  px-8 mt-4 text-center">{report.circle_text}</div>
                                                <div className="text-sm  px-8 mt-4 text-center">{report.quote_text}</div>
                                                <div className="text-sm  px-8 mt-4 pb-4 text-center" dangerouslySetInnerHTML={{ __html: report.step_text }} />
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
    const report = await queryGraph(careerClient, {}, SchemeGetGRITReport)
        .then((res) => {
            return res.passionPerseverance
        }).catch((networkErr) => {
            return {};
        });

    console.log(report)


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
        props: { profile, assessment, token, report }
    }
}


