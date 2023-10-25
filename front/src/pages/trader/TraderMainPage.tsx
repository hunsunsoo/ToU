import TraderBtn from "../../components/atoms/trader/TraderBtn"

const TraderMainPage = () => {
    return (
        <div>
        <TraderBtn size="X-Large" color="Sky">
            거래 명세서<br/> 불러오기
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky">
            거래 명세서<br/> 생성
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky">
            거래 상태<br/> 조회
        </TraderBtn>
        <TraderBtn size="X-Large" color="Sky">
            관할 구역별<br/> 거래 내역 조회
        </TraderBtn>
        </div>
    )
}

export default TraderMainPage