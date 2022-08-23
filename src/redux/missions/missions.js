import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v3/';
const MISSIONS_URL = `${BASE_URL}missions`;
const GET_MISSIONS = 'GET_MISSIONS';

const initialState = [];

export const fetchMissionsApiAction = (data) => {
  const missions = data.map((mission) => ({
    id: mission.mission_id,
    name: mission.mission_name,
    description: mission.description,
    reserved: false,
  }));
  return {
    type: GET_MISSIONS,
    payload: missions,
  };
};

export const getMissionsAction = () => async (dispatch) => {
  await axios({
    method: 'get',
    url: MISSIONS_URL,
    responseType: 'json',
  })
    .then((res) => {
      dispatch(fetchMissionsApiAction(res.data));
    });
};

const missionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MISSIONS:
      return [...action.payload];

    default:
      return state;
  }
};

export default missionsReducer;