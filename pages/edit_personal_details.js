import { useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { mutateGraph, queryGraph } from '../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeEditProfile, SchemeGetProfile } from '../helpers/GraphQLSchemes'
import Constants from '../helpers/Constants.js'
import useLocalStorage from '../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../components/NavigationLayout'
import HeaderLayout from '../components/HeaderLayout'
import ProgressBar from '../components/ProgressBar'
import { Fragment } from 'react'
import MetaLayout from '../components/MetaLayout'

export default function EditPersonalDetails({ profile, token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const submit = async (event) => {
        event.preventDefault()
        setLoadingDialog(true)
        var profilePic = "";
        if (event.target.file.files[0] != undefined) {
            var formData = new FormData()
            formData.append('file', event.target.file.files[0])
            await fetch(Constants.baseUrl + '/api/fileUploading', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    'Authorization': 'Bearer ' + authToken,
                    'Accept': 'application/json'
                })
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                profilePic = data.url
            }).catch(function (error) {
                console.log('error');
            })
        }

        console.log('ProfilePic ' + profilePic)
        console.log('Name ' + event.target.name.value)
        console.log('Email ' + event.target.email.value)
        console.log('country_abbr ' + profile.country_abbr)
        console.log('country_code ' + profile.country_code)
        console.log('mobile_number ' + profile.mobile_number)
        console.log('child_name ' + profile.child_details.child_name)
        console.log('gender ' + profile.child_details.gender)
        console.log('grade ' + profile.child_details.grade)
        console.log('stream ' + profile.child_details.stream)
        console.log('school_name ' + profile.child_details.school_name);
        console.log('stream_id ' + profile.child_details.stream_id)
        const client = new ApolloClient({
            uri: Constants.baseUrl + "/api/user",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + authToken,
            },
        });
        await mutateGraph(client,
            {
                profile_image: profilePic == "" ? profilePic.profile_image : profilePic,
                name: event.target.name.value,
                email: event.target.email.value,
                country_abbr: '91',
                country_code: profile.country_code,
                mobile_number: profile.mobile_number,
                child_name: profile.child_details.child_name,
                gender: profile.child_details.gender,
                grade: profile.child_details.grade,
                stream: profile.child_details.stream,
                school_name: '',
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
            <MetaLayout title="Profile" description="Profile" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Profile / Edit Profile" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto shadow  py-4 px-6  bg-white h-full">
                                <form onSubmit={submit}>
                                    <div className="flex flex-col">
                                        <div className="align-middle min-w-full overflow-x-auto  overflow-hidden sm:rounded-lg bg-white">
                                            <div className="">
                                                <div className="sm:flex h-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                        <div className="relative" style={{ width: '140px', height: '140px' }}>
                                                            <div className="absolute top-2/4 left-2/4 w-full h-full" style={{ transform: 'translate(-50%,-50%)' }}>
                                                                <img className="w-full h-full rounded-full" src={
                                                                    (profile.profile_image == null || profile.profile_image == "") ?
                                                                        "../img/upload.svg" : profile.profile_image
                                                                } alt="" />
                                                            </div>
                                                            <div style={{ transform: 'translate(-50%,-50%)', }} className="absolute top-2/4 left-2/4 w-full h-full bg-white bg-opacity-50">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 122 122"
                                                                    id="vector">
                                                                    <path
                                                                        id="path_2"
                                                                        d="M 52 68 L 70 68 L 70 70 L 52 70 Z M 62 54.828 L 62 66 L 60 66 L 60 54.828 L 53.929 60.9 L 52.515 59.486 L 61 51 L 69.485 59.485 L 68.071 60.9 L 62 54.83 Z"
                                                                        fill="#191919"
                                                                        stroke-width="1" />
                                                                </svg>
                                                            </div>
                                                            <input className="absolute left-0 top-0 w-full h-full opacity-0" id="file" name="file" type="file" />
                                                        </div>
                                                        <div className="pt-4 text-base text-center">Upload New Photo</div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="pt-4 w-full float-right">
                                                            <div className="pb-4" >
                                                                <label className="text-black pb-2 block text-xl">Full Name</label>
                                                                <input id="name" name="name" type="text" placeholder="Juliana Dsoza"
                                                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500" defaultValue={profile.name} />
                                                            </div>
                                                            <div className="pb-4" >
                                                                <label className="text-black pb-2 block text-xl">Phone Number</label>
                                                                <div className="relative" >
                                                                    <div className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center pointer-events-none rounded-l-full bg-gray-200 m-px"
                                                                    >
                                                                        <span className="text-gray-500 sm:text-sm">+91</span>
                                                                    </div>
                                                                    <input type="text" placeholder="9999999999"
                                                                        maxLength="10"
                                                                        className="rounded-full bg-gray-100 px-3 py-2 pl-14 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                                                        defaultValue={profile.mobile_number} />
                                                                    <div className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none m-px">
                                                                        <svg
                                                                            className="mr-2 align-text-bottom initial"
                                                                            viewBox="0 0 32 32"
                                                                            width="16" height="16"
                                                                        >
                                                                            <path
                                                                                id="path"
                                                                                d="M 16 0 C 11.758 0 7.686 1.687 4.686 4.686 C 1.687 7.686 0 11.758 0 16 C 0 20.242 1.687 24.314 4.686 27.314 C 7.686 30.313 11.758 32 16 32 C 20.242 32 24.314 30.313 27.314 27.314 C 30.313 24.314 32 20.242 32 16 C 32 11.758 30.313 7.686 27.314 4.686 C 24.314 1.687 20.242 0 16 0 Z"
                                                                                fill="#02c77d"
                                                                                strokeWidth="1" />
                                                                            <path
                                                                                id="path_1"
                                                                                d="M 14.046 18.686 L 21.805 10.926 L 22.999 12.12 L 14.046 21.073 L 8.674 15.701 L 9.868 14.508 Z"
                                                                                fill="#ffffff"
                                                                                strokeWidth="1" />
                                                                        </svg>
                                                                        <span className="self-center inline-block text-sm">Verified</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-black pb-2 block text-xl">Email</label>
                                                                <input id="email" name="email" type="email" placeholder="something@lifology.com"
                                                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500" defaultValue={profile.email} />
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

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
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
    const { token } = context.query;
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
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
    console.log(profile);
    return {
        props: { profile, token }
    }
}