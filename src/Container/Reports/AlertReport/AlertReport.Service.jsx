/**
 *
 * AlertReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class AlertReportService {
  static baseUrl = "/reports/alert-reports";

  static async getAll() {
    return await restClient.httpGet(`${this.baseUrl}/`, {});
  }

  static async generateRepore(request) {
    return await restClient.httpPost(`${this.baseUrl}/`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
