import React, { useState, useEffect } from "react";

export default function Alert({ msg }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (msg) {
      setShow(true);
      setInterval(() => {
        setShow(false);
      }, 2000);
    }
  }, [msg]);
  return (
    <>
      {show && (
        <div className="ui negative message transition hidden">
          <i className="close icon"></i>
          <div className="header">We're sorry we can't apply that discount</div>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
}
