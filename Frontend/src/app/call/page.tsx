"use client";
import Ads from "@/components/Ads";
import ChatBox from "@/components/ChatBox";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";

const page = () => {
  const [offer, setOffer] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const pear: any = useRef(null);
  var remoteVideo = useRef<any>(null);

  const createPear = () => {
    pear.current = new SimplePeer({ initiator: true, trickle: false });

    pearListeners();
    console.log("createPear");
  };

  const addMedia = (stream) => {
    console.log("calledaddMedia", stream);
    pear.current.addStream(stream);
  };

  const createVideoStream = () => {
    // then, anytime later...
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(addMedia)
      .catch((e) => {
        console.log(e);
      });
  };

  const pearListeners = () => {
    pear?.current?.on("error", (err: Error) => console.log("error", err));
    pear?.current?.on("signal", (data: any) => {
      if (data.type === "offer") {
        setOffer(JSON.stringify(data));
      } else if (data.type === "answer") {
        setAnswer(JSON.stringify(data));
      }
    });
    pear?.current.on("connect", () => {
      console.log("Connected to peer!");
      createVideoStream();
    });

    pear?.current.on("stream", (stream: MediaStream) => {
      // got remote video stream, now let's show it in a video tag
      console.log("strqamsadd", stream);
      let video = remoteVideo.current;
      if (video) {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    });
  };

  const onSignalReceived = useCallback((data: string) => {
    pear.current?.signal(JSON.parse(data));
  }, []);

  useEffect(() => {
    createPear();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex">
        <div className="flex-1 bg-pink-100 p-4 text-[black] text-center ">
          Video Box 1
          <video ref={remoteVideo} className="flex flex-1" />
        </div>
        <div className="flex-1 bg-blue-200 p-4 text-center ">
          <Ads onSubmit={onSignalReceived} />
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-300 p-4 text-[black] text-center ">
          Video Box 2
        </div>
        <div className="flex-1 bg-blue-400 p-4 text-[black] text-center ">
          Chat Box
          <ChatBox data={answer || offer} />
        </div>
      </div>
    </div>
  );
};

export default page;
