import {
    SET_TRACKS,
    ADD_TRACKS
  } from '../../utils/constants';
  import { get } from '../../utils/api';

  export const setTracks = (tracks) => ({
    type: SET_TRACKS,
    tracks
  });
  
  export const addTracks = (tracks) => ({
    type: ADD_TRACKS,
    tracks
  });
  
  export const initiateGetSearchResult = (searchTerm) => {
    return async (dispatch) => {
      try {
        const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
          searchTerm
        )}&type=track`;
        const result = await get(API_URL);
        console.log(result);
        const { tracks } = result;
        return dispatch(setTracks(tracks));
      } catch (error) {
        console.log('error', error);
      }
    };
  };

  export const initiateGetTrackResult = (trackID) => {
    return async (dispatch) => {
      try {
        const API_URL = `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackID)}`;
        const result = await get(API_URL);
        console.log(result);
        return result;
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMoreAlbums = (url) => {
    return (dispatch) => {
      try {
        console.log('url', url);
        const result = get(url);
        console.log('categoriess', result);
        return dispatch(addAlbums(result.albums));
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMoreArtists = (url) => {
    return (dispatch) => {
      try {
        console.log('url', url);
        const result = get(url);
        console.log('categoriess', result);
        return dispatch(addArtists(result.artists));
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMorePlaylist = (url) => {
    return (dispatch) => {
      try {
        console.log('url', url);
        const result = get(url);
        console.log('categoriess', result);
        return dispatch(addPlaylist(result.playlists));
      } catch (error) {
        console.log('error', error);
      }
    };
  };