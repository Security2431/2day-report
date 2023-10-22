/* <Avatar />
============================================================================= */
const Avatar = ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <figure className="h-12 w-12 overflow-hidden rounded-full border border-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </figure>
  );
};

export default Avatar;
