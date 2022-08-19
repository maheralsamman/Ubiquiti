import React from 'react';
import { IsFilterProps, CheckBox } from '../interfaces/interfaces';
import close from '../assets/icons/Close-icon.svg';
import './Filter.scss';

const Filter = ({
  checked, setChecked, setShowFilter, productLines,
}: IsFilterProps) => {
  const onChangeHandler = (checkedBox: number) => {
    if (!checked) return;
    const newChecked = checked
      .map((item: CheckBox, index: number) => {
        if (index === checkedBox) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    setChecked(newChecked);
  };

  return (
    <main className="filter" id="filter">
      <section className="filter__header">
        <p className="filter__header--title">Filter</p>
        <img
          className="filter__header--close"
          onClick={() => setShowFilter(false)}
          src={close}
          alt="close"
        />
      </section>
      <p className="filter__title">Product Line</p>
      {checked && productLines && (productLines.map((line: string, index: number) => (
        <div key={index} className="filter__choices">
          <input
            id={`checkobx-${index}`}
            type="checkbox"
            name={line}
            onChange={() => onChangeHandler(index)}
            checked={checked[index].isChecked}
            className="filter__choices--checkbox"
          />
          <label
            className="filter__choices--label"
            htmlFor={`checkobx-${index}`}
          >
            {line}
          </label>
        </div>
      )))}
    </main>
  );
};

export default Filter;
