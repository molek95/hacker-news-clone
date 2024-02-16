import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme = '';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  updateTheme(theme: 'dark-mode' | 'light-mode'): void {
    this.setColorTheme(theme);

    const previousTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(document.body, previousTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode(): boolean {
    return this.colorTheme === 'dark-mode';
  }

  private setColorTheme(theme: string): void {
    this.colorTheme = theme;
    localStorage.setItem('theme', theme);
  }

  private getColorTheme(): void {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      this.colorTheme = currentTheme;
    } else {
      this.colorTheme = 'light-mode';
    }
  }
}
