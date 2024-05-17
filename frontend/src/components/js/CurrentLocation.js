import { InfoWindow } from "@react-google-maps/api";

export default function CurrentLocation({ pos, onClick, onClose }) {
    console.log(pos);
  return (
    <div className="current-location" onClick={onClick}>
      <InfoWindow position={pos} className='info-window' onCloseClick={onClose}>
        <span>You are here!</span>
      </InfoWindow>
    </div>
  );
}
