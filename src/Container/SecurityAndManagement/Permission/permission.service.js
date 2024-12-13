import { restClient } from "../../../Helpers/restClient";

export class PermissionServices {
  static url = "/security-managements";

  static async getAllRol(request) {
    const response = await restClient.httpGet(`${this.url}/get-all-roles`);
    return response;
  }

  static async getAllPermissionWithUsers(request) {
    const response = await restClient.httpGet(`${this.url}/all-permission-with-users`, request);
    return response;
  }


  static async createOrUpdateRol(request) {
    const response = await restClient.httpPost(
      `${this.url}/create-or-update-role`,
      request
    );
    return response;
  }

  static async createOrUpdatePermission(request) {
    const response = await restClient.httpPost(
      `${this.url}/create-or-update-permission`,
      request
    );
    return response;
  }
  static async asignPermission(request) {
    const response = await restClient.httpPost(
      `${this.url}/provide-access`,
      request
    );
    return response;
  }
  static async removeRol(request) {
    const response = await restClient.httpDelete(`${this.url}/remove-role`, request);
    return response;
  }

  static async removeAccessPermissionToUser(request) {
    const response = await restClient.httpDelete(`${this.url}/remove-access-permission-to-user`, request);
    return response;
  }


  static async removePermission(request) {
    const response = await restClient.httpDelete(`${this.url}/remove-permission`, request);
    return response;
  }
}
