const ViewDetailBlog = ({params}: {params:{id:string}}) => {
    
    return(
        <div>
            DYNAMIC ROUTE ID: {params.id}
        </div>
    )
}

export default ViewDetailBlog