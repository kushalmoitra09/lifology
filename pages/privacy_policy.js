import { useState, useEffect } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '../components/MetaLayout'
import SettingNavigationLayout from '../components/SettingNavigationLayout'

import "react-multi-carousel/lib/styles.css";
import cookies from 'next-cookies'

export default function PrivacyPolicy({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const index = 5;
    return (
        <>
            <MetaLayout title="Privacy Policy" description="Privacy Policy" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / Privacy Policy" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >

                                                <SettingNavigationLayout index="5" />
                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="applicant-information-title" className="text-base font-bold text-gray-900 rounded w-full">
                                                    Privacy Policy
                                                </h2>
                                                <p className="mt-2 text-sm">“The mission of Lifology is to empower each parent in India to lead children to the right education, career and future where they enjoy happiness, financial security, fulfilment and purpose. Precisely, we partner parents in India to be the most trusted advisors of their teenage kids in deciding higher education and career”.</p>
                                                <p className="mt-2 text-sm">Only a few children — under 5 percent — are on the right track as they pursue higher education. Despite extensive support in the way of career counsellors in most schools, a vast majority of the students make the wrong career choice after high- school. This snowballs into underperformed in University academics and leads to a life of stress, unhappiness, and a lack of fulfilment and purpose. As they lose confidence, rising technology takes over their jobs. Their dreams lose life, before they ever got the chance to begin. </p>
                                                <p className="mt-2 text-sm">21st century is the most vibrant and fastest period in the history of mankind. Massive changes happening in the technology sphere is revolutionising every aspect of life. Children need strong, informed and learned support to make the right decisions about education and career. Research proves, 76% of children are influenced by parents when it comes to education, career and many other important decisions relating to their future. We decide to transform every parent in India to a real ‘Guru’, who influence children to take the most appropriate decisions.</p>
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
        props: { profile, token }
    }
}


