import React from 'react'
import styled from 'styled-components'

const Rules = () => {
  return (
    <RulesContainer>
        <h2>How to play dice game?</h2>
        <div className='text'>
            <p>Select any number on right top corner</p>
            <p>Click on the dice image to roll</p>
            <p>After clicking on the dice if selected number is equal to dice number you will get same point as dice{" "}</p>
            <p>If you get wrong guess then 2 point will be deducted from you total score</p>
        </div>
    </RulesContainer>
  )
}

export default Rules

const RulesContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background-color: #fbf1f1;
    padding: 10px;
    margin-top: 30px;
    border-radius: 10px;
    h2 {
        font-size: 24px;
    }
    .text {
        margin: 20px;
    }
`;