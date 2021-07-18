import { useState } from 'react'
import {
    BookmarkIcon
} from '@heroicons/react/outline'
import {
    SearchIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeGetUniversity } from '../../../helpers/GraphQLSchemes'

export default function University({ profile, university, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <MetaLayout title={university.name} description={university.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Course & University / University Details" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8 self-center">
                                                        <img className="object-contain " src={Constants.baseUrlImage + '/' + university.logo} style={{ maxHeight: '12rem', maxWidth: '12rem' }} />
                                                    </div>
                                                    <div className="w-full self-center text-left">
                                                        <div className="flex text-xs relative">
                                                            <div className="absolute left-0">
                                                                <div className="bg-gray-200 px-4 py-2 text-xs rounded-full cursor-pointer duration-500 hover:text-white hover:bg-lblue">University</div>
                                                            </div>

                                                            <div className="py-2 flex items-center absolute right-0">
                                                                <BookmarkIcon className="w-5 h-5 mr-2" />
                                                                Add to bookmark
                                                            </div>

                                                        </div>

                                                        <div className="font-bold text-xl mt-12" >{university.name}</div>
                                                        <div className="mt-2 text-sm " >{university.description}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8 self-center" >
                                                        <div className="self-center font-medium text-base w-full">
                                                            <h2 className="text-base">Course's Offered</h2>
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <form className="w-full flex md:ml-0" action="#" method="GET">
                                                            <label htmlFor="search_field" className="sr-only">
                                                                Search
                                                            </label>
                                                            <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-lgrey">
                                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                                </div>
                                                                <input
                                                                    id="search_field"
                                                                    name="search_field"
                                                                    className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                                    placeholder="Search Course"
                                                                    type="search"
                                                                />
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    {university.career_courses.map((u) => (
                                                        <div className="rounded shadow p-4 my-4 hover:shadow-xl duration-500">
                                                            <div className="flex">
                                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                                                    <img src="/img/university_img.jpg" alt="University" className="w-20 h-20 rounded-lg absolute top-0 left-0 bottom-0 right-0 object-cover" />
                                                                </div>
                                                                <div className="self-center w-full">
                                                                    <div className="flex">
                                                                        <div style={{ width: '75%' }}>
                                                                            <div className="ml-4">
                                                                                <h4 className="p-0 text-base font-bold" >{u.name}</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: '25%' }}>
                                                                            <div className="">
                                                                                <svg
                                                                                    className="inline-block align-middle h-4"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 8.614 14.187 L 8.614 16.214 L 11.147 16.214 L 11.147 18.241 L 13.174 18.241 L 13.174 16.214 L 14.187 16.214 C 14.859 16.214 15.504 15.947 15.978 15.472 C 16.453 14.997 16.721 14.352 16.721 13.681 C 16.721 13.009 16.453 12.364 15.978 11.889 C 15.504 11.414 14.859 11.147 14.187 11.147 L 10.134 11.147 C 10.004 11.141 9.88 11.085 9.79 10.991 C 9.7 10.897 9.65 10.771 9.65 10.64 C 9.65 10.51 9.7 10.384 9.79 10.29 C 9.88 10.196 10.004 10.14 10.134 10.134 L 15.707 10.134 L 15.707 8.107 L 13.174 8.107 L 13.174 6.08 L 11.147 6.08 L 11.147 8.107 L 10.134 8.107 C 9.462 8.107 8.817 8.374 8.343 8.849 C 7.868 9.324 7.601 9.969 7.601 10.64 C 7.601 11.312 7.868 11.957 8.343 12.432 C 8.817 12.907 9.462 13.174 10.134 13.174 L 14.187 13.174 C 14.297 13.169 14.406 13.2 14.496 13.263 C 14.587 13.325 14.655 13.415 14.69 13.52 C 14.725 13.624 14.725 13.737 14.69 13.841 C 14.655 13.946 14.587 14.036 14.496 14.098 C 14.406 14.161 14.297 14.192 14.187 14.187 Z"
                                                                                        fill="#30c702"
                                                                                        strokeWidth="1" />
                                                                                </svg>
                                                                                <span className="inline-block text-sm align-middle ml-2" >$ {u.fee}</span>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex mt-2">
                                                                        <div style={{ width: '75%' }}>
                                                                            <div className="ml-4">
                                                                                <div>
                                                                                    <svg
                                                                                        className="inline-block align-middle h-4"
                                                                                        viewBox="0 0 24 24">
                                                                                        <path
                                                                                            id="path"
                                                                                            d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 13.174 12.16 L 13.174 7.094 L 11.147 7.094 L 11.147 14.187 L 17.227 14.187 L 17.227 12.161 Z"
                                                                                            fill="#ffc400"
                                                                                            strokeWidth="1" />
                                                                                    </svg>
                                                                                    <span className="inline-block align-middle ml-2 text-sm">{u.duration}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: '25%' }}>
                                                                            <div>
                                                                                <svg
                                                                                    className="inline-block align-middle h-4"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 17.227 19.254 L 19.254 19.254 L 19.254 11.147 L 13.174 11.147 L 13.174 19.254 L 15.201 19.254 L 15.201 13.174 L 17.227 13.174 Z M 3.04 19.254 L 3.04 4.053 C 3.04 3.875 3.087 3.7 3.176 3.546 C 3.265 3.392 3.393 3.264 3.547 3.175 C 3.701 3.087 3.876 3.04 4.054 3.04 L 18.241 3.04 C 18.51 3.04 18.767 3.147 18.957 3.337 C 19.147 3.527 19.254 3.784 19.254 4.053 L 19.254 9.12 L 21.281 9.12 L 21.281 19.254 L 22.294 19.254 L 22.294 21.281 L 2.027 21.281 L 2.027 19.254 Z M 7.093 11.147 L 7.093 13.174 L 9.121 13.174 L 9.121 11.147 Z M 7.093 15.2 L 7.093 17.227 L 9.121 17.227 L 9.121 15.2 Z M 7.093 7.093 L 7.093 9.12 L 9.121 9.12 L 9.121 7.093 Z"
                                                                                        fill="#000000"
                                                                                        strokeWidth="1" />
                                                                                </svg>
                                                                                <span className="inline-block align-middle ml-2 text-sm">TOEFL: 100</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    University Video
                                                </h2>
                                                <img className="rounded mt-2" src="/img/test.png" />
                                            </div>
                                            <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="flex ">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#02c77d"
                                                            strokeWidth="1" />
                                                        <path
                                                            id="path_1"
                                                            d="M 36.101 35.328 L 28.001 43.428 L 19.901 35.328 C 18.066 33.493 16.908 31.089 16.617 28.51 C 16.326 25.932 16.92 23.329 18.301 21.132 C 19.681 18.935 21.768 17.271 24.217 16.414 C 26.666 15.557 29.336 15.557 31.785 16.414 C 34.234 17.271 36.321 18.935 37.701 21.132 C 39.082 23.329 39.676 25.932 39.385 28.51 C 39.094 31.089 37.936 33.493 36.101 35.328 Z M 28.001 29.772 C 28.676 29.772 29.324 29.504 29.801 29.026 C 30.279 28.549 30.547 27.901 30.547 27.226 C 30.547 26.551 30.279 25.903 29.801 25.426 C 29.324 24.948 28.676 24.68 28.001 24.68 C 27.326 24.68 26.678 24.948 26.201 25.426 C 25.723 25.903 25.455 26.551 25.455 27.226 C 25.455 27.901 25.723 28.549 26.201 29.026 C 26.678 29.504 27.326 29.772 28.001 29.772 Z"
                                                            fill="#ffffff"
                                                            strokeWidth="1" />
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Location</div>
                                                        <div className="mt-1 text-sm font-bold " >{university.city}, {university.state}, {university.country}</div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#79d6fb"
                                                            strokeWidth="1" />
                                                        <path
                                                            id="path_1"
                                                            d="M 35.667 16 L 41 16 C 41.234 16 41.464 16.061 41.667 16.178 C 41.87 16.295 42.038 16.464 42.155 16.666 C 42.272 16.869 42.334 17.099 42.334 17.333 L 42.334 38.667 C 42.334 39.02 42.193 39.36 41.944 39.61 C 41.694 39.859 41.354 40 41.001 40 L 17.001 40 C 16.767 40 16.537 39.939 16.334 39.822 C 16.131 39.705 15.963 39.536 15.846 39.334 C 15.729 39.131 15.667 38.901 15.667 38.667 L 15.667 17.333 C 15.667 17.099 15.729 16.869 15.846 16.666 C 15.963 16.464 16.131 16.296 16.334 16.179 C 16.536 16.062 16.766 16 17 16 L 22.334 16 L 22.334 13.333 L 25.001 13.333 L 25.001 16 L 33.001 16 L 33.001 13.333 L 35.667 13.333 Z M 18.333 24 L 18.333 37.333 L 39.667 37.333 L 39.667 24 Z M 21 26.667 L 23.667 26.667 L 23.667 29.333 L 21 29.333 Z M 27.667 26.667 L 30.334 26.667 L 30.334 29.333 L 27.667 29.333 Z M 34.334 26.667 L 37.001 26.667 L 37.001 29.333 L 34.334 29.333 Z"
                                                            fill="#ffffff"
                                                            strokeWidth="1" />
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Founded</div>
                                                        <div className="mt-1 text-sm font-bold " >{university.established}</div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#ff0000"
                                                            strokeWidth="1" />
                                                        <g id="group">
                                                            <path
                                                                id="path_1"
                                                                d="M 40.161 33.714 L 40.161 25.064 L 38.531 25.607 L 38.531 33.714 C 38.023 33.885 37.581 34.211 37.269 34.646 C 36.956 35.082 36.787 35.604 36.786 36.14 L 36.786 40.503 C 36.786 40.719 36.872 40.927 37.025 41.079 C 37.177 41.232 37.385 41.318 37.601 41.318 L 41.092 41.318 C 41.308 41.318 41.516 41.232 41.668 41.079 C 41.821 40.927 41.907 40.719 41.907 40.503 L 41.907 36.14 C 41.906 35.604 41.737 35.081 41.424 34.646 C 41.111 34.211 40.669 33.885 40.161 33.714 Z M 27.232 28.86 L 19.332 26.228 L 19.332 31.777 C 19.332 31.993 19.418 32.2 19.571 32.353 C 21.051 33.833 22.894 34.897 24.916 35.439 C 26.937 35.981 29.066 35.981 31.087 35.439 C 33.109 34.897 34.952 33.833 36.432 32.353 C 36.585 32.2 36.671 31.993 36.671 31.777 L 36.671 26.228 L 28.771 28.86 C 28.271 29.026 27.732 29.026 27.232 28.86 Z"
                                                                fill="#000000"
                                                                strokeWidth="1" />
                                                            <path
                                                                id="path_2"
                                                                d="M 28.001 27.356 C 28.089 27.356 28.176 27.342 28.259 27.314 L 41.35 22.951 C 41.512 22.897 41.653 22.793 41.753 22.654 C 41.853 22.516 41.907 22.349 41.907 22.178 C 41.907 22.007 41.853 21.84 41.753 21.702 C 41.653 21.563 41.512 21.459 41.35 21.405 L 28.259 17.041 C 28.092 16.985 27.911 16.985 27.744 17.041 L 14.653 21.404 C 14.491 21.458 14.35 21.562 14.25 21.701 C 14.15 21.839 14.096 22.006 14.096 22.177 C 14.096 22.348 14.15 22.515 14.25 22.653 C 14.35 22.792 14.491 22.896 14.653 22.95 L 27.744 27.314 C 27.827 27.342 27.914 27.356 28.002 27.356 Z"
                                                                fill="#000000"
                                                                strokeWidth="1" />
                                                        </g>
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Type</div>
                                                        <div className="mt-1 text-sm font-bold " >{university.type}</div>
                                                    </div>
                                                </div>

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

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}

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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const university = await queryGraph(careerClient, { id: parseInt(context.params.id) }, SchemeGetUniversity)
        .then((res) => {
            return res.universityDetails[0]
        }).catch((networkErr) => {
            return {}
        })
    console.log(university)
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
        props: { profile, university, token }
    }
}


