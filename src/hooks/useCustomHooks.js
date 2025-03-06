
//페이지 이동 재사용

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) =>{
    if (!param){
        return defaultValue;
    }
    return parseInt(param);
}


//Custom Hook
export const useCustomHook = () =>{

    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams(); // xxx?page=1&size=2 querystring

    const page =getNum(searchParams.get('page'),1);

    const size =getNum(searchParams.get('size'),10);

    const keyfield = searchParams.get('keyfield');

    const keyword = searchParams.get('keyword');

    let queryDefault = '';

    if(keyfield && keyword){

        queryDefault= createSearchParams({page, size, keyfield, keyword}).toString();

    }else{

        queryDefault= createSearchParams({page, size}).toString();
    }
    


    const moveToList = (pageParam) => { // { page: 1, keyfield:xxx , keyword: xxx } 

        console.log('pageParam : ', pageParam);

        let queryStr = '';

        if(pageParam) {

            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);
            const keyfield = pageParam.keyfield;
            const keyword = pageParam.keyword;
           
            if(keyfield && keyword ){
                queryStr = createSearchParams({page: pageNum, size: sizeNum, keyfield, keyword}).toString();
            }else{
                queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();
            }
            

        } else{

            queryStr = queryDefault;

        }
        console.log('queryStr:', queryStr);

        navigate({pathname: '../list', search : queryStr}); //list?page=1&size=10
    }

    const moveToView = (id) => {
        navigate({pathname: `../view/${id}`, search : queryDefault});
    }

    

    return {moveToList, moveToView, page, size, keyfield, keyword};
}