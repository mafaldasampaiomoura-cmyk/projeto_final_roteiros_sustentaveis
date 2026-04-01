import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { RoutesList } from './routes-list';

describe('RoutesList', () => {
  let routesServiceMock: any;
  let routerMock: any;
  let cdrMock: any;
  let component: RoutesList;

  beforeEach(() => {
    routesServiceMock = {
      getRoutes: vi.fn(),
    };

    routerMock = {
      events: of(),
    };

    cdrMock = {
      detectChanges: vi.fn(),
    };

    component = new RoutesList(routesServiceMock, routerMock, cdrMock);
  });

  it('should load routes successfully', () => {
    const mockRoutes = [
      { id: 1, titulo: 'Braga', image_url: 'img1.jpg' },
      { id: 2, titulo: 'Lisboa', image_url: 'img2.jpg' },
    ];

    routesServiceMock.getRoutes.mockReturnValue(of({ data: mockRoutes }));

    component.loadRoutes();

    expect(routesServiceMock.getRoutes).toHaveBeenCalled();
    expect(component.routesList).toEqual(mockRoutes);
    expect(component.loading).toBe(false);
    expect(cdrMock.detectChanges).toHaveBeenCalled();
  });

  it('should stop loading when service returns error', () => {
    routesServiceMock.getRoutes.mockReturnValue(
      throwError(() => new Error('Erro ao buscar roteiros'))
    );

    component.loadRoutes();

    expect(component.loading).toBe(false);
    expect(cdrMock.detectChanges).toHaveBeenCalled();
  });
});