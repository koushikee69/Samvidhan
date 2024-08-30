
import { useEffect } from 'react';
import './Loading.css';
import gsap from 'gsap';

function Loading() {

      useEffect(() => {
            const t1 = gsap.timeline();

            t1.to('#img', {
                  opacity: 1,
                  duration: 1
            })
                  .to('h1', {
                        scale: 1,
                        duration: 1
                  });

            return () => {
                  t1.kill();
            };
      }, []);

      return (
            <div className="box">
                  <img id='img' src="back2.png" alt="" />
                  <div className='typing'>
                        <h1>SAMVIDHAN</h1>
                  </div>
            </div>
      );
}

export default Loading;

