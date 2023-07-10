export default function Main() {
  // const [isToggled, setIsToggled] = useState(false);

  // const toggleMenu = () => {
  //   setIsToggled(!isToggled);
  // };

  // const closeMenu = () => {
  //   setIsToggled(false);
  // };

  return (
    <div className='wrap'>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <span className='shape'></span>
      <div className='wrapSlim'>
        {/* 소개1 */}
        <div className='introduce'>
          <div className='introWord'>
            <h3>
              <span className='word_color'>Time Snap</span>
            </h3>
            <p>
              (<span className='word_color'>Time</span>stamp+
              <span className='word_color'>Snap</span>shot)을 결합하여
              <br />
              <span className='word_color'>"Time Snap"</span>이라는 개념을
              사용하였습니다.
              <br />
              Time Snap은 특정 시간에 사진을 찍은 순간을 기록하고 추억을
              되살리는 데 도움을 줄 수 있습니다. 이를 활용하여 여행 사진, 가족
              행사 사진, 이벤트 사진 등을 정리하고 추억을 공유할 수 있습니다.
            </p>
          </div>

          <div className='introImg'>
            <div className='imgbox'>
              <img src='intro.svg' alt='소개 이미지' />
            </div>
          </div>
        </div>

        {/* 소개2 */}
        <div className='introduce'>
          <div className='introWord'>
            <h3>
              <span className='word_color'>Time Snap</span> : Album
            </h3>
            <p>
              Album은 모든 사용자의 추억 공유를 돕는 편리한 기능입니다. <br />각
              사진은 민팅 시간 정보와 메시지를 함께 표시하여 서로의 추억을
              공유할 수 있습니다.
            </p>
          </div>

          <div className='introImg'>
            <div className='imgbox'>
              <img src='album.jpg' />
            </div>
          </div>
        </div>

        {/* 소개3 */}
        <div className='introduce'>
          <div className='introImg'>
            <div className='imgbox'>
              <img src='timecapsule.jpg' />
            </div>
          </div>

          <div className='introWord'>
            <h3>
              <span className='word_color'>Time Snap</span> : Time Capsule
            </h3>
            <p>
              Time Capsule은 현재의 감정과 추억을 보존하고 미래의 자신이나 다른
              사람들과 공유하는 특별한 방법입니다. 특정 시간에 찍은 사진과
              메시지를 미래에 열어 확인함으로써, 과거의 순간을 되새기고 소중한
              추억을 간직할 수 있습니다. <br />
            </p>
          </div>
        </div>

        {/* 소개4 */}
        <div className='introduce4'>
          <div className='introWord4'>
            <h3>프로젝트 소개</h3>
            <p>
              TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,
              <br />
              즉, 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에
              찍은 사진을 말합니다.
            </p>
          </div>

          <div className='introImg'>
            <div className='imgbox'>
              <img src='camera1.jpg' />
            </div>
          </div>
        </div>

        {/* 팀 소개 */}
        <div className='team'>
          <div className='team_title'>Team_</div>
          {/* 팀장 */}
          <div className='teambox'>
            <div className='teambox_transform'>
              <div className='teamImg'>
                <img src='team1.png' />
              </div>
              <div className='teamWord'>
                <h3>서재민</h3>
                <h2>팀장 / 풀스택</h2>
                <p>AAA대대장입니다.</p>
              </div>
            </div>
          </div>

          {/* 팀원1 */}
          <div className='teambox'>
            <div className='teamImg'>
              <img src='team2.png' />
            </div>
            <div className='teamWord'>
              <h3>권세명</h3>
              <h2>팀원 / 솔리디티</h2>
              <p>AAA중대장입니다.</p>
            </div>
          </div>

          {/* 팀원2 */}
          <div className='teambox'>
            <div className='teamImg'>
              <img src='team3.png' />
            </div>
            <div className='teamWord'>
              <h3>박주용</h3>
              <h2>팀원 / 웹디자인</h2>
              <p>AAA소대장입니다.</p>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer>
          <h1>
            (C)2023 <span>Time Snap</span>
          </h1>
          <h2>Privacy Policy｜Terms of Service</h2>
          <h3>Powered by Time Snap</h3>
        </footer>
      </div>
    </div>
  );
}
