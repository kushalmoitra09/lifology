import { Fragment, useState, useEffect } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessment, SchemeGetMIOReport } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import { Listbox, Transition, Dialog } from '@headlessui/react'

import styles from '/styles/Report.module.css'
import Expand from 'react-expand-animated';

import "react-multi-carousel/lib/styles.css";

import { Bar, Line, Pie } from 'react-chartjs-2';
import Breadcrumbs from '/components/Breadcrumbs'
import { SchemeGetMIOSCReport } from '/helpers/GraphQLSchemes'
import cookies from 'next-cookies'

import Draggable from 'react-draggable';

import SortableContainer from 'react-drag-sort'

export default function MIOReport({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const index = 4;

    const [collection, setCollection] = useState([
        { key: 1, value: 'Hello a' },
        { key: 2, value: 'Hello b' },
        { key: 3, value: 'Hello c' },
        { key: 4, value: 'Hello d' },
        { key: 5, value: 'Hello e' },
        { key: 6, value: 'Hello e' }
    ])


    const Item = ({ value, index, onRemove, onChange, decorateHandle }) => {
        return (
            <div className="shadow rounded p-4 mb-4 bg-white">
                {decorateHandle(
                    <div
                    >{value}
                    </div>
                )}

            </div>
        )
    }

    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: ' Report', href: '#', current: true
        },
    ]


    return (
        <>
            <MetaLayout title="MIO Assement Reports" description="MIO Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MIO Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <Draggable
                                axis="x"
                                handle=".handle"
                                defaultPosition={{ x: 0, y: 0 }}
                                position={null}
                                grid={[25, 25]}
                                scale={1}>
                                <div>
                                    <div className="handle">Drag from here</div>
                                    <div>This readme is really dragging on...</div>
                                </div>
                            </Draggable>

                            <SortableContainer
                                collection={collection}
                                onChange={collection => {
                                    console.log('onchange')
                                    setCollection(collection)
                                }}
                                Component={Item}
                            />
                        </div>
                    </main>
                </div>


            </div >


        </>
    )
    function getOdListValue(title) {
        switch (title) {
            case 'kinesthetic':
                return openB.kinesthetic
            case 'naturalistic':
                return openB.naturalistic
            case 'interpersonal':
                return openB.interpersonal
            case 'intrapersonal':
                return openB.intrapersonal
            case 'logical':
                return openB.logical
            case 'visual':
                return openB.visual
            case 'rhythmic':
                return openB.rhythmic
            case 'linguistic':
                return openB.linguistic
        }
    }
    function toggleListValue(title) {
        switch (title) {
            case 'kinesthetic':
                openB.kinesthetic = !openB.kinesthetic
                break
            case 'naturalistic':
                openB.naturalistic = !openB.naturalistic
                break
            case 'interpersonal':
                openB.interpersonal = !openB.interpersonal
                break
            case 'intrapersonal':
                openB.intrapersonal = !openB.intrapersonal
                break
            case 'logical':
                openB.logical = !openB.logical
                break
            case 'visual':
                openB.visual = !openB.visual
                break
            case 'rhythmic':
                openB.rhythmic = !openB.rhythmic
                break
            case 'linguistic':
                openB.linguistic = !openB.linguistic
                break
        }
        setOpenB(openB)
        console.log(openB)
    }
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


