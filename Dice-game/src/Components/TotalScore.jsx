import styled from "styled-components";

const TotalScore = ({ score }) => {
  return (
    <ScoreContainer>
        <h1>{score}</h1>
        <p>Total score</p>
    </ScoreContainer>
  )
}

export default TotalScore;

const ScoreContainer = styled.div`
    max-width: 200px;
    /* background-color: red; */
    text-align: center;
    h1 {
        font-size: 100px;
        line-height: 10px;
    }
    p {
        font-size: 24px ;
        font-weight: 500;
    }
`;
