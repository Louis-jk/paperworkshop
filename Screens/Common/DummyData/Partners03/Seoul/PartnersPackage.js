export const data = [
  {
    id: 1,
    type: ['sincere'], // 성실(sincere) , 인기(popular), 지역(local)
    popular: 'y', // 인기파트너스인지 아닌지 유무 ('y','n')
    email: 'sambo@sambo.com', // 이메일
    password: '123456789', // 비밀번호
    name: '김성준', // 성함
    mobile: '010-1234-5678', // 휴대전화번호
    businessName: '삼보인쇄', // 기업명
    // 사업자등록증 파일
    license:
      'https://lh3.googleusercontent.com/proxy/A4DgLHJqQ1_KaChC7EpdiVoX91s-LhV8t4H1UUsv_G6VlVYEJ7pmYHTfHGyhDpLzo16Sa7-iJX-wfGQQQfw1KHqNn8k6f-igCA2DIS4nyRwVAE-wwQQ8x0HmI2IyZgSL6F_gKSH5c_Ltv-oJWa26XcYEp5mwVOYFaexn1Cs5fsHo-XI',
    cate1: ['1'],
    ca_id: '9',
    ca_name: '칼라박스',
    location: 'seoul', // 지역 (seoul, busan, )
    description: '카타로그 제작부터 후가공까지 삼보인쇄에서 제작하세요.', // 업체 소개
    popularDesc: '카타로그 제작부터 후가공까지 삼보인쇄에서 제작하세요.', // 인기파트너스 업체 소개
    popularUsed: '패키지, 일반인쇄, 기타인쇄', // 인기파트너스 업체 품목
    profileImg: 'http://dmonster1506.cafe24.com/img/photo.png', // 프로필 사진 (업로드 하지 않았을 경우 default : http://dmonster1506.cafe24.com/img/photo.png)
    portfolioImg: [
      // 업체 포트폴리오 이미지(슬라이드) // Default : http://dmonster1506.cafe24.com/img/no_img.png (이미지 업로드 하진 않는 업체)
      'https://i.pinimg.com/originals/c5/02/1d/c5021d549858a09f2c2e185a19fe9073.jpg',
      'https://firstbase.in/phpfiles/2020/07/Chips_Packaging_Design_Company_Delhi_India_Firstbase_1.jpg',
    ],
    bank: {
      name: '신한은행',
      account: '1234-5678-9012345',
      depositor: '삼보인쇄',
    },
    rating: 4.5,
  },

  {
    id: 2,
    type: ['sincere'],
    popular: 'y',
    email: 'sambo@sambo.com',
    password: '123456789',
    name: '민경준',
    mobile: '010-1234-5678',
    businessName: '인쇄믹스',
    license:
      'https://lh3.googleusercontent.com/proxy/A4DgLHJqQ1_KaChC7EpdiVoX91s-LhV8t4H1UUsv_G6VlVYEJ7pmYHTfHGyhDpLzo16Sa7-iJX-wfGQQQfw1KHqNn8k6f-igCA2DIS4nyRwVAE-wwQQ8x0HmI2IyZgSL6F_gKSH5c_Ltv-oJWa26XcYEp5mwVOYFaexn1Cs5fsHo-XI',
    cate1: ['1'],
    ca_id: '10',
    ca_name: '골판지박스',
    location: 'seoul',
    description: '뭐든지 다 제작 가능한 인쇄믹스입니다!',
    popularPart: '뭐든지 다 제작 가능한 인쇄믹스입니다!',
    profileImg: [
      'https://3.bp.blogspot.com/-fW5fWJzsc9c/XTVEtnOLBCI/AAAAAAAGEO8/h3_oLDJRkPATwoOCu2mZpyhWwPtbccfTwCLcBGAs/s1600/Maxines-Heavenly-0b.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/78064c75106889.5c436d84d2982.jpg',
      'https://3.bp.blogspot.com/-Gl7KmejWReY/VBfr7W2X7bI/AAAAAAABoPM/WR6OVQfqb6o/s1600/Confetti_packaging_tive.jpgg',
    ],
    bank: {
      name: '신한은행',
      account: '1234-5678-9012345',
      depositor: '인쇄믹스',
    },
    rating: 4.5,
  },
  {
    id: 3,
    type: ['sincere'],
    popular: 'y',
    email: 'sambo@sambo.com',
    password: '123456789',
    name: '이재훈',
    mobile: '010-1234-5678',
    businessName: '애드프린트',
    license:
      'https://lh3.googleusercontent.com/proxy/A4DgLHJqQ1_KaChC7EpdiVoX91s-LhV8t4H1UUsv_G6VlVYEJ7pmYHTfHGyhDpLzo16Sa7-iJX-wfGQQQfw1KHqNn8k6f-igCA2DIS4nyRwVAE-wwQQ8x0HmI2IyZgSL6F_gKSH5c_Ltv-oJWa26XcYEp5mwVOYFaexn1Cs5fsHo-XI',
    cate1: ['1'],
    ca_id: '11',
    ca_name: '합지골판지박스',
    location: 'seoul',
    description: '카타로그 제작부터 후가공까지 애드프린트에서 제작하세요.',
    popularPart: '패키지, 일반인쇄, 기타인쇄 모두다 제작하고 있습니다.',
    profileImg: [
      'https://www.confectioneryconference.com/wp-content/uploads/Dairy-Milk-UK_Packs-800x533-1-450x300.jpg',
      'https://pro2-bar-s3-cdn-cf2.myprofileImg.com/4226d45ee5297d0858649865152fa41e/328e492f-6559-4498-90ec-53c0891d1542_rw_1920.jpg?h=91a86919555a48fe56762ccdd15bd9c6',
      'https://pro2-bar-s3-cdn-cf.myprofileImg.com/4226d45ee5297d0858649865152fa41e/b0a315c1-220f-4d09-9152-a39301cafd55_rw_1920.jpg?h=49e304533cd520b6ce8156e04da8e8c2',
    ],
    bank: {
      name: '기업은행',
      account: '9012-1234-5678-345',
      depositor: '애드프린트',
    },
    rating: 4.5,
  },
  {
    id: 4,
    type: ['sincere'],
    popular: 'y',
    email: 'sambo@sambo.com',
    password: '123456789',
    name: 'John John F',
    mobile: '010-1234-5678',
    businessName: 'PACKAGES',
    license:
      'https://lh3.googleusercontent.com/proxy/A4DgLHJqQ1_KaChC7EpdiVoX91s-LhV8t4H1UUsv_G6VlVYEJ7pmYHTfHGyhDpLzo16Sa7-iJX-wfGQQQfw1KHqNn8k6f-igCA2DIS4nyRwVAE-wwQQ8x0HmI2IyZgSL6F_gKSH5c_Ltv-oJWa26XcYEp5mwVOYFaexn1Cs5fsHo-XI',
    cate1: ['1'],
    ca_id: '12',
    ca_name: '싸바리박스',
    location: 'seoul',
    description: 'POP한 느낌의 패키지 제작은 PACKAGE에서!',
    popularPart: '이때까지 본 적 없는 패키지 인쇄몰! 바로 주문하세요!',
    profileImg: [
      'https://www.goldencreativedesign.com/wp-content/uploads/2019/07/food-packaging-design-services-sun-flour.jpg',
      'https://www.designhill.com/design-blog/wp-content/uploads/2018/06/The-Colour.jpg',
    ],
    bank: {
      name: '신한은행',
      account: '1234-5678-9012345',
      depositor: 'PACKAGES',
    },
    rating: 4.5,
  },
  {
    id: 5,
    type: ['sincere'],
    popular: 'y',
    email: 'sambo@sambo.com',
    password: '123456789',
    name: '최성준',
    mobile: '010-1234-5678',
    businessName: '동천문화인쇄',
    license:
      'https://lh3.googleusercontent.com/proxy/A4DgLHJqQ1_KaChC7EpdiVoX91s-LhV8t4H1UUsv_G6VlVYEJ7pmYHTfHGyhDpLzo16Sa7-iJX-wfGQQQfw1KHqNn8k6f-igCA2DIS4nyRwVAE-wwQQ8x0HmI2IyZgSL6F_gKSH5c_Ltv-oJWa26XcYEp5mwVOYFaexn1Cs5fsHo-XI',
    cate1: ['1'],
    ca_id: '13',
    ca_name: '식품박스',
    location: 'seoul',
    description: '카타로그 제작부터 후가공까지 동천문화인쇄에서 제작하세요.',
    popularPart: '패키지, 일반인쇄, 기타인쇄 모두다 제작하고 있습니다.',
    profileImg: [
      'https://5.imimg.com/data5/DL/ZB/DJ/SELLER-9561275/food-packaging-design-500x500.jpg',
      'https://static-cse.canva.com/blob/141577/Print-vs-web_featured-image-final.1ea9dd36.png',
    ],
    bank: {
      name: '국민은행',
      account: '5678-1234-9012345',
      depositor: '최성준',
    },
    rating: 4.5,
  },
];
