import actionTypes from './actionTypes';

import { toast } from 'react-toastify';

import {
    getAllCodeService,
    createNewUserFromService,
    getAllUsers,
    deleteUserService,
    userEditService,
} from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('gender');
            if (res.data && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart', error);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// position

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position');
            if (res.data && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetPositionStart', error);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

// ROLE

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role');
            if (res.data && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart', error);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

// CREATE USER
export const createNewUser = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserFromService(dataUser);
            if (res.data.message && res.data.message.errCode === 0) {
                toast.success('CREATE IS SUCCESSFULLY!!!');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());

            console.log('Save user', error);
        }
    };
};

export const saveUserSuccess = () => {
    return { type: actionTypes.CREATE_USER_SUCCESS };
};

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

// FETCH ALL USER
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res.data && res.data.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsers', error);
        }
    };
};

export const fetchAllUsersSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: userData,
    };
};

export const fetchAllUsersFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED,
    };
};

// DELETE
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res.data.message && res.data.message.errCode === 0) {
                toast.success('Deleted IS SUCCESSFULLY!!!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());

            console.log('DELETE user', error);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED,
    };
};

// EDIT
export const editUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await userEditService(user);
            console.log('EDIT', res.data);
            if (res.data.message && res.data.message.errCode === 0) {
                toast.success('UPDATED USER !!!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Updated error');
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error('Updated error');
            dispatch(editUserFailed());

            console.log('DELETE user', error);
        }
    };
};

export const editUserSuccess = () => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
    };
};
export const editUserFailed = () => {
    return {
        type: actionTypes.EDIT_USER_FAILED,
    };
};
