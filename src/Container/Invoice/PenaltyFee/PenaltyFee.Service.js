/**
 *
 * PenaltyFee
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class PenaltyFeeService {
  static baseUrl = "/penalties/penalties-fee";

  static async getAll(request) {
    return await restClient.httpGet(`${this.baseUrl}/by-residenceNo`, request);
  }

  static async createOrUpdate(request) {
    return await restClient.httpPost(
      `${this.baseUrl}/create-or-update`,
      request
    );
  }

  static async executePaymentPenaltyFee(request) {
    return await restClient.httpPost(
      `${this.baseUrl}/execute-payment-penalty-fee`,
      request
    );
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/delete-penalty`, {
      id,
    });
  }
}
