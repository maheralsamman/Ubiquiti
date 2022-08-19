import React, { useEffect } from 'react';
import './OneDevice.scss';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IsDevice, IsDeviceObject, IsDeviceProps, IsDeviceDetails,
} from '../interfaces/interfaces';
import { imgUrlHandler } from '../functions/functions';

const OneDevice = ({ devices, setDevice, device }: IsDeviceProps) => {
  const { shortname } = useParams();
  const selectedDevice = devices?.find((adevice: IsDevice) => adevice.shortnames[0] === shortname);
  const navigate = useNavigate();

  const deviceDestructurer = (oneDevice: IsDeviceDetails) => [
    {
      title: 'Product Line',
      info: oneDevice.product.name,
    },
    {
      title: 'ID',
      info: oneDevice.line.id,
    },
    {
      title: 'Name',
      info: oneDevice.product.name,
    },
    {
      title: 'Shortname',
      info: oneDevice.shortnames[0],
    },
    {
      title: 'Max.power',
      info: oneDevice.unifi?.network?.radios?.na?.maxPower || 'Unspecified',
    },
    {
      title: 'Speed',
      info: oneDevice.unifi?.network?.radios?.na?.maxSpeedMegabitsPerSecond || 'Unspecified',
    },
    {
      title: 'Number of ports',
      info: oneDevice.unifi?.network?.numberOfPorts || 'Unspecified',
    },
  ];
  useEffect(() => {
    if (!selectedDevice) {
      navigate('/');
      return;
    }
    setDevice(deviceDestructurer(selectedDevice));
  }, []);

  return (
    <main className="main-container">
      <section className="device">
        <section className="device__image">
          {selectedDevice && (
          <img
            src={imgUrlHandler(selectedDevice.icon.id, 257)}
            alt="device"
          />
          )}
        </section>
        <article className="device__info">
          {device && (
            device.map((adevice: IsDeviceObject, index: number) => (
              <section className="device__line" key={index}>
                <p className="device__line--title">{adevice.title}</p>
                <p className="device__line--data">{adevice.info}</p>
              </section>
            ))
          )}
        </article>
      </section>
    </main>
  );
};

export default OneDevice;
