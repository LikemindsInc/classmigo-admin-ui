import * as React from "react";
import styled from "styled-components";

// function randomID(len: any) {
//   let result = "";
//   if (result) return result;

//   var chars = ZEGO_CHAR,
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(url = window.location.href) {
//   let urlStr = url.split("?")[1];
//   return new URLSearchParams(urlStr);
// }

export default function LiveCall() {
  // const roomID = getUrlParams().get("roomID") || randomID(5);

  // let role_str = getUrlParams(window.location.href).get("role") || "Host";
  // const role =
  //   role_str === "Host"
  //     ? ZegoUIKitPrebuilt.Host
  //     : role_str === "Cohost"
  //     ? ZegoUIKitPrebuilt.Cohost
  //     : ZegoUIKitPrebuilt.Audience;

  // let sharedLinks: any = [];
  // if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
  //   // sharedLinks.push({
  //   //   name: "Join as co-host",
  //   //   url:
  //   //     window.location.protocol +
  //   //     "//" +
  //   //     window.location.host +
  //   //     window.location.pathname +
  //   //     "?roomID=" +
  //   //     roomID +
  //   //     "&role=Cohost",
  //   // });
  // }
  // sharedLinks.push({
  //   name: "Join as audience",
  //   url:
  //     window.location.protocol +
  //     "//" +
  //     window.location.host +
  //     // window.location.pathname +
  //     "?roomID=" +
  //     roomID +
  //     "&role=Audience",
  // });
  // // generate Kit Token
  // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //   appID,
  //   serverSecret,
  //   roomID,
  //   randomID(5),
  //   randomID(5)
  // );

  // // start the call
  // let liveSession = async (element: any) => {
  //   // Create instance object from Kit Token.
  //   const zp: any = ZegoUIKitPrebuilt.create(kitToken);
  //   // start the call
  //   zp.joinRoom({
  //     container: element,
  //     turnOnCameraWhenJoining: true,
  //     showMyCameraToggleButton: true,
  //     showAudioVideoSettingsButton: true,
  //     showScreenSharingButton: true,
  //     showTextChat: true,
  //     showUserList: true,
  //     scenario: {
  //       mode: ZegoUIKitPrebuilt.LiveStreaming,
  //       config: {
  //         role,
  //       },
  //     },
  //     sharedLinks,
  //   });
  // };

  return <Container className="myCallContainer"></Container>;
}

const Container = styled.div`
  height: auto;
  width: inherit;
`;
