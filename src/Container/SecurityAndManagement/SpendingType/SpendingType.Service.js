/** 
 * 
 * SpendingType 
 * 
 */ 
 
import { restClient } from "../../../Helpers/restClient";
 
export class SpendingTypeService { 
  static baseUrl = "/"; 
 
    static async getAll() { 
      return await restClient.httpGet(`${this.baseUrl}/`, {}); 
    } 
 
    static async createOrUpdate(request) { 
      return await restClient.httpPost(`${this.baseUrl}/`, request); 
    } 
 
    static async remove(id) { 
      return await restClient.httpDelete(`${this.baseUrl}/`); 
    } 
}