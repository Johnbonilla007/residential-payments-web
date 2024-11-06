/**
 *
 * PendingPaymentReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class PendingPaymentReportService {
  static baseUrl = "/reports/pending-payments";

  static async getPaymentTypes(searchValue) {
    return await restClient.httpGet(
      "/payment/payment-types/get-payment-types",
      { searchValue }
    );
  }

  static async getManagerAccounts(searchValue) {
    return await restClient.httpGet(`${this.baseUrl}/get-managers-accounts`, {
      searchValue,
    });
  }

  static async generateReport(request) {
    return await restClient.httpGet(`${this.baseUrl}`, request);
  }

  static async createOrUpdate(request) {
    return await restClient.httpPost(`${this.baseUrl}/`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
