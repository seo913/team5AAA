export default function Main(){
    return(
        <div className="min-h-screen">
            <div className="ml-14 flex justify-around items-start">
            <div className="mt-2">
                <p className="font-semibold text-xl">프로젝트 소개</p>
                <p className="mb-1 font-semibold">TimeSnap은 TimeStamp + SnapShot 타임스탬프는 이벤트,<br/>
                즉 사건이 컴퓨터에 기록된 시간을 의미하고 스냅샷은 짧은 순간에 찍은 사진을 말 합니다.</p>
                <p className="mb-1 font-semibold">그렇게 사람들은 향수병을 그리워하는데  타임스탬프와 스냅샷이 향수병으로 영원하게 남길수 있습니다.</p>
                <p className="mb-1 font-semibold">앨범: 이용자들이 추억을 민팅할 때 사진 또는 동영상을 넣을 수 있습니다.</p>
                <p className="mb-1 font-semibold">타임캡슐: 이용자들이 나중에 추억으로 열어보고싶은 것들은<br/>
                타임캡슐기능을 사용하여 리빌 전 상태로 저장해놓고 이용자가 원하는 시기에 리빌을 할 수 있습니다.</p>
                </div>
            <div>
                <img src="image.png" className="w-[400px] h-[400px] rounded-xl"/>
                <p>우리팀로고</p>
            </div>
            </div>

            <div className="ml-14 flex justify-around items-center mt-10">
            <div className="mt-2">
            <p className="font-semibold text-xl">프로젝트 장점</p>
            <p className="mb-1 font-semibold">이용자들이 추억을 민팅할 때 사진 또는 동영상을 넣을 수 있다.</p>
            <p className="mb-1 font-semibold">타임캡슐기능을 사용하여 리빌 전 상태로 저장해놓고 이용자가 원하는 시기에 리빌을 할 수 있다.</p>
            <p className="mb-1 font-semibold">여러 사람들의 추억들을 공유 할 수 있다.</p>
            </div>
            <div>
                <img src="image.png" className="w-[400px] h-[400px] rounded-xl"/>
                <p>민팅한결과물이나 다른 이미지</p>
                </div>
            </div>
        </div>
    )
}