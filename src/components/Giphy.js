import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import '../App.css'
import Loader from './Loader'
import Modal from 'react-modal';
Modal.setAppElement('#root');
function Giphy({selected,setSelected,url,setUrl,modalIsOpen,setModalIsOpen}) {
    const [data,setData]=useState([]);

    const [isLoading,setIsLoading]=useState(false);

    const [isError,setIsError]=useState(false);

    const [search,setSearch]=useState("");

    
    

    useEffect(() =>{

        
        const fetchData = async () => {

            setIsError(false);
            setIsLoading(true); 
            try{
             const results = await axios("https://api.giphy.com/v1/gifs/trending",{ 
                params:{
                    api_key:"uCq76eqvtpR1tpBJ2cQzbcpcVOVsa4g8",
                    limit:10
                }
            });
            console.log(results);
            setData(results.data.data);


            }catch(err){
                setIsError(err);
                setTimeout(() =>setIsError(false),4000)
            }
          
            setIsLoading(false);
        }
        fetchData();
    },[])

    const renderGifs = () =>{
        if(isLoading){
            return <div className="load"><Loader /></div>
        }
        return data.map(el => {
            return(
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url} alt="" onClick={()=> {setSelected(true);setUrl(el.images.fixed_height.url)}}/>
                </div>
            )
        })
    }
    const renderError=()=>{
        if(isError){
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">Unable to get Gifs.</div>
            )
        }
    }

    const searchChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSearchSubmit =async (e)=>{
        e.preventDefault();
        setIsError(false);
            setIsLoading(true); 
  
            try{
                const results = await axios("https://api.giphy.com/v1/gifs/search",{
                params:{
                    api_key:"uCq76eqvtpR1tpBJ2cQzbcpcVOVsa4g8",
                    q:search
                }
             } )
             setData(results.data.data);
            }
            catch(err){
                setIsError(err);
                setTimeout(() =>setIsError(false),4000)
            }
             setIsLoading(false);
             setSearch(" ");
             
        }

    
    return (
        <div className="m-2">

            <Modal isOpen={modalIsOpen}  onRequestClose={() => setModalIsOpen(false)}>
                {renderError()}
                <form className="form-inline justify-content-center m-2">
                    <input className="form-control form_text" type="text" placeholder="search" onChange={searchChange} value={search} />
                    <button className="btn btn-primary mx-2" type="submit" onClick={handleSearchSubmit}>Go</button>
                </form>
                <div className="container gifs">
                    {renderGifs()}
                </div>
            </Modal>

            
        </div>
    )
}

export default Giphy
