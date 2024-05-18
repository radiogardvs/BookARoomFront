import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../service/hotel/hotel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from 'src/app/model/hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  public hotels: Hotel[] = [];
  public latitude: number = 0;
  public longitude: number = 0;
  public range: number = 0;
  constructor(private hotelService: HotelService) { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`Latitudine: ${this.latitude}, Longitudine: ${this.longitude}`);
          console.log(this.latitude,this.longitude);
        },
        (error) => {
          console.error('Eroare la obtinerea coordonatelor:', error.message);
        }
      );
    } else {
      console.error('Alta eroare.');
    }
  }

  ngOnInit(): void {
    this.getHotels();
  }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      (response: Hotel[]) => {
        this.hotels = response;
        console.log(this.hotels);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateRange(newRange:string){
    this.range = Number(newRange);
    console.log(this.range,newRange);
    this.getHotelsInRange();
  }
  public getHotelsInRange(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this.hotelService.getHotelsInRange(position.coords.latitude, position.coords.longitude, this.range).subscribe(
            (response: Hotel[]) => {
              this.hotels = response;
              console.log(this.hotels);
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          )
        },
        (error) => {
          console.error('Eroare la obtinerea coordonatelor:', error.message);
        }
      );
    } else {
      console.error('Alta eroare.');
    }

}
}