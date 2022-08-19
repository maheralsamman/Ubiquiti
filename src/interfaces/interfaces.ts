interface IsDevice {
  guids: []
  icon: {
    id: string,
    resolutions: [
      [number, number]
    ]
  }
  line: {
    id: string,
    name: string,
  }
  product: {
    abbrev: string,
    name: string,
  }
  shortnames: [string]
  triplets: [
    {
      k2: string,
      k1: string,
    }
  ]
  unifi?: {
    network?: {
      radios?: {
        na?: {
          maxPower?: number;
          maxSpeedMegabitsPerSecond?: number;
        };
      };
      numberOfPorts?: number;
    };
  };
}

interface IsDeviceDetails {
  product: {
    name: string
  }
  line: {
    id: string,
  }
  shortnames: [string]
  unifi?: {
    network?: {
      radios?: {
        na?: {
          maxPower?: number;
          maxSpeedMegabitsPerSecond?: number;
        };
      };
      numberOfPorts?: number;
    };
  };
}
interface CheckBox {
  isChecked: boolean,
  productLine: string
}

interface IsNavigationProps {
  device?: IsDeviceObject[]
  showGrid: boolean
  setShowGrid: (prevState: boolean) => void
  setFilter: (prevState: IsDevice[]) => void
  devices?: IsDevice[]
}

/* eslint-disable no-unused-vars */
interface IsFilterProps {
  setShowFilter: (prevState: boolean) => void
  checked?: CheckBox[]
  setChecked: (prevState: CheckBox[]) => void
  productLines?: string[]
}

interface IsDeviceObject {
  title: string
  info: string | number
}

interface IsDeviceViewProps {
  deviceDetails?: IsDeviceDetails
  device?: IsDevice
  devices?: IsDevice[]
}

interface IsDeviceProps {
  devices?: IsDevice[]
  setDevice: (prevState: IsDeviceObject[]) => void
  device?: IsDeviceObject[]
}

export type {
  CheckBox,
  IsDevice,
  IsDeviceObject,
  IsDeviceDetails,
  IsDeviceProps,
  IsFilterProps,
  IsNavigationProps,
  IsDeviceViewProps,
};
