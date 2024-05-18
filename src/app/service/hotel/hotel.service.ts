import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hotel } from 'src/app/model/hotel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiServerUrl}/hotel/all`);
  }
  public getHotelsInRange(latitude: number, longitude: number, range: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiServerUrl}/hotel/allinrange/${latitude}/${longitude}/${range}`);
  }
  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiServerUrl}/hotel/add`, hotel);
  }
  public deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/hotel/delete/${hotelId}`);
  }
}
