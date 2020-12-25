import { memo } from "react";

function Footer() {
  // console.log('Footer');

  return (
    <footer className="footer page__section">
      <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
    </footer>
  )
}

export default memo(Footer)
