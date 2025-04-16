import React, { useRef, useEffect } from 'react';
import useScrollDataQuery from '../customhook/useInfiniteQuery';

const ScrollingFetchData = () => {
  const {
    data,  //here we are using useInfiniteQuery that's why api response will be 
    //store here like page [0], page[1] etc
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useScrollDataQuery();

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error loading data...</h3>;

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '15px',
        }}
      >
        {data.pages.map((group) =>
          group.map((photo) => (
            <div key={photo.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <img src={photo.thumbnailUrl} alt={photo.title} width="100%" />
              <p>{photo.title}</p>
            </div>
          ))
        )}
      </div>

      <div ref={loadMoreRef} style={{ marginTop: '20px', textAlign: 'center' }}>
        {isFetchingNextPage
          ? <p>Loading more...</p>
          : hasNextPage
          ? <p>Scroll to load more</p>
          : <p>No more data</p>}
      </div>
    </div>
  );
};

export default ScrollingFetchData;
