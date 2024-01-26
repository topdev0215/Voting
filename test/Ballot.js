const Ballot = artifacts.require("Ballot");

contract('Ballot', (accounts) => {
  it('give right to voters', async () => {
    const ballotInstance = await Ballot.deployed();
    await ballotInstance.giveRightToVote(accounts[1], {from:accounts[0]});
    await ballotInstance.vote(0, {from:accounts[1]});
    const winner = await ballotInstance.winningProposal();
    

    assert.equal(winner.valueOf(), 0, "voting error~");
  });

  it('delegate your vote to the voter', async() => {
    const ballotInstance = await Ballot.deployed();
    await ballotInstance.giveRightToVote(accounts[2], {from:accounts[0]});
    await ballotInstance.giveRightToVote(accounts[3], {from:accounts[0]});
    await ballotInstance.giveRightToVote(accounts[4], {from:accounts[0]});
    await ballotInstance.giveRightToVote(accounts[5], {from:accounts[0]});
    await ballotInstance.delegate(accounts[2],{from:accounts[3]});
    await ballotInstance.vote(1, {from:accounts[2]});
    await ballotInstance.vote(0, {from:accounts[4]});
    await ballotInstance.vote(1, {from:accounts[5]});
    const winner = await ballotInstance.winningProposal();
    const winnerNameStr = await ballotInstance.winnerName();
    console.log(web3.utils.hexToString(winnerNameStr))
    assert.equal(winner.valueOf(), 1, 'voting error~');
  })
});