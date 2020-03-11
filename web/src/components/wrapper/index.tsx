import * as React from 'react';

const Comp: React.FC = ({
  children,
}) => {
  const style = {
    padding: '20px',
    backgroundColor: '#fff',
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default Comp;
