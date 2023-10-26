import TraderBtn from "../../components/atoms/trader/TraderBtn"
import { useNavigate } from "react-router-dom";

const TraderMainPage = () => {

    const navigate = useNavigate();

    return (
        <div>
        <TraderBtn size="X-Large" color="Sky" onClick={() => {navigate('/m/list')}}>
            거래 명세서<br/> 불러오기
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky" onClick={() => {navigate('/m/create')}}>
            거래 명세서<br/> 생성
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky" onClick={() => {navigate('/m/state')}}>
            거래 상태<br/> 조회
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky" onClick={() => {navigate('/m/section')}}>
            관할 구역별<br/> 거래 내역 조회
        </TraderBtn>
        </div>
    )
}

export default TraderMainPage