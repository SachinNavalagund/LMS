import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p> &copy; {currentYear} LMS. All Rights Reserved </p>
      <div className="footer__links">
        {['About', 'Privacy Policy', 'Licensing', 'Contact'].map((item) => (
          <Link
            scroll={false}
            href={`/${item.toLowerCase().replace(' ', '-')}`}
            key={item}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
