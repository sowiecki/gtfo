import radium from 'radium';
import { pure } from 'recompose';

export const base = (component) => pure(component);

export const applyStyles = (component) => radium(pure(component));
