import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IsNavigationProps, CheckBox } from '../interfaces/interfaces';
import {
  filterDevices, searchDevices, getProductLines,
} from '../functions/functions';
import Filter from './Filter';
import closeIcon from '../assets/icons/Close-icon.svg';
import backIcon from '../assets/icons/Back-icon.svg';
import magnifierIcon from '../assets/icons/Search-icon.svg';
import gridIcon from '../assets/icons/grid-icon.svg';
import gridActiveIcon from '../assets/icons/grid-active-icon.svg';
import listIcon from '../assets/icons/list-icon.svg';
import listActiveIcon from '../assets/icons/list-active-icon.svg';
import './Navigation.scss';

const Navigation = ({
  setFilter, devices, device, showGrid, setShowGrid,
}: IsNavigationProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState<CheckBox[]>();
  const [productLines, setProductLines] = useState<string[]>();

  useEffect(() => {
    if (!devices) return;
    const linesArray = getProductLines(devices);
    const checkBoxArray = linesArray
      .map((productLine: string) => ({ isChecked: false, productLine }));
    setChecked(checkBoxArray);
    setProductLines(linesArray);
  }, [devices]);

  useEffect(() => {
    if (!devices || !checked) return;

    const clickedOptions = checked
      .filter((box: CheckBox) => box.isChecked === true)
      .map((box: CheckBox) => box.productLine);

    const filteredLines = clickedOptions.length > 0
      ? filterDevices(clickedOptions, devices)
      : devices;

    const results = searchDevices(searchTerm, filteredLines);
    setFilter(results);
  }, [searchTerm, checked]);

  const navigate = useNavigate();
  const location = useLocation();
  const isViewDevice = location.pathname.includes('device');

  return isViewDevice && device ? (
    <nav className="navigation">
      <img
        className="navigation__backIcon"
        src={backIcon}
        alt="back"
        onClick={() => navigate(-1)}
      />
      <p className="navigation__info">{device[2].info}</p>
    </nav>
  ) : (
    <nav className="navigation">
      <img src={magnifierIcon} alt="Search" className="navigation__magnifierIcon" />
      <input
        type="text"
        placeholder="Search"
        className="navigation__searchField"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img
        src={closeIcon}
        alt="close"
        className="navigation__closeIcon"
        onClick={() => setSearchTerm('')}
      />
      <section className="navigation__viewMethod">
        <img
          className="navigation__viewMethod--list"
          src={showGrid ? listIcon : listActiveIcon}
          alt="list-wiew"
          onClick={() => setShowGrid(false)}
        />
        <img
          className="navigation__viewMethod--grid"
          src={showGrid ? gridActiveIcon : gridIcon}
          alt="grid-view"
          onClick={() => setShowGrid(true)}
        />
        <button
          className="navigation__viewMethod--filter"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </section>
      {showFilter && (
      <Filter
        setShowFilter={setShowFilter}
        checked={checked}
        setChecked={setChecked}
        productLines={productLines}
      />
      )}
    </nav>
  );
};

export default Navigation;
