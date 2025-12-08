import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">

        <div className="footer-block">
          <h2>ShopEasy</h2>
          <p>
            Bringing comfort and style together. Explore premium quality clothing,
            footwear and lifestyle products.
          </p>
          <p className="footer-address">
            22/A, New Breeze Plaza,<br />
            Hi-Tech Street, Bangalore - 560041
          </p>
        </div>

        <div className="footer-block">
          <h3>Important Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: support@shopeasy.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mon-Sat: 10 AM - 7 PM</li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 ShopEasy Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
