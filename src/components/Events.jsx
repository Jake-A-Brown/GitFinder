// eslint-disable-next-line no-unused-vars
import React from 'react';
import {format} from 'timeago.js';

// eslint-disable-next-line react/prop-types
const Events = ({events}) => {
  return (
    <>
    {events?.map((ev, i)=>(
        <div key={i} className='flex gap-x-4 items-center'>
            <img src={ev.actor?.avatar_url} className="w-16 rounded-full" />
            <h1 className='break-words'>
                {ev?.actor?.login} {ev?.type}
                <br/>
                {ev?.repo?.name}
                <br/>
                <span className='text-sm'>{format(ev?.created_at)}</span>
            </h1>
        </div>
    ))}
    </>
  );
};

export default Events;