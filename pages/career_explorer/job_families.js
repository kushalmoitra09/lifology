import Link from 'next/link'
import { useState } from 'react'
import {
    ClockIcon,
    CreditCardIcon,
    HomeIcon,
    ScaleIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import {
    SearchIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import MetaLayout from '../../components/MetaLayout'

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'My Child', href: '#', icon: ClockIcon, current: false },
    { name: 'Services', href: '#', icon: ScaleIcon, current: false },
    { name: 'Career Explorer', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Lifology Hub', href: '#', icon: UserGroupIcon, current: false },
]
const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function JobFamilies({ families, profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")


    return (
        <>
            <MetaLayout title="Job Families & Career Fields" description="Job Families & Career Fields" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Job Families & Career Fields" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4" >

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="flex-1 flex">
                                            <div className="sm:flex h-full w-full p-4">
                                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                    <div className="w-full self-center text-base font-medium" >
                                                        <h2 className="text-xl ">Explore Lists of all Job families & Career Fields</h2>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <form className="w-full flex md:ml-0" action="#" method="GET">
                                                        <label htmlFor="search_field" className="sr-only">
                                                            Search
                                                        </label>
                                                        <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-gray-100">
                                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                id="search_field"
                                                                name="search_field"
                                                                className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                                placeholder="Search Job Families"
                                                                type="search"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {families.map((card) => (
                                                <Link
                                                    href={{
                                                        pathname: 'job_families/' + card.id,
                                                        query: { token: token }
                                                    }}>
                                                    <a>
                                                        <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg relative"
                                                            style={{ backgroundImage: `url(${card.image})`, height: '200px', }}
                                                        >
                                                            {/* <img src="/img/bg_vertical.png" style={{ position: 'absolute', bottom: '0px' }} /> */}
                                                            <div className="absolute h-3/6 w-full bottom-0 bg-gradient-to-t from-lblue via-lblue to-transparent">
                                                            </div>
                                                            <div className="p-5 absolute bottom-0">
                                                                <div className="text-base text-white w-full font-medium" >{card.name}</div>
                                                                <div className="mt-2 w-12 h-1 rounded bg-lyellow"></div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

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
    const familiesClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const families = await queryGraph(familiesClient, {}, SchemeGetCareerFamilies)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return [];
        });
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
            // console.log(networkErr);
        });
    return {
        props: { families, profile, token }
    }
}


