import React from "react";
import heroImg from "../../images/backgroundHero.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "../../style/style";
const Hero = () => {
  return (
    <section className="h-screen w-full py-5 px-5 my-10 ">
      <div className="flex justify-between items-center ">
        <div id="left" className="w-2/4">
          <h1 className="text-[36px] font-semibold	">
            Everything related to electronics is sold here
          </h1>
          <p className="text-[18px] leading-7 text-slate-600 py-3 pb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolor
            veritatis in, tempore ea animi ut fuga vero quibusdam. Quibusdam,
            sint! Voluptate debitis fugiat voluptas.
          </p>
          <button className={`${styles.button}`}>
            Connect with us <MdKeyboardArrowRight className="text-xl" />
          </button>
        </div>
        <div id="right">
          <img src={heroImg} alt="heroImg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
