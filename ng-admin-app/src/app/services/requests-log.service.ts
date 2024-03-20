import { Injectable } from '@angular/core';

interface RequestLogEntry {
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
export class RequestsLogService {
  private requestsLog: RequestLogEntry[] = [];

  constructor() { }

  addLog(entry: RequestLogEntry) {
    this.requestsLog.push(entry);
  }

  getLogs() {
    return this.requestsLog;
  }
}
