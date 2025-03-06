

const PageComponent = ({ serverData, searchCondition, movePage }) => {

    const {keyfield, keyword} = searchCondition;
    return (
        <>
            {
            serverData.prev ? <span onClick={()=> {movePage ({page : serverData.prevPage, keyfield, keyword}) }}>이전</span> :<></>
            }

            {
                serverData.pageNumList.map((pageNum) =>{
                    return <span 
                            onClick = {() => {movePage({page: pageNum, keyfield, keyword})}}
                            style = {{margin: '2px',
                                      color: pageNum === serverData.currentPage ? 'red' : 'black',
                                      cursor: 'pointer'}}>
                            {pageNum}
                    </span>                
                }
                ) }

            {
            serverData.next ? <span onClick={()=> {movePage ({page : serverData.nextPage, keyfield, keyword}) }}>다음</span> : <></>
            }
        </>
    );

}

export default PageComponent;