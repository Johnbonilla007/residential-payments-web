/**
 *
 * AccessReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class AccessReportService {
  static baseUrl = "/reports/access-reports";

  static async getAll() {
    return await restClient.httpGet(`${this.baseUrl}/`, {});
  }

  static async generateReport(request) {
    return await restClient.httpPost(`${this.baseUrl}/`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
