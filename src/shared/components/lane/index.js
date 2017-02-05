import React from 'react';
import { styled } from 'styletron-react';
import { colors, spacing } from 'shared/styles';
import { darken } from 'shared/styles/color-helpers';

const Wrapper = styled('div', {
  backgroundColor: colors.white,
  border: `1px solid ${darken(colors.white, 0.1)}`,
  display: 'inline-block',
  width: '200px',
  ':first-child': { marginLeft: 0 },
  ':last-child': { marginRight: 0 },
  ...spacing.marginHorizontal(),
});

const Title = styled('h5', {
  fontFamily: 'Lobster Two',
  ...spacing.margin(),
});

const Lane = ({ name, children }) => (
  <Wrapper>
    <Title>{name}</Title>
    <div>{children}</div>
  </Wrapper>
);

export default Lane;
