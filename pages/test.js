import Link from 'next/link'
import { useState } from 'react'
import React from "react"
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: 'career_explorer/course_and_university', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: 'career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: 'career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
]

export default function Assessment() {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [questionNo, setQuestionNo] = useState(1)

    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        controls: true,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        },
    })


    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="flex">
                                            <div className="w-2/4 font-bold text-sm" > Test</div>
                                            <div className="w-2/4 font-bold text-sm text-right" >View Instructions</div>
                                        </div>

                                        <div className="navigation-wrapper">
                                            <div ref={sliderRef} className="keen-slider">
                                                <div className="bg-red-400 keen-slider__slide number-slide1 h-40">1</div>
                                                <div className="bg-gray-400 keen-slider__slide number-slide2 h-40">2</div>
                                                <div className="bg-indigo-400 keen-slider__slide number-slide3 h-40">3</div>
                                                <div className="bg-green-400 keen-slider__slide number-slide4 h-40">4</div>
                                                <div className="bg-yellow-400 keen-slider__slide number-slide5 h-40">5</div>
                                                <div className="bg-pink-400 keen-slider__slide number-slide6 h-40">6</div>
                                            </div>
                                        </div>

                                        <a
                                            onClick={(e) => {
                                                console.log('Clicked')
                                                slider.next()
                                            }}>
                                            <div className="p-4 rounded-full mt-8 shadow">Next</div>
                                        </a>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </main>
                </div>

            </div >
        </>
    )
}
function ArrowLeft(props) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--left" + disabeld}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
    )
}

function ArrowRight(props) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--right" + disabeld}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
    )
}

