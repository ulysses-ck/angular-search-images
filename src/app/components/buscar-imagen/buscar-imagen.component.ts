import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
	selector: 'app-buscar-imagen',
	templateUrl: './buscar-imagen.component.html',
	styleUrls: ['./buscar-imagen.component.css'],
})
export class BuscarImagenComponent {
	nombreImagen: string;
	constructor(private _imagenService: ImagenService) {
		this.nombreImagen = '';
	}
	buscarImagenes() {
		if (this.nombreImagen === '') {
			this._imagenService.setError('Agregar un termino de busqueda!');
			return;
		}

		this._imagenService.enviarTermino(this.nombreImagen);
	}
}
