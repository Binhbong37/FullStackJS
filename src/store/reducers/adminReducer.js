import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            console.log('start', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('success', action);
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('failed', action);

            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            };

        // POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('failed', action);
            state.positions = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            console.log('failed', action);
            state.positions = [];
            return {
                ...state,
            };
        // ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            console.log('failed', action);
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            console.log('failed', action);
            state.roles = [];

            return {
                ...state,
            };

        // FetchAllUser
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            console.log('UserFetchAll', action);
            state.users = action.users;

            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            console.log('FailedFetchAll', action);
            state.users = [];

            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
