import { Injectable } from '@angular/core';
import { AssetCatalog } from './interfaces/assets-catalog.interface';
import { brandSelectionHelper } from './helpers/brand-selection.helper';

@Injectable({
  providedIn: 'root',
})
export class BrandingService {
  catalog: AssetCatalog;

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.catalog = brandSelectionHelper({
      production: false,
      host: window.location.hostname,
      brand: urlParams.get('brand') || undefined,
    });
    this.injectStyles();
  }

  injectStyles() {
    // we must add the cssClass of the catalog to the html tag
    document.documentElement.classList.add(this.catalog.cssClass);
  }

  style(element: HTMLElement) {
    element.classList.add(this.catalog.cssClass);
  }
}
