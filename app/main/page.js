export default function Main() {
  // const [isToggled, setIsToggled] = useState(false);

  // const toggleMenu = () => {
  //   setIsToggled(!isToggled);
  // };

  // const closeMenu = () => {
  //   setIsToggled(false);
  // };

  return (
    <div className="wrap">
      <span className="shape"></span>
      <span className="shape"></span>
      <span className="shape"></span>
      <span className="shape"></span>
      <span className="shape"></span>
      <span className="shape"></span>
      <div className="wrapSlim">
        {/* 소개1 */}
        <div className="introduce">
          <div className="introWord">
            <h3>프로젝트 소개</h3>
            <p>
              TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,
              <br />
              즉, 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에
              찍은 사진을 말합니다.
            </p>
          </div>

          <div className="introImg">
            <div className="imgbox">
              <img src="intro.svg" alt="소개 이미지" />
            </div>
          </div>
        </div>

        {/* 소개2 */}
        <div className="introduce2">
          <div className="introWord2">
            <h3>프로젝트 소개</h3>
            <p>
              TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,
              <br />
              즉, 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에
              찍은 사진을 말합니다.
            </p>
          </div>

          <div className="introImg">
            <div className="imgbox">
              <img src="intro.svg" />
            </div>
          </div>
        </div>

        {/* 소개3 */}
        <div className="introduce3">
          <div className="introImg">
            <div className="imgbox">
              <img src="intro.svg" />
            </div>
          </div>

          <div className="introWord3">
            <h3>프로젝트 소개</h3>
            <p>
              TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,
              <br />
              즉, 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에
              찍은 사진을 말합니다.
            </p>
          </div>
        </div>

        {/* 소개4 */}
        <div className="introduce4">
          <div className="introWord4">
            <h3>프로젝트 소개</h3>
            <p>
              TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,
              <br />
              즉, 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에
              찍은 사진을 말합니다.
            </p>
          </div>

          <div className="introImg">
            <div className="imgbox">
              <img src="intro.svg" />
            </div>
          </div>
        </div>

        {/* 팀 소개 */}
        <div className="team">
          <div className="team_title">Team_</div>
          {/* 팀장 */}
          <div className="teambox">
            <div className="teambox_transform">
              <div className="teamImg">
                <img src="team1.png" />
              </div>
              <div className="teamWord">
                <h3>서재민</h3>
                <h2>팀장 / 풀스택</h2>
                <p>AAA대대장입니다.</p>
              </div>
            </div>
          </div>

          {/* 팀원1 */}
          <div className="teambox">
            <div className="teamImg">
              <img src="team2.png" />
            </div>
            <div className="teamWord">
              <h3>권세명</h3>
              <h2>팀원 / 솔리디티</h2>
              <p>AAA중대장입니다.</p>
            </div>
          </div>

          {/* 팀원2 */}
          <div className="teambox">
            <div className="teamImg">
              <img src="team3.png" />
            </div>
            <div className="teamWord">
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
