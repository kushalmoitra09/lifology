import React from 'react'
import { useRef } from 'react'

const OTPVerifyTab = ({ verifyOTP, resendOTP, timeLeft, selectTab }) => {
    const oneRef = useRef()
    const twoRef = useRef()
    const threeRef = useRef()
    const fourRef = useRef()
    const fiveRef = useRef()
    const sixRef = useRef()

    const verifyRef = useRef()
    return (
        <div className="mt-6">
            <form onSubmit={verifyOTP} className="space-y-6">
                <div>
                    <div className="mt-1">
                        <div className="mt-1 grid grid-cols-6 gap-2 mt-4 ml-auto mr-auto">

                            <input
                                ref={oneRef}
                                // onKeyPress={(event) => {
                                //     if (!/[0-9]/.test(event.key)) {
                                //         event.preventDefault();
                                //     }
                                // }}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {

                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            oneRef.current.value = ''
                                        else
                                            twoRef.current.focus()


                                    }
                                }}
                                onFocus={(event) => {
                                    event.target.select()
                                }}
                                id="one"
                                name="one"
                                type="tel"
                                required
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                                pattern="[0-9]"
                            />
                            <input
                                ref={twoRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        oneRef.current.focus()
                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            twoRef.current.value = ''
                                        else
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
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={threeRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        twoRef.current.focus()
                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            threeRef.current.value = ''
                                        else
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
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={fourRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        threeRef.current.focus()
                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            fourRef.current.value = ''
                                        else
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
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={fiveRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fourRef.current.focus()
                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            fiveRef.current.value = ''
                                        else
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
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                            />
                            <input
                                ref={sixRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fiveRef.current.focus()
                                    } else {
                                        if (!/[0-9]/.test(event.key))
                                            sixRef.current.value = ''
                                        else
                                            verifyRef.current.click()
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
                                className="w-10 h-10 text-center rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-lblue duration-500"
                                maxLength="1"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        {timeLeft != 0 && <div>
                            00:{timeLeft.toString().length == 1 ? '0' + timeLeft : timeLeft} seconds
                        </div>}

                        <div className="">
                            {
                                timeLeft == 0 ?
                                    <a
                                        onClick={resendOTP}
                                        className="font-medium text-lblue hover:text-lblue align-middle cursor-pointer">
                                        Resend Code
                                    </a> : <></>
                            }

                        </div>

                    </div>
                </div>
                <div>
                    <button
                        ref={verifyRef}
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-lblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

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
