import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

function DeletePortfolio({onPortfolioDelete, portfolioValue}: Props) {
  return (
    <div>
        <form onSubmit={onPortfolioDelete}>
            <input hidden={true} defaultValue={portfolioValue}></input>
            <button type='submit'>Delete</button>
        </form>
    </div>
  )
}

export default DeletePortfolio