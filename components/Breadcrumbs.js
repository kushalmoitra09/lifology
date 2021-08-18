import React from 'react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import classNames from '/helpers/classNames'


const Breadcrumbs = ({ pages }) => {
    return (
        <div className="shadow m-4 px-4 py-3 rounded-md  bg-white">
            <ol className="flex items-center space-x-4">
                <li>
                    <Link href={'/'}>
                        <a>
                            <div className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </div>
                        </a>
                    </Link>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <Link
                                href={page.href}>
                                <a
                                    className={
                                        classNames("ml-4 text-sm font-medium hover:text-gray-700", page.current ? 'text-black' : 'text-gray-500')
                                    }
                                    aria-current={page.current ? 'page' : undefined}
                                >
                                    {page.name}
                                </a>
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Breadcrumbs
