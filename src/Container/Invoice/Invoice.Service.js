import { restClient } from "../../Helpers/restClient";

export class InvoiceServices {
  static url = "/payment/invoices";

  static async getAllInvoice(request) {
    const response = await restClient.httpGet(`${this.url}`, request);
    return response;
  }

  static async getAllPaymentWay(request) {
    const response = await restClient.httpGet(
      `/payment/payment-ways/get-payment-ways`,
      request
    );
    return response;
  }

  static async createOrUpdateInvoice(request) {
    const response = await restClient.httpPost(
      `${this.url}/save-invoice`,
      request
    );
    return response;
  }

  static async getPaymentByUserVoucher(request) {
    const response = await restClient.httpPost(
      `/payment-by-user/get-by-residence`,
      request
    );
    return response;
  }


  static async createOrUpdateSpendingInvoice(request) {
    const response = await restClient.httpPost(
      `/payment/spending-invoices/create-or-update-spending-invoice`,
      request
    );
    return response;
  }

  static async createResidencePayment(request) {
    const response = await restClient.httpPost(
      `/payment/residences-payments/create-residence-payment`,
      request
    );
    return response;
  }
  static async removeResidencePayment(request) {
    const response = await restClient.httpDelete(
      `/payment/residences-payments/delete-residence-payment`,
      request
    );
    return response;
  }

  static async getResidencePaymentsByResidence(request) {
    const response = await restClient.httpGet(
      `/payment/residences-payments/payments-by-residence`,
      request
    );
    return response;
  }

  static async getAllSpendingInvoice(searchValue) {
    const response = await restClient.httpGet(`/payment/spending-invoices`, {
      searchValue,
    });
    return response;
  }

  static async getPaymentTypeByResidence(request) {
    const response = await restClient.httpGet(
      `/payment/residences-payments`,
      request
    );
    return response;
  }

  static async getPaymentTypes(searchValue) {
    const response = await restClient.httpGet(
      `/payment/payment-types/get-payment-types`,
      { searchValue }
    );
    return response;
  }

  static async removeInvoice(request) {
    const response = await restClient.httpDelete(
      `${this.url}/delete-invoice`,
      request
    );
    return response;
  }

  static async addUrlResidentialLogo(request) {
    const response = await restClient.httpPost(
      `/security/residentials/add-url-residential-logo`,
      request
    );
    return response;
  }

  static async changeManagerUser(request) {
    const response = await restClient.httpPost(
      `/security/accounts/change-manager-user`,
      request
    );
    return response;
  }

  static async deleteSpendingInvoice(request) {
    const response = await restClient.httpDelete(
      `/payment/spending-invoices/delete-spending-invoice`,
      request
    );
    return response;
  }

  static async changeChargeCurrentMonth(request) {
    const response = await restClient.httpPost(
      `/security/residentials/allow-or-disable-charge-current-month`,
      request
    );
    return response;
  }
}
