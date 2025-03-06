import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getPost} from '../api/postApi';
import {useCustomHook} from "../hooks/useCustomHooks"

const initialState = {
     id : 0, 
     title: '',
     writer: '',
     contents:'',
     regDate:''
}
const BoardView = () =>{

    const [post, setPost] = useState({...initialState});

    const {id} = useParams();
    
    useEffect(() =>{
        getPost(id)
            .then(data => {
                setPost(data);
            })
            .catch(error =>{
                console.error("Error: ", error);
                
            })
    },[id]);


   

    
    return (
        <>
        <div className="container">
            <div className="title">{post.id}번 게시글 정보</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>제목 : </span> {post.title}</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>내용 : </span> {post.contents} </div>
            <div className="content">
                Created on {post.writer} by {post.regDate}
            </div>
        </div>
        </>
    );
    

}

export default BoardView;