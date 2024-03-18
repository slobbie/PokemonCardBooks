import React, { useMemo } from 'react';

interface IMarginModel {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

/**
 * 레이아웃 사이의 공간을 조절해주는 컴포넌트
 * @returns JSX.Element
 */
const MarginModel = ({
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
}: IMarginModel) => {
  const marginModelStyle = useMemo(() => {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  }, [bottom, left, right, top]);
  return <div style={marginModelStyle} />;
};

export default MarginModel;
