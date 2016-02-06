import radium from 'radium';
import { pure } from 'recompose';

export const base = (component) => {
  return pure(component);
};

export const applyStyles = (component) => {
  return radium(pure(component));
};
