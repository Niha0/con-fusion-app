import { Injectable } from '@angular/core';
import {Feedback} from '../shared/feedback';
import { Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,  private processHTTPMsgService: ProcessHTTPMsgService) { }
 
  submitFeedback(feedback : Feedback):Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedbacjk/', feedback, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
