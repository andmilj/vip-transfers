import React from 'react';
import classNames from 'classnames';

const Parallax = ({ordinal}) => (
    <div className={classNames('parallax', `parallax${ordinal}`)}>
      <div className="container inner text-center">
      </div>
    </div>
);

export default Parallax;
