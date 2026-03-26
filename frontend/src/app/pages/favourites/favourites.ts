import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-favourites',
  imports: [Navbar],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {}
