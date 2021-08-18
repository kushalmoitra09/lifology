import Link from 'next/link'
import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    MenuAlt1Icon,
} from '@heroicons/react/outline'
import {
    ChevronDownIcon,
    SearchIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const HeaderLayout = ({ setSidebarOpen, profile, title }) => {
    const router = useRouter()
    return (
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none shadow" >
            <button
                className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="flex-1 flex font-bold self-center">
                    <div >
                        <h2 className="sm:text-xl text-sm">{title}</h2>

                    </div>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    {/* <button className="mr-2 bg-white p-3 lg:p-3 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none  lg:rounded-md lg:hover:bg-gray-200 lg:bg-gray-100 duration-500">
                        <span className="sr-only">Search</span>
                        <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button className="mr-2 bg-white p-3 lg:p-3 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none  lg:rounded-md lg:hover:bg-gray-200 lg:bg-gray-100 duration-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        {({ open }) => (
                            <>
                                <div>
                                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm outline-none focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-gray-200 lg:bg-gray-100 duration-500">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={
                                                (profile.profile_image == null || profile.profile_image == "") ?
                                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" :
                                                    profile.profile_image
                                            }

                                            alt=""
                                        />
                                        <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                            <span className="sr-only">Open user menu for </span>{profile.name}
                                        </span>
                                        <ChevronDownIcon
                                            className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <Menu.Item>
                                            {({ active }) => (

                                                <Link
                                                    href={{
                                                        pathname: '/profile',
                                                    }}>
                                                    <a
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 flex'
                                                        )}
                                                    >
                                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="black">
                                                            <g>
                                                                <path
                                                                    id="path"
                                                                    d="M 12 22 C 9.349 22 6.804 20.946 4.929 19.071 C 3.054 17.196 2 14.651 2 12 C 2 9.349 3.054 6.804 4.929 4.929 C 6.804 3.054 9.349 2 12 2 C 14.651 2 17.196 3.054 19.071 4.929 C 20.946 6.804 22 9.349 22 12 C 22 13.755 21.538 15.48 20.66 17 C 19.783 18.52 18.52 19.783 17 20.66 C 15.48 21.538 13.755 22 12 22 Z M 7 12 C 7 13.326 7.527 14.598 8.464 15.536 C 9.402 16.473 10.674 17 12 17 C 13.326 17 14.598 16.473 15.536 15.536 C 16.473 14.598 17 13.326 17 12 L 15 12 C 15 12.795 14.684 13.559 14.121 14.121 C 13.559 14.684 12.795 15 12 15 C 11.205 15 10.441 14.684 9.879 14.121 C 9.316 13.559 9 12.795 9 12 Z"
                                                                    strokeWidth="1" />
                                                            </g>
                                                        </svg>
                                                        Profile
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href='/bookmarks'>
                                                    <a
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 flex'
                                                        )}
                                                    >
                                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="black">
                                                            <g>
                                                                <path fill="none" d="M0 0h24v24H0z" />
                                                                <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
                                                            </g>
                                                        </svg>
                                                        Bookmarks
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={{
                                                        pathname: '/career_explorer/career_video/bookmark',
                                                    }}

                                                >
                                                    <a
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 flex hover:bg-gray-200'
                                                        )}
                                                    >
                                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="black">
                                                            <g>
                                                                <path fill="none" d="M0 0H24V24H0z" />
                                                                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.536 4 7.332 5.114 5.865 6.865L8 9H2V3l2.447 2.446C6.28 3.336 8.984 2 12 2zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z" />
                                                            </g>
                                                        </svg>
                                                        Watch Later
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        {/* <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="#">
                                                    <a
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 flex'
                                                        )}
                                                    >
                                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="black">
                                                            <g>
                                                                <path fill="none" d="M0 0h24v24H0z" />
                                                                <path d="M12 7a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3.5l-1.323 2.68-2.957.43 2.14 2.085-.505 2.946L12 17.25l2.645 1.39-.505-2.945 2.14-2.086-2.957-.43L12 10.5zm1-8.501L18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049L13 2zm-2 0v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2l5-.001z" />
                                                            </g>
                                                        </svg>
                                                        Subscription
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item> */}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={{
                                                        pathname: '/aboutus',
                                                    }}>
                                                    <a
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 flex'
                                                        )}
                                                    >

                                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="black">
                                                            <g>
                                                                <path fill="none" d="M0 0h24v24H0z" />
                                                                <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                            </g>
                                                        </svg>
                                                        Settings
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                                                        router.push({
                                                            pathname: '/login',
                                                        })
                                                    }}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-yellow-400 flex'
                                                    )}
                                                >
                                                    <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill="#FFC400">
                                                        <g>
                                                            <path fill="none" d="M0 0h24v24H0z" />
                                                            <path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm4 9V8l-5 4 5 4v-3h6v-2H9z" />
                                                        </g>
                                                    </svg>
                                                    Logout
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default HeaderLayout
