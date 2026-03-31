import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  featuredRoutes = [
    {
      title: 'Conhecer Braga',
      subtitle: 'Braga',
      description:
        'Descobre pontos históricos, jardins e locais culturais numa experiência sustentável pela cidade.',
      duration: '2 horas',
      difficulty: 'Fácil',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Passeio junto ao rio',
      subtitle: 'Porto',
      description:
        'Um roteiro calmo com paisagens bonitas, zonas pedonais e paragens ideais para explorar a cidade.',
      duration: '3 horas',
      difficulty: 'Média',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Natureza e tranquilidade',
      subtitle: 'Gerês',
      description:
        'Ideal para quem procura natureza, vistas abertas e uma experiência mais ligada ao ambiente.',
      duration: '5 horas',
      difficulty: 'Difícil',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    },
  ];
}