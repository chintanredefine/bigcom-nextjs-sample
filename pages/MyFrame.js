import React from "react";

const MyFrame = ({ src, width, height, style, myid, allowtransparency }) => (
  <iframe src={src} width={width} height={height} style={style} class={myid} allowtransparency={allowtransparency} scrolling="no"></iframe>
);