import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let rendererFactory: RendererFactory2;
  let renderer: Renderer2;

  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? (store as any)[key] : null;
    },
    setItem: (key: string, value: string) => {
      (store as any)[key] = `${value}`;
    },
    clear: () => {
      store = {};
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {
          provide: RendererFactory2,
          useValue: {
            createRenderer: () => ({
              addClass: () => null,
              removeClass: () => null,
            }),
          },
        },
      ],
    });

    service = TestBed.inject(ThemeService);
    rendererFactory = TestBed.inject(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light-mode theme', () => {
    const spy = spyOn(service['renderer'], 'addClass').and.callThrough();
    service.initTheme();
    expect(spy).toHaveBeenCalledWith(document.body, 'light-mode');
  });

  it('should toggle to dark-mode', () => {
    const spyRemoveClass = spyOn(
      service['renderer'],
      'removeClass'
    ).and.callThrough();
    const spyAddClass = spyOn(
      service['renderer'],
      'addClass'
    ).and.callThrough();
    service.updateTheme('dark-mode');
    expect(spyRemoveClass).toHaveBeenCalledWith(document.body, 'light-mode');
    expect(spyAddClass).toHaveBeenCalledWith(document.body, 'dark-mode');
  });

  it('should save and load theme from local storage', () => {
    service.updateTheme('dark-mode');
    expect(localStorage.getItem('theme')).toEqual('dark-mode');
  });
});
