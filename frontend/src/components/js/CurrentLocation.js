import { InfoWindow } from "@react-google-maps/api";
import { useEffect } from "react";

export default function CurrentLocation({ pos, onClick, onClose }) {
  useEffect(() => {
    if (!pos) {
      alert("Please enable camera access to determine your current location.");
    }
  }, [pos]);

  if (!pos) return null;

  return (
    <InfoWindow position={pos} onCloseClick={onClose}>
      <div className="current-location" onClick={onClick}>
        <span>You are here!</span>
      </div>
    </InfoWindow>
  );
}
