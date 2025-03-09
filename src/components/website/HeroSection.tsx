import LinksSection from "./LinksSection";

export default function HeroSection() {
  return (
    <div>
      <div className="header  max-md:pt-[50px]">
        <div className="header-content">
          <h1 className="header-title">Baraa Alshaer</h1>
          <h1 className="subtitle capitalize">software engineer | Full-Stack Devloper</h1>
          <p className="description">
  I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies.
</p>

          <p className={"description"}>
            {" "}
            I approach each project with a focus on delivering high-quality
            solutions, combining my skills in frontend development, backend
            systems, and overall project design. My aim is to create
            user-centric applications that not only meet client needs but also
            drive innovation.
          </p>
          <p className={"description"}>
            {" "}
            I am dedicated to staying current with industry trends and
            continuously improving my craft. My work reflects a commitment to
            excellence and a drive to contribute meaningfully to the tech
            community.
          </p>
        </div>
        <LinksSection />
      </div>
    </div>
  );
}
