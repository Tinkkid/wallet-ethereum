import { useWeb3Modal } from '@web3modal/react'

const WebButton = () => {
  const { open } = useWeb3Modal()

  return <button onClick={() => open()}>Connect</button>
}

export default WebButton