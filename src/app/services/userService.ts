import requests from "./http";
import { FetchUserParams } from "../interfaces/User";

class UserService {



  fetchAllUsers(payload: FetchUserParams) {
    let url = '/users/?';
    const params: URLSearchParams = new URLSearchParams();

    // if (payload.user_id !== undefined) {
    //   params.append('user_id', payload.user_id.toString());
    // }
    if (payload.searchText) {
      params.append('searchText', payload.searchText);
    }
    if (payload.limit !== undefined) {
      params.append('limit', payload.limit.toString());
    }
    if (payload.page !== undefined) {
      params.append('page', payload.page.toString());
    }
    if (payload.role !== undefined) {
      if (Array.isArray(payload.role)) {
        params.append('role', payload.role.join(','));
      } else {
        params.append('role', payload.role);
      }
    }
    if (payload.active !== undefined) {
      if (Array.isArray(payload.active)) {
        params.append('active', payload.active.join(','));
      } else {
        params.append('active', payload.active);
      }
    }
    if (payload.type !== undefined) {
      if (Array.isArray(payload.type)) {
        params.append('type', payload.type.join(','));
      } else {
        params.append('type', payload.type);
      }
    }

    url += params.toString();

    return requests.get(url);
}



  createUser(payload: object) {
    return requests.post("/users", payload);
  }

  deleteUser(id: number) {
    const payload = {
      user_id: id
    }
    return requests.delete("/users", payload);
  }

  updateUser(payload: object) {
    return requests.patch("/users", payload);
  }

  fetchUsersCount(payload: FetchUserParams) {
    let url = '/users/?requestType=count&';
    const params: URLSearchParams = new URLSearchParams();

    // if (payload.user_id !== undefined) {
    //   params.append('user_id', payload.user_id.toString());
    // }
    if (payload.searchText) {
      params.append('searchText', payload.searchText);
    }
    if (payload.limit !== undefined) {
      params.append('limit', payload.limit.toString());
    }
    if (payload.page !== undefined) {
      params.append('page', payload.page.toString());
    }
    if (payload.role !== undefined) {
      if (Array.isArray(payload.role)) {
        params.append('role', payload.role.join(','));
      } else {
        params.append('role', payload.role);
      }
    }
    if (payload.active !== undefined) {
      if (Array.isArray(payload.active)) {
        params.append('active', payload.active.join(','));
      } else {
        params.append('active', payload.active);
      }
    }
    if (payload.type !== undefined) {
      if (Array.isArray(payload.type)) {
        params.append('type', payload.type.join(','));
      } else {
        params.append('type', payload.type);
      }
    }

    url += params.toString();

    return requests.get(url);
}

}

export default UserService;
