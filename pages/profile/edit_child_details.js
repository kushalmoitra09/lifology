import { useState, useEffect } from 'react'


import { CheckIcon, SelectorIcon, ExclamationIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { mutateGraph, queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeEditProfile, SchemeGetGrades, SchemeGetProfile } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import classNames from '/helpers/classNames'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import ProgressBar from '../../components/ProgressBar'
import { Fragment } from 'react'
import MetaLayout from '../../components/MetaLayout'
import styles from '/styles/Signup.module.css'
import cookies from 'next-cookies'

export default function EditChildDetails({ profile, grades, token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [selectedGrade, setSelectedGrade] = useState(grades.find(g => g.grade == profile.child_details.grade))
    const [selectedStream, setSelectedStream] = useState(selectedGrade.streams.length == 0 ? {} : selectedGrade.streams[0])

    const genderList = [
        {
            id: 1,
            gender: 'Male'
        },
        {
            id: 2,
            gender: 'Female'
        },
        {
            id: 3,
            gender: 'Other'
        }
    ]

    const submit = async (event) => {
        event.preventDefault()
        setLoadingDialog(true)
        const client = new ApolloClient({
            uri: Constants.baseUrl + "/api/user",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        await mutateGraph(client,
            {
                profile_image: profile.profile_image,
                name: profile.name,
                email: profile.email,
                country_abbr: '91',
                country_code: profile.country_code,
                mobile_number: profile.mobile_number,
                child_name: event.target.name.value,
                gender: event.target.gender.value,
                grade: selectedGrade.grade,
                stream: profile.child_details.stream,
                school_name: event.target.schoolName.value,
                stream_id: profile.child_details.stream_id
            }, SchemeEditProfile)
            .then((res) => {
                console.log('Response' + res)
            }).catch((networkErr) => {
                console.log('error')
            });
        setLoadingDialog(false)
    }


    return (
        <>
            <MetaLayout title="Edit Child Details" description="Edit Child Details" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Profile / Edit Child Details" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto shadow  py-4 px-6  bg-white h-full">
                                <form onSubmit={submit}>
                                    <div className="flex flex-col">
                                        <div className="align-middle min-w-full overflow-x-auto  overflow-hidden sm:rounded-lg bg-white">
                                            <div className="">
                                                <div className="sm:flex h-full">

                                                    <div className="w-full">
                                                        <div className="pt-4 w-full float-right">
                                                            <div className="" >
                                                                <label className="text-black pb-2 block text-xl">Full Name</label>
                                                                <input id="name" name="name" type="text" placeholder="Juliana Dsoza"
                                                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500" defaultValue={profile.child_details.child_name} />
                                                            </div>
                                                            <Listbox value={selectedGrade} onChange={(grade) => {
                                                                setSelectedGrade(grade)
                                                            }}>
                                                                {({ open }) => (
                                                                    <>
                                                                        <div className="text-black pb-2 block text-xl mt-4">
                                                                            Grade
                                                                        </div>
                                                                        <div className="mt-2 relative">
                                                                            <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-200 " >
                                                                                <span className="block truncate">{selectedGrade.grade}</span>
                                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                                                                    {grades.map((grade) => (
                                                                                        <Listbox.Option
                                                                                            key={grade.id}
                                                                                            className={({ active }) =>
                                                                                                classNames(
                                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                                )
                                                                                            }
                                                                                            value={grade}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                                        {grade.grade}
                                                                                                    </span>

                                                                                                    {selected ? (
                                                                                                        <span
                                                                                                            className={classNames(
                                                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                                            )}
                                                                                                        >
                                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                        </span>
                                                                                                    ) : null}
                                                                                                </>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    ))}
                                                                                </Listbox.Options>
                                                                            </Transition>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </Listbox>

                                                            <div>
                                                                <label className="text-black pb-2 block text-xl mt-4">School Name</label>
                                                                <input
                                                                    id="schoolName"
                                                                    name="schoolName"
                                                                    type="name"
                                                                    autoComplete="name"
                                                                    placeholder="School"
                                                                    required
                                                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500 "
                                                                    defaultValue={profile.child_details.school_name}
                                                                />
                                                            </div>

                                                            <div>
                                                                <h2 className="mt-4 font-semibold text-gray-900 text-align-center text-base">Gender</h2>
                                                                <div>
                                                                    {
                                                                        genderList.map(g => (
                                                                            <label htmlFor={g.gender} className={styles.radioField}>
                                                                                {
                                                                                    g.gender.toLowerCase() == profile.child_details.gender.toLowerCase() ?
                                                                                        <input type="radio" id={g.gender} name="gender" tabIndex={g.id} value={g.gender} defaultChecked="true" />
                                                                                        :
                                                                                        <input type="radio" id={g.gender} name="gender" tabIndex={g.id} value={g.gender} />
                                                                                }

                                                                                <span>{g.gender}</span>
                                                                            </label>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense w-min" style={{ width: 'fit-content' }}>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                                    style={{ width: 'fit-content', backgroundColor: '#085CA4' }}
                                                >
                                                    Save Profile
                                                </button>
                                                <button
                                                    onClick={(event) => {
                                                        router.back()
                                                    }}
                                                    type="button"
                                                    className="mt-3 ml-auto inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                    style={{ width: 'fit-content', color: '#085CA4', borderColor: '#085CA4' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </main>
                </div>


            </div >

            <Transition.Root show={loadingDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={loadingDialog} onClose={setLoadingDialog}>
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
                            <div
                                className="w-min inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6">

                                <div className="sm:flex sm:items-start m-4">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {/* <Step /> */}
                                        <ProgressBar />
                                    </div>
                                    <button className="h-0 w-0 overflow-hidden" />

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
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const gradeClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/auth",
        cache: new InMemoryCache(),
    });
    const grades = await queryGraph(gradeClient, {}, SchemeGetGrades)
        .then((res) => {
            return res.grades;
        }).catch((networkErr) => {
            return [];
        });
    console.log(grades)
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    console.log(profile.child_details.gender)
    return {
        props: { profile, grades, token }
    }
}