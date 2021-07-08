import { Fragment, useState } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '../components/MetaLayout'

import { Listbox, Transition, Dialog } from '@headlessui/react'

import "react-multi-carousel/lib/styles.css";
import SettingNavigationLayout from '../components/SettingNavigationLayout'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const popularVideos = [
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    // More items...
]

const countries = [
    {
        id: 1,
        name: 'India'
    },
    {
        id: 2,
        name: 'UK'
    },
    {
        id: 3,
        name: 'UAE'
    },
    {
        id: 4,
        name: 'QATAR'
    },
    {
        id: 5,
        name: 'KUWAIT'
    },
]

const queries = [
    {
        id: 1,
        name: 'Purchase Related Query'
    },
    {
        id: 2,
        name: 'Purchase Related Query'
    }
];
const userTypes = [
    {
        id: 1,
        name: 'I\'m Student'
    },
    {
        id: 1,
        name: 'I\'m Parent'
    }
];


export default function ContactUs({ profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const [selectedCountry, setSelectedCountry] = useState({})
    const [selectedQuery, setSelectedQuery] = useState({})
    const [selectedUserType, setSelectedUserType] = useState({})
    const index = 4;
    return (
        <>
            <MetaLayout title="Contact Us" description="Contact Us" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / Contact Us" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <SettingNavigationLayout index="4" authToken={token} />
                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="bg-indigo-700 rounded w-full p-4">
                                                    <h2 id="applicant-information-title" className="text-base font-bold text-white w-full">
                                                        Quick Contact
                                                    </h2>
                                                    <div className="text-sm text-white w-full">
                                                        If you have any questions simply use the following contact details.
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 font-normal" >
                                                        <div>
                                                            <div className="flex">
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    fill="white"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M 18.859 17.272 L 11.999 23.792 L 5.139 17.273 C 3.941 16.159 3.072 14.737 2.63 13.162 C 2.187 11.587 2.187 9.92 2.63 8.345 C 3.072 6.77 3.941 5.348 5.139 4.234 C 7.001 2.499 9.454 1.533 11.998 1.533 C 14.543 1.533 16.996 2.499 18.858 4.234 C 20.056 5.348 20.925 6.77 21.367 8.345 C 21.81 9.92 21.81 11.587 21.367 13.162 C 20.925 14.737 20.056 16.159 18.858 17.273 Z M 11.999 14.851 C 13.114 14.878 14.195 14.462 15.003 13.693 C 15.811 12.925 16.281 11.866 16.31 10.751 C 16.281 9.636 15.811 8.577 15.003 7.809 C 14.195 7.04 13.114 6.624 11.999 6.651 C 10.884 6.624 9.803 7.04 8.995 7.809 C 8.187 8.577 7.717 9.636 7.688 10.751 C 7.717 11.866 8.187 12.925 8.995 13.693 C 9.803 14.462 10.884 14.878 11.999 14.851 Z M 11.999 12.802 C 11.462 12.775 10.956 12.537 10.592 12.141 C 10.228 11.745 10.034 11.221 10.052 10.683 C 10.07 10.145 10.299 9.636 10.689 9.265 C 11.079 8.895 11.6 8.692 12.138 8.701 C 12.676 8.71 13.189 8.93 13.566 9.314 C 13.944 9.698 14.155 10.215 14.155 10.753 C 14.146 11.122 14.04 11.483 13.848 11.798 C 13.655 12.113 13.383 12.372 13.058 12.548 C 12.734 12.724 12.368 12.812 11.999 12.802 Z"
                                                                        strokeWidth="1" />
                                                                </svg>
                                                                <div className="text-xs ml-2 text-white">
                                                                    211-3, 2nd Floor, B-hub, Mar Ivanios Vidyanagar,<br></br> Nalanchira, Thiruvananthapuram, Kerala 695015
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center mt-2">
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    fill="white"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M 1 0 L 19 0 C 19.265 0 19.52 0.105 19.707 0.293 C 19.895 0.48 20 0.735 20 1 L 20 17 C 20 17.265 19.895 17.52 19.707 17.707 C 19.52 17.895 19.265 18 19 18 L 1 18 C 0.735 18 0.48 17.895 0.293 17.707 C 0.105 17.52 0 17.265 0 17 L 0 1 C 0 0.735 0.105 0.48 0.293 0.293 C 0.48 0.105 0.735 0 1 0 Z M 10.06 8.683 L 3.648 3.238 L 2.353 4.762 L 10.073 11.317 L 17.654 4.757 L 16.346 3.244 L 10.061 8.683 Z"
                                                                        strokeWidth="1" />
                                                                </svg>
                                                                <div className="text-xs ml-2 text-white">
                                                                    info@lifology.com
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center mt-2">
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    fill="white"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M 12 22 C 9.349 22 6.804 20.946 4.929 19.071 C 3.054 17.196 2 14.651 2 12 C 2 9.349 3.054 6.804 4.929 4.929 C 6.804 3.054 9.349 2 12 2 C 14.651 2 17.196 3.054 19.071 4.929 C 20.946 6.804 22 9.349 22 12 C 22 13.755 21.538 15.48 20.66 17 C 19.783 18.52 18.52 19.783 17 20.66 C 15.48 21.538 13.755 22 12 22 Z M 18.355 15.952 L 18.355 15.852 C 18.355 14.93 18.355 14.509 17.703 14.136 Q 17.389 13.958 17.058 13.811 C 16.669 13.672 16.339 13.405 16.12 13.055 Q 16.061 12.97 16.004 12.883 C 15.886 12.589 15.663 12.349 15.378 12.21 C 15.093 12.071 14.767 12.042 14.462 12.13 C 12.597 12.43 12.462 12.754 12.377 13.308 L 12.364 13.399 C 12.243 14.209 12.221 14.481 12.559 14.836 C 13.446 15.667 14.206 16.626 14.812 17.68 C 15.066 18.286 15.136 18.953 15.012 19.598 C 16.226 19.115 17.306 18.347 18.163 17.361 C 18.293 16.906 18.357 16.434 18.353 15.961 Z M 12 3.833 C 10.898 3.831 9.806 4.053 8.792 4.486 C 7.778 4.918 6.862 5.552 6.1 6.349 C 6.292 6.483 6.444 6.668 6.537 6.883 C 6.7 7.312 6.768 7.771 6.737 8.228 C 6.713 8.52 6.749 8.815 6.842 9.093 C 6.986 9.401 7.608 9.533 8.157 9.647 C 8.357 9.689 8.557 9.731 8.74 9.782 C 9.227 9.979 9.648 10.313 9.951 10.742 C 10.075 10.9 10.216 11.044 10.371 11.172 C 10.514 11.037 10.615 10.863 10.661 10.672 C 10.694 10.588 10.707 10.497 10.7 10.407 C 10.692 10.316 10.663 10.229 10.616 10.152 C 10.388 9.801 10.239 9.405 10.177 8.991 C 10.116 8.577 10.144 8.154 10.26 7.752 C 10.532 7.013 11.382 7.068 12.004 7.108 C 12.208 7.129 12.413 7.132 12.618 7.117 C 13.24 7.039 13.432 6.092 13.567 5.907 C 14.087 5.378 14.672 4.916 15.307 4.532 C 14.266 4.07 13.139 3.832 12 3.833 Z"
                                                                        strokeWidth="1" />
                                                                </svg>
                                                                <div className="text-xs ml-2 text-white">
                                                                    www.lifology.com
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex">
                                                                <svg fill="white"
                                                                    viewBox="0 0 18 18" width="16px" height="16px">
                                                                    <path
                                                                        d="M 18 13.42 L 18 16.956 C 18.001 17.209 17.905 17.454 17.732 17.639 C 17.56 17.825 17.323 17.938 17.07 17.956 C 16.633 17.986 16.276 18.002 16 18.002 C 13.191 18.002 10.432 17.262 7.999 15.858 C 5.567 14.454 3.547 12.433 2.143 10.001 C 0.739 7.568 0 4.809 0 2 Q 0 1.586 0.046 0.93 C 0.064 0.677 0.177 0.44 0.363 0.268 C 0.548 0.095 0.793 -0.001 1.046 0 L 4.58 0 C 4.704 -0.001 4.825 0.045 4.917 0.128 C 5.009 0.212 5.068 0.326 5.08 0.45 C 5.103 0.68 5.124 0.863 5.144 1.002 C 5.342 2.388 5.749 3.736 6.35 5 C 6.396 5.097 6.407 5.208 6.379 5.312 C 6.352 5.417 6.288 5.508 6.2 5.57 L 4.045 7.112 C 5.364 10.185 7.816 12.637 10.889 13.956 L 12.429 11.802 C 12.492 11.714 12.583 11.652 12.688 11.624 C 12.792 11.597 12.902 11.607 13 11.653 C 14.265 12.252 15.614 12.657 17 12.853 C 17.139 12.873 17.322 12.895 17.55 12.917 C 17.674 12.93 17.788 12.988 17.871 13.08 C 17.954 13.173 18 13.293 17.999 13.417 Z"
                                                                        strokeWidth="1" />
                                                                </svg>
                                                                <div className="ml-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                                    <div className="text-xs ml-1 text-white ">
                                                                        UK: +44 2039579867
                                                                    </div>

                                                                    <div className="text-xs ml-1 text-white">
                                                                        UAE: +971 43992221
                                                                    </div>

                                                                    <div className="text-xs ml-1 text-white">
                                                                        INDIA: +91 8111935000
                                                                    </div>
                                                                    <div className="text-xs ml-1 text-white">
                                                                        QATAR: +974 44812733
                                                                    </div>
                                                                    <div className="text-xs ml-1 text-white">
                                                                        KUWAIT: +965 98846557
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <h2 id="applicant-information-title" className="mt-4 text-base font-bold text-gray-900 rounded w-full">
                                                    Have some Questions?
                                                </h2>
                                                <p className="mt-2 text-sm">We are happy to answer your questions. Fill out the form and we’ll be in touch at the earliest.</p>
                                                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 font-normal" >

                                                    <div className="mt-1">
                                                        <input
                                                            id="name"
                                                            name="name"
                                                            type="name"
                                                            autoComplete="name"
                                                            placeholder="Your Full Name"
                                                            required
                                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                                        />
                                                    </div>
                                                    <div className="mt-1">
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            placeholder="Your Email"
                                                            required
                                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                                        />
                                                    </div>

                                                    <div className="mt-1">
                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            autoComplete="tel"
                                                            placeholder="Your Phone"
                                                            required
                                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                                        />
                                                    </div>

                                                    <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                                        {({ open }) => (
                                                            <>
                                                                <div className="mt-1 relative mt-2">
                                                                    <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                                        <span className={classNames(selectedCountry.name ? '' : 'text-gray-400', "block truncate")}>{selectedCountry.name ? selectedCountry.name : 'Country'}</span>
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        show={open}
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options
                                                                            static
                                                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                                        >
                                                                            {
                                                                                countries.length > 0 ?
                                                                                    countries.map((country) => (
                                                                                        <Listbox.Option
                                                                                            key={country.id}
                                                                                            className={({ active }) =>
                                                                                                classNames(
                                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                                )
                                                                                            }
                                                                                            value={country}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                                        {country.name}
                                                                                                    </span>


                                                                                                </>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    )) : <Listbox.Option
                                                                                        key='no_data'
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                            )
                                                                                        }
                                                                                        value="No Data">
                                                                                        <span className={classNames('font-normal', 'block truncate')}>
                                                                                            No Data
                                                                                        </span>
                                                                                    </Listbox.Option>
                                                                            }
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox>

                                                    <Listbox value={selectedQuery} onChange={setSelectedQuery}>
                                                        {({ open }) => (
                                                            <>
                                                                <div className="mt-1 relative mt-2">
                                                                    <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                                        <span className={classNames(selectedQuery.name ? '' : 'text-gray-400', "block truncate")}>{selectedQuery.name ? selectedQuery.name : 'Select Query Type'}</span>
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        show={open}
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options
                                                                            static
                                                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                                        >
                                                                            {
                                                                                queries.length > 0 ?
                                                                                    queries.map((query) => (
                                                                                        <Listbox.Option
                                                                                            key={query.id}
                                                                                            className={({ active }) =>
                                                                                                classNames(
                                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                                )
                                                                                            }
                                                                                            value={query}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                                        {query.name}
                                                                                                    </span>


                                                                                                </>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    )) : <Listbox.Option
                                                                                        key='no_data'
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                            )
                                                                                        }
                                                                                        value="No Data">
                                                                                        <span className={classNames('font-normal', 'block truncate')}>
                                                                                            No Data
                                                                                        </span>
                                                                                    </Listbox.Option>
                                                                            }
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox>

                                                    <Listbox value={selectedUserType} onChange={setSelectedUserType}>
                                                        {({ open }) => (
                                                            <>
                                                                <div className="mt-1 relative mt-2">
                                                                    <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                                        <span className={classNames(selectedUserType.name ? '' : 'text-gray-400', "block truncate")}>{selectedUserType.name ? selectedUserType.name : 'Select User Type'}</span>
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        show={open}
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options
                                                                            static
                                                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                                        >
                                                                            {
                                                                                userTypes.length > 0 ?
                                                                                    userTypes.map((userType) => (
                                                                                        <Listbox.Option
                                                                                            key={userType.id}
                                                                                            className={({ active }) =>
                                                                                                classNames(
                                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                                )
                                                                                            }
                                                                                            value={userType}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                                        {userType.name}
                                                                                                    </span>


                                                                                                </>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    )) : <Listbox.Option
                                                                                        key='no_data'
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                            )
                                                                                        }
                                                                                        value="No Data">
                                                                                        <span className={classNames('font-normal', 'block truncate')}>
                                                                                            No Data
                                                                                        </span>
                                                                                    </Listbox.Option>
                                                                            }
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox>


                                                    <div className="mt-1">
                                                        <input
                                                            id="question"
                                                            name="question"
                                                            type="name"
                                                            autoComplete="name"
                                                            placeholder="Write your questions here..."
                                                            required
                                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                                        />
                                                    </div>

                                                </div>
                                                <button
                                                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    Submit
                                                </button>
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
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

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


