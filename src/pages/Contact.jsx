// src/pages/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen py-12 px-4 md:px-0">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#1A3E4C] mb-4 drop-shadow">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Have questions about buying, selling, or renting a property? Our team is
          ready to guide you every step of the way.
        </p>
        <p className="text-base text-gray-500">
          Reach out for property inquiries, technical support, partnerships, or
          general assistance. We usually respond within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info Column */}
        <div className="bg-white/90 p-10 rounded-2xl shadow-xl flex flex-col justify-center border border-blue-100">
          <h2 className="text-3xl font-bold mb-4 text-[#1A3E4C] flex items-center gap-2">
            <span role="img" aria-label="wave">
              👋
            </span>{" "}
            Welcome to EstatePro Support
          </h2>
          <ul className="text-gray-700 space-y-4 text-lg mb-6 list-disc list-inside">
            <li>
              <strong>Personalized Help:</strong> Our team is here to help you
              buy, sell, or rent with confidence.
            </li>
            <li>
              <strong>Quick Answers:</strong> Check our FAQ or contact us
              directly for fast, friendly support.
            </li>
            <li>
              <strong>Feedback Welcome:</strong> We value your feedback and
              strive to respond to all inquiries as quickly as possible.
            </li>
          </ul>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-900 text-base shadow-inner">
            Thank you for choosing{" "}
            <span className="font-semibold">EstatePro</span>. We look forward to
            assisting you!
          </div>
        </div>

        {/* Contact Details & Map */}
        <div className="flex flex-col gap-8">
          <div className="bg-white/90 p-10 rounded-2xl shadow-xl border border-blue-100">
            <h2 className="text-2xl font-bold mb-4 text-[#1A3E4C] flex items-center gap-2">
              <span role="img" aria-label="phone">
                📞
              </span>{" "}
              Contact Details
            </h2>
            <div className="text-gray-700 text-lg space-y-2">
              <div>
                <span className="font-semibold">Office Address:</span> Hitech
                City, Hyderabad, Telangana
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:+919876543210"
                  className="text-blue-600 hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:support@realestateapp.com"
                  className="text-blue-600 hover:underline"
                >
                  support@realestateapp.com
                </a>
              </div>
              <div>
                <span className="font-semibold">Hours:</span> Mon–Sat, 9:30 AM
                – 6:30 PM
              </div>
            </div>
          </div>
          <iframe
            className="rounded-2xl shadow-lg w-full h-64 border border-blue-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.615580588381!2d78.375!3d17.4483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e11677599f%3A0xdb6b310a4b9a7c2e!2sHitech%20City!"
            allowFullScreen=""
            loading="lazy"
            title="EstatePro Office Location"
          ></iframe>
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-[#1A3E4C] mb-4">
          Why Contact EstatePro?
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          EstatePro is committed to making real estate simple, transparent, and
          accessible. Whether you need help finding the right property, listing
          your home, or understanding market trends, our team is here to support
          you with expert guidance and reliable service.
        </p>
      </div>
    </div>
  );
};

export default Contact;
