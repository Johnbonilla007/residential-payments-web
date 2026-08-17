/**
 *
 * CreateOrUpdatePaymentType
 *
 */

import { restClient } from "../../../../Helpers/restClient";

export class CreateOrUpdatePaymentTypeService {
  static baseUrl = "/payment/payment-types";

  static async getPaymentTypes(searchValue) {
    return await restClient.httpGet(`${this.baseUrl}/get-payment-types`, {
      searchValue,
    });
  }

  static async generateReport(request) {
    return await restClient.httpGet(`${this.baseUrl}`, request);
  }

  static async createOrUpdate(request) {
    return await restClient.httpPost(
      `${this.baseUrl}/create-or-update-payment-type`,
      request
    );
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/remove-payment-type`, { id });
  }
}
