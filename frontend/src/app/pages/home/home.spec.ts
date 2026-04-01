import { describe, it, expect } from 'vitest';
import { Home } from './home';

describe('Home', () => {
  it('should create the component', () => {
    const component = new Home();
    expect(component).toBeTruthy();
  });

  it('should have featured routes', () => {
    const component = new Home();

    expect(component.featuredRoutes.length).toBeGreaterThan(0);
    expect(component.featuredRoutes[0]).toHaveProperty('title');
    expect(component.featuredRoutes[0]).toHaveProperty('image');
  });
});