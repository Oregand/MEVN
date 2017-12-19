import Api from '@/services/Api';
import {
  getAccessToken,
} from '@/services/UserService';

export default {
  fetchAlbums() {
    return Api().get('albums', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },
  addAlbum(params) {
    return Api().post('albums', params, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },
  updateAlbum(params) {
    const url = `album/${params.id}`;
    return Api().put(url, params, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },
  getAlbum(params) {
    const url = `album/${params.id}`;
    return Api().get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },
  deleteAlbum(id) {
    const url = `albums/${id}`;
    return Api().delete(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },
};
