import React from 'react';
import connectStyles from 'styletron-connect';
import { colors, spacing } from 'shared/styles';
import { darken } from 'shared/styles/color-helpers';
import merge from 'lodash/merge';

const Lane = ({ name, styles, children }) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>{name}</h3>
    <div>{children}</div>
  </div>
);

const styles = {
  wrapper: {
    backgroundColor: colors.white,
    border: `1px solid ${darken(colors.white, 0.1)}`,
    display: 'inline-block',
    width: '200px',
    ':first-child': { marginLeft: 0 },
    ':last-child': { marginRight: 0 },
    ...merge(
      spacing.marginHorizontal(),
      spacing.padding(),
    ),
  },
  title: {
    fontFamily: 'Lobster Two',
    ...spacing.margin(0),
  },
};

export default connectStyles(Lane, styles);
