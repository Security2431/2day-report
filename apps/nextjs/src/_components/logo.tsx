import Image from "next/image";

/* <Logo />
============================================================================= */
const Logo = () => {
  return (
    <figure className="flex items-center gap-4">
      <Image width={48} height={48} src="/logo.svg" alt="2day.report" />
      <figcaption className="text-xl uppercase text-white">
        2day.report
      </figcaption>
    </figure>
  );
};

export default Logo;
