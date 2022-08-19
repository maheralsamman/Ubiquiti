import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RotateLoader from 'react-spinners/RotateLoader';
import { IsDevice, IsDeviceViewProps } from '../interfaces/interfaces';
import { imgUrlHandler } from '../functions/functions';
import leftArrow from '../assets/icons/left-arrow-icon.png';
import rightArrow from '../assets/icons/right-arrow-icon.png';
import './List.scss';

const List = ({ devices }: IsDeviceViewProps) => {
  const [slicedDevices, setSlicedDevices] = useState<IsDevice[] | undefined>([]);
  const [previousPlace, setPreviousPlace] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(10);
  const navigate = useNavigate();

  const deviceNavigate = (shortname: string) => {
    navigate(`/device/${shortname}`);
  };

  const previous = () => {
    if (previousPlace === 0) return;
    setCurrentPlace(currentPlace - 10);
    setPreviousPlace(previousPlace - 10);
  };
  const next = () => {
    if (currentPlace >= devices!.length) return;
    setCurrentPlace(currentPlace + 10);
    setPreviousPlace(previousPlace + 10);
  };

  useEffect(() => {
    setSlicedDevices(devices?.slice(previousPlace, currentPlace));
  }, [currentPlace, devices]);

  return (
    <>
      <ul className="products-list">
        {slicedDevices && (
        <li className="products-list__header">
          <p className="products-list__header--count">
            {`${devices ? devices.length : '0'} Devices`}
          </p>
          <p className="products-list__header--line">PRODUCT LINE</p>
          <p className="products-list__header--name">NAME</p>
        </li>
        )}
        {slicedDevices ? (slicedDevices.map((device: IsDevice, index: number) => (
          <li
            className="products-list__content"
            key={index}
            onClick={() => deviceNavigate(device.shortnames[0])}
          >
            <div className="products-list__content--img">
              <img
                alt="device-img"
                src={imgUrlHandler(device.icon.id, 25)}
              />
            </div>
            <p className="products-list__content--line">{device.line.name}</p>
            <p className="products-list__content--name">{device.product.name}</p>
          </li>
        ))) : (<RotateLoader color="#006FFF" size={20} className="products-list__noResponse" />)}
      </ul>
      <div className="pagination">
        <button className="pagination__btn">
          {devices && currentPlace > devices.length ? devices.length : currentPlace}
          <img onClick={previous} className="pagination__leftArrow" src={leftArrow} alt="previous" />
        </button>
        <button className="pagination__btn">
          <img onClick={next} className="pagination__rightArrow" src={rightArrow} alt="next" />
          {devices && devices.length - currentPlace <= 0 ? 0
            : devices && devices.length - currentPlace}
        </button>
      </div>
    </>
  );
};

export default List;
