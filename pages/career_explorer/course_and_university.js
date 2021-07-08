import { Fragment, useRef, useState } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import {
    ClockIcon,
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
    ExclamationIcon,
    SelectorIcon
} from '@heroicons/react/outline'
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetAllUniversity, SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetUniversityCountry } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import styles from '../../styles/Magazine.module.css'
import MetaLayout from '../../components/MetaLayout'
import Link from 'next/link'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const cards = [
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    // More items...
]


export default function CourceAndUniversity({ profile, countries, universities, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const [openFilter, setOpenFilter] = useState(false)

    const [selectedCountry, setSelectedCountry] = useState({})

    return (
        <>
            <MetaLayout title="Magazine" description="Magazine" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Course & University" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-lblue-light">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
                                                <img src="/img/course-university-header.png" style={{ height: "250px" }} />
                                            </div>
                                            <div className="w-full self-center text-right p-4">
                                                <div className="font-bold text-xl text-white" >Explore Universities & their Courses</div>
                                                <div className="mt-4 text-sm text-white" >I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can </div>
                                                <div className="mt-2 text-sm text-white">Write Anywhere, Anytime, About Anything</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <ul className={styles.topicGroup}>
                                                {countries.map((c) => (
                                                    <li key={c.country} className="float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer bg-lgrey-bg border border-lgrey-border duration-500 hover:bg-lblue hover:text-white">{c.country}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8" >
                                                <div className="self-center font-medium text-base w-full">
                                                    <h2 className="text-xl ">Explore Lists of all Universities</h2>
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

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                                            {universities.map((u) => (
                                                <Link href={{
                                                    pathname: 'course_and_university/' + u.id,
                                                    query: { token: authToken }
                                                }}>
                                                    <a>
                                                        <div className="h-full bg-white overflow-hidden shadow rounded p-4 hover:shadow-xl duration-500">
                                                            <img className="rounded-2xl w-full ml-auto mr-auto object-contain" src={Constants.baseUrlImage + '/' + u.logo} />
                                                            <div className="top-0 mt-4 text-center">
                                                                <div className="text-sm font-bold">{u.name}</div>
                                                                <div className="text-xs mt-2">{u.city}, {u.state}, {u.country}</div>
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

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center">
                                            Filter
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <ul className={styles.topicGroup}>
                                                {countries.map((c) => (
                                                    <li key={c.country} className="float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer bg-lgrey-bg border border-lgrey-border duration-500 hover:bg-lblue hover:text-white">{c.country}</li>
                                                ))}
                                            </ul>

                                            <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                                {({ open }) => (
                                                    <>
                                                        <div className="mt-1 relative mt-2">
                                                            <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                                <span className={classNames(selectedCountry.country ? '' : 'text-gray-400', "block truncate")}>{selectedCountry.country ? selectedCountry.country : 'Country'}</span>
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
                                                                                    key={country.country}
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
                                                                                                {country.country}
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

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={() => setOpenFilter(false)}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={() => setOpenFilter(false)}
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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const countries = await queryGraph(careerClient, {}, SchemeGetUniversityCountry)
        .then((res) => {
            return res.universityCountry
        }).catch((networkErr) => {
            return [];
            // console.log(networkErr);
        });
    const universities = await queryGraph(careerClient, {}, SchemeGetAllUniversity)
        .then((res) => {
            return res.allUniversity[0].university
        }).catch((networkErr) => {
            return []
        });

    console.log(countries);

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
        props: { profile, countries, universities, token }
    }
}


