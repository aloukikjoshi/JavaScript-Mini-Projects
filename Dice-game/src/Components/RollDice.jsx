import styled from 'styled-components';

const RollDice = ({ currentDice, rollDice }) => {
    
    return (
        <DiceContainer>
            <div
                className='dice'
                onClick={rollDice}
            >
                <img className='image' src={`/images/dice/dice_${currentDice}.png`} alt={`dice ${currentDice}`} />
            </div>
            <p>Click on the dice to roll</p>
        </DiceContainer>
    )
}

export default RollDice;

const DiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    .dice {
        cursor: pointer;
    }
    p {
        font-size: 24px;
    }
    .image{
        height: 150px;
        width: 150px;
    }
`;
