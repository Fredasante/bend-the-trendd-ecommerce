"use client";

import React from "react";

const Contact = () => {
  return (
    <>
      <section className="overflow-hidden py-10 bg-[#fef4f4] mt-22 pb-5 md:mt-25 lg:mt-25 xl:mt-28 md:pb-10 lg:pb-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            {/* Contact Info */}
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                <p className="font-medium text-xl text-dark">
                  Contact Information
                </p>
              </div>

              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">
                  <p className="flex items-center gap-4">Bend the Trendd</p>
                  <p className="flex items-center gap-4">(+233) 5498-35411</p>
                  <p className="flex gap-4">
                    Address: Ablekuma Abase Rd, Ablekuma New Town
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <form action="https://formspree.io/f/xkoowkbn" method="POST">
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block mb-2.5">
                      Full Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      placeholder="Enter your full name"
                      className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="subject" className="block mb-2.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Type your subject"
                      className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
                    />
                  </div>
                </div>

                <div className="mb-7.5">
                  <label htmlFor="message" className="block mb-2.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 w-full p-5 outline-none"
                  />
                </div>

                {/* Optional hidden metadata */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Message from Website"
                />

                <button
                  type="submit"
                  className="inline-flex font-medium text-white bg-[#382423] py-3 px-7 rounded-md hover:bg-opacity-90"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-7.5 bg-white rounded-xl shadow-1 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5197600072015!2d-0.32394842582217004!3d5.637658132824844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfa3e7a7a01fc9%3A0x59d55f12d405cfd0!2sBend_the_trendd___!5e0!3m2!1sen!2sgh!4v1763690445472!5m2!1sen!2sgh"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bend the Trendd Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
