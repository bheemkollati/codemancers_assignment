import React,{useState,useEffect} from 'react'
import Giphy from './components/Giphy';
import './Post.css'
import {storage,db} from './firebase';

import {Avatar} from '@material-ui/core' 
function Post({username,caption,imageUrl}) {

    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState("");

    const [selected,setSelected]=useState(false);
    const [url,setUrl]=useState("");

    const [images,setImages]=useState([]);

    const [showGif,setShowGif]=useState(false);
    const [modalIsOpen,setModalIsOpen]=useState(false);

    // const apikey=uCq76eqvtpR1tpBJ2cQzbcpcVOVsa4g8;


    const handleSubmit = (e) => {
        e.preventDefault();

        db.collection("comments").add({
            text: comment,
            timestamp: new Date(), 
            
        })

        

        // setComments([
        //     ...comments ,{ tex: comment ,id:Math.random()*1000}])

        // console.log(comments);

        setComment(" ");
    }

    const handleGif= (e) => {
        e.preventDefault();
        setShowGif(true);

        setModalIsOpen(true);
        
        
    }

    useEffect(() =>{
        let unsubscribe,unsub;
        unsubscribe = db.collection("comments").orderBy('timestamp').onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map(doc => doc.data()));
        });

        unsub = db.collection("images").orderBy('timestamp').onSnapshot((snapshot)=>{
            setImages(snapshot.docs.map(doc => doc.data()));
        })


        db.collection("comments").add({
            image: url,
            timestamp: new Date(), 
        })

        console.log(url);
        // selected &&  setImages([
        //     ...images,{text:url,id:Math.random()*100}
        // ])

        return ()=>{
            setModalIsOpen(false);
            unsubscribe();
            unsub();
        }

    },[url])
   
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="bheem" 
                    src="aksf"/>
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt="" />
            <h4 className="post__text"><strong>{username}  </strong>{caption}</h4>
             
             {    //this will render both the comments and gifs  
                 comments.map(data => 
                    (
                        <div key={data.id}>
                            <div className=" display-7 lead post__cmnt">{data.text}</div>
                            <img className="rounded mx-auto d-block" src={data.image} alt=""  />
                        </div>
                 ))
            }
             {/* {
                 images.map(data => (
                     <img className="rounded mx-auto d-block" src={data.image} alt="" key={data.id} />
                 ))
             } */}
           
            <form>
                <input className="form-control form_text" type="text" name="comment" value={comment} placeholder="Add a comment" onChange={(e) => (setComment(e.target.value))} />
                <button className="btn btn-primary mx-2" onClick={handleSubmit}>Post</button>
                <button  className="btn btn-primary mx-2" onClick={handleGif}>Add Gif</button>
            </form>

                { 
                    showGif  && <Giphy selected={selected} setSelected={setSelected} url={url} setUrl={setUrl} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

                }   
        </div>
    )
}

export default Post
