/**
 *
 * IncomeAndSpendingReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class IncomeAndSpendingReportDetailedService {
  static baseUrl = "/reports/incomes-and-spending-report-detailed";

  static async generateReport(request) {
    return await restClient.httpGet(`${this.baseUrl}/`, request);
  }

  static async getResidencesByResidentialNo(searchValue) {
    

    return await restClient.httpGet("/security/residences/get-residences", {
      searchValue,
    });
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
