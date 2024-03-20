import { Injectable } from '@angular/core';

export interface RequestLogsEntry {
  resourceType: string;
  mockResourceId: string;
  requestMethod: string;
  requestTimestamp: Date;
  relativeUrl: string;
  responseStatus: number;
  responseBody: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestLogsService {
  private requestsLog: RequestLogsEntry[] = [];

  constructor() { }

  addLog(entry: RequestLogsEntry) {
    this.requestsLog.push(entry);
  }

  getLogs() {
    return this.requestsLog;
  }
}
