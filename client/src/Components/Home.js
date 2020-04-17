import React from 'react'
import "./css/home.css"
import { GithubFilled } from "@ant-design/icons";
export default function Home() {
    return (
      <div className="home-container">
        <div className="home-hero-text">
          <div className="home-title">BUY FRUITS</div>
          <p className="home-subtitle">
            This Project Is Made By Saurabh Burade{" "}
            <span className="home-profile ">
              {" "}
              <a href="https://github.com/saurabhburade">
                <GithubFilled />
              </a>
            </span>
          </p>{" "}
          {/* <p className="home-profile home-subtitle">Goto Github Profile</p> */}
        </div>
      </div>
    );
}
