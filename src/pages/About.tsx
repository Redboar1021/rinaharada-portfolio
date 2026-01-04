import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import homeImage from '../assets/images/home/home.jpg';

const AboutContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 160px 40px 120px; 
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
     padding: 120px 20px 100px; 
  }
`;

const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 3.5rem; 
  letter-spacing: 0.1em;
  margin-bottom: 80px;
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  color: #F5F5F5;

  @media (max-width: 768px) {
    font-size: 2.5rem; 
    margin-bottom: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px; 
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 100%;
  max-width: 800px; 
  aspect-ratio: 3/2;
  background-color: #333;
  background-image: url(${homeImage});
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
`;

const BioText = styled.div`
  max-width: 800px; 
  font-family: 'Noto Serif JP', serif;
  font-size: 1.1rem; 
  line-height: 2.2; 
  text-align: justify;
  letter-spacing: 0.05em;
  color: #E0E0E0;

  p {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 2;
  }
`;

export const About = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle>About</PageTitle>

      <ContentWrapper>
        <ProfileImage />
        <BioText>
          <p>
            1997年生まれ。奈良県奈良市出身。3歳よりピアノを始める。第9回ヴィーゴ国際ピアノコンクール第2位。第15回東京音楽コンクールピアノ部門第2位。第26回アルトゥール・シュナーベルコンクール第2位(1位無し)。第25回スペイン作曲家国際ピアノコンクールセミファイナル出場。第19回シューマン国際コンクールピアノ部門セミファイナル出場。ピティナ・ピアノコンペティションA2、A1、B、D、G級全国大会ベスト賞、銅賞、ANA賞。第45回ピティナ特級セミファイナリスト。第1回Napolinova World Piano E-Competition第4位。第13回宝塚ベガ学生ピアノコンクール高校の部第1位及び宝塚演奏家連盟賞受賞。第15回ローゼンストック国際ピアノコンクール第2位(1位なし)。Wiener Musikseminarにて、教授推薦によるディヒラーコンクール第1位。
          </p>
          <p>
            NHK-FM大阪放送局「リサイタル・パッシオ」に出演し、その演奏は全国放送された。ギタリストの山田唯雄と共にNHK BS8Kプレミアムコンサートに出演。藝大モーニングコンサート、フレッシュ名曲コンサート、東京文化会館 上野deクラシック等、演奏会に多数出演。小林研一郎、山下一史、梅田俊明、大井剛史、鈴木優人、藤岡幸夫、三ツ橋敬子の各氏の指揮のもと、日本フィルハーモニー交響楽団、東京フィルハーモニー交響楽団、藝大フィルハーモニア管弦楽団、関西フィルハーモニー管弦楽団と共演。
          </p>
          <p>
            また、A.Kobrin、H.Barda、J.Jiracek、J.Rouvier等、著名な音楽家のレッスンを受講し研鑽を積む。これまでに辰巳千里、土居知子、福井尚子、坂井千春の各氏に、現在ベルリン芸術大学マスターピアノソリスト科にてGottlieb Wallisch氏に師事。ピティナ新人指導者賞受賞。宗次エンジェル基金/日本演奏連盟新進演奏家国内奨学金制度2021・2022年度奨学生。令和5年度文化庁新進芸術家海外派遣制度1年研修員。公益財団法人2025年度ロームミュージックファンデーション奨学生。京都市立京都堀川音楽高等学校を経て、東京藝術大学音楽学部器楽科卒業。同大学院修士課程修了。
          </p>
        </BioText>
      </ContentWrapper>
    </AboutContainer>
  );
};
