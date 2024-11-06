import { restClient } from "../../../Helpers/restClient";

export class UsersServices {
  static url = "/security/users";

  static async getAllResidential(request) {
    const response = await restClient.httpGet(
      `/security/residentials/get-residentials`,
      request
    );
    return response;
  }

  static async getResidence(request) {
    const response = await restClient.httpGet(
      `/security/residences/get-residences`,
      request
    );
    return response;
  }
  static async getUsers(request) {
    const response = await restClient.httpGet(
      `${this.url}/get-users`,
      request
    );
    return response;
  }

  static async getUser(request) {
    const response = await restClient.httpGet(
      `${this.url}/get-user`,
      request
    );
    return response;
  }

  static async getAccount(request) {
    const response = await restClient.httpGet(
      `/security/accounts`,
      request
    );
    return response;
  }


  static async createOrUpdateUser(request) {
    const response = await restClient.httpPost(
      `${this.url}/create-or-update-user`,
      request
    );
    return response;
  }

  static async disableUser(request) {
    const response = await restClient.httpPost(
      `/security/accounts/enable-or-disable-accounts`,
      request
    );
    return response;
  }

  static async allowOrDisableEmergy(request) {
    const response = await restClient.httpPost(
      `/security/users/allow-or-disable-emergy`,
      request
    );
    return response;
  }

  static async allowOrDisableRegisterFrequentVisit(request) {
    const response = await restClient.httpPost(
      `/security/users/change-allow-register-frequent`,
      request
    );
    return response;
  }

  static async freeDevice(request) {
    const response = await restClient.httpPost(
      `/security/users/free-device`,
      request
    );
    return response;
  }

  static async UpdatePassword(request) {
    const response = await restClient.httpPost(
      `/security/users/changePassword`,
      request
    );
    return response;
  }

  static async RemoveUser(request) {
    const response = await restClient.httpDelete(
      `/security/users/remove-user`,
      request
    );
    return response;
  }

}
