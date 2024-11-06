/**
 *
 * IncomeAndSpendingReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class IncomeAndSpendingReportSummarizedService {
  static baseUrl = "/reports/income-and-spending-report-sumarrized";

  static async generateReport(request) {
    return await restClient.httpGet(`${this.baseUrl}/`, request);
  }

  static async getResidentialByAccountType(request) {
    return await restClient.httpGet(
      "/security/residentials/get-residentials",
      request
    );
  }

  static async createOrUpdate(request) {
    return await restClient.httpPost(`${this.baseUrl}/`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
