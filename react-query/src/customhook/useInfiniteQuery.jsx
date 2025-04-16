import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPhotos = async ({ pageParam = 1 }) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=100`);
    return res.data;
  };

const useScrollDataQuery=()=>{
    return useInfiniteQuery({
        queryKey:[`scrolldata`],
        queryFn:getPhotos,
        getNextPageParam:(lastpage,allpage)=>{
            //load next page if we got 10 item else we are about to end

            //last page shows last inserted data got from api call
            //got 100 data from the api like this.
            //here if we get the all data ie. we will also have more so return complete page length+1; 
            //first api call got 100 data so allpage length=1, second call , page=2.
            return lastpage.length==100 ? allpage.length+1 : undefined
        },
        staleTime:5*60*1000
    })
}
export default useScrollDataQuery