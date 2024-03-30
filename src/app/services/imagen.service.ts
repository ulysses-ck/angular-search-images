import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ImagenService {
	private error$ = new Subject<string>();
	private terminoBusqueda$ = new Subject<string>();

	constructor(private http: HttpClient) {}

	setError(mensaje: string) {
		this.error$.next(mensaje);
	}

	getError(): Observable<string> {
		return this.error$.asObservable();
	}

	enviarTermino(termino: string) {
		this.terminoBusqueda$.next(termino);
	}

	getTerminoBusqueda(): Observable<string> {
		return this.terminoBusqueda$.asObservable();
	}

	getImages(
		termino: string,
		imagePerPage: number,
		paginaActual: number
	): Observable<any> {
		const URL =
			'https://pixabay.com/api/?key=36988719-4c710f37259bb65b4c805b89d&q=' +
			termino +
			'&per_page=' +
			imagePerPage +
			'&page=' +
			paginaActual;

		return this.http.get(URL);
	}
}
