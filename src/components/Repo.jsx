/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Repo = ({repos}) => {
  return (
    <>
    {repos.map((repos, idx)=>(
        <div key={idx} className='bg-gray-900 p-3 leading-8'>
            <a href={repos.html_url} className='text-teal-500 break-words 
            font-semibold hover:underline' target='blank'>{repos.full_name}</a>
            <div className='flex gap-x-5'>
                <h1 className='text-sm font-semibold'>
                {repos.language ? <span className='text-green-500 color-green'>&#9677;</span> : ''} {repos.language}
                </h1>
                <h1 className='text-sm font-semibold'>Forks: {repos.forks}</h1>
                <h1 className='text-sm font-semibold'>Stars: {repos.stargazers_count}</h1>
            </div>
        </div>
    ))}
    </>
  );
};

export default Repo;