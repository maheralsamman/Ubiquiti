import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsDevice, IsDeviceViewProps } from '../interfaces/interfaces';
import { imgUrlHandler } from '../functions/functions';
import leftArrow from '../assets/icons/left-arrow-icon.png';
import rightArrow from '../assets/icons/right-arrow-icon.png';

import './Grid.scss';

const Grid = ({ devices }: IsDeviceViewProps) => {
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
      <main className="products-grid">
        {slicedDevices && (slicedDevices.map((device: IsDevice, index: number) => (
          <section
            className="product"
            key={index}
            onClick={() => deviceNavigate(device.shortnames[0])}
          >
            <section className="product__img">
              <img
                src={imgUrlHandler(device.icon.id, 129)}
                alt="device-img"
              />
            </section>
            <section className="product__text">
              <p className="product__name">{device.product.name}</p>
              <p className="product__line">{device.line.name}</p>
            </section>
          </section>
        )))}
      </main>
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

export default Grid;
