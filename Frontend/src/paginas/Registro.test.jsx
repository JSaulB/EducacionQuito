import React from 'react';
import Registro from './Registro';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: 'Registro exitoso' })),
}));

describe('Registro', () => {
  it('envía el formulario correctamente', async () => {
    const wrapper = <Registro />;
    const formulario = wrapper.props.children;
    const valores = {
      nombre: 'John Doe',
      apellido: 'Doe',
      direccion: '123 Main St',
      telefono: '1234567890',
      email: 'johndoe@example.com',
      password: 'password123',
    };
    formulario.props.onSubmit(valores);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/registroadmin', valores);
  });
});