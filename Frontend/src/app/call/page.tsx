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
      config: {
        iceServers: [
          {
            urls: "stun:freestun.net:3479",
          },
          {
            urls: "turn:freestun.net:3479",
            username: 'free', credential: 'free'
          },
        ],
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

{"type":"answer","sdp":"v=0\r\no=- 2812436691320719681 3 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0 1 2\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS 4a761e76-1e5c-4334-8b30-003efdb27f0c\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111 63 9 0 8 13 110 126\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=ice-ufrag:ekEe\r\na=ice-pwd:ZGHFSUiRcSVMKKTJSCEmQgP7\r\na=fingerprint:sha-256 09:7E:12:60:F8:6F:8C:4D:A6:4E:52:0A:3E:48:FE:97:DE:2C:16:AC:E4:E4:4E:45:AA:2F:BB:97:91:4A:9B:81\r\na=setup:active\r\na=mid:0\r\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=sendrecv\r\na=msid:4a761e76-1e5c-4334-8b30-003efdb27f0c f156f1e8-a4e9-49dc-b06b-deadb0314b55\r\na=rtcp-mux\r\na=rtpmap:111 opus/48000/2\r\na=rtcp-fb:111 transport-cc\r\na=fmtp:111 minptime=10;useinbandfec=1\r\na=rtpmap:63 red/48000/2\r\na=fmtp:63 111/111\r\na=rtpmap:9 G722/8000\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:13 CN/8000\r\na=rtpmap:110 telephone-event/48000\r\na=rtpmap:126 telephone-event/8000\r\na=ssrc:297854395 cname:OJpJFmsSZs4/VZyg\r\nm=video 9 UDP/TLS/RTP/SAVPF 96 97 102 103 104 105 106 107 108 109 127 125 39 40 45 46 98 99 100 101 112 113 116 117 118\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=ice-ufrag:ekEe\r\na=ice-pwd:ZGHFSUiRcSVMKKTJSCEmQgP7\r\na=fingerprint:sha-256 09:7E:12:60:F8:6F:8C:4D:A6:4E:52:0A:3E:48:FE:97:DE:2C:16:AC:E4:E4:4E:45:AA:2F:BB:97:91:4A:9B:81\r\na=setup:active\r\na=mid:1\r\na=extmap:14 urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:13 urn:3gpp:video-orientation\r\na=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\na=extmap:5 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\na=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\na=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\na=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/color-space\r\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\na=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\na=sendrecv\r\na=msid:4a761e76-1e5c-4334-8b30-003efdb27f0c e799d352-40b8-453b-af2d-0970502d776e\r\na=rtcp-mux\r\na=rtcp-rsize\r\na=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96\r\na=rtpmap:102 H264/90000\r\na=rtcp-fb:102 goog-remb\r\na=rtcp-fb:102 transport-cc\r\na=rtcp-fb:102 ccm fir\r\na=rtcp-fb:102 nack\r\na=rtcp-fb:102 nack pli\r\na=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\na=rtpmap:103 rtx/90000\r\na=fmtp:103 apt=102\r\na=rtpmap:104 H264/90000\r\na=rtcp-fb:104 goog-remb\r\na=rtcp-fb:104 transport-cc\r\na=rtcp-fb:104 ccm fir\r\na=rtcp-fb:104 nack\r\na=rtcp-fb:104 nack pli\r\na=fmtp:104 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\na=rtpmap:105 rtx/90000\r\na=fmtp:105 apt=104\r\na=rtpmap:106 H264/90000\r\na=rtcp-fb:106 goog-remb\r\na=rtcp-fb:106 transport-cc\r\na=rtcp-fb:106 ccm fir\r\na=rtcp-fb:106 nack\r\na=rtcp-fb:106 nack pli\r\na=fmtp:106 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:107 rtx/90000\r\na=fmtp:107 apt=106\r\na=rtpmap:108 H264/90000\r\na=rtcp-fb:108 goog-remb\r\na=rtcp-fb:108 transport-cc\r\na=rtcp-fb:108 ccm fir\r\na=rtcp-fb:108 nack\r\na=rtcp-fb:108 nack pli\r\na=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\na=rtpmap:109 rtx/90000\r\na=fmtp:109 apt=108\r\na=rtpmap:127 H264/90000\r\na=rtcp-fb:127 goog-remb\r\na=rtcp-fb:127 transport-cc\r\na=rtcp-fb:127 ccm fir\r\na=rtcp-fb:127 nack\r\na=rtcp-fb:127 nack pli\r\na=fmtp:127 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d001f\r\na=rtpmap:125 rtx/90000\r\na=fmtp:125 apt=127\r\na=rtpmap:39 H264/90000\r\na=rtcp-fb:39 goog-remb\r\na=rtcp-fb:39 transport-cc\r\na=rtcp-fb:39 ccm fir\r\na=rtcp-fb:39 nack\r\na=rtcp-fb:39 nack pli\r\na=fmtp:39 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=4d001f\r\na=rtpmap:40 rtx/90000\r\na=fmtp:40 apt=39\r\na=rtpmap:45 AV1/90000\r\na=rtcp-fb:45 goog-remb\r\na=rtcp-fb:45 transport-cc\r\na=rtcp-fb:45 ccm fir\r\na=rtcp-fb:45 nack\r\na=rtcp-fb:45 nack pli\r\na=rtpmap:46 rtx/90000\r\na=fmtp:46 apt=45\r\na=rtpmap:98 VP9/90000\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=fmtp:98 profile-id=0\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98\r\na=rtpmap:100 VP9/90000\r\na=rtcp-fb:100 goog-remb\r\na=rtcp-fb:100 transport-cc\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 nack pli\r\na=fmtp:100 profile-id=2\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100\r\na=rtpmap:112 H264/90000\r\na=rtcp-fb:112 goog-remb\r\na=rtcp-fb:112 transport-cc\r\na=rtcp-fb:112 ccm fir\r\na=rtcp-fb:112 nack\r\na=rtcp-fb:112 nack pli\r\na=fmtp:112 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=64001f\r\na=rtpmap:113 rtx/90000\r\na=fmtp:113 apt=112\r\na=rtpmap:116 red/90000\r\na=rtpmap:117 rtx/90000\r\na=fmtp:117 apt=116\r\na=rtpmap:118 ulpfec/90000\r\na=ssrc-group:FID 3296994952 4033912198\r\na=ssrc:3296994952 cname:OJpJFmsSZs4/VZyg\r\na=ssrc:4033912198 cname:OJpJFmsSZs4/VZyg\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=ice-ufrag:ekEe\r\na=ice-pwd:ZGHFSUiRcSVMKKTJSCEmQgP7\r\na=fingerprint:sha-256 09:7E:12:60:F8:6F:8C:4D:A6:4E:52:0A:3E:48:FE:97:DE:2C:16:AC:E4:E4:4E:45:AA:2F:BB:97:91:4A:9B:81\r\na=setup:active\r\na=mid:2\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
