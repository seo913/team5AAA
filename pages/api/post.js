export default async function Pinata(req, res) {
  try {
    const pinata = new pinataSDK(
      REACT_APP_PINATA_API_KEY,
      REACT_APP_PINATA_API_SECRET
    );

    const body = {
      ...req.body, // 저장 될 파일의 내용
    };

    const options = {
      pinataMetadata: {
        name: `${req.body.name}.json`, // 저장 될 파일명
        keyvalues: {
          // 파일의 디테일(?) 추가설명(?) 정도라고 보면 편하다. 내용과는 별개
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataPinOptions: {
        cidVersion: 1, // Pinata의 cid 버전 선택 [0|1]
      },
    };

    const pinnedData = pinata.pinJSONToIPFS(body, options);

    res.status(200).json({
      message: pinnedData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something Wrong Occured',
    });
  }
}
