import { restClient } from "../../../Helpers/restClient";

export class SpecialVisitServices {
  static url = "/special-visit";

  static async getSpecialVisit(request) {
    const response = await restClient.httpPost(
      `${this.url}/get-by-residential`,
      request
    );
    return response;
  }

  static async createOrUpdateUser(request) {
    const response = await restClient.httpPost(
      `${this.url}/create-or-update`,
      request
    );
    return response;
  }

  static async RemoveSpecialVisit(request) {
    const response = await restClient.httpDelete(`${this.url}/delete`, request);
    return response;
  }
}
