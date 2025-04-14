import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getallPhotos=async()=>{
   const res=await axios.get('https://jsonplaceholder.typicode.com/photos');
   return res.data;
}

const useGetAllPhotos=()=>{
return useQuery({
    queryKey:['allphotos'], //key name to caching 
    queryFn : getallPhotos, //function to fetch data 
    staleTime: 5*60*1000 //cache for 5 min 
})
}
export default useGetAllPhotos;