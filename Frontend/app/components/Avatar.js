
export default function({path, size}){
    //size:.avatar-medium .avatar-sm
    return(
        <img src={path} alt="Avatar" className={"avatar "+size}/>
    )
}
