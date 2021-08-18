import React, { Fragment, useState } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { XCircleIcon, XIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import classNames from '/helpers/classNames'

const PhoneNumberTab = ({ submit, error, setError, countries, selectedCountry, setSelectedCountry }) => {
    const [openFilter, setOpenFilter] = useState(false)
    return (

        <div className="mt-6">
            <Transition.Root show={openFilter} as={Fragment} >
                <Dialog
                    as="div"
                    static
                    className="fixed z-10  inset-0 overflow-y-auto"
                    open={openFilter}
                    onClose={setOpenFilter}
                >
                    <div className="flex  items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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


                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block w-full align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-4" style={{ width: "60%" }}>
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                            TERMS OF USE
                                        </Dialog.Title><br />
                                        <div className="mt-2">



                                            <p className="text-justify">PLEASE READ THESE TERMS OF USE CAREFULLY. BY ACCESSING THIS SITE AND ANY PAGES THEREOF, YOU AGREE TO BE BOUND BY THE TERMS OF USE BELOW. IF YOU DO NOT AGREE TO THE TERMS OF USE MENTIONED BELOW, DO NOT ACCESS THIS SITE, OR ANY PAGES THEREOF.</p> <br />
                                            <p className="text-justify">THE USE OF ANY PRODUCT, SERVICE OR FEATURE (HEREINAFTER REFERRED AS THE "CONTENT") AVAILABLE THROUGH THE WEBSITES OR MOBILE APPLICATION ACCESSIBLE AT WWW.LIFOLOGY.COM (COLLECTIVELY, THE "APPLICATION") BY ANY USER OF THE APPLICATION ("YOU" OR "YOUR" HEREAFTER) SHALL BE GOVERNED BY THE FOLLOWING TERMS OF USE.</p><br />
                                            <p className="text-justify">
                                                The contents hereof are the sole and exclusive name of M/s SEPTA MILLES PRIVATE LIMITED (a company incorporated under Indian companies act, 2013), having its registered office at #811, 10th a- main, 1st suite #233, Indiranagar, Bangalore-38, State of Karnataka (hereinafter referred for sake of brevity as “lifology”) unless otherwise indicated and may not be, for whatsoever purpose, reproduced, stored, copied or archived in any manner, format or medium whatsoever either in full or in parts without the prior express written consent of lifology. Lifology shall be free to use, for any purpose, including and notwithstanding any business processes, methodologies, ideas, concepts, know-how or techniques contained in information the user of this site provides lifology through this site. Lifology shall not be subject to any obligations of confidentiality regarding submitted information whatsoever. Copyright in the pages and in the screens displaying the pages, and in the information and material therein and in their arrangement, is owned by lifology unless otherwise indicated.
                                                Lifology encourages users to establish hypertext links to this site. However, the user will have to login to access services provided to this site. If you want to link to us please feel free, however we would prefer it if you link to our home page. That way if we have to move information around, your link will stay intact.
                                                Any access of these materials outside the lifology network amounts to an act of infringement of the intellectual and other proprietary rights of lifology and will attract legal liability of both civil and criminal nature.
                                                Within lifology, only the personnel authorized for the time being shall have the right to modify, alter or change these materials. No other person shall at any time modify, alter or change these materials (or any part thereof) nor attempt to do so under whatsoever circumstances. Any such act amounts to an act of infringement of the intellectual and other proprietary rights of lifology and shall attract the strictest action possible under law.
                                            </p><br />
                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                PRIVACY STATEMENT (INDIA)
                                            </Dialog.Title><br />
                                            <p className="text-justify">

                                                Except when you are registered with us, this site does not store or capture personal information, but merely logs the user's IP address (internet protocol: standard allowing data to be transmitted between two devices) which is automatically recognized by the web or mobile server.
                                            </p><br />
                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                REGISTRATION OF USER
                                            </Dialog.Title><br />

                                            <p className="text-justify">
                                                To register as a user of lifology you are required to provide the following information such as Name, Email ID, Mobile number and password.
                                            </p><br />

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                USE OF YOUR PERSONAL INFORMATION
                                            </Dialog.Title><br />

                                            <p className="text-justify">

                                                We may use your personal information for the below mentioned purposes:
                                                a)	To create your user id;
                                                b)	To identify you once you register on our website or mobile application;
                                                c)	To contact you and respond to your questions or requests;
                                                d)	To generate / create reports and you may provide information such as;
                                                i.	Name, date of birth, address, name of guardian/ institution, as the case may be;
                                                ii.	And such other information required to access or to know the intellectual ability or other skills whatsoever;
                                                iii.	Passwords and similar security information used for authentication and account access;
                                                iv.	Payment information to process your payment, if you make purchases.
                                            </p><br />

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                RECORD RETENSION
                                            </Dialog.Title><br />

                                            <p className="text-justify">

                                                The reports as generated/created for such users can be accessed through registered account during the subscription period. Personal information will not be retained for a period more than necessary to fulfil the purposes, unless a longer retention period is required by law or for directly related legitimate business purposes.
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                PERSONAL INFORMATION
                                            </Dialog.Title><br />

                                            <p className="text-justify">

                                                If you register to access services available on this site, your information will be held on a secure server and the data will not be shared with any organisations outside lifology.
                                                [Provided, the lifology may provide the reports to the parents/guardian of such child, if the report generation request is initiated by the parent/guardian. Without students concern we will not share the report to the institution even though if the report generation request is initiated by such institutions]
                                                This privacy statement only covers our website at www.lifology.com, sub-sites of this domains and mobile application. This privacy statement does not cover other websites linked to this domain.
                                                Lifology may use the information it holds to prevent and detect fraud. We may also divulge such information, for the same purpose, to other governmental organisations or law enforcing agencies as the law may require.

                                                Data protection officer:
                                                If you have any questions regarding our privacy practices or this privacy statement, please contact us at: privacy@lifology.com
                                                Contact person: Asha Mary Kuriakose

                                                Contact address: Septa Milles Pvt Ltd.
                                                #2nd Floor, B’Hub,
                                                Mar Ivanios Campus,
                                                Trivandrum

                                                Phone: +91 7293334455
                                                Email: privacy@lifology.com

                                            </p>


                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                LIMITED LICENSE
                                            </Dialog.Title><br />


                                            <p className="text-justify">
                                                Subject to the terms of use, lifology grants you a non-exclusive, non-transferable, limited right to access, use and display this application and the materials thereon. You agree not to interrupt or attempt to interrupt the operation of the application in any manner. Unless otherwise specified, the application is for your personal and non-commercial use. You shall not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from this application.
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                LINKS TO EXTERNAL WEBSITES
                                            </Dialog.Title><br />


                                            <p className="text-justify">
                                                This site and/or articles contained therein may contain links to web sites controlled or offered by third parties (non-affiliates of lifology). We are not responsible for the content or reliability of the linked websites. Lifology hereby disclaims liability for, any information, materials, and products or services posted or offered at any of the third-party sites linked to this application. By creating a link to a third-party web site, lifology does not endorse or recommend any products or services offered or information contained at that web site, nor is lifology liable for any failure of products or services offered or advertised at those sites. Such third-party may have a privacy policy different from that of lifology and the third-party website may provide less security than this site.
                                                By agreeing to the terms and conditions set above, you expressly consent to the use and disclosure of information/materials by lifology and/or its authorised personnel in the manner described in this privacy statement.
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                NO WARRANTY
                                            </Dialog.Title><br />

                                            <p className="text-justify">
                                                The information and materials contained in this site, including text, graphics, videos links or other items are provided "as is", "as available". Lifology does not warrant the accuracy, adequacy or completeness of this information and materials and expressly disclaims liability for errors or omissions in this information and materials. No warranty of any kind, implied, expressed or statutory including but not limited to the warranties of non-infringement of third-party rights, title, merchantability, fitness for a particular purpose and freedom from computer virus, is given in conjunction with the information and materials
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                USE OF THE APPLICATION
                                            </Dialog.Title><br />


                                            <p className="text-justify">
                                                As a condition of your use of the application, you shall not use the application for any purpose(s) that is unlawful or prohibited by the terms of use. You shall not use the application in any manner that could damage, disable, overburden, or impair any servers of lifology, or the network(s) connected to lifology, or interfere with any other party's use and enjoyment of any services associated with the application. You shall not attempt to gain unauthorized access to any section of the application, other accounts, computer systems or networks connected to any lifology or to any of the services associated with the application, through hacking, password mining or any other means. You shall not obtain or attempt to obtain any materials or information through any means not intentionally made available through the application.
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                DISCLAIMER
                                            </Dialog.Title><br />

                                            <p className="text-justify">
                                                The application may contain inaccuracies and typographical and clerical errors. Lifology expressly disclaims any obligation(s) to update this application or any of the materials on this application. Lifology does not warrant the accuracy or completeness of the materials or the reliability of any reports, advice, opinion, statement or other information displayed or distributed through the application.
                                                We are not responsible for (1) your selection of assessments, (2) your use or reliance on, or interpretation and application of, any assessment, report, career fitment or output and/or (3) your decisions based on any assessment, report, career fitment or output. Any risks related to the foregoing and the results of any such decisions shall be solely your responsibility. Without limiting the foregoing, the output of the assessment services must not be relied upon as statements of fact or as the sole basis for any employment related decisions.
                                                The primary purpose of this application is to educate and inform. The views, information, advises and opinions expressed in this application are based on the information/response to scenarios collected from users and human judgment of peoples in lifology. Assumptions made in the analysis are subject to available theories and studies at the time being and, since we are critically - thinking human being, these views are always subject to change, revision, and rethinking at any time. Please do not hold us to them in perpetuity.
                                                You acknowledge that any reliance on any such opinion, advice, statement, memorandum, or information shall be at your sole risk. Lifology reserves the right, in its sole discretion, to correct any errors or omissions in any portion of the application. Lifology may make any other changes to the application, the materials and the products, programs, services or prices (if any) described in the application at any time without notice. This application is for informational purposes only and should not be construed as advice of any manner.
                                                The directors/managers/employees/partners/coaches/consultants/other service providers of www.lifology.com shall not be responsible or liable for any direct, indirect, incidental, consequential, special, exemplary, punitive or any other damages (including without limitation loss of profits, loss or corruption of data, loss of goodwill, work stoppage, computer failure or malfunction, or interruption of business) under any contract, negligence, strict liability or other theory arising out of or relating in any way with the use of the site or in reliance of the information available on the site, site-related services, or any products or services offered or sold or displayed on this site.
                                                Lifology may make changes to the content on this application, to the services described therein or to those terms and conditions at any time without notice.
                                                Disclaimer for Assessments
                                                •	This application provides a collection of interactive personality tests with detailed report that can be taken for personal entertainment or to learn more about personality assessment.
                                                •	Lifology endeavors to render psychometric assessments and the career guidance to the user, however shall not be responsible in direct/indirect loss incurred to the user due to such assessments and coaching
                                                •	Lifology provides assessment reports and career recommendations based on the response received from the user. Lifology.com is not responsible for the outcome of the assessment in any manner.
                                                •	High/low scores do not mean anything good or bad projected in you through the assessment. It is usually an inter mix of different factors in the same persona.

                                                Personality Report and Career fitment
                                                •	The purpose of this report is understanding our self. It is designed to help people to unleash their personality, natural orientations, learning styles and how they aligned to a career and shall not be relied upon as the sole factor for the purposes of your decision making, admission.
                                                •	This reports should not be used to identify or diagnose psychological, mental health and/or medical problems.
                                                •	The user assumes sole responsibility for any actions or decisions that are made as a result of using this report and self- discovery.
                                                •	By using the this report, you explicitly waive and relinquish any and all claims of any nature against Lifology and/or their employees arising out of or in connection with the use of this Report.

                                            </p>


                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                LIMITATION OF LIABILITY
                                            </Dialog.Title><br />

                                            <p className="text-justify">
                                                In no event will lifology be liable for any damages, including without limitation direct or indirect, special, incidental, or consequential damages, losses or expenses arising in connection with this site or any linked site or use thereof or inability to use by any party, or in connection with any failure of performance, error, omission, interruption, defect, delay in operation or transmission, computer virus or line or system failure, even if lifology, or authorized personnel of lifology thereof, are advised of the possibility of such damages, losses or expenses.
                                            </p>

                                            <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-blue-900 text-center">
                                                INDEMNITY
                                            </Dialog.Title><br />

                                            <p className="text-justify">
                                                You agree to indemnify and hold lifology harmless, its subsidiaries and affiliates from any claim, cost, expense, judgment or other loss relating to your use of this application in any manner, including without limitation of the foregoing, any action you take which is in violation of the terms and conditions of these terms of use and against any applicable law.

                                                CHANGES TO TERMS
                                                Lifology reserves the rights, at its sole discretion, to change, modify, add or remove any portion of these terms of use in whole or in part, at any time. Changes in these terms of use will be effective when notice of such change is posted. Your continued use of the application / use of product / services after any changes to these terms of use are posted will be considered acceptance of those changes. Lifology may terminate, change, suspend or discontinue any aspect of the application, including the availability of any feature(s) of the application, at any time. Lifology may also impose limits on certain features and services or restrict your access to certain sections or all of the application without notice or liability. You hereby acknowledge and agree that lifology may terminate the authorization, rights and license given above at any point of time at its own sole discretion and upon such termination; you shall immediately destroy all materials.

                                                ADDITIONAL TERMS
                                                Certain sections or pages or services on this site may contain separate terms and condition, which are in addition to these terms of use. In the event of a conflict, the additional terms and conditions will govern for those sections or pages.

                                                GOVERNING LAW
                                                This site is controlled, operated and administered by lifology from its offices within India. Lifology makes no representation that materials on this application are appropriate or available for use at any other location(s) outside lifology. Any access to this application from territories where their contents are illegal is prohibited. You may not use the application or export the materials in violation of any applicable export laws and regulations. If you access this application from a location outside India, you are responsible for compliance with all local laws.
                                                These terms of use shall be governed by the laws of India, without giving effect to its conflict of laws provisions. You agree that the appropriate court(s) in Bangalore, state of Karnataka, India, will have the exclusive jurisdiction to resolve all disputes arising under these terms of use and you hereby consent to personal jurisdiction in such forum. These terms of use constitutes the entire agreement between lifology and you with respect to your use of the application.

                                                INTEGRALITY
                                                The title of each paragraph is written only for the convenience of reading and does not have any legal or contractual obligations
                                                Contact us at: privacy@lifology.com
                                                M/s. SEPTA MILLES PRIVATE LIMTIED


                                            </p>


                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={() => setOpenFilter(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <form onSubmit={submit} className="space-y-6">
                <div>


                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center m-px">
                            <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                {({ open }) => (
                                    <>
                                        <div className="m-px relative h-full">
                                            <Listbox.Button className="relative w-32 bg-gray-200 rounded-l-full pl-3 pr-10 py-0 h-full text-left cursor-default focus:outline-none sm:text-sm">
                                                <span className="flex items-center">
                                                    <img src={selectedCountry.flag} alt="" className="flex-shrink-0 h-6 w-6 rounded-full object-cover" />
                                                    <span className="ml-3 block truncate">{selectedCountry.callingCodes}</span>
                                                </span>
                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                >
                                                    {countries.map((person) => (
                                                        <Listbox.Option
                                                            key={person.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <img src={person.flag} alt="" className="flex-shrink-0 h-6 w-6 rounded-full object-cover" />
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {person.alpha2Code}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
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
                        </div>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            maxLength="10"
                            className="bg-gray-100 block w-full px-3 py-2 pl-36 sm:text-sm rounded-full outline-none border focus:border-indigo-700 duration-500"
                            placeholder="Enter Mobile number"
                            onKeyPress={() => {
                                setError('')
                            }}
                        />
                    </div>
                </div>
                {
                    error.length == 0 ? <></> :
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">Invalid Phone number</p>
                                </div>
                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            type="button"
                                            className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                                            onClick={() => { setError('') }}
                                        >
                                            <span className="sr-only">Dismiss</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }


                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue  focus:outline-none">
                        Login with OTP
                    </button>
                </div>

                <div className="flex items-center">

                    <div className="text-sm m-auto">
                        By accepting all <a href="#" onClick={(event) => { setOpenFilter(true) }} ><span className="font-medium underline text-indigo-600 hover:text-indigo-500">
                            terms
                        </span> and <span className="font-medium underline text-indigo-600 hover:text-indigo-500">
                                conditions
                            </span>
                        </a>
                    </div>
                </div>

                {/* <div>
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or Login with</span>
                        </div>
                    </div>
                    <div className="mt-0">
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div>
                                <a
                                    href="#"
                                    className="w-full rounded-full border border-gray-200 bg-gray-100 inline-flex px-4 py-2 justify-center text-gray-400 hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                // className={styles.socialMediaButton}
                                >
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg className="w-4 h-4 self-center" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="ml-4" >Facebook</p>
                                </a>
                            </div>

                            <div>
                                <a
                                    href="#"
                                    className="w-full rounded-full border border-gray-200 bg-gray-100 inline-flex px-4 py-2 justify-center text-gray-400 hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                >
                                    <span className="sr-only">Sign in with Twitter</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 640 640" className="self-center w-4 h-4" >
                                        <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z" />
                                    </svg>
                                    <p className="ml-4" >Google</p>
                                </a>
                            </div>

                        </div>
                    </div>
                </div> */}
            </form>
        </div>

    )
}

export default PhoneNumberTab
