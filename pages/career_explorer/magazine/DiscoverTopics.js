import React, { useEffect, useState } from 'react';
import styles from '/styles/Magazine.module.css'
import {
  SearchIcon,
} from '@heroicons/react/solid';

const DiscoverTopics = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [category, setCategory] = useState(null);
  const {
    categories,
    onFilterSubmit,
    selectedCategory,
    _searchKeyword,
  } = props;
  const isSelected = (id) => id === selectedCategory;

  useEffect(() => {
    setSearchKeyword(_searchKeyword)
  }, [_searchKeyword]);
  
  const handleSubmit = (category, search_keyword) => {
    onFilterSubmit({
      category,
      search_keyword,
    })
  };
  
  return (
    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <div className="w-full">
          <div className="w-full flex md:ml-0 mb-4">
          {/* <form className="w-full flex md:ml-0 mb-4" action="#" method="GET"> */}
            <label htmlFor="search_keyword" className="sr-only">
              Search
            </label>
            <div className="relative flex w-full text-gray-400 focus-within:text-gray-600 rounded bg-gray-100">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search_field"
                name="search_field"
                className="block w-5/6 h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                placeholder="Search"
                type="search"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
              <button className="flex p-1.5 ml-auto items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                onClick={() => handleSubmit(category, searchKeyword)}>
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          {/* </form> */}
          </div>
        </div>
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Discover More Topics
        </h2>
        <h3 className="text-base mt-4">
          Career Pools
        </h3>
        <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="dams">Data Analytics, Mathematics, & Statistics</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="architecture">Architecture</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="afs">Armed Forces and Security</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="ll">Language & Linguistics</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="more">More</li>
        </ul>
        <h3 className="text-base mt-4">
          Career Fields
        </h3>
        <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="csa">Computer Science and Applications</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="s">Statisctics</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="da">Data analysis</li>
          <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700" key="m">Mathematics</li>
        </ul>
        <h3 className="text-base mt-4">
          Categories
        </h3>
        <section aria-labelledby='applicant-information-title'>
          <ul className={styles.topicGroup}>
            <li
              key={null}
              className={`float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer hover:text-white hover:bg-lblue duration-500 ${isSelected(null) ? 'bg-lblue text-white' : 'bg-gray-200'}`}
              onClick={() => {
                setCategory(null);
                handleSubmit(null, searchKeyword);
              }}
            >
              {'All'}
            </li>
            {categories?.map(category => (
              <li
                key={category.id}
                className={`float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer hover:text-white hover:bg-lblue duration-500 ${isSelected(parseInt(category.id)) ? 'bg-lblue text-white' : 'bg-gray-200'}`}
                onClick={() => {
                  setCategory(category.id);
                  handleSubmit(category.id, searchKeyword);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default DiscoverTopics;