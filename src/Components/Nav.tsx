import React from "react";
import { ReactComponent as Bars } from "../assets/bars-solid.svg";
import { ReactComponent as Lang } from "../assets/language-solid.svg";

export default function Nav() {
  return (
    <div className="nav">
      <Bars className="headerIcon" />
      <h1>Lingo5</h1>
      <Lang className="headerIcon" />
    </div>
  );
}
