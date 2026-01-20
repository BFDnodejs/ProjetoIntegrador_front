import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type Query = Record<string, string | number | boolean | null | undefined>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Ajuste a porta/URL do seu backend
  private readonly baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  // ===== Helpers =====

  private buildUrl(path: string): string {
    if (!path) return this.baseUrl;
    return path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  private buildParams(query?: Query): HttpParams | undefined {
    if (!query) return undefined;
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      params = params.set(key, String(value));
    });
    return params;
  }

  private buildHeaders(extra?: Record<string, string>): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(extra ?? {})
    });

    const token = localStorage.getItem('token');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }

  private handleError(err: HttpErrorResponse) {
    // Normaliza mensagem de erro (p/ seu backend que manda { error: "..." })
    const apiMessage =
      (err.error && (err.error.error || err.error.message)) ||
      err.message ||
      'Erro inesperado';

    return throwError(() => new Error(apiMessage));
  }

  // ===== Métodos genéricos =====

  get<T>(path: string, query?: Query, headers?: Record<string, string>): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), {
      params: this.buildParams(query),
      headers: this.buildHeaders(headers),
    }).pipe(catchError((e) => this.handleError(e)));
  }

  post<T>(path: string, body?: any, headers?: Record<string, string>): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body ?? {}, {
      headers: this.buildHeaders(headers),
    }).pipe(catchError((e) => this.handleError(e)));
  }

  put<T>(path: string, body?: any, headers?: Record<string, string>): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body ?? {}, {
      headers: this.buildHeaders(headers),
    }).pipe(catchError((e) => this.handleError(e)));
  }

  patch<T>(path: string, body?: any, headers?: Record<string, string>): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body ?? {}, {
      headers: this.buildHeaders(headers),
    }).pipe(catchError((e) => this.handleError(e)));
  }

  delete<T>(path: string, query?: Query, headers?: Record<string, string>): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), {
      params: this.buildParams(query),
      headers: this.buildHeaders(headers),
    }).pipe(catchError((e) => this.handleError(e)));
  }
}
