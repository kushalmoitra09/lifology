import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    XIcon,
} from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavigationLayout = ({ index, sidebarOpen, setSidebarOpen , isPackagePurhased }) => {
    const router = useRouter()
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 flex z-40 lg:hidden"
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700"
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="/img/logoWhite.png"
                                    alt="Lifology Logo"
                                />
                                <span className="text-white self-center font-bold pl-4 text-xl tracking-wide">LIFOLOGY</span>
                            </div>
                            <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar"
                            >
                                <div className="px-2 space-y-1">
                                    <Link
                                        href="/">
                                        <a
                                            className={classNames(
                                                index == 1 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 1 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 1 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.314a1 1 0 0 1 .38-.785l8-6.311a1 1 0 0 1 1.24 0l8 6.31a1 1 0 0 1 .38.786V20zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7z" />
                                                </g>
                                            </svg>
                                            Home
                                        </a>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: '/my_child',
                                        }}>
                                        <a
                                            className={classNames(
                                                index == 2 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 2 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 2 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm10 2v5h3V7h-3zm-2 0H9v5h6V7zM7 7H4v5h3V7zm2-4v2h6V3H9z" />
                                                </g>
                                            </svg>
                                            My Child
                                        </a>
                                    </Link>
                                    {/* <Link
                                        href="/services">
                                        <a
                                            className={classNames(
                                                index == 3 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 3 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 3 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                                </g>
                                            </svg>
                                            Services
                                        </a>
                                    </Link> */}
                                    <Link
                                        href={{
                                            pathname: '/career_explorer',
                                        }}>
                                        <a
                                            className={classNames(
                                                index == 4 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 4 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 4 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zm-5-9V7H8v2h8z" />
                                                </g>
                                            </svg>
                                            Career Explorer
                                        </a>
                                    </Link>
                                    {/* <Link
                                        href="#">
                                        <a
                                            href="#"
                                            className={classNames(
                                                index == 5 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 5 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 5 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                                                    <path d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm8.5-10C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2z" />
                                                </g>
                                            </svg>
                                            Lifology Hub
                                        </a>
                                    </Link> */}
                                    <Link
                                        href="/coaching">
                                        <a
                                            className={classNames(
                                                index == 6 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={index == 6 ? 'page' : undefined}
                                        >

                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 6 ? 'white' : 'black'}>
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                                </g>
                                            </svg>
                                            Coaching
                                        </a>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:flex lg:flex-shrink-0 shadow bg-white">
                <div className="flex flex-col w-64">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 ml-auto mr-auto">
                            <img
                                className="h-8 w-auto"
                                src="/img/logoBlue.png"
                                alt="Lifology Logo"
                            />
                            <span className="text-white self-center font-bold pl-2 text-xl tracking-wide text-lblue">LIFOLOGY</span>
                        </div>
                        <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto relative" aria-label="Sidebar">
                            <div className="px-4 space-y-1 mt-4">
                                
                                <Link
                                    href="/">
                                    <a
                                        className={classNames(
                                            index == 1 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 1 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.314a1 1 0 0 1 .38-.785l8-6.311a1 1 0 0 1 1.24 0l8 6.31a1 1 0 0 1 .38.786V20zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7z" />
                                            </g>
                                        </svg>
                                        Home
                                    </a>
                                </Link>
                                <Link
                                    href={{
                                        pathname: '/my_child',
                                    }}>
                                    <a
                                        className={classNames(
                                            index == 2 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 2 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm10 2v5h3V7h-3zm-2 0H9v5h6V7zM7 7H4v5h3V7zm2-4v2h6V3H9z" />
                                            </g>
                                        </svg>
                                        My Child
                                    </a>
                                </Link>
                                {/* <Link
                                    href="/services">
                                    <a
                                        className={classNames(
                                            index == 3 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 3 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                            </g>
                                        </svg>
                                        Services
                                    </a>
                                </Link> */}
                                <Link
                                    href={{
                                        pathname: '/career_explorer',
                                    }}>
                                    <a
                                        className={classNames(
                                            index == 4 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 4 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zm-5-9V7H8v2h8z" />
                                            </g>
                                        </svg>
                                        Career Explorer
                                    </a>
                                </Link>
                                {/* <Link
                                    href="#">
                                    <a
                                        className={classNames(
                                            index == 5 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 5 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                                                <path d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm8.5-10C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2z" />
                                            </g>
                                        </svg>
                                        Lifology Hub
                                    </a>
                                </Link> */}
                                <Link
                                    href="/coaching">
                                    <a
                                        className={classNames(
                                            index == 6 ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100',
                                            "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                        )}
                                    >
                                        <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 6 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                            </g>
                                        </svg>
                                        Coaching
                                    </a>
                                </Link>
                            </div>
                            <div className="absolute mt-6 pt-6 bottom-0 border-0">
                                <div className="px-2 space-y-1 text-center">
                                    <span className="px-2 bg-white text-center text-gray-900 font-bold">Download Our App</span>
                                    <a target="_blank" href="https://play.google.com/store/apps/details?id=com.app.lifology" >
                                        <img className="mt-4 ml-auto mr-auto w-3/5" src="/img/play-store.png" />
                                    </a>
                                    {/* <a href="#">
                                        <img className="mt-4 ml-auto mr-auto w-3/5" src="/img/app-store.png" />
                                    </a> */}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavigationLayout
