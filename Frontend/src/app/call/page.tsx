"use client";
import Ads from "@/components/Ads";
import ChatBox from "@/components/ChatBox";
import { Halant } from "next/font/google";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const [offer, setOffer] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const pear = useRef<any>();
  const called = useRef<any>(false);

  var remoteVideo = useRef<any>(null);
  var localVideo = useRef<any>(null);

  useEffect(() => {
    try {
      const apiUrl = "";
      const body = {
        offer: offer,
        id: uuidv4(),
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response: any = axios.post(apiUrl, body, { headers });
      console.log(response.data);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  }, []);

  const createPear = async () => {
    console.log("iam calkked", Date.now());
    if (called?.current) {
      return;
    }
    called.current = true;
    let streams: MediaStream | null = await createVideoStream();
    const config: any = {
      initiator: true,
      trickle: false,
      allowHalfTrickle: false,
      offerConstraints: {
        offerToReceiveVideo: true,
        offerToReceiveAudio: false,
      },
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:35.244.24.210:3478",
            username: "tirath",
            credential: "123456",
          },
        ],
      },
    };
    if (streams) {
      config.stream = streams;
    }

    pear.current = new SimplePeer(config);
    if (streams) {
      addMedia(streams);
    }

    pearListeners();
    console.log("createPear");
  };

  const addMedia = (stream: MediaStream) => {
    // if(pear.current?.)

    // pear.current.addStream(stream);
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
    // return null;
    try {
      const track = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
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

    pear?.current.on("close", () => {
      console.log("close to peer!");
      createVideoStream();
    });

    pear?.current.on("end", () => {
      console.log("end to peer!");
      createVideoStream();
    });

    pear?.current.on("pause", () => {
      console.log("pause to peer!");
      createVideoStream();
    });

    pear?.current.on("readable", () => {
      console.log("readable to peer!");
      createVideoStream();
    });
    pear?.current.on("resume", () => {
      console.log("resume to peer!");
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
        <div className="flex-1 bg-pink-100 p-4 text-[black] text-center !min-w-[50%] ">
          Video Box 1
          <video ref={remoteVideo} className="flex flex-1" />
        </div>
        <div className="flex-1 bg-blue-200 p-4 text-center ">
          <Ads onSubmit={onSignalReceived} />
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-300 p-4 text-[black] text-center !min-w-[50%]">
          <video ref={localVideo} className="flex flex-1" />
        </div>
        <div className="flex-1 bg-blue-400 p-4 text-[black] text-center !max-w-[50%]  h-[100%]">
          Chat Box
          <ChatBox data={answer || offer} />
        </div>
      </div>
    </div>
  );
};

export default page;
