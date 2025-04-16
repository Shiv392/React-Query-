import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const getPhotoByPage=async(page)=>{
  const res= await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
  return res.data;
}
const useGetPaginationPhoto=(page)=>{
return useQuery({
    queryKey:[`photos-${page}`],
    queryFn:()=> getPhotoByPage(page),
    keepPreviousData : true, //this will cache previous data 
    staleTime:5*60*1000 //for 5 minutes.
})
}
export default useGetPaginationPhoto;