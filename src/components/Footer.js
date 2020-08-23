import React from "react";
(function(){
  var d=document; var x=!d.getElementById('razorpay-embed-btn-js')
  if(x){ var s=d.createElement('script'); s.defer=!0;s.id='razorpay-embed-btn-js';
  s.src='https://cdn.razorpay.com/static/embed_btn/bundle.js';d.body.appendChild(s);} else{var rzp=window['__rzp__'];
  rzp && rzp.init && rzp.init()}})();
const Footer = () => (
  <footer className="bg-light p-3 text-center">
    <p>
      Project by <a href="https://github.com/krewzer">Krewzer</a>
    </p>
    <div className="razorpay-embed-btn" data-url="https://pages.razorpay.com/pl_F75FSoKJnfIHeO/view" data-text="Donate Now" data-color="#528FF0" data-size="small" >
              </div>
  </footer>
);

export default Footer;
