import React from 'react'
import { useRef } from 'react'

const OTPVerifyTab = ({ verifyOTP, resendOTP, timeLeft, selectTab }) => {
    const oneRef = useRef()
    const twoRef = useRef()
    const threeRef = useRef()
    const fourRef = useRef()
    const fiveRef = useRef()
    const sixRef = useRef()
    return (
        <div className="mt-6">
            <form onSubmit={verifyOTP} className="space-y-6">
                <div>
                    <div className="mt-1">
                        <div className="mt-1 grid grid-cols-6 gap-2 mt-4 ml-auto mr-auto">

                            <input
                                ref={oneRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {

                                    } else {
                                        twoRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="one"
                                name="one"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={twoRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        oneRef.current.focus()
                                    } else {
                                        threeRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="two"
                                name="two"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={threeRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        twoRef.current.focus()
                                    } else {
                                        fourRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="three"
                                name="three"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={fourRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        threeRef.current.focus()
                                    } else {
                                        fiveRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="four"
                                name="four"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={fiveRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fourRef.current.focus()
                                    } else {
                                        sixRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="five"
                                name="five"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={sixRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fiveRef.current.focus()
                                    } else {
                                        // sixRef.current.focus()
                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="six"
                                name="six"
                                type="phone"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                maxLength="1"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        <div>
                            00:{timeLeft.toString().length == 1 ? '0' + timeLeft : timeLeft} seconds
                        </div>

                        <div className="text-right">
                            {
                                timeLeft == 0 ?
                                    <a
                                        onClick={resendOTP}
                                        className="font-medium text-indigo-600 hover:text-indigo-500 align-middle cursor-pointer">
                                        Resend Code
                                    </a> : <></>
                            }

                        </div>

                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                    >
                        Verify OTP
                    </button>
                </div>

                <div>
                    <a
                        onClick={selectTab}
                        className="flex cursor-pointer w-full px-4 py-2 bg-white rounded-full justify-center border border-indigo-700 text-indigo-700"
                    >
                        Back To Login
                    </a>
                </div>
            </form>
        </div>

    )
}

export default OTPVerifyTab
