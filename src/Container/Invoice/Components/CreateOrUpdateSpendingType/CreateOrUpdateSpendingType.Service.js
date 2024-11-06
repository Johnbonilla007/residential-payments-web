/**
 *
 * CreateOrUpdateSpendingType
 *
 */

import { restClient } from "../../../../Helpers/restClient";

export class CreateOrUpdateSpendingTypeService {
  static baseUrl = "/payment/spending-types";

  static async getSpendingTypes(searchValue) {
    return await restClient.httpGet(`${this.baseUrl}/get-spending-types`, {
      searchValue,
    });
  }

  static async createOrUpdate(request) {
    return await restClient.httpPost(
      `${this.baseUrl}/create-or-update-spending-type`,
      request
    );
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/remove-spending-type`, {
      id,
    });
  }
}
