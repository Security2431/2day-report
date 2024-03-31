/* <Footer />
============================================================================= */
const Footer = () => {
  return (
    <div className="container text-balance py-6 text-center leading-loose text-muted-foreground md:text-left">
      <small>
        © {new Date().getFullYear()} 2day.report. All rights reserved.
      </small>
    </div>
  );
};

export default Footer;
