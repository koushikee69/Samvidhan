import { useEffect } from "react";
import "./NewLevels.css";
import gsap from "gsap";

function NewLevels() {
    useEffect(() => {
        const t1 = gsap.timeline();

        t1.fromTo(
            ".level-container",
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.5,
                ease: "power2.out"
            }
        );

        return () => {
            t1.kill();
        };
    }, []);


    return (
        <div className="outer">
            <h1>LEVELS</h1>
            <img id="bg" src="./buildings.png" alt="Buildings Background" />
            <div className="AllLevels">
                {Array.from({ length: 12 }, (_, i) => (
                    <div className="level-container" key={i}>
                        <img src="level.png" className="levels" alt={`Level ${i + 1}`} />
                        <span className="level-number">{i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewLevels;
