import { SET_TRACKS, ADD_TRACKS } from '../../utils/constants';
const tracksReducer = (state = {}, action) => {
  const { tracks } = action;
  switch (action.type) {
    case SET_TRACKS:
      state = tracks;
      return state;
    case ADD_TRACKS:
      return {
        ...state,
        next: tracks.next,
        items: [...state.items, ...albums.items]
      };
    default:
      return state;
  }
};
export default tracksReducer;