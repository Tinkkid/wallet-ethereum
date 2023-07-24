import { useWeb3Modal } from '@web3modal/react'

const WebButton = () => {
  const { open, balance } = useWeb3Modal()
  console.log(balance)

  return <button onClick={() => open()}><span>
    test
  </span>
    Connect</button>
}

export default WebButton