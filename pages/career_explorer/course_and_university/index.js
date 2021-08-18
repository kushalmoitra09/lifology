import { Fragment, useEffect, useRef, useState } from 'react'
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
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetAllUniversity, SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetUniversityCity, SchemeGetUniversityState, SchemeGetUniversityCountry } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'
import MetaLayout from '/components/MetaLayout'
import Link from 'next/link'
import classNames from '/helpers/classNames'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { SchemeAllCareerPools, SchemeCareerFields, SchemeGetCountryState, SchemeGetUniversityPerPage } from '../../../helpers/GraphQLSchemes'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'

const pageItemCount = 32
export default function CourceAndUniversity({ profile, countries, universities, universitiesCount, page, countryFilter, stateFilter, poolIdFilter, fieldIdFilter, rankingFilter, q, careerPools, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [open, setOpen] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const [searchText, setSearchText] = useState(q)

    const ranks = [
        { name: 'Times Rank' },
        { name: 'QS Rank' },
        { name: 'Guardian Rank' }
    ]

    const [selectedRanks, setSelectedRanks] = useState(rankingFilter == "" ? {} : ranks.find(r => r.name == rankingFilter))
    const [selectedCareerPool, setSelectedCareerPool] = useState({})
    const [careerFields, setCareerFields] = useState([])
    const [selectedCareerField, setSelectedCareerField] = useState({})
    const [selectedCountry, setSelectedCountry] = useState({})
    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState({})
    useEffect(() => {
        updateCountry(countryFilter == '' ? {} : countries.find(c => c.country == countryFilter))
        updateCareerPools(poolIdFilter == -1 ? {} : careerPools.find(cp => cp.id == poolIdFilter))
    }, [])

    const totalPages = Math.ceil(universitiesCount / pageItemCount)

    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        {
            name: 'Course & University', href: '#', current: true
        },
    ]
    const query = {}
    if (countryFilter != null && countryFilter != "")
        query.country = countryFilter
    if (stateFilter != null && stateFilter != "")
        query.state = stateFilter
    if (poolIdFilter != null && poolIdFilter != -1)
        query.pool_id = poolIdFilter
    if (fieldIdFilter != null && fieldIdFilter != -1)
        query.field_id = fieldIdFilter
    if (rankingFilter != null && rankingFilter != "")
        query.ranking = rankingFilter
    if (q != null && q != "")
        query.q = q

    const applyFilter = (event) => {
        const queryParam = {}
        if (selectedCountry.country != null)
            queryParam.country = selectedCountry.country
        if (selectedState.state != null)
            queryParam.state = selectedState.state
        if (selectedCareerPool.id != null)
            queryParam.pool_id = selectedCareerPool.id
        if (selectedCareerField != null && selectedCareerField.id != null)
            queryParam.field_id = selectedCareerField.id
        if (selectedRanks.name != null && selectedRanks.name != "")
            queryParam.ranking = selectedRanks.name
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/course_and_university',
                query: queryParam,
            }
        )
        setOpenFilter(false)
    }

    const search = (event) => {
        const queryParam = {}
        if (selectedCountry.country != null)
            queryParam.country = selectedCountry.country
        if (selectedState.state != null)
            queryParam.state = selectedState.state
        if (selectedCareerPool.id != null)
            queryParam.pool_id = selectedCareerPool.id
        if (selectedCareerField != null && selectedCareerField.id != null)
            queryParam.field_id = selectedCareerField.id
        if (selectedRanks.name != null && selectedRanks.name != "")
            queryParam.ranking = selectedRanks.name
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/course_and_university',
                query: queryParam,
            }
        )
    }

    const clearFilter = (event) => {
        setSelectedCountry({})
        setSelectedState({})
        setSelectedCareerPool({})
        setSelectedCareerField({})
        setSelectedRanks({})
        router.replace(
            {
                pathname: '/career_explorer/course_and_university',
            }
        )
        setOpenFilter(false)
    }

    return (
        <>
            <MetaLayout title="Course & University" description="Course & University" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Course & University" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-lblue-light">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
                                                <img src="/img/course-university-header.png" style={{ height: "250px" }} />
                                            </div>
                                            <div className="w-full self-center text-right mr-9 p-4">
                                                <div className="font-bold text-xl text-white" >Explore Universities & their Courses</div>
                                                <div className="mt-4 text-sm text-white" >I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can </div>
                                                <div className="mt-2 text-sm text-white">Write Anywhere, Anytime, About Anything</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            <ul className={styles.topicGroup}>
                                                <li key="all" className={
                                                    classNames(
                                                        "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500",
                                                        (countryFilter == null || countryFilter == '') ? 'bg-lblue text-white' : 'bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white'
                                                    )}
                                                    onClick={(event) => {
                                                        setSearchText("")
                                                        setSelectedCountry({})
                                                        setSelectedState({})
                                                        setSelectedCareerPool({})
                                                        setSelectedCareerField({})
                                                        setSelectedRanks({})
                                                        router.push(
                                                            '/career_explorer/course_and_university'
                                                        )
                                                    }}
                                                >All</li>
                                                {countries.map((c) => (
                                                    <li key={c.country} className=
                                                        {classNames(
                                                            "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500",
                                                            (countryFilter == c.country) ? 'bg-lblue text-white' : 'bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white'
                                                        )}
                                                        onClick={(event) => {
                                                            updateCountry(c)
                                                            setSearchText("")
                                                            router.replace(
                                                                {
                                                                    pathname: '/career_explorer/course_and_university',
                                                                    query: {
                                                                        country: c.country,
                                                                    }
                                                                }
                                                            )
                                                        }}
                                                    >{c.country}</li>
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
                                                            className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent mr-10"
                                                            placeholder="Search University"
                                                            // type="search"
                                                            value={searchText}
                                                            onSubmit={search}
                                                            onChange={(e) => setSearchText(e.target.value)}

                                                        />
                                                        <button className="flex p-2 w-max absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                            onClick={search}>
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </div>

                                                    <button className="flex p-2 w-20 absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                        onClick={(event) => {
                                                            console.log(selectedCountry)
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
                                                <Link href={'/career_explorer/course_and_university/' + u.id}>
                                                    <a>
                                                        <div className="h-full bg-white overflow-hidden shadow rounded p-4 hover:shadow-xl duration-500">
                                                            <img className="w-full ml-auto mr-auto h-32 object-contain" src={Constants.baseUrlImage + '/' + u.logo} />
                                                            <div className="top-0 mt-4 text-center">
                                                                <div className="text-sm font-bold">{u.name}</div>
                                                                <div className="text-xs mt-2">{u.state ? u.state + ',' : ''} {u.country}</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>


                                        <nav
                                            className="bg-white flex items-center justify-between border-t border-gray-200 mt-4"
                                            aria-label="Pagination"
                                        >
                                            <div className="hidden sm:block mt-4">
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{(page - 1) * pageItemCount + 1}</span> to <span className="font-medium">{((page - 1) * pageItemCount + 32) > universitiesCount ? universitiesCount : ((page - 1) * pageItemCount + 32)}</span> of{' '}
                                                    <span className="font-medium">{universitiesCount}</span> results
                                                </p>
                                            </div>
                                            <div className="flex-1 flex justify-between sm:justify-end mt-4">
                                                {
                                                    previousPage >= 1 ? <Link href={{
                                                        pathname: '/career_explorer/course_and_university',
                                                        query: {
                                                            ...query,
                                                            page: previousPage,
                                                        }
                                                    }}>
                                                        <a
                                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                        >
                                                            Previous
                                                        </a>
                                                    </Link> : <></>
                                                }
                                                {
                                                    nextPage <= totalPages ? <Link href={{
                                                        pathname: '/career_explorer/course_and_university',
                                                        query: {
                                                            ...query,
                                                            page: nextPage,
                                                        }
                                                    }}>
                                                        <a
                                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                        >
                                                            Next
                                                        </a>
                                                    </Link> : <></>
                                                }

                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

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
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center">
                                            Filter
                                        </Dialog.Title>
                                        <div className="font-medium text-base mt-4">Career Pools</div>
                                        <Listbox value={selectedCareerPool} onChange={updateCareerPools}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedCareerPool.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerPool.name ? selectedCareerPool.name : 'Career Pools'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    careerPools.length > 0 ?
                                                                        careerPools.map((cp) => (
                                                                            <Listbox.Option
                                                                                key={cp.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={cp}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {cp.name}
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
                                        <div className="font-medium text-base mt-4">Career Fields</div>
                                        <Listbox value={selectedCareerField} onChange={setSelectedCareerField}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedCareerField && selectedCareerField.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerField && selectedCareerField.name ? selectedCareerField.name : 'Career Fields'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    careerFields.length > 0 ?
                                                                        careerFields.map((cf) => (
                                                                            <Listbox.Option
                                                                                key={cf.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={cf}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {cf.name}
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
                                        <div className="font-medium text-base mt-4">Ranking</div>
                                        <Listbox value={selectedRanks} onChange={setSelectedRanks} >
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedRanks.name ? '' : 'text-gray-400', "block truncate")}>{selectedRanks.name ? selectedRanks.name : 'Ranking'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    ranks.length > 0 ?
                                                                        ranks.map((r) => (
                                                                            <Listbox.Option
                                                                                key={r.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={r}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {r.name}
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
                                        <div className="font-medium text-base mt-4">Countries</div>
                                        <Listbox value={selectedCountry} onChange={updateCountry}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedCountry.country ? '' : 'text-gray-400', "block truncate")}>{selectedCountry.country ? selectedCountry.country : 'Country'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
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
                                        <div className="font-medium text-base mt-4">State</div>
                                        <Listbox value={selectedState} onChange={setSelectedState}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedState.state ? '' : 'text-gray-400', "block truncate")}>{selectedState.state ? selectedState.state : 'State'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    states.length > 0 ?
                                                                        states.map((state) => (
                                                                            <Listbox.Option
                                                                                key={state.state}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={state}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {state.state}
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
                                <div className="mt-4 sm:mt-4 sm:flex">
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
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )

    function updateCareerPools(careerPool) {
        setSelectedCareerPool(careerPool)
        setSelectedCareerField({})
        const careerClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/career",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (careerPool.id)
            queryGraph(careerClient, { pool_id: parseInt(careerPool.id) }, SchemeCareerFields)
                .then((res) => {
                    setCareerFields(res.careerFields)
                    setSelectedCareerField(fieldIdFilter == -1 ? {} : res.careerFields.find(cf => cf.id == fieldIdFilter))
                }).catch((networkErr) => {
                    console.log('error')
                })
    }

    function updateCountry(country) {
        setSelectedCountry(country)
        setSelectedState({})
        const careerClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/career",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (country != null && country.country != null)
            queryGraph(careerClient, { country: country.country }, SchemeGetCountryState)
                .then((res) => {
                    setStates(res.universityState)
                    setSelectedState(stateFilter == '' ? {} : res.universityState.find(s => s.state == stateFilter))
                }).catch((networkErr) => {
                    console.log('error')
                })
    }
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
    const { page = 1, country = "", state = "", pool_id = -1, field_id = -1, ranking = "", q = "" } = context.query
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
    const careerPools = await queryGraph(careerClient, {}, SchemeAllCareerPools)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return [];
        })
    const countries = await queryGraph(careerClient, {}, SchemeGetUniversityCountry)
        .then((res) => {
            return res.universityCountry
        }).catch((networkErr) => {
            return [];
        })
    const params = {
        limit: pageItemCount,
        page: parseInt(page),
    }
    if (country != "")
        params.country = country
    if (state != "")
        params.state = state
    if (pool_id != -1)
        params.pool_id = parseInt(pool_id)
    if (field_id != -1)
        params.field_id = parseInt(field_id)
    if (ranking != "")
        params.ranking = ranking
    if (q != "")
        params.search_keyword = q

    const universitiesData = await queryGraph(careerClient,
        params
        , SchemeGetUniversityPerPage)
        .then((res) => {
            return res.allUniversity[0]
        }).catch((networkErr) => {
            return {
                university: [],
                count: 0
            }
        })
    const universities = universitiesData ? universitiesData.university : []
    const universitiesCount = universitiesData ? universitiesData.count : 0

    const states = await queryGraph(careerClient, {}, SchemeGetUniversityState)
        .then((res) => {
            return res.universityState
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
        props: { profile, countries, universities, universitiesCount, page, states, countryFilter: country, stateFilter: state, poolIdFilter: pool_id, fieldIdFilter: field_id, rankingFilter: ranking, q, careerPools, token }
    }
}


