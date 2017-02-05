/* @flow */

import React from 'react';
import { styled } from 'styletron-react';
import { breakpoints, grid, mediaQueries as mq, spacing } from 'shared/styles';

type ContainerProps = {
  fluid: boolean,
};

const Container = styled('div', ({ fluid }: ContainerProps) => ({
  maxWidth: fluid ? `${grid.maxWidth}px` : 'initial',
  padding: `0 ${spacing.small}px`,
  [mq.medium]: { padding: `0 ${spacing.medium}px` },
  [mq.large]: { padding: `0 ${spacing.large}px` },
}));

const Row = styled('div', {
  margin: `0 ${0.5 * spacing.small}px`,
  [mq.medium]: { margin: `0 ${0.5 * spacing.medium}px` },
  [mq.large]: { margin: `0 ${0.5 * spacing.large}px` },
});

const Col = styled('div', {
  margin: `0 ${(-0.5) * spacing.small}px`,
  [mq.medium]: { margin: `0 ${(-0.5) * spacing.medium}px` },
  [mq.large]: { margin: `0 ${(-0.5) * spacing.large}px` },
});

export { Col, Container, Row };
