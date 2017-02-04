/* @flow */

import React from 'react';
import classnames from 'classnames';
// import styles from './styles.css';
import { styled } from 'styletron-react';
import { breakpoints, media, spacing } from 'shared/styles';

type ContainerProps = {
  children: any,
  className: string,
  fluid: boolean,
};

const Container = styled('div', ({ fluid }: ContainerProps) => ({
  maxWidth: (fluid ? '1400px' : 'initial'),
  padding: `0 ${spacing.small}px`,
  [media.medium]: { padding: `0 ${spacing.medium}px` },
  [media.large]: { padding: `0 ${spacing.large}px` },
}));

const Row = styled('div', {
  margin: `0 ${0.5 * spacing.small}px`,
  [media.medium]: { margin: `0 ${0.5 * spacing.medium}px`},
  [media.large]: { margin: `0 ${0.5 * spacing.large}px`},
});

const Col = styled('div', {
  margin: `0 ${-0.5 * spacing.small}px`,
  [media.medium]: { margin: `0 ${-0.5 * spacing.medium}px`},
  [media.large]: { margin: `0 ${-0.5 * spacing.large}px`},
})

export { Col, Container, Row };
