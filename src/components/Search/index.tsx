import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchValue } from '../../store/filter/slice';
import selectors from '../../store/selectors';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectors.filterSelector);
  const state = useSelector(state => state);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/>
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={e => onChangeInput(e)}
        type="text"
        placeholder="Search pizzas..."/>
      {
        value &&
        <svg className={styles.cross} onClick={onClickClear} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="cross">
          <line className={styles.cross_lines} x1="7" x2="25" y1="7" y2="25"/>
          <line className={styles.cross_lines} x1="7" x2="25" y1="25" y2="7"/>
        </g>
        </svg>
      }
    </div>

  )
}

export default Search
