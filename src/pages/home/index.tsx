import './home.scss';
import Video from 'assets/pages/home/benvenuto.mp4';
import { ShadowHeader } from 'components';

export const HomePage = () => {
  return (
    <div className="page">
      <div className="page_video">
        <video loop={true} className="clip" autoPlay={true} playsInline={true}>
          <source src={Video} type="video/mp4" />
          <script>var video = document.currentScript.parentElement; video.volume = 0.5;</script>
        </video>
      </div>
      <div className="page_content">
        <ShadowHeader bigText="Upcoming" smallText="events" />
      </div>
    </div>
  );
};
