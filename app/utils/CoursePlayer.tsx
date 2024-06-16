import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("https://learnhubs-19faa3164a81.herokuapp.com/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      {videoUrl && (
        <iframe
          src={`https://www.youtube.com/embed/${videoUrl}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
    // <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
    //   {videoData.otp && videoData.playbackInfo !== "" && (
    //     <iframe
    //       src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=wL8Otx7DVl1vvUfe`}
    //       style={{
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         width: "100%",
    //         height: "100%",
    //         border: 0
    //       }}
    //       allowFullScreen={true}
    //       allow="encrypted-media"
    //     ></iframe>
    //   )}
    // </div>
  );
};

export default CoursePlayer;

