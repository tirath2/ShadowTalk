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
  var localVideo = useRef<any>(null);

  const createPear = async () => {
    let streams: MediaStream | null = await createVideoStream();
    const config: any = {
      initiator: true,
      trickle: false,
      offerConstraints: {
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      },
    };
    if (streams?.length) {
      config.stream = streams;
    }
    pear.current = new SimplePeer(config);
    addMedia(streams);

    pearListeners();
    console.log("createPear");
  };

  const addMedia = (stream: MediaStream) => {
    pear.current.addStream(stream);
    let video = localVideo.current;
    if (video) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  };

  const createVideoStream = async () => {
    // then, anytime later...

    try {
      const track = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return track;
      // addMedia(track);
    } catch (error) {
      return null;
    }
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

    pear?.current.on("track", (track, stream) => {
      console.log("trackscalled");
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
          <video ref={localVideo} className="flex flex-1" />
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
