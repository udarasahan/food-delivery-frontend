import { assets } from '../../assets/assets';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> PeperPlace App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store_icon} alt="" />
            <img src={assets.app_store_icon} alt="" />
        </div>
         
    </div>
  )
}

export default AppDownload