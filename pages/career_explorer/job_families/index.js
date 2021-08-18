import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import {
    SearchIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Breadcrumbs from '../../../components/Breadcrumbs'

import cookies from 'next-cookies'

import classNames from '/helpers/classNames'

export default function JobFamilies({ families, profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        {
            name: 'Job Families & Career Fields', href: '#', current: true
        },
    ]
    const [searchText, setSearchText] = useState("")
    const [selectedSort, setSelectedSort] = useState('')

    const clearFilter = (event) => {
        setSelectedSort('')
        router.replace(
            {
                pathname: '/career_explorer/job_families',
            }
        )
        setOpenFilter(false)
    }
    const applyFilter = (event) => {
        const q = {}
        if (selectedSort != null)
            q.order = selectedSort
        console.log(q)
        router.replace(
            {
                pathname: '/career_explorer/job_families',
                query: q,
            }
        )
        setOpenFilter(false)
    }
    return (
        <>
            <MetaLayout title="Job Families & Career Fields" description="Job Families & Career Fields" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Job Families & Career Fields" />
                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />
                        <div className="m-4" >

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="flex-1 flex">
                                            <div className="sm:flex h-full w-full p-4">
                                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                    <div className="w-full self-center text-base font-medium" >
                                                        <h2 className="text-xl ">Explore Lists of all Job families & Career Fields</h2>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 ">
                                                        <div className="flex absolute rounded bg-lgrey left-4  right-24 focus-within:text-gray-600 ">
                                                            <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                id="search_field"
                                                                name="search_field"
                                                                className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                                placeholder="Search University"
                                                                type="search"
                                                                value={searchText}
                                                                onChange={(e) => setSearchText(e.target.value)}

                                                            />
                                                        </div>

                                                        <button className="flex p-2 w-20 absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                            onClick={(event) => {
                                                                setOpenFilter(true)
                                                            }}>
                                                            <div>Filter</div>
                                                            <img className="ml-2" src="/img/filter-icon.png" />
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {
                                                families
                                                    .filter((val) => {
                                                        if (searchText.trim() === "") {

                                                            return val;
                                                        }
                                                        if (val.name.toLowerCase().includes(searchText.toLowerCase())) {

                                                            return val;
                                                        }
                                                        return "";
                                                    })
                                                    .map((card) => (
                                                        <Link
                                                            href={'job_families/' + card.id}>
                                                            <a>
                                                                <div key={card.name} className="group bg-white overflow-hidden shadow hover:shadow-xl rounded-lg relative duration-500"
                                                                    style={{ backgroundImage: `url(${card.image})`, height: '200px', }}
                                                                >
                                                                    {/* <img src="/img/bg_vertical.png" style={{ position: 'absolute', bottom: '0px' }} /> */}
                                                                    <div className="absolute h-3/6 group-hover:h-full w-full bottom-0 bg-gradient-to-t from-lblue via-lblue to-transparent duration-500">
                                                                    </div>
                                                                    <div className="p-5 absolute bottom-0">
                                                                        <div className="text-base text-white w-full font-medium" >{card.name}</div>
                                                                        <div className="mt-2 w-12 h-1 rounded bg-lyellow group-hover:w-full duration-500"></div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </main>
                </div>


            </div >

            <Transition.Root show={openFilter} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={openFilter}
                    onClose={setOpenFilter}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-gray-900 text-center">
                                            Sort
                                        </Dialog.Title>
                                        <div className="mt-2">

                                            <div
                                                onClick={(e) => { setSelectedSort('A-Z') }}
                                                className={classNames(
                                                    selectedSort == 'A-Z' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'A-Z' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'A-Z' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        A-Z
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('Z-A') }}
                                                className={classNames(
                                                    selectedSort == 'Z-A' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'Z-A' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'Z-A' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        Z-A
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('MY_FITMENT') }}
                                                className={classNames(
                                                    selectedSort == 'MY_FITMENT' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'MY_FITMENT' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'MY_FITMENT' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        My Fitment Career
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={clearFilter}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={applyFilter}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
    const { order = "" } = context.query
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const familiesClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const families = await queryGraph(familiesClient, {}, SchemeGetCareerFamilies)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return [];
        });

    if (order == 'A-Z') {
        families.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        })
    } else if (order == 'Z-A') {
        families.sort((a, b) => {
            if (a.name > b.name) return -1
            if (a.name < b.name) return 1
            return 0
        })
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
        props: { families, profile }
    }
}


