import Avatar from './Avatar';
import Chatbox from '../containers/Chatbox';
import littleCatImage from '../../public/littleCat.jpg'
import zenCatImage from '../../public/zenCat.jpg'

export default function PageContent({userId, userName}){
    const ProfileImage = userId === 10 ? littleCatImage : zenCatImage;
    return(
        <React.Fragment>
            <div className='chat--begin'>
                <Avatar path={ProfileImage} size="avatar-medium"/>
                <p>this is {userName} page</p>
            </div>
            <Chatbox
                userId = {userId}
                imgPath = {ProfileImage}
                userName = {userName}
            />
        </React.Fragment>
    )
}