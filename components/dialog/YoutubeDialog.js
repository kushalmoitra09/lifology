import React from 'react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const YoutubeDialog = ({ url, showDialog, setShowDialog }) => {
    const videoType = getVideoType(url)
    return (
        <Transition.Root show={showDialog} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={showDialog} onClose={setShowDialog}>
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
                        <div className="group inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-4">
                            <div>
                                <div className="text-center">
                                    <div className="relative h-0" style={{ paddingBottom: '56.25%', paddingTop: '0px' }}>
                                        <iframe title="vimeo-player" src={videoType == 'youtube' ? url : videoType == 'vimeo' ? 'https://player.vimeo.com/video/' + getVimeoVideoId(url) : 'https://www.youtube.com/embed/PCwL3-hkKrg'} className="absolute rounded-lg top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen>
                                        </iframe>

                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-8 h-8 top-0 right-0">
                                <button
                                    type="button"
                                    className="shadow translate-x-8 group-hover:translate-x-0 -translate-y-8 group-hover:translate-y-0 active:shadow-sm bg-lred text-white rounded-bl-2xl w-full h-full focus:outline-none transition ease-out duration-500"
                                    onClick={() => setShowDialog(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
function getVideoType($url) {
    if ($url == null) {
        return 'unknown'
    } else if ($url.includes('youtube')) {
        return 'youtube'
    } else if ($url.includes('vimeo')) {
        return 'vimeo'
    } else {
        return 'unknown'
    }
}
function getVimeoVideoId(url) {
    var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
    var match = url.match(regExp);
    if (match) {
        return match[2]
    }
    return ''
}

export default YoutubeDialog