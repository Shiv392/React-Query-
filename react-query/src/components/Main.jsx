import React from 'react';
import useGetAllPhotos from '../customhook/useGetAllPhotos';            

const MainComponent=()=>{
 const {data,isLoading,isError}=useGetAllPhotos();

 if(isLoading){
    return(
        <div style={{'display':'flex','justifyContent':'center','alignItems':'center',height:'100vh'}}>
            <h3>Loading .................</h3>
        </div>
    )
 }

 if(isError){
    return(
        <div style={{'display':'flex','justifyContent':'center','alignItems':'center',height:'100vh'}}>
            <h3>Error .................</h3>
        </div>
    )
 }

 return(
    <div style={{
        'display': 'grid',
        'gridTemplateColumns': 'repeat(auto-fill, minmax(150px, 1fr))',
        'gap': '15px',
        'padding': '20px'
      }}>
        {
            data.map((photo)=>(
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
 )

}

export default MainComponent