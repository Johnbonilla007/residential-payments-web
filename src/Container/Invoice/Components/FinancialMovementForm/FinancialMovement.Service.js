import { restClient } from "../../../../Helpers/restClient";

export class FinancialMovementServices {
    static url = "/financial-movement";
  static async getAll(request) {
    const response = await restClient.httpGet(`${this.url}`, request);
    return response;
  }

  static async CreateOrUpdate(request) {
    const response = await restClient.httpPost(`${this.url}`, request);
    return response;
  }

  static async remove(request) {
    const response = await restClient.httpDelete(`${this.url}`, request);
    return response;
  }
}
