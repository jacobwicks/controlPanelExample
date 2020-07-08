import { AlbumsAction, AlbumsActionTypes } from '../../../../../types/types';
import { authFetchJSON } from '../../AuthFetch';

interface CreateNewAlbumResponse {
    hash: string;
}

type CR = CreateNewAlbumResponse | undefined;

const createNewAlbumAPI = async ({
    album,
    description,
}: {
    album: string;
    description?: string;
}) => {
    const route = 'createNewAlbum';
    const response = (await authFetchJSON(route, true, {
        album,
        description,
    })) as CR;
    return response?.hash;
};

const createNewAlbum = async ({
    album,
    dispatch,
    description,
}: {
    album: string;
    dispatch: React.Dispatch<AlbumsAction>;
    description?: string;
}) => {
    //create the new album locally
    dispatch({
        type: AlbumsActionTypes.createNewAlbum,
        album,
        description,
    });

    //set the current album to the new album
    dispatch({
        type: AlbumsActionTypes.setAlbum,
        album,
    });
};

export default createNewAlbum;
