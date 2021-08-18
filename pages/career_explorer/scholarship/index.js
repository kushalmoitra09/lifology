import React, { Fragment, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import cookies from 'next-cookies';
import Constants from '/helpers/Constants';
import { queryGraph } from '/helpers/GraphQLCaller';
import { SchemeGetProfile } from '/helpers/GraphQLSchemes';
import NavigationLayout from '/components/NavigationLayout';
import HeaderLayout from '/components/HeaderLayout';
import MetaLayout from '/components/MetaLayout';
import Breadcrumbs from '/components/Breadcrumbs';
import { SchemeAllCareerPools, SchemeCareerFields, SchemeGetScholarships, SchemeGetScholarshipsCountries } from '../../../helpers/GraphQLSchemes';
import { SearchIcon, SelectorIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import classNames from '/helpers/classNames';
import { useRouter } from 'next/router';

const limit = 32;
const pages = [
  { name: 'Career Explorer', href: '/career_explorer', current: false },
  { name: 'Scholarship', href: '#', current: true },
];

const emptyDataOption = () => (
  <Listbox.Option
    key='no_data'
    className={({ active }) =>
      classNames(
        active ? 'text-white bg-indigo-600' : 'text-gray-900',
        'cursor-default select-none relative py-2 pl-8 pr-4'
      )
    }
    value="No Data">
    <span className={classNames('font-normal', 'block truncate')}>
      No Data
    </span>
  </Listbox.Option>
);

export default function Scholarship({
  token,
  page,
  count,
  profile,
  scholarships,
  careerPools,
  from_countries,
  in_countries,
  poolFilter,
  fieldFilter,
  studyingInFilter,
  studyingFromFilter,
  searchKeywordFilter,
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [careerFields, setCareerFields] = useState([]);
  const [selectedCareerPool, setSelectedCareerPool] = useState({});
  const [selectedCareerField, setSelectedCareerField] = useState({});
  const [selectedStudyInCountry, setSelectedStudyInCountry] = useState({});
  const [selectedStudyFromCountry, setSelectedStudyFromCountry] = useState({});
  const nextPage = parseInt(page) + 1;
  const previousPage = parseInt(page) - 1;
  const totalPages = Math.ceil(count / limit);
  const query = {};
  if (!!selectedCareerPool?.id) query.pool_id = selectedCareerPool.id;
  if (!!selectedCareerField?.id) query.field_id = selectedCareerField.id;
  if (!!selectedStudyInCountry?.country) query.studying_in = selectedStudyInCountry.country;
  if (!!selectedStudyFromCountry?.country) query.studying_from = selectedStudyFromCountry.country;
  if (!!searchText) query.search_keyword = searchText;

  const setPoolFilter = () => {
    const careerPool = careerPools.find(pool => pool.id == poolFilter)
    setSelectedCareerPool(careerPool);
  };
  
  useEffect(() => {
    if (!!poolFilter) setPoolFilter();
    if (!!studyingFromFilter) setSelectedStudyFromCountry({ country: studyingFromFilter })
    if (!!studyingInFilter) setSelectedStudyInCountry({ country: studyingInFilter })
    if (!!searchKeywordFilter) setSearchText(searchKeywordFilter)
  }, []);
  
  useEffect(() => {
    if (selectedCareerPool?.id) {
      setSelectedCareerField({})
      const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      queryGraph(careerClient, { pool_id: parseInt(selectedCareerPool.id) }, SchemeCareerFields)
        .then((res) => {
          setCareerFields(res.careerFields)
          setSelectedCareerField(fieldFilter == -1 ? {} : res.careerFields.find(cf => cf.id == fieldFilter))
        }).catch((networkErr) => {
          console.log('error', networkErr)
        })
    }
  }, [selectedCareerPool]);
  
  const applyFilter = () => {
    router.replace({ pathname: '/career_explorer/scholarship', query });
    setOpenFilter(false);
  };
  
  const clearFilter = () => {
    setSelectedCareerPool({});
    setSelectedCareerField({});
    setSelectedStudyInCountry({});
    setSelectedStudyFromCountry({});
    setSearchText('');
    router.replace({ pathname: '/career_explorer/scholarship' });
    setOpenFilter(false);
  };
  
  const getFiltersModal = () => (
    <Transition.Root show={openFilter} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={openFilter}
        onClose={setOpenFilter}
      >
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-4">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center">
                    Filter
                    </Dialog.Title>
                  <div className="font-medium text-base mt-4">Career Pools</div>
                  <Listbox value={selectedCareerPool} onChange={setSelectedCareerPool}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                            <span className={classNames(selectedCareerPool?.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerPool?.name ? selectedCareerPool.name : 'Career Pools'}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>

                          <Transition className="sticky"
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {
                                careerPools?.length > 0 ?
                                  careerPools.map((cp) => (
                                    <Listbox.Option
                                      key={cp.name}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none relative py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={cp}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {cp.name}
                                          </span>


                                        </>
                                      )}
                                    </Listbox.Option>
                                  )) : <Listbox.Option
                                    key='no_data'
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                      )
                                    }
                                    value="No Data">
                                    <span className={classNames('font-normal', 'block truncate')}>
                                      No Data
                                      </span>
                                  </Listbox.Option>
                              }
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <div className="font-medium text-base mt-4">Career Fields</div>
                  <Listbox value={selectedCareerField} onChange={setSelectedCareerField}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                            <span className={classNames(selectedCareerField && selectedCareerField.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerField && selectedCareerField.name ? selectedCareerField.name : 'Career Fields'}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition className="sticky"
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {
                                careerFields.length > 0 ?
                                  careerFields.map((cf) => (
                                    <Listbox.Option
                                      key={cf.name}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none relative py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={cf}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {cf.name}
                                          </span>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  )) : emptyDataOption()
                              }
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <div className="font-medium text-base mt-4">Study In Country</div>
                  <Listbox value={selectedStudyInCountry} onChange={setSelectedStudyInCountry} >
                    {({ open }) => (
                      <>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                            <span className={classNames(selectedStudyInCountry.country ? '' : 'text-gray-400', "block truncate")}>{selectedStudyInCountry.country ? selectedStudyInCountry.country : 'Study In Country'}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition className="sticky"
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {
                                in_countries.length > 0 ?
                                  in_countries.map((country) => (
                                    <Listbox.Option
                                      key={country.country}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none relative py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={country}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {country.country}
                                          </span>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  )) : emptyDataOption()
                              }
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <div className="font-medium text-base mt-4">Study From Country</div>
                  <Listbox value={setSelectedStudyFromCountry} onChange={setSelectedStudyFromCountry}>
                    {({ open }) => (
                      <>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                            <span className={classNames(selectedStudyFromCountry.country ? '' : 'text-gray-400', "block truncate")}>{selectedStudyFromCountry.country ? selectedStudyFromCountry.country : 'Country'}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>
                          <Transition className="sticky"
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {
                                from_countries.length > 0 ?
                                  from_countries.map((country) => (
                                    <Listbox.Option
                                      key={country.country}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none relative py-2 pl-8 pr-4'
                                        )
                                      }
                                      value={country}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {country.country}
                                          </span>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  )) : emptyDataOption()
                              }
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="pt-4 sm:mt-4 sm:flex">
                <button
                  type="button"
                  className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border-indigo-700 cursor-pointer duration-500"
                  onClick={clearFilter}
                >
                  Clear
                  </button>
                <button
                  type="button"
                  className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  onClick={applyFilter}
                >
                  Filter
                  </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
  
  const getScholarshpisList = () => {
    const getFormattedLocation = (location) => 
      location.indexOf(',') === -1 ? location : location.split(',')[0];
    
    return (
      <div className="m-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {scholarships.map((scholarship) => (
                  <div key={scholarship.id} className="flex flex-col relative bg-white shadow rounded-lg px-6 py-4">
                    <div className={'flex'}>
                      <div className={'rounded-md'}>
                        <img src={scholarship.image} className={'shadow rounded-md'} style={{ width: '200px', height: '100px' }} />
                      </div>
                      <div className={'flex flex-col pl-4 w-full'}>
                        <div className={'font-medium text-md'}>{scholarship.name}</div>
                        <div className={'flex items-center mt-auto pt-2'}>
                          <img src={'/img/map-marker.svg'} className={'h-5'} />
                          <div className={'text-sm ml-1'}>{getFormattedLocation(scholarship.studying_in)}</div>
                        </div>
                      </div>
                    </div>
                    <div className={'flex justify-between mt-auto pt-4 text-sm'}>
                      <div className={'flex items-center'}>
                        <img src={'/img/money-dollar-circle.svg'} />
                        <div className={'ml-1'}>{scholarship.amount ? `$${scholarship.amount}` : 'N/A'}</div>
                      </div>
                      <Link href={`/career_explorer/scholarship/${scholarship.id}`}>
                        <div className={'flex items-center cursor-pointer'}>
                          <div className={'text-lblue'}>View Details</div>
                          <img src={'/img/chevron-right.svg'} />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <nav
                className="bg-white flex items-center justify-between border-t border-gray-200 mt-4"
                aria-label="Pagination"
              >
                <div className="hidden sm:block mt-4">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{((page - 1) * limit + 32) > count ? count : ((page - 1) * limit + 32)}</span> of{' '}
                    <span className="font-medium">{count}</span> results
                          </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end mt-4">
                  {
                    previousPage >= 1 ? <Link href={{
                      pathname: '/career_explorer/scholarship',
                      query: {
                        ...query,
                        page: previousPage,
                      }
                    }}>
                      <a
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </a>
                    </Link> : <></>
                  }
                  {
                    nextPage <= totalPages ? <Link href={{
                      pathname: '/career_explorer/scholarship',
                      query: {
                        ...query,
                        page: nextPage,
                      }
                    }}>
                      <a
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </Link> : <></>
                  }
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const getFiltersHeader = () => (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col mt-2">
        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
          <div className="flex-1 flex">
            <div className="sm:flex h-full w-full p-6">
              <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                <div className="w-full self-center text-base font-medium" >
                  <h2 className="text-xl">Explore Lists of all Scholarships Colleges</h2>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="search_field" className="sr-only">
                  Search
                        </label>
                <div className="relative w-full text-gray-400 ">
                  <div className="flex absolute rounded-md bg-lgrey left-4 right-24 focus-within:text-gray-600 ">
                    <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search_field"
                      name="search_field"
                      className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                      placeholder="Search"
                      type="search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="flex p-2 w-max absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                      onClick={applyFilter}>
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <button className="flex p-2 w-20 absolute right-0 items-center bg-lblue rounded-md sm:text-sm text-white" aria-hidden="true"
                    onClick={() => {
                      setOpenFilter(true)
                    }}>
                    <div>Filter</div>
                    <img className="ml-2" src="/img/filter-icon.png" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <MetaLayout title="Scholarship" description="Scholarship" />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none" >
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Scholarship" />
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            {getFiltersHeader()}
            {getScholarshpisList()}
          </main>
        </div>
      </div>
      {getFiltersModal()}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookies(context)
  const {
    page = 1,
    pool_id = -1,
    field_id = -1,
    studying_in = '',
    studying_from = '',
    search_keyword = '',
  } = context.query;
  
  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
    
  const scholarshipClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/career",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const careerPools = await queryGraph(scholarshipClient, {}, SchemeAllCareerPools)
    .then((res) => {
      return res.careerPools
    }).catch((networkErr) => {
      return [];
    })
  
  const filter = {
    limit,
    page: parseInt(page),
    count: true,
  };

  if (pool_id != -1) filter.pool_id = parseInt(pool_id);
  if (field_id != -1) filter.field_id = parseInt(field_id);
  if (studying_in != '') filter.studying_in = studying_in;
  if (studying_from != '') filter.from_countries = studying_from;
  if (search_keyword != '') filter.search_keyword = search_keyword;
    
  const { count, scholarships } = await queryGraph(scholarshipClient, {
    lang: 1,
    filter,
  }, SchemeGetScholarships)
    .then((res) => {
      return res.scholarshipsWeb;
    }).catch((networkErr) => {
      console.log(networkErr);
      return { count: 0, scholarships: [] };
    })

  const { from_countries, in_countries } = await queryGraph(scholarshipClient, {}, SchemeGetScholarshipsCountries)
    .then((res) => {
      return res.scholarshipCountry;
    }).catch((networkErr) => {
      console.log(networkErr)
      return [];
    })

    
  const profileClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/user",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
    .then((res) => {
      return res.profile;
    }).catch((networkErr) => {
      return {};
    });
  return {
    props: {
      token,
      page,
      count,
      profile,
      scholarships,
      careerPools,
      from_countries,
      in_countries,
      poolFilter: pool_id,
      fieldFilter: field_id,
      studyingInFilter: studying_in,
      studyingFromFilter: studying_from,
      searchKeywordFilter: search_keyword,
    },
  };
}