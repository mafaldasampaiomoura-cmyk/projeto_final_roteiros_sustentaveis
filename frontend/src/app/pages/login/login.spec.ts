import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { Login } from './login';

describe('Login', () => {
  let authServiceMock: any;
  let routerMock: any;
  let component: Login;

  beforeEach(() => {
    authServiceMock = {
      login: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    component = new Login(authServiceMock, routerMock);
  });

  it('should show error when email or password is empty', () => {
    component.email = '';
    component.password = '';

    component.onSubmit();

    expect(component.errorMessage()).toBe('Preenche o email e a palavra-passe.');
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should show error when email is invalid', () => {
    component.email = 'emailinvalido';
    component.password = '123456';

    component.onSubmit();

    expect(component.errorMessage()).toBe('Introduz um email válido.');
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should navigate to /routes on successful login', () => {
    authServiceMock.login.mockReturnValue(
      of({
        session: { access_token: 'abc' },
        user: { id: '1', email: 'teste@teste.com' },
      })
    );

    component.email = 'teste@teste.com';
    component.password = '123456';

    const originalLocalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        setItem: vi.fn(),
      },
      configurable: true,
    });

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('teste@teste.com', '123456');
    expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/routes']);

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
  });
});