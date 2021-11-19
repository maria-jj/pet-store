import'./styles.css'
export const Search = (props)=>{
    return(
        <input name="search" placeholder="search by breed" type="text" onChange={props.handleSearchUpdate}/>
    )
}