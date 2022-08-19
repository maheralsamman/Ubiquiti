import { IsDevice } from '../interfaces/interfaces';

const getDevices = async (deviceCallback: Function, filterCallback: Function) => {
  const query = await fetch('https://static.ui.com/fingerprint/ui/public.json');
  const json = await query.json();
  deviceCallback(json.devices);
  filterCallback(json.devices);
};

const searchDevices = (searchText: string, deviceArray: IsDevice[]) => {
  const regExp = new RegExp(searchText, 'gmi');
  return deviceArray.filter((device:IsDevice) => regExp.test(device.product.name));
};

const filterDevices = (filterArray: string[], searchObject: IsDevice[]): IsDevice[] => searchObject
  .filter((device: IsDevice) => filterArray.includes(device.line.name));

const getProductLines = (devices: IsDevice[]) => {
  const productLines = devices.map((device: IsDevice) => device.line.name);
  return Array.from(new Set(productLines));
};

const imgUrlHandler = (id: string, res: number) => `https://static.ui.com/fingerprint/ui/icons/${id}_${res}x${res}.png`;

export {
  imgUrlHandler,
  getDevices,
  searchDevices,
  filterDevices,
  getProductLines,
};
