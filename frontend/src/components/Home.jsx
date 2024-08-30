import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [imgSrc, setImgSrc] = useState("/pngwing.com.png");
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate(); // Use useNavigate for routing

  useEffect(() => {
    const home = document.querySelector("#home");
    const player = document.querySelector("#player");
    const quizDivs = document.querySelectorAll(".quiz-div"); // Select all quiz divs

    const initialX = home.clientWidth / 2 - player.clientWidth / 2;
    const initialY = home.clientHeight / 2 - player.clientHeight / 2;
    player.style.left = `${initialX}px`;
    player.style.top = `${initialY}px`;

    const movePlayer = (current, target, axis, onComplete) => {
      const diff = target - current;
      if (Math.abs(diff) > 1) {
        const newPosition = current + diff / 20;
        player.style[axis] = `${newPosition}px`;

        // Check for overlap with any quiz div
        quizDivs.forEach((quizDiv) => {
          const playerRect = player.getBoundingClientRect();
          const quizRect = quizDiv.getBoundingClientRect();
          const overlap = !(
            playerRect.right < quizRect.left ||
            playerRect.left > quizRect.right ||
            playerRect.bottom < quizRect.top ||
            playerRect.top > quizRect.bottom
          );

          if (overlap) {
            setTimeout(() => {
              navigate("/levels");
            },1000) // Redirect to /levels
          }
        });

        requestAnimationFrame(() => movePlayer(newPosition, target, axis, onComplete));
      } else {
        if (onComplete) onComplete();
      }
    };

    const handleClick = (e) => {
      setImgSrc("/rocket.png");

      const targetX = e.clientX - player.clientWidth / 2;
      const targetY = e.clientY - player.clientHeight / 2;
      const currentX = parseFloat(player.style.left) || 0;
      const currentY = parseFloat(player.style.top) || 0;

      const angle = Math.atan2(targetY - currentY, targetX - currentX) * (180 / Math.PI);
      setRotation(angle + 90);

      let xComplete = false;
      let yComplete = false;

      movePlayer(currentX, targetX, "left", () => {
        xComplete = true;
        if (xComplete && yComplete) {
          setImgSrc("/pngwing.com.png");
          setRotation(0);
        }
      });

      movePlayer(currentY, targetY, "top", () => {
        yComplete = true;
        if (xComplete && yComplete) {
          setImgSrc("/pngwing.com.png");
          setRotation(0);
        }
      });
    };

    home.addEventListener("click", handleClick);

    return () => {
      home.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  return (
    <div id="home" className="relative h-screen p-10 bg-black">
      <div
        className="absolute h-[200px] w-[200px] bg-slate-200 rounded-full overflow-hidden shadow-2xl flex justify-between items-center"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        <img className="hover:scale-y-125 hover:scale-x-110 transition-all duration-200" src="/start.png" alt="start" />
      </div>
      <div
        id="player"
        className="absolute h-[100px] w-[100px] z-50"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        <img className="h-full w-full" src={imgSrc} alt="player" />
      </div>
      <div className="h-full w-full flex flex-col justify-between bg-gradient-to-tl from-slate-600 to-gray-700">
        <div className="w-full flex justify-between">
          <div className="h-64 sm:h-96 w-[130px] sm:w-[200px] md:w-[350px] lg:w-[700px] bg-slate-200 shadow-2xl quiz-div overflow-hidden">
            <img src="https://gkgigs.com/wp-content/uploads/2022/10/Quiz-On-Constitution-Of-India-1392x783.png" alt="" className="object-cover hover:scale-125 duration-300"/>
          </div>
          <div className="h-64 sm:h-96 w-[130px] sm:w-[200px] md:w-[350px] lg:w-[700px] bg-slate-200 shadow-2xl"></div>
        </div>
        <div className="w-full flex justify-between">
          <div className="h-64 sm:h-96 w-[130px] sm:w-[200px] md:w-[350px] lg:w-[700px] bg-slate-200 shadow-2xl"></div>
          <div className="h-64 sm:h-96 w-[130px] sm:w-[200px] md:w-[350px] lg:w-[700px] bg-slate-200 shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
