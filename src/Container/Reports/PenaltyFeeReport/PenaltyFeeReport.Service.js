/**
 *
 * PenaltyFeeReport
 *
 */

import { restClient } from "../../../Helpers/restClient";

export class PenaltyFeeReportService {
  static baseUrl = "/penalties/penalties-fee";

  static async getAll() {
    return await restClient.httpGet(`${this.baseUrl}/`, {});
  }

  static async generateReport(request) {
    return await restClient.httpPost(`${this.baseUrl}/execute-report`, request);
  }

  static async remove(id) {
    return await restClient.httpDelete(`${this.baseUrl}/`);
  }
}
