import { useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Data } from '../atom';

interface IPokemoms {
  color: string;
  genera: string;
  height: number;
  id: number;
  img: string;
  name: string;
  text: string;
  type: string;
  weight: number;
}

const Detail = () => {
  const Navigate = useNavigate();
  const onClick = () => {
    Navigate(`/`);
  };
  const matchId = useMatch('/detail/:id');
  const data: any = useRecoilValue(Data);
  // const [detail, setDatail] = useState();

  const clickedMovie =
    matchId?.params.id &&
    data?.find((item: any) => item.id + '' === matchId.params.id);

  console.log(clickedMovie);

  return (
    <DetailSection>
      <DetailBox>
        {clickedMovie && (
          <>
            <h3>{clickedMovie?.name}</h3>
          </>
        )}
      </DetailBox>
      <button onClick={onClick}>뒤로가기</button>
    </DetailSection>
  );
};
export default Detail;

const DetailSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const DetailBox = styled.div`
  border: 1px solid black;
  height: 600px;
  width: 50%;
`;
