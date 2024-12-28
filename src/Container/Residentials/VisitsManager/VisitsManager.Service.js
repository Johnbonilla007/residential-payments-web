/**
 *
 * VisitsManager
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class VisitsManagerService {
  static baseUrl = "/visit";

  static async getAllVisitsByUser(request) {
    return await restClient.httpPost(
      `${this.baseUrl}/get-visit-history-by-user`,
      request
    );
  }

  static async createOrUpdateVisit(request) {
    return await restClient.httpPost(`${this.baseUrl}/create-visit`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
