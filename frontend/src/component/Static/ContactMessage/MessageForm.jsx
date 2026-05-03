import React from "react";

const MessageForm = () => {
  return (
    <>
      <div className="mform">
        <h1>Send Us Message</h1>
        <input type="text" placeholder="enter your name" required={true} />
        <input type="email" placeholder="enter your email" required={true} />
        <textarea
          placeholder="enter your message"
          name="message"
          rows={5}
        ></textarea>
        <button className="btn">Send Message</button>
      </div>
    </>
  );
};

export default MessageForm;
