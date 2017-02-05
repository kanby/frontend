import React from 'react';
import { styled } from 'styletron-react';
import { colors, spacing } from 'shared/styles';
import Lane from 'components/lane';

const Outer = styled('section', {
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  width: 'auto',
  ...spacing.padding(2),
});

const Clear = styled('div', {
  clear: 'both',
});

const BoardPage = (props, ctx) => {
  return (
    <Outer>
      <Lane name="Backlog" />
      <Lane name="UX/D" />
      <Lane name="Dev" />
      <Lane name="Test" />
      <Lane name="Done" />
      <Lane name="Done For Real" />
    </Outer>
  );
};

BoardPage.contextTypes = {
  routing: React.PropTypes.object,
};

export default BoardPage;
