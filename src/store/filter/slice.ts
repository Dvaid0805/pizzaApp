import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortProperty, SortType, FilterSliceState } from './types';


const initialState: FilterSliceState = {
    searchValue: '',
    pageCount: 1,
    categoryId: null,
    sort: {
        name: 'Popularity',
        sortProperty: SortProperty.RATING
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.pageCount = Number(action.payload.pageCount);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        }
    }
});

export const { setCategoryId, setSort, setSearchValue, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer

