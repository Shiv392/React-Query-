import React, { useEffect, useState } from 'react';
import useGetPaginationPhoto from '../customhook/useGetPaginationPhoto';
import { useSearchParams } from 'react-router-dom';

const PaginationFetchData = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const initialPage = Number(searchParams.get('_page')) || 1;
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, isFetching } = useGetPaginationPhoto(initialPage);

    useEffect(()=>{
        setPage(initialPage);
        const newSearchParams=new URLSearchParams(searchParams.toString());
        newSearchParams.set('_page',initialPage);
        setSearchParams(newSearchParams);
    },[]);

    const handleNext = () => {
        setPage(page+1);
        const nextpage=page+1;
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('_page', nextpage);
        setSearchParams(newSearchParams);
    };
    const handlePrev = () => {
        setPage(Math.max(page-1,1));
        const previouspage=Math.max(page-1,1);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('_page', previouspage);
        setSearchParams(newSearchParams);
    };

    if (isLoading) {
        return (
            <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', height: '100vh' }}>
                <h3>Loading .................</h3>
            </div>
        )
    }

    if (isError) {
        return (
            <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', height: '100vh' }}>
                <h3>Error .................</h3>
            </div>
        )
    }

    return (
        <div>
            <div style={{
            'display': 'grid',
            'gridTemplateColumns': 'repeat(auto-fill, minmax(150px, 1fr))',
            'gap': '15px',
            'padding': '20px'
        }}>
            {
                data.map((photo) => (
                    <div key={photo.id} style={{
                        'border': '1px solid #ccc',
                        'padding': '10px',
                        'borderRadius': '8px',
                        'boxShadow': '0 0 5px rgba(0,0,0,0.1)',
                    }}>
                        <img src={photo.thumbnailUrl} alt={photo.title} width="100%" />
                        <p>{photo.title}</p>
                    </div>
                ))
            }
        </div>

        <div>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handlePrev} disabled={page === 1}>Prev</button>
                <span style={{ margin: '0 10px' }}>Page {page}</span>
                <button onClick={handleNext}>Next</button>
            </div>

            {isFetching && <p style={{ textAlign: 'center' }}>Fetching new data...</p>}
        </div>
        </div>
    )
}

export default PaginationFetchData;