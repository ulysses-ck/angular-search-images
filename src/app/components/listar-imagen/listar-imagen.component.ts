import { Component } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
	selector: 'app-listar-imagen',
	templateUrl: './listar-imagen.component.html',
	styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent {
	termino = '';
	suscription: Subscription;
	listImages: any[] = [];
	loading = false;
	imagesPerPage = 20;
	paginaActual = 1;
	calcularTotalPaginas = 0;

	constructor(private _imagenService: ImagenService) {
		this.suscription = this._imagenService
			.getTerminoBusqueda()
			.subscribe((data) => {
				this.termino = data;
				this.paginaActual = 1;
				this.loading = true;
				this.obtenerImagenes();
			});
	}

	obtenerImagenes() {
		this._imagenService
			.getImages(this.termino, this.imagesPerPage, this.paginaActual)
			.subscribe(
				(data) => {
					this.loading = false;
					console.log(data);

					if (data.hits.length < 0) {
						this._imagenService.setError(
							'Ups, no encontramos ningun resultado'
						);
						return;
					}
					this.calcularTotalPaginas = Math.ceil(
						data.totalHits / this.imagesPerPage
					);

					this.listImages = data.hits;
				},
				(error) => {
					console.log(error);
					this._imagenService.setError('Oops... Ocurrió un error');
					this.loading = false;
				}
			);
	}

	paginaAnterior() {
		this.paginaActual--;
		this.loading = true;
		this.listImages = [];
		this.obtenerImagenes();
	}
	paginaSiguiente() {
		this.paginaActual++;
		this.loading = true;
		this.listImages = [];
		this.obtenerImagenes();
	}

	paginaAnteriorClass() {
		return !(this.paginaActual === 1);
	}
	paginaSiguienteClass() {
		return !(this.paginaActual === this.calcularTotalPaginas);
	}
}
