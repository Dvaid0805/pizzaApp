import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../store/filter/slice';
import { SortType, SortProperty } from '../../store/filter/types';

type PopUpClick = MouseEvent & {
    path: Node[]
};

type SortProps = {
    sort: SortType
}

export const sortList: SortType[] = [
    {name: 'Popularity (DESC)', sortProperty: SortProperty.RATING},
    {name: 'Popularity (ACS)', sortProperty: SortProperty.MRATING},
    {name: 'Price (DESC)', sortProperty: SortProperty.PRICE},
    {name: 'Price (ACS)', sortProperty: SortProperty.MPRICE},
    {name: 'Alphabetical (DESC)', sortProperty: SortProperty.TITLE},
    {name: 'Alphabetical (ACS)', sortProperty: SortProperty.MTITLE},
];

const Sort: React.FC<SortProps> = React.memo(({sort}) => {
    const dispatch = useDispatch();
    const sortRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const sortName = sort.name;

    const onClickListItem = (i: SortType) => {
        dispatch(setSort(i))
        setOpen(false);
    }

    React.useEffect(() => {
        //typescript rewrite
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopUpClick;
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setOpen(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label" onClick={() => setOpen(!open)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sorted by:</b>
                <span>{sortName}</span>
            </div>
            {
                open &&
                <div className="sort__popup">
                  <ul>
                      {
                          sortList.map((obj, i) => (
                              <li
                                  key={i}
                                  onClick={() => onClickListItem(obj)}
                                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                              >
                                  {obj.name}
                              </li>
                          ))
                      }
                  </ul>
                </div>
            }
        </div>
    );
})

export default Sort;