import React from "react";

function Footer() {
  return (
    <footer className="footer container">
      <p className="footer__text">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
//сделать изменение года через Date
