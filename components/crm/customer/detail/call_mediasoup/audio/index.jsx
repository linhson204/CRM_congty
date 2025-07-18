import { useEffect, useRef } from 'react';

export default function video({ srcObject }) {
  const audioRef = useRef();

  useEffect(() => {
    console.log("srcObject in AudioMediaSoup:", srcObject);
    if (srcObject && audioRef.current) {
      audioRef.current.srcObject = srcObject;
    }
  }, [srcObject]);
  return (<audio autoPlay ref={audioRef} />)
}
