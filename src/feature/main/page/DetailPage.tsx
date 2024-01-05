import { useMatch, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PokeMonData } from '@atom/main/atom';
import * as DetailStyles from '@feature/main/styles/detailPage.style';

/** 디테일 페이지 */
const DetailPage = () => {
  const Navigate = useNavigate();
  /** url 의 정보를 가져옴 */
  const matchId = useMatch('/detail/:id');

  /** 뒤로가기 이벤트 */
  const onBackClick = () => {
    Navigate(`/`);
  };

  /** 저장된 포켓몬 데이터 */
  const pokemonData = useRecoilValue(PokeMonData);

  /** 선택한 포멧몬 디테일 데이터 */
  const clickedData =
    matchId?.params.id &&
    pokemonData?.find((item) => item.id + '' === matchId.params.id);

  return (
    <DetailStyles.DetailSection>
      <DetailStyles.MiniImgBox>
        {clickedData && (
          <>
            <DetailStyles.MiniImg
              className='miniImg front'
              src={clickedData?.front_img}
            />
            <DetailStyles.MiniImg
              className='miniImg back'
              src={clickedData?.back_img}
            />
          </>
        )}
      </DetailStyles.MiniImgBox>
      <DetailStyles.DetailBox>
        {clickedData && (
          <>
            <DetailStyles.Top>
              <DetailStyles.Circle
                className='Circle'
                color={clickedData.color}
              />
              <h3 className='number'>No.{clickedData?.id}</h3>
              <p className='Type'>Type : {clickedData?.type}</p>
            </DetailStyles.Top>

            <DetailStyles.ImgBox color={clickedData.color}>
              <DetailStyles.Img src={clickedData.img} />
            </DetailStyles.ImgBox>

            <DetailStyles.TextBox>
              <p className='name'>{clickedData?.name}</p>
              <p className='pokemonType'>{clickedData?.genera}</p>
              <p>{clickedData?.text}</p>
            </DetailStyles.TextBox>
          </>
        )}
      </DetailStyles.DetailBox>
      <DetailStyles.Btn onClick={onBackClick}>Back</DetailStyles.Btn>
    </DetailStyles.DetailSection>
  );
};
export default DetailPage;
